# Week 2 — Ticket Manager CLI

## Thứ tự đọc

1. [Đề bài mentor](week2-assignment.md): yêu cầu gốc.
2. [Implementation plan](implementation-plan.md) và [decisions](decisions.md):
   kế hoạch, kiến trúc và quyết định kỹ thuật.
3. [Requirements mapping](requirements-mapping.md): yêu cầu → code/test.
4. [Final validation](final-validation.md): kết quả bàn giao W2.
5. [TDD cycle log](tdd-cycle-log.md), [AI workflow evidence](ai-workflow-evidence.md):
   lịch sử kiểm thử và kiểm soát AI.

## Code và kiểm thử

- CLI: [src/cli.ts](../../src/cli.ts), các lớp trong [src](../../src/).
- Test: [unit](../../tests/unit/), [integration](../../tests/integration/),
  [e2e](../../tests/e2e/). Các thư mục hiện chứa cả phần mở rộng W3.
- Bốn lệnh W2: `create`, `list`, `show`, `update`.
- Cách chạy và quy tắc dữ liệu: [README gốc](../../README.md).

Evidence W2 ghi nhận 10 test files / 40 tests PASS tại thời điểm bàn giao,
không phải tổng số test hiện tại sau W3. Các vấn đề còn hoãn được ghi trong
`final-validation.md`.

Liên kết slides trong đề bài chưa có ở đường dẫn tham chiếu; xem
[ghi chú tài liệu thiếu](../README.md#liên-kết-thiếu-trong-tài-liệu-mentor).
