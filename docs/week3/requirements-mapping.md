# Week 3 Requirements Mapping

The mentor-provided `overview.md`, `architecture.md`, and `tasks.md` are the
authoritative requirement sources. This mapping reports only current evidence;
it does not project planned work as completed behavior.

Status meanings:

- **NOT STARTED** — no implementation or executable evidence exists.
- **PARTIAL** — one or more slices exist, but the requirement is incomplete.
- **COMPLETE** — the full mapped requirement has executable evidence.
- **BLOCKED** — progress requires missing external contract or access.

| Mentor requirement | Current implementation/evidence | Status |
| --- | --- | --- |
| Extend the Week 2 CLI with KB integration | Week 2 remains intact; no KB commands are registered yet | NOT STARTED |
| Five-field `Document` entity | `src/models/kb/document.ts` defines the specified fields | COMPLETE |
| `SearchResult` concept | Provisional full-document result and match-type union exist for the mock phase | PARTIAL |
| `KBQuery` with query, filters, and `topK` | Only a query-only Cycle 1 search input exists; filters and `topK` are absent | PARTIAL |
| `KBClient` supports search, list, retrieve, and add | The interface currently exposes asynchronous search only | PARTIAL |
| Simple in-memory `MockKBClient` with 2–3 documents | One deterministic document and title search exist; remaining seed documents and operations are absent | PARTIAL |
| Search operation | Case-insensitive title substring search is covered by one focused test; content, tag, `topK`, and validation remain absent | PARTIAL |
| List operation | No model, client behavior, command, or test exists | NOT STARTED |
| Retrieve operation | No model, client behavior, command, or test exists | NOT STARTED |
| Add operation | No model, client behavior, file handling, command, or test exists | NOT STARTED |
| `kb search` command | Not registered or tested | NOT STARTED |
| `kb list` command | Not registered or tested | NOT STARTED |
| `kb retrieve` command | Not registered or tested | NOT STARTED |
| `kb add` command | Not registered or tested | NOT STARTED |
| All four commands work end-to-end | No KB E2E tests exist | NOT STARTED |
| Mock and HTTP clients behave consistently | HTTP client is intentionally absent; only the first mock slice exists | BLOCKED |
| Mock/HTTP selection through environment configuration | Environment contract and HTTP client are deferred | BLOCKED |
| HTTP client for all four operations | Real API base URL, authentication, and three response schemas are incomplete | BLOCKED |
| Real KB API integration tested | Real API contract/access and safe add-test policy are unavailable | BLOCKED |
| Real API integration documented | Cannot be completed before the production contract is available | BLOCKED |
| Mock client independently testable | One focused mock title-search test exists | PARTIAL |
| Error handling for missing/invalid data | No KB validation, not-found, file, or HTTP error behavior exists | NOT STARTED |
| Continue TDD and mock-first workflow | Cycle 1 evidence is recorded, including correction of its structural-failure classification | PARTIAL |
| Architecture and setup/deployment documentation | Mentor architecture exists; project decisions/evidence now exist; implementation/setup guide is incomplete | PARTIAL |

## Current acceptance-criteria status

| Acceptance criterion | Status | Reason |
| --- | --- | --- |
| CLI can query the external Knowledge Base API | BLOCKED | No HTTP client or complete real API contract |
| Mock and HTTP clients work and are environment-swappable | BLOCKED | Mock is partial; HTTP/configuration are deferred |
| Search, list, retrieve, and add work end-to-end | NOT STARTED | No KB commands or E2E coverage |
| Real KB integration is tested and documented | BLOCKED | Real API contract/access remain incomplete |

Week 3 is not complete. `MockKBClient` remains **PARTIAL**.
