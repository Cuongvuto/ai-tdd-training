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
| Extend the Week 2 CLI with KB integration | Week 2 behavior remains intact. The actual CLI composes `MockKBClient`, exposes all four nested KB commands, and passes subprocess E2E; external HTTP integration remains absent. | **PARTIAL** |
| Five-field `Document` entity | `src/models/kb/document.ts` defines `id`, `title`, `content`, `nodePath`, and `tags`. | **COMPLETE** |
| `SearchResult` concept | The provisional mock-phase result contains a full `Document` and `matchType`. Executable evidence covers title, content, and tag matches. | **PARTIAL** |
| `KBQuery` with query, filters, and `topK` | `SearchInput` contains `query` and `topK`. Filter shape and behavior remain deferred. | **PARTIAL** |
| `KBClient` supports search, list, retrieve, and add | The interface exposes all four asynchronous typed operations with focused mock/command evidence. | **COMPLETE** |
| In-memory `MockKBClient` with 2–3 documents | Three deterministic per-instance seed documents support all approved search/list/retrieve/add behavior, including validation, errors, sequential IDs, and cross-operation visibility. | **COMPLETE** |
| Search operation | Approved mock matching/order/validation, CLI behavior, production mock composition, and subprocess E2E are implemented; filters, HTTP, and live coverage remain absent. | **PARTIAL** |
| List operation | Approved mock matching/order/limit/validation, CLI behavior, production mock composition, and subprocess E2E are implemented; HTTP and live coverage remain absent. | **PARTIAL** |
| Retrieve operation | Exact mock retrieval, concise not-found handling, production mock composition, and subprocess E2E are implemented; HTTP and live coverage remain absent. | **PARTIAL** |
| Add operation | Mock state behavior, UTF-8 file adapter, concise file-error handling, production mock composition, and subprocess E2E are implemented; HTTP and live coverage remain absent. | **PARTIAL** |
| `kb search` command | Required inputs, delegation/output, production mock composition, validation presentation, and subprocess E2E are covered; HTTP execution is absent. | **PARTIAL** |
| `kb list` command | Required inputs, delegation/output, production mock composition, validation presentation, and subprocess E2E are covered; HTTP execution is absent. | **PARTIAL** |
| `kb retrieve` command | Required ID, delegation/output, production mock composition, concise not-found handling, and subprocess E2E are covered; HTTP execution is absent. | **PARTIAL** |
| `kb add` command | Required options, file mapping, output/error behavior, production mock composition, and subprocess E2E are covered; HTTP execution is absent. | **PARTIAL** |
| All four commands work end-to-end | All four pass independent subprocess E2E against `MockKBClient`; real HTTP end-to-end coverage is blocked. | **PARTIAL** |
| Mock and HTTP clients behave consistently | The approved `MockKBClient` scope is complete; no comparison is possible because the HTTP contract/client is deferred. | **BLOCKED** |
| Client selection through environment configuration | The environment contract and HTTP client remain unresolved until the real API contract is available. | **BLOCKED** |
| HTTP client supports all four operations | The real base URL, authentication, response schemas, and error behavior remain unresolved. | **BLOCKED** |
| Real KB API integration is tested | API access and a safe policy for testing the mutating add operation are unavailable. | **BLOCKED** |
| Real API integration is documented | Accurate integration documentation requires the production API contract and access. | **BLOCKED** |
| Mock client is independently testable | Separate focused suites verify all four approved mock operations, including validation, not-found behavior, state visibility, and instance isolation. | **COMPLETE** |
| Error handling for missing or invalid data | Search/list validation and concise retrieve/add failures are covered through the real CLI; configuration and HTTP errors remain deferred. | **PARTIAL** |
| Continue the TDD and mock-first workflow | Cycle logs preserve setup/invalid-test classifications and record two reviewed behavioral RED groups for Cycle 14. Final HTTP delivery remains incomplete. | **PARTIAL** |
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
- [x] Blank-query validation (implemented by the normalized-empty guard)
- [x] Whitespace-only query validation (executable test)
- [x] Zero-`topK` validation (executable test)
- [x] Negative-`topK` validation (executable edge-case test)
- [x] Non-integer-`topK` validation (executable edge-case test)
- [ ] `KBQuery.filters`
- [ ] Search scoring or ranking

The overall search requirement remains **PARTIAL**.

## Current list implementation

`MockKBClient.list()` currently has executable evidence for:

