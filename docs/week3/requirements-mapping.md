# Week 3 Requirements Mapping

The mentor-provided [`overview.md`](./overview.md),
[`architecture.md`](./architecture.md), and [`tasks.md`](./tasks.md) are the
authoritative requirement sources. This document maps those requirements to
the current implementation and executable evidence. Planned work is not
reported as completed behavior.

## Status definitions

- **NOT STARTED** — No implementation or executable evidence exists.
- **PARTIAL** — One or more approved slices exist, but the requirement is not
  complete.
- **COMPLETE** — The full mapped requirement has executable evidence.
- **BLOCKED** — Completion requires an unresolved external contract, access,
  or policy decision.

## Requirement mapping

| Mentor requirement | Current implementation and evidence | Status |
| --- | --- | --- |
| Extend the Week 2 CLI with KB integration | Week 2 behavior remains intact, but no KB commands are registered. | **NOT STARTED** |
| Five-field `Document` entity | `src/models/kb/document.ts` defines `id`, `title`, `content`, `nodePath`, and `tags`. | **COMPLETE** |
| `SearchResult` concept | The provisional mock-phase result contains a full `Document` and `matchType`. Executable evidence currently covers title and content matches. | **PARTIAL** |
| `KBQuery` with query, filters, and `topK` | The current `SearchInput` contains only `query`. Filters and `topK` are intentionally deferred to later TDD cycles. | **PARTIAL** |
| `KBClient` supports search, list, retrieve, and add | The interface currently exposes asynchronous `search` only. `list`, `retrieve`, and `add` have not been introduced. | **PARTIAL** |
| In-memory `MockKBClient` with 2–3 documents | One deterministic document and two search behaviors exist. The complete fixture and remaining operations are not implemented. | **PARTIAL** |
| Search operation | Case-insensitive substring matching is implemented for title and content. Tag matching, `topK`, filters, and validation remain absent. | **PARTIAL** |
| List operation | No model, client behavior, command, or test exists. | **NOT STARTED** |
| Retrieve operation | No model, client behavior, command, or test exists. | **NOT STARTED** |
| Add operation | No model, client behavior, file handling, command, or test exists. | **NOT STARTED** |
| `kb search` command | The command is not registered or tested. | **NOT STARTED** |
| `kb list` command | The command is not registered or tested. | **NOT STARTED** |
| `kb retrieve` command | The command is not registered or tested. | **NOT STARTED** |
| `kb add` command | The command is not registered or tested. | **NOT STARTED** |
| All four commands work end-to-end | No KB end-to-end tests exist. | **NOT STARTED** |
| Mock and HTTP clients behave consistently | Executable behavior exists only for the partial `MockKBClient`; the HTTP client is deferred. | **BLOCKED** |
| Client selection through environment configuration | The environment contract and HTTP client remain unresolved until the real API contract is available. | **BLOCKED** |
| HTTP client supports all four operations | The real base URL, authentication, response schemas, and error behavior remain unresolved. | **BLOCKED** |
| Real KB API integration is tested | API access and a safe policy for testing the mutating add operation are unavailable. | **BLOCKED** |
| Real API integration is documented | Accurate integration documentation requires the production API contract and access. | **BLOCKED** |
| Mock client is independently testable | `tests/unit/mock-kb-client-search.test.ts` independently verifies title and content search behavior. The remaining mock behaviors are not implemented. | **PARTIAL** |
| Error handling for missing or invalid data | No KB validation, not-found, file, configuration, or HTTP error behavior exists. | **NOT STARTED** |
| Continue the TDD and mock-first workflow | Cycle 1 records its structural failure accurately. Cycle 2 records a valid behavioral RED followed by the minimum GREEN for content search. | **PARTIAL** |
| Architecture and setup/deployment documentation | Mentor architecture and project decision/evidence documents exist. Configuration, HTTP setup, and deployment documentation remain incomplete. | **PARTIAL** |

## Current search implementation

`MockKBClient.search()` currently has executable evidence for:

- [x] Title substring matching
- [x] Case-insensitive title matching
- [x] Content substring matching
- [x] Case-insensitive content matching
- [x] `matchType: 'title'` for title matches
- [x] `matchType: 'content'` for content-only matches
- [x] Title precedence over content matching
- [ ] Tag matching
- [ ] `topK`
- [ ] Blank-query validation
- [ ] Invalid-`topK` validation
- [ ] `KBQuery.filters`
- [ ] Search scoring or ranking

The overall search requirement remains **PARTIAL**.

## TDD evidence

### Cycle 1 — Seeded title search

Approved behavior:

- Search the seeded document by a case-insensitive title substring.
- Return the matching document with `matchType: 'title'`.

Initial observed result:

```text
Test Files  1 failed (1)
Tests       no tests
Exit code   1

Error: Cannot find module '../../src/clients/mock-kb-client.js'
```

**RED classification: STRUCTURAL / SETUP FAILURE**

The test body did not execute, so this was not accepted as a behavioral RED.
After the minimum implementation, the focused title-search test passed:

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Exit code   0
```

### Cycle 2 — Case-insensitive content search

Approved behavior:

- Match a case-insensitive substring in document content.
- Return a content-only match with `matchType: 'content'`.
- Preserve title precedence.

Initial observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 1 passed (2)
Exit code   1

AssertionError: expected [] to have a length of 1 but got 0
```

**RED classification: VALID BEHAVIORAL RED**

The existing title-search test remained green, while the new test failed
specifically because content matching did not exist. The minimum GREEN added
case-insensitive content matching and preserved title precedence.

Focused GREEN result:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Exit code   0
```

Full regression after Cycle 2:

```text
Test Files  11 passed (11)
Tests       42 passed (42)
Exit code   0
```

Cycle 2 did not introduce tag matching, `topK`, validation, list, retrieve,
add, KB commands, HTTP behavior, or environment configuration.

## Acceptance criteria status

| Acceptance criterion | Status | Current evidence or blocker |
| --- | --- | --- |
| CLI can query the external Knowledge Base API | **BLOCKED** | No `HTTPKBClient` exists, and the production API contract is incomplete. |
| Mock and HTTP clients work and are environment-swappable | **BLOCKED** | The mock implementation is partial; the HTTP and environment contracts are deferred. |
| Search, list, retrieve, and add work end-to-end | **NOT STARTED** | No KB commands or KB end-to-end coverage exists. |
| Real KB integration is tested and documented | **BLOCKED** | The real API contract, access, and safe live-test policy are unresolved. |

## Implementation summary

| Area | Status | Implemented slice |
| --- | --- | --- |
| `Document` model | **COMPLETE** | Five mentor-specified fields |
| `KBClient` contract | **PARTIAL** | Asynchronous `search` only |
| `MockKBClient` | **PARTIAL** | Title and content search against one seeded document |
| Search | **PARTIAL** | Case-insensitive title/content substring matching with title precedence |
| List | **NOT STARTED** | None |
| Retrieve | **NOT STARTED** | None |
| Add | **NOT STARTED** | None |
| KB commands | **NOT STARTED** | None |
| `HTTPKBClient` | **BLOCKED** | Production HTTP contract unresolved |
| Environment switching | **BLOCKED** | Selection contract unresolved |
| Real API integration | **BLOCKED** | Contract, access, and live-test policy unresolved |

## Overall assessment

Week 3 is not complete. After Cycle 2, `MockKBClient` and the search
requirement remain **PARTIAL**. All unimplemented behavior remains explicitly
separated from completed, executable evidence.
