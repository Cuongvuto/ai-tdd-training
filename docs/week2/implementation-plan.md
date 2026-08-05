# Phân tích kế hoạch Week 2

Week 2 khác hẳn Week 1:

* **Week 1:** nghiên cứu TDD, kiểm tra thông tin AI, xây dựng chiến lược.
* **Week 2:** bắt đầu viết Ticket Manager CLI thật, chạy test thật và tạo bằng chứng Red–Green–Refactor thật.

Mục tiêu chính là xây CLI quản lý ticket bằng TDD, đồng thời tiếp tục sử dụng AI với guardrails và validation đã học từ Week 1. Kiến trúc được yêu cầu tách đơn giản thành command, service, model và JSON storage. 

---

# 1. Phạm vi chức năng bắt buộc

CLI phải hỗ trợ bốn nhóm lệnh:

```text
tickets create
tickets list
tickets show <id>
tickets update <id>
```

Ticket cần có:

```text
title
description
status
priority
tags
```

Danh sách ticket có bộ lọc theo:

```text
status
priority
tags
```

Dữ liệu được lưu cục bộ trong file JSON. 

Ngoài happy path, bài còn yêu cầu kiểm thử:

* input không hợp lệ;
* ticket không tồn tại;
* file JSON bị thiếu;
* file JSON bị hỏng;
* logic ticket;
* JSON persistence;
* CLI command behavior;
* hướng dẫn cài đặt, cấu hình và sử dụng. 

---

# 2. Vấn đề cần giải quyết trước khi code

Week 2 đã xác nhận rằng `description`, `priority`, `tags`, filters và update status là tính năng bắt buộc. Tuy nhiên kế hoạch vẫn chưa định nghĩa chi tiết một số contract quan trọng.

Không nên viết test hoặc code cho các phần sau trước khi chốt:

| Quyết định        | Cần xác định                                       |
| ----------------- | -------------------------------------------------- |
| ID                | UUID, số tăng dần hay chuỗi khác?                  |
| Status            | Có những status nào?                               |
| Status transition | Có được đổi từ mọi status sang mọi status không?   |
| Priority          | `low/medium/high` hay dạng khác?                   |
| Title             | Độ dài tối thiểu/tối đa?                           |
| Description       | Bắt buộc hay tùy chọn?                             |
| Tags              | Nhập bằng dấu phẩy hay lặp `--tag`?                |
| Tag filter        | Match một tag hay tất cả tags?                     |
| Missing file      | Tạo file rỗng hay báo lỗi?                         |
| Corrupted JSON    | Báo lỗi, backup hay reset?                         |
| Output            | Text thông thường hay JSON?                        |
| Exit codes        | Thành công, validation error, not found là mã nào? |
| Storage path      | Mặc định ở đâu và có cấu hình được không?          |

Đây nên là **Phase 0 – Requirements Lock**. Không cần chốt toàn bộ hệ thống, nhưng phải chốt đủ contract cho behavior sắp implement.

---

# 3. Stack kỹ thuật đề xuất

Đề bài không bắt buộc ngôn ngữ hoặc framework. Với hướng học hiện tại của bạn, tôi đề xuất:

```text
Node.js
TypeScript
Vitest
Commander.js
JSON file storage
```

## Vai trò

| Công nghệ             | Tác dụng                           |
| --------------------- | ---------------------------------- |
| Node.js               | Chạy CLI và thao tác file          |
| TypeScript            | Kiểm soát model và interface       |
| Vitest                | Unit, integration và process tests |
| Commander.js          | Parse command và options           |
| `fs/promises`         | Đọc/ghi JSON                       |
| `child_process.spawn` | Chạy CLI như người dùng thật       |

Không nên thêm database, dependency injection framework hoặc ORM trong Week 2. Mục tiêu là luyện TDD và phân tách layer đơn giản, không phải xây architecture lớn.

---

# 4. Cấu trúc repository đề xuất