- [x] List operation exists in `KBClient`
- [x] `MockKBClient.list()` exists
- [x] Exact `nodePath` matching
- [x] Deterministic seed/insertion order
- [x] Documents from other node paths are excluded
- [x] Result limiting with “at most limit” semantics
- [x] Blank/whitespace-only `nodePath` validation
- [x] `limit = 0` rejection
- [x] Negative-limit rejection
- [x] Non-integer-limit rejection
- [x] In-process list CLI command
- [ ] HTTP list integration
- [ ] Live API validation

The deterministic seed is confirmed to contain:

- [x] `doc-001` at `/templates/email`
- [x] `doc-002` at `/templates/email`
- [x] `doc-003` at `/team/devops`

The overall list requirement remains **PARTIAL**.

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

### Cycle 5 — Search input validation

Implemented behavior:

- trim and lowercase the query before matching;
- reject a normalized-empty query with the existing `ValidationError`;
- require `topK` to be a positive integer;
- reject `topK` values `0`, `-1`, and `1.5` with the existing
  `ValidationError`.

The focused suite includes a whitespace-only query test and all three invalid
`topK` examples. The same normalized-empty production guard also rejects an
empty string, although the current suite does not contain a separate
empty-string test.

**Evidence classification: IMPLEMENTATION / BEHAVIOR VALIDATION WITHOUT
CAPTURED BEHAVIORAL RED**

No verified pre-GREEN behavioral RED is available for either Cycle 5A or 5B.
The negative and decimal `topK` cases are regression/edge-case coverage added
after the implementation already handled them; they are not separate
RED/GREEN cycles.

Post-documentation validation results are recorded in `tdd-cycle-log.md`.
Cycle 5 did not introduce filters, ranking, list, retrieve, add, KB commands,
HTTP behavior, environment switching, or live API integration.

### Cycle 6 — Exact-node list and insertion order

Structural setup introduced `ListInput`, the `KBClient.list()` contract, and a
temporary `MockKBClient.list()` stub returning `[]`. This setup made the test
executable and is not classified as behavioral RED evidence.

The test requested `/templates/email`, expected `doc-001` followed by
`doc-002`, and received `[]` from the stub. Because the suite loaded and the
failure was caused by absent list behavior, this is classified as a **VALID
BEHAVIORAL RED**.

The minimum GREEN uses exact `nodePath` equality with `Array.filter()`, which
also preserves deterministic seed order. It adds no sorting, prefix/substring
matching, recursive traversal, limit, validation, CLI, or HTTP behavior.

The final test organization keeps eight search tests in
`mock-kb-client-search.test.ts` and one list test in
`mock-kb-client-list.test.ts`. Removal of a temporary duplicate list test from
the search file was cleanup, not new behavior.

### Cycle 7 — List limit and validation

`ListInput` now contains exactly `nodePath` and `limit`. The Cycle 6 test uses
a sufficiently large limit to preserve its original exact-node and ordering
assertions; this contract preparation is not behavioral RED evidence.

The list implementation retains exact equality and seed order, then applies
`slice(0, input.limit)`. Focused tests cover `limit: 1`, a whitespace-only
path, and invalid limits `0`, `-1`, and `1.5`. Invalid inputs reuse the existing
`ValidationError`.

No verified pre-GREEN behavioral RED is available for Cycle 7A, 7B, or 7C.
Negative and decimal limits are classified as regression/edge-case validation
of the general positive-integer guard, not separate RED/GREEN cycles.

The implementation uses the trimmed `normalizedNodePath` for both blank
validation and exact matching. No current test separately establishes behavior
for a nonblank path with surrounding whitespace. Search behavior is unchanged.

### Cycle 8 — In-process KB list command delegation

Cycle 8 introduces the minimum mock-first command structure under
`src/commands/kb/`: a `kb` parent registrar and a nested `list` registrar. The
focused test parses `kb list --node /templates/email --limit 2` in process and
proves exact-once delegation to `KBClient.list()` with a numeric limit.

Both CLI options are required and have no defaults. Commander handles presence,
CLI parsing, and string-to-number conversion; domain validation remains in the
client. A second behavioral slice prints each returned document title on its
own line in client order. Empty results produce no output and complete
successfully.

The observed pre-GREEN failure was `CommanderError: error: unknown option
'--node'`. Because the new test executed and all 54 earlier tests passed, this
is classified as a valid behavioral RED. The ordered-stdout test later produced
a second valid behavioral RED by receiving no log calls while delegation and
all earlier tests remained green.

