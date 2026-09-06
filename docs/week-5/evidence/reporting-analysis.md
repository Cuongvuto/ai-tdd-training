# Báo cáo dữ liệu — Week 5

## Nguồn và phạm vi

- **Nguồn:** `docs/week-5/data/sample-clean.xlsx`, import vào Odoo Helpdesk.
- **Team:** `Week5 Train`.
- **Tổng số ticket:** 131.

## Kết quả Odoo

| Báo cáo | Kết quả chính | Bằng chứng |
| --- | --- | --- |
| Ticket summary | 131/131 ticket ở giai đoạn `Mới` | [01-odoo-ticket-summary.png](screenshots/01-odoo-ticket-summary.png) |
| Assignment distribution | 131/131 ticket chưa được phân công | [02-odoo-team-performance.png](screenshots/02-odoo-team-performance.png) |
| Category / Tags | 64 ticket (48,9%) chưa có tag; các tag nhiều nhất: `CRM` 25, `LMS` 20, `TMS` 9 | [03-odoo-category-analysis.png](screenshots/03-odoo-category-analysis.png) |
| Priority | High 42, Urgent 40, Low 40, Medium 9; High + Urgent: 82/131 (62,6%) | [04-odoo-priority.png](screenshots/04-odoo-priority.png) |

## Giới hạn dữ liệu

- Toàn bộ ticket được import cùng một đợt; không dùng `Created On` để kết luận
  xu hướng ticket lịch sử.
- Không có assignee gốc; không đánh giá được workload, hiệu suất hoặc thời gian
  xử lý theo agent.
- Tags không đủ làm nguồn phân tích duy nhất vì 64 ticket chưa có tag.

## Handoff

`pattern-analysis.md` sử dụng `Subject` làm nguồn chính để xác định recurring
issues; Tags chỉ dùng để đối chiếu.
