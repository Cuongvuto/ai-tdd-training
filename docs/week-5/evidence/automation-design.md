# Thiết kế Automation — Week 5: Login Issue / Account Reactivation

## Phạm vi

- **Scenario:** Scenario 1 Week 4 — Login Issue.
- **Chế độ:** local/mock; chưa gọi API thật của Odoo, HR, LMS hoặc email.
- **Mục tiêu:** tự động hóa các bước xử lý truy cập lặp lại; không khẳng định đã
  sửa nguyên nhân gốc của LMS.

## Workflow bắt buộc

```text
Phân tích ticket → kiểm tra HR → xử lý LMS / manual review → phản hồi user → ghi log
```

| Điều kiện | Hành động | Kết quả |
| --- | --- | --- |
| Không phải Login Issue | Không xử lý | `ignored` |
| Thiếu định danh account | Ghi internal note | `needs_manual_review` |
| HR `terminated` | Ghi internal note; không đổi LMS | `needs_manual_review` |
| HR `active`, LMS account `Active` | Reset password | `password_reset` |
| HR `active`, LMS account `Deactivated` | Reactivate, rồi reset password | `reactivated_and_reset` |
| Không có LMS account, dấu hiệu lỗi hệ thống hoặc action lỗi | Internal note + escalation | `failed_manual_review` |

`active` / `terminated` là trạng thái nhân sự từ HR; `Active` / `Deactivated`
là trạng thái account trong LMS. Đây là quyết định kỹ thuật của project để kết hợp
workflow Week 5 với Scenario Week 4.

## Thành phần local/mock

- Ticket analyzer: nhận diện Login Issue từ nội dung ticket.
- HR fixture: trả về trạng thái nhân sự.
- LMS fixture: đọc trạng thái account, reactivate và reset password.
- Ticket note sink: lưu internal note tại local thay vì ghi vào Odoo.
- Response generator: tạo phản hồi mô phỏng cho user.
- Audit logger: ghi ticket ID, quyết định, action và lỗi; không ghi password.

## Phạm vi test

1. Ticket không liên quan Login Issue được bỏ qua.
2. HR active + LMS account Active: reset password.
3. HR active + LMS account Deactivated: reactivate và reset password.
4. HR terminated: escalation, không thay đổi LMS.
5. Thiếu định danh, không có HR/LMS record, action lỗi hoặc system-wide issue:
   tạo kết quả manual review.

Kết quả test sẽ được ghi tại [automation-test-log.md](automation-test-log.md).

## Blocker tích hợp thật

Cần có đặc tả Odoo, HR, LMS và email: endpoint/method, authentication,
payload/field mapping, error behavior và trigger (webhook hoặc scheduled check).
Các thông tin này chưa có, nên hiện tại không định nghĩa API thật hoặc environment
variable.