```text
ai-tdd-training/
├── README.md
├── package.json
├── tsconfig.json
├── vitest.config.ts
│
├── src/
│   ├── cli.ts
│   │
│   ├── commands/
│   │   ├── create-command.ts
│   │   ├── list-command.ts
│   │   ├── show-command.ts
│   │   └── update-command.ts
│   │
│   ├── services/
│   │   └── ticket-service.ts
│   │
│   ├── models/
│   │   ├── ticket.ts
│   │   └── ticket-input.ts
│   │
│   ├── repositories/
│   │   ├── ticket-repository.ts
│   │   └── json-ticket-repository.ts
│   │
│   ├── errors/
│   │   ├── validation-error.ts
│   │   ├── ticket-not-found-error.ts
│   │   └── storage-error.ts
│   │
│   └── config/
│       └── storage-path.ts
│
├── tests/
│   ├── unit/
│   │   ├── ticket-service-create.test.ts
│   │   ├── ticket-service-list.test.ts
│   │   ├── ticket-service-show.test.ts
│   │   └── ticket-service-update.test.ts
│   │
│   ├── integration/
│   │   ├── json-ticket-repository.test.ts
│   │   └── corrupted-storage.test.ts
│   │
│   └── e2e/
│       ├── create-ticket.test.ts
│       ├── list-tickets.test.ts
│       ├── show-ticket.test.ts
│       └── update-ticket.test.ts
│
└── docs/
    ├── week1/
    └── week2/
        ├── requirements.md
        ├── tdd-cycle-log.md
        ├── ai-usage-log.md
        ├── test-strategy.md
        ├── test-results.md
        └── decisions.md
```

---

# 5. Trách nhiệm của từng layer

## `models/`

Chứa cấu trúc dữ liệu và type.

Ví dụ:

