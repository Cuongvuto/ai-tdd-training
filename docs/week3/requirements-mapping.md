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
| `SearchResult` concept | The provisional mock-phase result contains a full `Document` and `matchType`. Executable evidence covers title, content, and tag matches. | **PARTIAL** |
| `KBQuery` with query, filters, and `topK` | `SearchInput` contains `query` and `topK`. Filter shape and behavior remain deferred. | **PARTIAL** |
| `KBClient` supports search, list, retrieve, and add | The interface currently exposes asynchronous `search` only. `list`, `retrieve`, and `add` have not been introduced. | **PARTIAL** |
| In-memory `MockKBClient` with 2–3 documents | All three intended deterministic seed documents exist. Title, content, tag, insertion-order, and positive-`topK` search behavior are implemented; list, retrieve, and add remain absent. | **PARTIAL** |
| Search operation | Case-insensitive substring matching is implemented for title, content, and individual tags with title > content > tag precedence. Results preserve seed order and support positive-`topK` happy-path limiting. Filters, validation, and ranking remain absent. | **PARTIAL** |
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
| Mock client is independently testable | `tests/unit/mock-kb-client-search.test.ts` independently verifies title, content, tag, insertion-order, and positive-`topK` search behavior. The remaining mock behaviors are not implemented. | **PARTIAL** |
| Error handling for missing or invalid data | No KB validation, not-found, file, configuration, or HTTP error behavior exists. | **NOT STARTED** |
| Continue the TDD and mock-first workflow | Cycle 1 records a structural failure; Cycle 2 has a valid behavioral RED; Cycle 3 lacks captured RED evidence; Cycle 4 records and corrects an invalid test expectation rather than misclassifying it as RED evidence. | **PARTIAL** |
| Architecture and setup/deployment documentation | Mentor architecture and project decision/evidence documents exist. Configuration, HTTP setup, and deployment documentation remain incomplete. | **PARTIAL** |

## Current search implementation

`MockKBClient.search()` currently has executable evidence for:

- [x] Title substring matching
- [x] Case-insensitive title matching
- [x] Content substring matching
- [x] Case-insensitive content matching
- [x] Tag substring matching
- [x] Case-insensitive tag matching
- [x] `matchType: 'title'` for title matches
- [x] `matchType: 'content'` for content-only matches
- [x] `matchType: 'tag'` for tag-only matches
- [x] Title over content over tag precedence
- [x] Deterministic seed/insertion order
- [x] Positive-`topK` happy-path result limiting
- [ ] Blank-query validation
- [ ] Zero-`topK` validation
- [ ] Negative-`topK` validation
- [ ] Non-integer-`topK` validation
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

### Cycle 3 — Case-insensitive tag search

Approved behavior:

- Match a case-insensitive substring in an individual document tag.
- Return a tag-only match with `matchType: 'tag'`.
- Preserve title, then content, then tag precedence.

**Evidence classification: IMPLEMENTATION / BEHAVIOR VALIDATION WITHOUT
CAPTURED BEHAVIORAL RED**

No verified pre-implementation failing run is available. The later failure of
the Cycle 1 full-object assertion was caused by its stale expected tag array
after `support` was added to the seed. It was not a behavioral RED. Correcting
the expected fixture restored all three search tests without changing search
behavior.

Focused validation after the correction:

```text
Test Files  1 passed (1)
Tests       3 passed (3)
Duration    589ms
Exit code   0
```

Cycle 3 did not introduce `topK`, validation, filters, scoring/ranking, list,
retrieve, add, KB commands, HTTP behavior, or environment configuration.

### Cycle 4 — Deterministic ordering and topK limiting

Approved behavior:

- Preserve deterministic seed/insertion order.
- Return at most `topK` matching documents.

The focused example uses query `template`, which matches `doc-001` followed by
`doc-002`, with `topK = 1`. The expected result is `doc-001` only.

The first test version used `topK = 5` while expecting one result. Two
documents matched, so returning two was correct. This was classified as an
**INVALID TEST EXPECTATION / TEST DESIGN ERROR**, not as a behavioral RED. The
test was corrected to `topK = 1`, while production behavior remained
`results.slice(0, input.topK)`.

Focused GREEN:

```text
Test Files  1 passed (1)
Tests       4 passed (4)
Duration    707ms
Exit code   0
```

Cycle 4 proves positive-`topK` happy-path limiting only. It does not prove
blank-query, zero, negative, or non-integer validation and does not introduce
filters, ranking, list, retrieve, add, KB commands, HTTP behavior, or
environment switching.

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
| `MockKBClient` | **PARTIAL** | Three deterministic seed documents; title/content/tag search; insertion order; positive-`topK` limiting |
| Search | **PARTIAL** | Case-insensitive title/content/tag substring matching, precedence, deterministic order, and positive-`topK` limiting |
| List | **NOT STARTED** | None |
| Retrieve | **NOT STARTED** | None |
| Add | **NOT STARTED** | None |
| KB commands | **NOT STARTED** | None |
| `HTTPKBClient` | **BLOCKED** | Production HTTP contract unresolved |
| Environment switching | **BLOCKED** | Selection contract unresolved |
| Real API integration | **BLOCKED** | Contract, access, and live-test policy unresolved |

## Overall assessment

Week 3 is not complete. After Cycle 4, `MockKBClient` and the search
requirement remain **PARTIAL**. All unimplemented behavior remains explicitly
separated from completed, executable evidence.
