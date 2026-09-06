# Week 3 — Knowledge Base Integration

## Thứ tự đọc

1. Yêu cầu mentor: [overview](overview.md), [architecture](architecture.md),
   [tasks](tasks.md). Đọc cả ba trước khi quyết định triển khai.
2. [Decisions](decisions.md): phân biệt yêu cầu mentor, quyết định mock đã duyệt
   và phần chờ hợp đồng HTTP.
3. [Requirements mapping](requirements-mapping.md): trạng thái hiện tại và phạm vi còn thiếu.
4. [TDD cycle log](tdd-cycle-log.md), [AI workflow evidence](ai-workflow-evidence.md):
   evidence từng cycle và quá trình kiểm soát AI.

## Kết quả và giới hạn

- Đã có `KBClient`, `MockKBClient` và bốn lệnh `kb search/list/retrieve/add`.
- Cycle 14 kết thúc pha local/mock; dữ liệu mock chỉ tồn tại trong từng tiến trình.
- HTTP client, chuyển môi trường và tích hợp API thật vẫn bị chặn/chờ hợp đồng.
  Không đánh dấu toàn bộ W3 hoàn thành.
- Code: [clients](../../src/clients/), [KB commands](../../src/commands/kb/).
- Kiểm thử CLI mock: [cli-kb.test.ts](../../tests/e2e/cli-kb.test.ts).
- Lệnh chạy: [README gốc](../../README.md).

Liên kết slides trong overview chưa có ở đường dẫn tham chiếu; xem
[ghi chú tài liệu thiếu](../README.md#liên-kết-thiếu-trong-tài-liệu-mentor).