```ts
type TicketStatus = 'open' | 'in-progress' | 'closed';
type TicketPriority = 'low' | 'medium' | 'high';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

Model không nên:

* đọc file;
* in ra terminal;
* parse CLI arguments.

---

## `services/`

Chứa business logic:

* trim title;
* reject blank title;
* validate status;
* validate priority;
* tạo ticket;
* tìm ticket;
* lọc ticket;
* cập nhật trạng thái;
* gọi repository.

Service không nên phụ thuộc trực tiếp vào Commander hoặc `process.argv`.

---

## `repositories/`

Chứa logic persistence.

`ticket-repository.ts` là contract:

```ts
interface TicketRepository {
  findAll(): Promise<Ticket[]>;
  findById(id: string): Promise<Ticket | null>;
  save(ticket: Ticket): Promise<void>;
  update(ticket: Ticket): Promise<void>;
}
```

`json-ticket-repository.ts` triển khai bằng file JSON.

Layer này chịu trách nhiệm:

* đọc JSON;
* parse dữ liệu;
* ghi file;
* xử lý missing file;
* phát hiện corrupted JSON;
* tránh để service biết chi tiết file system.

---

## `commands/`

Chứa phần kết nối giữa CLI và service:

```text
CLI arguments
→ command handler
→ ticket service
→ repository
```

Command handler chịu trách nhiệm:

* nhận option;
* gọi service;
* format output;
* chuyển lỗi thành stderr và exit code.

Không nên nhét business validation vào command handler.

---

## `cli.ts`

Đây là entry point:

```bash
node dist/cli.js tickets create ...
```

Nó đăng ký các command, options và dependencies.

---

# 6. Phân chia test

## Unit tests

Kiểm tra logic mà không dùng file thật:

* trim title;
* reject blank title;
* default status;
* validate priority;
* normalize tags;
* filtering;
* update status;
* not-found behavior ở service.

Unit tests nên dùng repository fake hoặc stub.

Unit test không chứng minh JSON persistence hoạt động.

---

## Integration tests

Dùng thư mục tạm và file JSON thật để kiểm tra:

* ghi ticket xuống JSON;
* đọc lại ticket;
* giữ đúng field;
* missing file;
* corrupted JSON;
* overwrite/update;
* storage path isolation.

Mỗi test dùng một temporary directory riêng.

Không dùng file thật của người dùng.

---

## Process-level E2E tests

Dùng `spawn` để chạy CLI thật:

```text
node dist/cli.js tickets create ...
```

Kiểm tra:

* arguments được parse đúng;
* command wiring hoạt động;
* stdout đúng;
* stderr đúng;
* exit code đúng;
* file JSON thật được tạo;
* nhiều command nối tiếp nhau hoạt động.

Chỉ cần một số journey quan trọng, không lặp toàn bộ unit-test matrix.

---

# 7. Kế hoạch TDD theo từng giai đoạn

## Phase 0 – Chốt requirements và setup

### Công việc

* chốt ID format;
* status vocabulary;
* priority vocabulary;
* tag syntax;
* missing/corrupted file policy;
* storage path;
* output và exit-code contract;
* tạo package TypeScript;
* cài test framework;
* tạo folder structure;
* tạo tài liệu `docs/week2/requirements.md`.

### Kết quả mong đợi

Chưa implement command nào.

Chỉ có:

* project chạy được;
* test runner chạy được;
* requirements đủ rõ cho cycle đầu tiên.

---

## Cycle 1 – Tạo ticket với title tối thiểu

### Behavior đầu tiên

```text
Title hợp lệ được trim.
Blank title bị reject.
Ticket mới có status open.
```

Đây là ba behavior đã có bằng chứng từ Week 1.

### Red

Viết test:

```text
createTicket("  Fix login  ")
→ title = "Fix login"
→ status = "open"
```

và:

```text
createTicket("   ")
→ ValidationError
```

Chạy test và lưu output fail.

### Green

Viết phần implementation nhỏ nhất trong `ticket-service.ts`.

### Refactor

* tách hàm `normalizeTitle`;
* giữ test xanh;
* không thêm priority, tags hay JSON storage trong cycle này.

---

## Cycle 2 – Description, priority và tags

### Red

Viết test cho:

* valid priority;
* invalid priority;
* tags được normalize;
* duplicate tags;
* empty tags;
* description requirement.

### Green

Thêm đúng logic cần thiết.

### Refactor

Tách:

```text
validatePriority
normalizeTags
normalizeDescription
```

Không thêm file storage trong cycle này.

---

## Cycle 3 – JSON repository

### Red

Dùng temporary directory:

* save một ticket;
* đọc file độc lập;
* xác nhận JSON thực;
* đọc lại ticket.

### Green

Implement `JsonTicketRepository`.

### Refactor

Tách:

* `readTickets`;
* `writeTickets`;
* error conversion.

Đây là lúc mới được tuyên bố real JSON persistence đã có evidence.

---

## Cycle 4 – `tickets create`

### Red

Process-level test:

```bash
tickets create \
  --title "Fix login" \
  --description "Handle invalid token" \
  --priority high \
  --tags auth,bug
