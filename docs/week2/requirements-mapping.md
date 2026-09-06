# Week 2 Requirements Mapping

`week2-assignment.md` is the authoritative requirement source. This table maps
its Week 2 outcomes to the final implementation and executable evidence.

| Requirement | Implementation | Test/evidence | Status |
| --- | --- | --- | --- |
| Layered architecture | `src/cli.ts`, `src/commands/`, `src/services/ticket-service.ts`, `src/repositories/ticket-repository.ts`, `src/repositories/json-ticket-repository.ts` | Unit, repository integration, and CLI E2E suites | Met |
| Ticket models | `src/models/ticket.ts`, `create-ticket-input.ts`, `update-ticket-input.ts`, `ticket-filter.ts` | Typecheck plus service/repository tests | Met |
| Create: title, description, initial status, priority, tags | `createTicket()` and `registerCreateCommand()` | `tests/unit/ticket-service-create.test.ts`; `tests/e2e/cli-create.test.ts` | Met |
| Create validation and normalization | `ValidationError`, title/priority validation, description/priority/tag normalization in `createTicket()` | Create-service unit tests and invalid-input CLI E2E test | Met |
| List every ticket in repository order | `listTickets()` and `registerListCommand()` | `tests/unit/ticket-service-list.test.ts`; base list E2E test | Met |
| Filter by status and priority | `TicketFilter`; exact-match predicates in `listTickets()` | List-service unit tests and combined-filter E2E test | Met |
| Filter by tags | Every requested tag must be included; combined categories use AND semantics | List-service single/multiple/combined tag tests; list E2E test | Met |
| Show ticket details | `getTicketById()` and `registerShowCommand()` | `tests/unit/ticket-service-show.test.ts`; `tests/e2e/cli-show.test.ts` | Met |
| Update ticket status | `updateTicketStatus()` and `registerUpdateCommand()` | `tests/unit/ticket-service-update.test.ts`; `tests/e2e/cli-update.test.ts` | Met |
| Invalid user input | `ValidationError`; CLI prints `Invalid input` and sets exit code 1 | Create/update unit tests; `tests/e2e/cli-errors.test.ts` | Met |
| Missing ticket | `TicketNotFoundError`; CLI prints `Ticket not found` and sets exit code 1 | Show-service unit test; CLI error E2E test | Met |
| Missing JSON file | `findAll()` returns `[]` without creating storage | Repository integration test | Met |
| JSON persistence | `JsonTicketRepository` reads, appends, finds, and replaces tickets; writes create missing parents | `tests/integration/json-ticket-repository.test.ts` | Met |
| Corrupted JSON | Repository throws `StorageError` without changing the file; CLI prints `Storage error` | Repository integration and CLI error E2E tests | Met |
| Unit testing | Fake-repository service tests under `tests/unit/` | Four unit test files | Met |
| Integration testing | Real temporary filesystem tests for JSON storage | `tests/integration/json-ticket-repository.test.ts` | Met |
| End-to-end testing | Real `src/cli.ts` subprocesses through project-local `tsx` and `TICKETS_FILE` | Five files under `tests/e2e/` | Met |
| Red -> Green -> Refactor practice | Scoped cycle records, exact observed failures/results, and no-op reviews where appropriate | `docs/week2/tdd-cycle-log.md` | Met |
| Setup and usage documentation | Install, validation, development, packaged CLI, command, storage, and error examples | Root `README.md` | Met |
| Explain TDD and test types | Week 1 research plus Week 2 concrete test-layer documentation | `docs/week1/research.md`; root `README.md` | Met |
| Controlled AI use and validation | Human/AI responsibilities, counterexamples, and validation boundaries | `docs/week2/ai-workflow-evidence.md`; `docs/week1/ai-workflow-evidence.md` | Met |

Deferred engineering concerns are listed in `docs/week2/decisions.md` and
`docs/week2/final-validation.md`; they are not presented as completed Week 2
behavior.
