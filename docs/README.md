# Mục lục tài liệu W1–W5

Đọc README của từng tuần trước, sau đó đọc yêu cầu mentor, kết quả và evidence.
Các trang hướng dẫn này do dự án bổ sung; không sửa hoặc thay thế tài liệu mentor.

| Tuần | Nội dung | Bắt đầu |
| --- | --- | --- |
| W1 | Nghiên cứu TDD và phương pháp làm việc với AI | [README](week1/README.md) |
| W2 | Ticket Manager CLI | [README](week2/README.md) |
| W3 | Knowledge Base, pha mock-first | [README](week3/README.md) |
| W4 | Xử lý ticket và giao tiếp trên Odoo | [README](week4/README.md) |
| W5 | Reporting, analysis và automation | [README](week-5/README.md) |

Giữ nguyên tên thư mục hiện có, bao gồm `week-5`, để tránh đổi đường dẫn của
tài liệu và evidence. [README gốc](../README.md) hướng dẫn chạy code và test.

## Liên kết thiếu trong tài liệu mentor

| Tài liệu | Đường dẫn đang được ghi | Hướng xử lý |
| --- | --- | --- |
| W2 `week2-assignment.md`, W3 `overview.md` | `../../../slides-ai-training.md` | Không có tài liệu này tại đường dẫn tham chiếu trong môi trường đã kiểm tra; cần mentor cung cấp hoặc xác nhận vị trí |
| W5 `tasks.md` | `../week-3/scenarios/scenario-01-login-issue.md` (hai chỗ) | Đường dẫn không tồn tại. Scenario Login Issue hiện có tại [W4 Scenario 1](week4/scenarios/scenario-01-login-issue.md); dùng làm tham chiếu local, không coi đây là sửa yêu cầu mentor |
| W5 `tasks.md` | `../../notes/2026-01-30/investigation-scenario-automation-analysis.md` | Chưa có file tại đường dẫn này; cần mentor cung cấp. Không mặc định báo cáo automation của dự án là tài liệu thay thế |

Các liên kết gốc trong tài liệu mentor được giữ nguyên để bảo toàn nguồn yêu cầu.

## Phân biệt dữ liệu

- `data/` ở gốc dự án: dữ liệu CLI chạy local, được Git bỏ qua.
- [week-5/data/](week-5/data/): dữ liệu và workbook phục vụ báo cáo; không bị bỏ
  qua toàn bộ. Kiểm tra dữ liệu cá nhân và file thực sự cần nộp trước khi stage.
- File khóa Excel dạng `~$*.xlsx` không phải báo cáo, được Git bỏ qua.