```

Kiểm tra:

* exit code;
* stdout;
* JSON file;
* các field của ticket.

### Green

Nối:

```text
Commander
→ create command
→ ticket service
→ JSON repository
```

### Refactor

Tách output formatter và dependency wiring.

---

## Cycle 5 – `tickets list`

### Red

Viết test cho:

* storage rỗng;
* nhiều ticket;
* output list;
* thứ tự hiển thị.

### Green

Implement list ở service và command.

### Refactor

Tách formatter, tránh business logic trong command.

---

## Cycle 6 – Filters

Triển khai từng filter riêng:

1. status;
2. priority;
3. tags;
4. combined filters.

Mỗi filter là một Red–Green–Refactor nhỏ.

Không triển khai cả ba trong một test lớn.

Cần chốt trước semantics của tag:

```text
--tag bug
```

là ticket chứa tag `bug`, hay tất cả tag được truyền phải match.

---

## Cycle 7 – `tickets show <id>`

### Red

* ID tồn tại;
* ID không tồn tại;
* invalid ID;
* đúng stdout/stderr;
* đúng exit code.

### Green

Implement `findById` và show command.

### Refactor

Dùng chung error mapping thay vì xử lý riêng trong từng command.

---

## Cycle 8 – `tickets update <id>`

Theo đề bài, update tập trung vào status.

### Red

* update status hợp lệ;
* status không hợp lệ;
* ticket không tồn tại;
* persistence sau update;
* `updatedAt` thay đổi nếu contract có yêu cầu.

### Green

Implement service và repository update.

### Refactor

Tách status validation và transition rule.

---

## Cycle 9 – Storage error cases

Tạo test riêng cho:

### Missing JSON file

Cần thực thi policy đã chốt, ví dụ:

```text
missing file → xem như empty ticket store
```

hoặc:

```text
missing file → storage error
```

### Corrupted JSON

Phải:

* không crash với stack trace khó hiểu;
* báo lỗi rõ ràng;
* không tự xóa dữ liệu trừ khi requirement cho phép;
* trả exit code phù hợp.

### Permission/write failure

Không nằm trực tiếp trong acceptance criteria nhưng nên có ít nhất một test nếu thực hiện được ổn định.

---

## Cycle 10 – Documentation và final verification

Hoàn thành:

* installation;
* build;
* test;
* configuration;
* storage path;
* create/list/show/update usage;
* filter examples;
* error examples;
* kiến trúc;
* test strategy;
* AI guardrails;
* known limitations.

Acceptance criteria yêu cầu hướng dẫn cài đặt, cấu hình và sử dụng phải được document. 

---

# 8. TDD cycle log cần ghi gì?

Tạo:

```text
docs/week2/tdd-cycle-log.md
```

Mỗi cycle nên có mẫu:

````markdown
## Cycle W2-C01 — Create ticket title validation

### Requirement

A valid title is trimmed.
A blank title is rejected.

### Red

Test added:
`tests/unit/ticket-service-create.test.ts`

Command:

```bash
npm test -- ticket-service-create
````

Observed result:

```text
FAIL ...
Expected ...
Received ...
```

Red reason:

The required behavior is not implemented.

### Green

Implementation changed:

* `src/services/ticket-service.ts`

Observed result:

```text
PASS ...
```

### Refactor

Refactor:

* extracted `normalizeTitle`
* behavior unchanged

Regression result:

```text
All tests passed
```

### Human review

* test matches requirement: accepted
* unnecessary behavior introduced: no
* AI suggestion accepted/rejected: ...

````

Điều này chứng minh TDD thật, không chỉ nói “em đã dùng TDD”.

---

# 9. Guardrails khi dùng AI trong Week 2

## Quy tắc 1 – Một prompt chỉ làm một cycle

Không yêu cầu:

> “Hãy viết toàn bộ Ticket Manager CLI và tất cả test.”

Nên yêu cầu:

> “Chỉ viết failing unit tests cho title trimming và blank-title rejection. Không viết implementation.”

---

## Quy tắc 2 – Test phải được review trước Green

Luồng:

```text
AI đề xuất test
→ bạn kiểm tra requirement
→ chạy test và quan sát Red
→ mới cho phép implement
````

Không để AI sinh test và implementation cùng một lần rồi gọi đó là TDD.

---

## Quy tắc 3 – Prompt phải có allowed files

Ví dụ:

```text
Allowed:
tests/unit/ticket-service-create.test.ts

Do not modify:
src/
package.json
other tests
```

Ở bước Green:

```text
Allowed:
src/services/ticket-service.ts