Final Cycle 8 coverage includes delegation, numeric conversion, ordered stdout,
silent empty results, and rejection of each missing required option. The final
focused suite has five passing tests; the full suite has 13 test files and 59
passing tests. Typecheck and build both pass.

Production `src/cli.ts` wiring, subprocess E2E, other KB commands, HTTP
integration, and environment selection remain outside this slice.

### Cycle 9 — In-process KB search command

Cycle 9 adds a nested `search` registrar for the human-approved invocation
`tickets kb search <query> --top-k <number>`. The positional query and option
are required without defaults. Commander converts `top-k` to numeric `topK`
and delegates exactly once to `KBClient.search()`; domain validation remains in
the client.

The first valid behavioral RED was `CommanderError: error: unknown command
'search'`, with all 59 prior tests passing. The second valid behavioral RED
received no log calls while the delegation test and all pre-Cycle-9 tests
remained green.

The command now prints `<document.title> [<matchType>]` for each result in
client order. Empty results produce no stdout. Regression coverage verifies
that missing query and missing `--top-k` inputs are rejected before client
delegation.

Final Cycle 9 evidence is five focused tests passing, 14 test files and 64
tests passing in the full suite, plus passing typecheck and build. Production
CLI wiring, subprocess E2E, retrieve/add commands, HTTP integration, and
environment selection remain outside this cycle.

### Cycle 10 — Mock retrieve by exact document ID

Cycle 10 extends `KBClient` with
`retrieve(documentId: string): Promise<Document>` and implements it in
`MockKBClient`. Retrieval uses strict, case-sensitive ID equality and returns
the complete seeded document.

The first valid behavioral RED executed against an intentional stub and failed
with `MockKBClient.retrieve is not implemented`, while all 64 earlier tests
passed. The second valid behavioral RED received a generic `Error` instead of
the approved `KBDocumentNotFoundError`, while exact-ID retrieval and all earlier
behavior remained green.

Final coverage verifies full-document retrieval, KB-specific missing-ID error,
and case-sensitive mismatch. The case-sensitivity test was added after strict
equality already existed and is regression/contract coverage. Final evidence
is three focused tests passing, 15 test files and 67 tests passing in the full
suite, plus passing typecheck and build.

Retrieve CLI parsing/output, production composition, subprocess E2E, add,
HTTP integration, and environment selection remain outside Cycle 10.

### Cycle 11 — In-process KB retrieve command

Cycle 11 adds a nested retrieve registrar for
`tickets kb retrieve <documentId>`. Commander requires the positional ID, and
the command delegates it unchanged exactly once to `KBClient.retrieve()`.

The first valid behavioral RED was unknown command `retrieve`, with all 67
earlier tests passing. The second valid behavioral RED received no stdout calls
while delegation and all pre-Cycle-11 tests remained green.

The command now prints the full document as five labeled lines: ID, title,
content, node path, and comma-space-separated tags. Regression coverage verifies
missing-ID rejection before delegation and unchanged propagation of
`KBDocumentNotFoundError`.

Final Cycle 11 evidence is four focused tests passing, 16 test files and 71
tests passing in the full suite, plus passing typecheck and build. Production
CLI wiring/error mapping, subprocess E2E, add, HTTP integration, and environment
selection remain outside this cycle.

### Cycle 12 — Mock add and per-instance state

Cycle 12 adds the typed `AddInput` application contract and asynchronous
`KBClient.add()`. `MockKBClient` now clones the three seed documents into each
instance, generates `doc-004`, `doc-005`, and later IDs with a private counter,
appends and returns added documents, and exposes them to search/list/retrieve on
that same instance.

The first valid behavioral RED executed against the intentional add stub while
all 71 earlier tests passed. The second valid behavioral RED received duplicate
`doc-004` IDs while the first add behavior and all pre-Cycle-12 tests remained
green.

Final coverage also verifies search/list visibility, per-instance data and
counter isolation, and permitted duplicate input. These cases were added after
GREEN and are regression/contract coverage. Final evidence is five focused
tests passing, 17 test files and 76 tests passing in the full suite, plus
passing typecheck and build.

File reading, add-command parsing/output, production composition, subprocess
E2E, HTTP integration, and environment selection remain outside Cycle 12.

### Cycle 13 — In-process KB add command and file adapter

Cycle 13 adds the approved invocation
`tickets kb add --file <file> --path <nodePath> --tags <tags>`. All options are
required. The command reads exact UTF-8 content, derives the title from the
filename stem, maps the node path, trims and removes empty comma-separated tag
entries, and delegates once to `KBClient.add()`.

