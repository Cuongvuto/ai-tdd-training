# Nhật ký kiểm thử Automation — Week 5

## Kết quả

```powershell
python scripts/week5/test_login_issue_automation.py
```

```text
Ran 10 tests
OK
```

## Nhánh đã kiểm tra

- Không phải Login Issue → `ignored`.
- HR `active` + LMS `Active` → `password_reset`.
- HR `active` + LMS `Deactivated` → `reactivated_and_reset`.
- HR `terminated`, thiếu email hoặc thiếu HR record → `needs_manual_review`.
- Thiếu LMS record, lỗi hệ thống diện rộng hoặc action LMS mô phỏng lỗi →
  `failed_manual_review`.
- Audit log có ticket ID và action; không chứa password.

## Phạm vi

Kiểm thử dùng fixtures local/mock. Không gửi email, không gọi Odoo, HR hoặc LMS
thật.