Do not modify:
tests/
```

---

## Quy tắc 4 – Không báo pass nếu chưa chạy

Mọi báo cáo phải ghi rõ:

```text
Executed
Not executed
Passed
Failed
```

Không dùng:

> “Tests should pass.”

làm bằng chứng.

---

## Quy tắc 5 – Review test và implementation riêng

Kiểm tra test:

* có đúng requirement không;
* assertion có đủ mạnh không;
* có test failure path không;
* có phụ thuộc implementation detail không.

Kiểm tra code:

* có thêm behavior ngoài requirement không;
* có xử lý lỗi quá rộng không;
* có làm hỏng layer boundary không;
* có unnecessary abstraction không.

---

# 10. Tài liệu Week 2 nên tạo

```text
docs/week2/
├── requirements.md
├── decisions.md
├── test-strategy.md
├── tdd-cycle-log.md
├── ai-usage-log.md
├── test-results.md
└── final-review.md
```

## `requirements.md`

Chứa behavior contract đã chốt.

## `decisions.md`

Chứa quyết định như:

* ID;
* status;
* priority;
* tag matching;
* missing file;
* corrupted file;
* output;
* exit codes.

## `test-strategy.md`

Giải thích:

* unit test cái gì;
* integration test cái gì;
* E2E test cái gì;
* điều mỗi level không chứng minh được.

## `tdd-cycle-log.md`

Bằng chứng Red–Green–Refactor.

## `ai-usage-log.md`

Ghi:

* prompt;
* AI đề xuất gì;
* accepted/rejected;
* human modification;
* file scope.

## `test-results.md`

Ghi command và kết quả thực tế:

```bash
npm test
npm run test:unit
npm run test:integration
npm run test:e2e
```

## `final-review.md`

Audit acceptance criteria cuối tuần.

---

# 11. Git plan

Tạo branch riêng:

```bash
git checkout main
git pull origin main
git checkout -b feat/week2-ticket-manager-cli
```

Commit theo từng behavior, không commit một lần toàn bộ project.

Ví dụ:

```text
test: add failing title validation tests
feat: implement ticket title validation
refactor: extract title normalization

test: add JSON repository integration tests
feat: implement JSON ticket repository

test: add create command process test
feat: implement tickets create command
```

Điều này làm Git history thể hiện đúng quá trình TDD.

---

# 12. Thứ tự triển khai tổng quát

```text
Phase 0
Requirements + project setup

Cycle 1
Title validation + initial open status

Cycle 2
Description + priority + tags

Cycle 3
JSON repository

Cycle 4
tickets create

Cycle 5
tickets list

Cycle 6
list filters

Cycle 7
tickets show <id>

Cycle 8
tickets update <id>

Cycle 9
Missing/corrupt storage and errors

Cycle 10
Documentation + final acceptance audit
```

---

# 13. Definition of Done cho Week 2

Week 2 chỉ được coi là hoàn thành khi:

* bốn CLI command thực sự chạy;
* unit tests cover logic và validation;
* integration tests sử dụng JSON file thật;
* có process-level evidence cho public CLI;
* invalid input được test;
* ticket-not-found được test;
* missing JSON file được test;
* corrupted JSON file được test;
* có ít nhất nhiều cycle Red–Green–Refactor được ghi lại bằng output thực;
* AI usage có prompt và human evaluation;
* README có installation/configuration/usage;
* không claim coverage, portability hoặc reliability nếu chưa đo;
* toàn bộ acceptance criteria được mapping đến file và test cụ thể.

---

# 14. Kế hoạch thực hiện hợp lý theo ngày

## Ngày 1

* chốt requirements;
* chọn stack;
* setup TypeScript/Vitest;
* tạo folder;
* Cycle 1: title validation.

## Ngày 2

* description, priority, tags;
* JSON repository;
* missing file policy.

## Ngày 3

* `tickets create`;
* `tickets list`;
* basic process-level tests.

## Ngày 4

* filters;
* `tickets show`;
* not-found handling.

## Ngày 5

* `tickets update`;
* corrupted JSON;
* regression review.

## Ngày 6

* README;
* test results;
* AI usage evidence;
* refactor có kiểm soát.

## Ngày 7

* full acceptance audit;
* clean Git history;
* prepare mentor explanation.

---

# Kết luận

Kế hoạch Week 2 nên bắt đầu bằng **requirements lock**, không bắt đầu bằng việc yêu cầu AI sinh toàn bộ source code.

Luồng đúng là:

```text
Chốt một behavior
→ viết test
→ chạy và quan sát Red
→ implement minimum Green
→ chạy lại
→ refactor
→ chạy regression
→ ghi bằng chứng
→ human review
```

Điểm quan trọng nhất của Week 2 là biến những gì Week 1 mới chỉ nghiên cứu thành **execution evidence thực tế**: code thật, test thật, file JSON thật và kết quả chạy thật.
