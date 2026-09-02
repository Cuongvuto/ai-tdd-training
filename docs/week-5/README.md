# Week 5 — Reporting, Analysis & Automation

## Mục tiêu

Phân tích ticket, xác định vấn đề lặp lại và xây dựng automation local/mock cho
Scenario 1 — Login Issue / Account Reactivation.

## Nội dung chính

- Mentor requirements: [overview.md](overview.md),
  [architecture.md](architecture.md), [tasks.md](tasks.md).
- Báo cáo và evidence: thư mục [evidence](evidence/).
- Dữ liệu và workbook: thư mục [data](data/).
- Automation local/mock: `scripts/week5/`.

## Chạy automation test

Từ thư mục gốc project:

```powershell
python scripts/week5/test_login_issue_automation.py
```

## Trạng thái hiện tại

- Reporting, pattern analysis và automation local/mock đã có evidence.
- Tích hợp Odoo, HR, LMS và email thật chưa triển khai vì chưa có API contract.
