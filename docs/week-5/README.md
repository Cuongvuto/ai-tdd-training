# Week 5 — Reporting, Analysis & Automation

## Mục tiêu

Phân tích ticket, xác định vấn đề lặp lại và xây dựng automation local/mock cho
Scenario 1 — Login Issue / Account Reactivation.

## Nội dung chính

- Mentor requirements: [overview.md](overview.md),
  [architecture.md](architecture.md), [tasks.md](tasks.md).
- Báo cáo và evidence: thư mục [evidence](evidence/).
- Dữ liệu và workbook: thư mục [data](data/).
- Automation local/mock: [scripts/week5](../../scripts/week5/).
- Fixtures ticket, HR, LMS: [scripts/fixtures](../../scripts/fixtures/).

## Thứ tự đọc kết quả

1. [Reporting analysis](evidence/reporting-analysis.md): số liệu và đối chiếu báo cáo.
2. [Pattern analysis](evidence/pattern-analysis.md): nhóm vấn đề lặp lại và ưu tiên.
3. [Automation design](evidence/automation-design.md): luồng xử lý và phạm vi mock.
4. [Automation test log](evidence/automation-test-log.md): evidence kiểm thử.
5. [Knowledge base](evidence/knowledge-base-login-issue.md): hướng dẫn xử lý Login Issue.
6. [Final summary](evidence/final-summary.md): tổng kết và phần còn thiếu.

Ảnh báo cáo nằm trong [screenshots](evidence/screenshots/). Trong dữ liệu,
`sample.xlsx` là bản gốc, `sample-clean.xlsx` là bản làm sạch và
`week5-reports.xlsx` là workbook báo cáo. Kiểm tra file dùng thực tế trước khi
cập nhật evidence; không coi mọi workbook local là bản nộp chính thức.

## Chạy automation test

Từ thư mục gốc project:

```powershell
python scripts/week5/test_login_issue_automation.py
```

## Trạng thái hiện tại

- Reporting, pattern analysis và automation local/mock đã có evidence.
- Tích hợp Odoo, HR, LMS và email thật chưa triển khai vì chưa có API contract.
- Lệnh test trên dùng `unittest` của Python, không chạy qua Vitest/npm và không
  gọi hệ thống thật. Kết quả PASS đã ghi là evidence lịch sử, cần chạy lại khi đổi code.
- `tasks.md` có liên kết Scenario 1 và investigation không tồn tại. Xem
  [ghi chú tài liệu thiếu](../README.md#liên-kết-thiếu-trong-tài-liệu-mentor);
  [Scenario 1 hiện có ở W4](../week4/scenarios/scenario-01-login-issue.md).
