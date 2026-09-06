# Hướng dẫn xử lý Login Issue / Account Reactivation

## Phạm vi

Áp dụng cho ticket một người dùng không đăng nhập được LMS. Không áp dụng khi có
dấu hiệu nhiều người dùng hoặc lỗi hệ thống diện rộng.

## Quy trình

1. Kiểm tra ticket có email người yêu cầu và mô tả lỗi đăng nhập.
2. Đối chiếu email với HR.
3. Nếu HR `terminated`: ghi internal note, không thay đổi LMS, chuyển manual
   review.
4. Nếu HR `active`, kiểm tra LMS:
   - `Active` → reset password.
   - `Deactivated` → reactivate, rồi reset password.
5. Nếu thiếu record, trạng thái không rõ, action lỗi hoặc lỗi diện rộng: ghi
   internal note và escalation.
6. Gửi phản hồi cho user, yêu cầu thử đăng nhập lại; chỉ đóng ticket sau khi có
   xác nhận.

## Khi ghi nhận ticket

- Ghi ticket ID, email đã đối chiếu, trạng thái HR/LMS, quyết định và action.
- Không ghi password vào ticket, log hoặc tài liệu.
- Với lỗi diện rộng, không tự reset/reactivate hàng loạt; chuyển escalation.