Three valid behavioral REDs were captured independently: unknown `add`
command, absent five-line stdout, and a raw filesystem error instead of
`KBAddFileError`. Each full RED run kept every earlier behavior green. Missing
required options and unchanged propagation of `KBClient.add()` errors were
covered after GREEN and are classified as regression coverage.

Final evidence is seven focused tests passing, 18 test files and 83 tests
passing in the full suite, plus passing typecheck and build. Production
`src/cli.ts` composition, subprocess E2E, HTTP integration, environment
selection, and live API validation remain outside Cycle 13.

### Cycle 14 — Local mock CLI composition and subprocess E2E

Cycle 14 creates a fresh `MockKBClient` in the actual CLI entrypoint and
registers the KB command group alongside the four preserved Week 2 commands.
Subprocess tests prove the approved search, list, retrieve, and file-backed add
happy paths through the complete local CLI flow.

The first valid behavioral RED group contained four `unknown command 'kb'`
failures while all 83 earlier tests passed. Minimal GREEN added only the mock
client instance and registrar call. The second valid RED group kept all 87
earlier behaviors green but exposed full stack traces for missing retrieve and
unreadable add-file errors. Minimal GREEN added the two approved top-level
error branches.

Post-GREEN coverage verifies existing `Invalid input` handling for search/list,
root and nested command help, preservation of Week 2 commands, and fresh
non-persistent state across subprocesses. Final evidence is ten focused E2E
tests, 19 test files and 93 tests in the full suite, passing typecheck/build,
and successful help checks against `dist/cli.js`.

This completes the approved local mock-only phase. It does not complete HTTP,
environment switching, real API testing/documentation, or the overall Week 3
acceptance criteria.

## Acceptance criteria status

| Acceptance criterion | Status | Current evidence or blocker |
| --- | --- | --- |
| CLI can query the external Knowledge Base API | **BLOCKED** | No `HTTPKBClient` exists, and the production API contract is incomplete. |
| Mock and HTTP clients work and are environment-swappable | **BLOCKED** | The approved mock implementation is complete; the HTTP client and environment-selection contracts are deferred. |
| Search, list, retrieve, and add work end-to-end | **PARTIAL** | All four operations pass through the production CLI against the mock in independent subprocesses; HTTP end-to-end coverage is blocked. |
| Real KB integration is tested and documented | **BLOCKED** | The real API contract, access, and safe live-test policy are unresolved. |

## Implementation summary

| Area | Status | Implemented slice |
| --- | --- | --- |
| `Document` model | **COMPLETE** | Five mentor-specified fields |
| `KBClient` contract | **COMPLETE** | Asynchronous typed `search`, `list`, `retrieve`, and `add` operations |
| `MockKBClient` | **COMPLETE** | Three per-instance seed documents and approved search/list/retrieve/add behavior with isolated state and deterministic IDs |
| Search | **PARTIAL** | Approved mock/client/command behavior plus production mock composition and subprocess E2E; no HTTP or live integration |
| List | **PARTIAL** | Approved mock/client/command behavior plus production mock composition and subprocess E2E; no HTTP or live integration |
| Retrieve | **PARTIAL** | Approved mock/client/command behavior, concise CLI not-found handling, production mock composition, and subprocess E2E; no HTTP or live integration |
| Add | **PARTIAL** | Approved mock/client/file-command behavior, concise CLI file-error handling, production mock composition, and subprocess E2E; no HTTP or live integration |
| KB commands | **COMPLETE** | All four approved mock-first commands are registered in `src/cli.ts`, visible in help, and covered through independent subprocesses while preserving Week 2 commands |
| Mock subprocess E2E | **COMPLETE** | Search, list, retrieve, add, validation/error presentation, help, and per-process state behavior are covered |
| `HTTPKBClient` | **BLOCKED** | Production HTTP contract unresolved |
| Environment switching | **BLOCKED** | Selection contract unresolved |
| Real API integration | **BLOCKED** | Contract, access, and live-test policy unresolved |

## Overall assessment

Week 3 is not complete. After Cycle 14, the local mock-only phase is complete:
the `KBClient` contract, `MockKBClient`, four mock-first commands, production
mock composition, and subprocess E2E are covered. Search/list/retrieve/add
remain **PARTIAL** against the full Week 3 objective because `HTTPKBClient`,
environment switching, real API tests, and integration documentation remain
blocked/deferred until the real API contract is available.
