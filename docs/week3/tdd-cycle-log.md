# Week 3 TDD Cycle Log

This log records observed evidence without rewriting failed setup as behavioral
TDD evidence.

## Cycle 1 — Seeded title search

### Behavior

Given deterministic seeded documents, a case-insensitive search for a
substring in a document title returns the Customer Response Template as a full
document with:

```text
matchType = "title"
```

The focused test is:

```text
tests/unit/mock-kb-client-search.test.ts
```

### Initial result

Command:

```text
npm run test:run -- tests/unit/mock-kb-client-search.test.ts
```

Observed result:

```text
Test Files  1 failed (1)
Tests       no tests
Duration    861ms
Exit code   1

Error: Cannot find module '../../src/clients/mock-kb-client.js'
```

### RED classification

**Classification: STRUCTURAL / SETUP FAILURE**

This is **not a valid behavioral RED**. The suite could not load the module, so
the test body did not execute. The project TDD standard requires a RED to fail
because expected behavior is absent or incorrect, not because the test or
production module cannot load.

No replacement RED was manufactured after implementation, and the history is
recorded as observed.

### Minimum implementation

Cycle 1 introduced only:

- the mentor-specified five-field `Document` model;
- the provisional mock-phase `SearchResult` and match types;
- a query-only search input;
- an asynchronous search-only `KBClient` contract;
- one deterministic Customer Response Template seed;
- case-insensitive title substring matching.

### GREEN evidence

Focused result:

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    580ms
Exit code   0
```

Full regression:

```text
Test Files  11 passed (11)
Tests       41 passed (41)
Duration    10.60s
Exit code   0
```

Typecheck:

```text
npm run typecheck
tsc --noEmit
Exit code: 0
```

Build:

```text
npm run build
tsc -p tsconfig.build.json
Exit code: 0
```

The first sandboxed build attempt failed with the previously documented
environment-only `EPERM` restriction while resolving `C:\Users\anhde`. An
approved out-of-sandbox retry passed. This was an execution-environment issue,
not a TypeScript or project build failure.

### Refactor review

**Decision:** No-op

The implementation was already the minimum direct expression of the approved
title-search behavior. Generalizing fixtures, extracting helpers, or adding
other operations would have expanded scope without another failing behavioral
test.

### Scope review

- Title search: implemented.
- Content search: not implemented.
- Tag search: not implemented.
- `topK`: not implemented.
- Validation: not implemented.
- List: not implemented.
- Retrieve: not implemented.
- Add: not implemented.
- HTTP client and HTTP configuration: not implemented.
- KB commands: not implemented.

### Cycle assessment

The implemented behavior is green and regression-safe, but Cycle 1 does not
contain a valid behavioral RED because its initial failure was structural. This
distinction remains part of the evidence for human review.

## Cycle 2 — Content search is case-insensitive

### Behavior

Given the deterministic seeded document, a case-insensitive search for a
substring in the document content returns that document with:

```text
matchType = "content"
```

Title matching retains precedence when both the title and content match.

The focused test is:

```text
tests/unit/mock-kb-client-search.test.ts
```

### Initial result

Test added:

```ts
it('returns a content match case-insensitively', async () => {
  const client = new MockKBClient();

  const results = await client.search({
    query: 'rEusAbLe',
  });

  expect(results).toHaveLength(1);
  expect(results[0]?.document.id).toBe('doc-001');
  expect(results[0]?.matchType).toBe('content');
});
```

Command:

```text
npm run test:run -- tests/unit/mock-kb-client-search.test.ts
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 1 passed (2)
Exit code   1

AssertionError: expected [] to have a length of 1 but got 0
```

### RED classification

**Classification: VALID BEHAVIORAL RED**

The suite loaded and executed successfully. The existing Cycle 1 title-search
test passed, while the new test failed because content-search behavior did not
yet exist. The failure was not caused by imports, syntax, configuration, or
test setup.

### Minimum implementation

Cycle 2 added only:

- case-insensitive content substring matching;
- `matchType: 'content'` when the title does not match but the content does;
- title precedence over content matching.

The implemented search precedence is:

```text
title
↓
content
```

No tag-search behavior was added.

### GREEN evidence

Focused result:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    566ms
Exit code   0
```

Full regression:

```text
Test Files  11 passed (11)
Tests       42 passed (42)
Duration    6.84s
Exit code   0
```

Typecheck:

```text
npm run typecheck
tsc --noEmit
Exit code: 0
```

Build:

```text
npm run build
tsc -p tsconfig.build.json
Exit code: 0
```

The first sandboxed validation attempt failed with the previously documented
environment-only `EPERM` restriction while resolving `C:\Users\anhde`. The
approved out-of-sandbox retry passed the focused tests, full regression,
typecheck, and build. This was an execution-environment issue, not a project
failure.

### Refactor review

**Decision:** No-op

The current `for...of` implementation clearly expresses title/content match
precedence. Extracting another helper or abstraction was not justified by the
implemented behavior.

### Scope review

- Title search: implemented.
- Content search: implemented.
- Case-insensitive substring matching: implemented.
- Tag search: not implemented.
- `topK`: not implemented.
- Validation: not implemented.
- Filters: not implemented.
- List: not implemented.
- Retrieve: not implemented.
- Add: not implemented.
- KB commands: not implemented.
- `HTTPKBClient`: not implemented.
- Environment configuration: not implemented.

### Cycle assessment

Cycle 2 contains a valid behavioral RED: the existing behavior stayed green
and the new test failed specifically because content matching was absent. The
minimum implementation is green, regression-safe, type-safe, and build-safe.

## Cycle 3 — Tag search is case-insensitive

### Behavior

Given the deterministic seeded document, a case-insensitive query contained
only in one document tag returns that document with:

```text
matchType = "tag"
```

The focused test uses `SuPpOrT`. The seed contains `support` in its tags, while
the term is intentionally absent from the document title and content. The test
therefore distinguishes tag matching from title and content matching.

### Evidence classification

**Classification: IMPLEMENTATION / BEHAVIOR VALIDATION WITHOUT CAPTURED
BEHAVIORAL RED**

No repository evidence or verified human-reported result proves that the tag
test ran and failed before the tag-search production implementation was added.
No RED was recreated after implementation, and no behavioral RED is claimed.

The temporary failure of the Cycle 1 exact-object assertion during later
validation is not a Cycle 3 RED. It occurred after tag behavior existed and was
caused by stale expected fixture data.

### Minimum implementation

Cycle 3 added only:

- an individual-tag substring check using the normalized query;
- `matchType: 'tag'` when neither title nor content matches;
- preservation of title, then content, then tag precedence.

The implemented precedence is:

```text
title
↓
content
↓
tag
```

### Focused validation

Command:

```text
npm run test:run -- tests/unit/mock-kb-client-search.test.ts
```

Observed result from the post-documentation validation run:

```text
Test Files  1 passed (1)
Tests       3 passed (3)
Duration    589ms
Exit code   0
```

### Temporary regression during validation

After tag search was implemented, the existing Cycle 1 exact-object assertion
temporarily failed because the deterministic seed's tags changed from:

```text
["template", "email"]
```

to:

```text
["template", "email", "support"]
```

Production title-search behavior itself was not broken. The expected fixture
was stale, so the expected tag array was corrected to include `support` rather
than changing search behavior to satisfy the old assertion. Title, content,
and tag tests then all passed.

### Full regression

```text
Test Files  11 passed (11)
Tests       43 passed (43)
Duration    7.25s
Exit code   0
```

### Typecheck

```text
npm run typecheck
tsc --noEmit
Exit code: 0
```

### Build

```text
npm run build
tsc -p tsconfig.build.json
Exit code: 0
```

The first sandboxed build attempt failed with the known environment-only
`EPERM` restriction while resolving `C:\Users\anhde`. The approved
out-of-sandbox retry passed. This was an execution-environment restriction,
not a project or TypeScript build failure.

### Refactor review

**Decision:** No-op behavioral refactor

The current branch structure directly expresses title, content, and tag
precedence. No additional abstraction is required for Cycle 3 behavior. Minor
unrelated source-formatting or unused-import cleanup was not performed during
this documentation-only task.

### Scope review

- Title search: implemented.
- Content search: implemented.
- Tag search: implemented.
- Case-insensitive substring matching: implemented for all three fields.
- Precedence `title > content > tag`: implemented.
- `topK`: not implemented.
- Blank-query validation: not implemented.
- Invalid-`topK` validation: not implemented.
- Filters: not implemented.
- Ranking or scoring: not implemented.
- List: not implemented.
- Retrieve: not implemented.
- Add: not implemented.
- KB commands: not implemented.
- `HTTPKBClient`: not implemented.
- Environment configuration: not implemented.

### Cycle assessment

The Cycle 3 behavior is implemented and validated, but the cycle does not have
captured evidence of a pre-implementation behavioral RED. Future cycles must
run and record the focused behavioral RED before production implementation.

## Cycle 4 — Preserve insertion order and limit results with topK

### Behavior

When multiple documents match, search preserves deterministic seed/insertion
order and returns at most `topK` results.

The focused example is:

```text
query   = "template"
matches = doc-001, doc-002
topK    = 1
result  = doc-001
```

This demonstrates both result limiting and preservation of insertion order.

### Contract preparation

`SearchInput` was extended with:

```typescript
topK: number;
```

Existing title, content, and tag tests use a sufficiently large fixed `topK`
so the limit does not interfere with the behavior each test was designed to
verify. This contract preparation is not classified as a behavioral RED.

### Initial failing validation

The initial test used:

```text
query = "template"
topK  = 5
```

Two documents matched, but the test expected one result. The observed failure
was:

```text
Expected length: 1
Received length: 2
```

**Classification: INVALID TEST EXPECTATION / TEST DESIGN ERROR**

`topK` means “return at most K results.” With two available matches and
`topK = 5`, returning both matches is correct. The failure did not prove
missing or incorrect production behavior and is not accepted as a behavioral
RED.

### Correction

The focused test was corrected to `topK = 1`. Production behavior remained:

```typescript
return results.slice(0, input.topK);
```

No production behavior was reverted or removed to manufacture a RED after the
known GREEN implementation.

### Focused GREEN

Command:

```text
npm run test:run -- tests/unit/mock-kb-client-search.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       4 passed (4)
Duration    707ms
Exit code   0
```

### TDD classification

No valid behavioral RED was captured before the known GREEN implementation.
The initial failure was an invalid expectation, and no replacement RED was
recreated after the implementation was known.

### Full regression

```text
Test Files  11 passed (11)
Tests       44 passed (44)
Duration    8.86s
Exit code   0
```

### Typecheck

```text
npm run typecheck
tsc --noEmit
Exit code: 0
```

### Build

```text
npm run build
tsc -p tsconfig.build.json
Exit code: 0
```

The first sandboxed build attempt failed with the known environment-only
`EPERM` restriction while resolving `C:\Users\anhde`. The approved
out-of-sandbox retry passed. This was an execution-environment restriction,
not a project or TypeScript build failure.

### Refactor review

**Decision:** No-op

The previously identified unused `node:process` import is no longer present.
The insertion-order and `topK` behavior is already expressed directly by
collecting matches in seed order and slicing once after matching. No additional
abstraction or unrelated cleanup was needed.

### Scope review

- Title, content, and tag matching: implemented.
- Case-insensitive substring matching: implemented.
- Precedence `title > content > tag`: implemented.
- Deterministic seed/insertion order: implemented.
- Positive-`topK` happy-path limiting: implemented.
- Blank-query validation: not implemented.
- Zero-`topK` validation: not implemented.
- Negative-`topK` validation: not implemented.
- Non-integer-`topK` validation: not implemented.
- Filters: not implemented.
- Ranking or scoring: not implemented.
- List, retrieve, and add: not implemented.
- KB commands: not implemented.
- `HTTPKBClient` and environment switching: not implemented.

### Cycle assessment

The behavioral goal is implemented and GREEN. Cycle 4 does not contain a valid
pre-implementation behavioral RED because its first failure came from an
incorrect test expectation rather than missing production behavior.

## Cycle 5 — Search input validation

Cycle 5 remained limited to validating the existing search inputs. It reused
the existing `ValidationError`; no KB-specific validation error hierarchy was
introduced.

### Cycle 5A — Blank query validation

#### Behavior

- Trim surrounding whitespace and normalize the query to lowercase before
  matching.
- Reject a query whose normalized value is empty with `ValidationError`.

The implementation performs both operations in the existing search method:

```typescript
const normalizedQuery = input.query.trim().toLowerCase();

if (!normalizedQuery) {
  throw new ValidationError('Search query must not be blank');
}
```

The focused suite contains a whitespace-only query test. An empty string is
also rejected by the same production branch after trimming, but there is no
separate executable empty-string test in the current suite. The exact error
message is not asserted as part of the current executable contract.

#### RED evidence

**Classification: IMPLEMENTATION / BEHAVIOR VALIDATION WITHOUT CAPTURED
BEHAVIORAL RED**

No verified pre-GREEN failing run was captured for Cycle 5A. No RED was
manufactured after the implementation was present.

### Cycle 5B — Invalid topK validation

#### Behavior

`topK` must be a positive integer. The implementation rejects zero, negative,
and non-integer values with `ValidationError`:

```typescript
if (!Number.isInteger(input.topK) || input.topK <= 0) {
  throw new ValidationError('topK must be a positive integer');
}
```

The focused suite exercises `topK` values `0`, `-1`, and `1.5`. The negative
and decimal cases were added after the existing implementation already handled
them, so they are regression/edge-case validation rather than separate
RED/GREEN cycles. The exact error message is not asserted by the current tests.

#### RED evidence

**Classification: IMPLEMENTATION / BEHAVIOR VALIDATION WITHOUT CAPTURED
BEHAVIORAL RED**

No verified pre-GREEN failing run was captured for Cycle 5B. Passing tests
added after implementation are not presented as historical RED evidence.

### Focused validation

Command:

```text
npx vitest run tests/unit/mock-kb-client-search.test.ts
```

Observed result from the approved out-of-sandbox retry:

```text
Test Files  1 passed (1)
Tests       8 passed (8)
Duration    626ms
Exit code   0
```

### Full regression

```text
Test Files  11 passed (11)
Tests       48 passed (48)
Duration    7.00s
Exit code   0
```

### Typecheck

```text
npm run typecheck
tsc --noEmit
Exit code: 0
```

### Build

```text
npm run build
tsc -p tsconfig.build.json
Exit code: 0
```

The initial sandboxed validation attempts could not start Node-based project
commands because of the known environment-only `EPERM` restriction while
resolving `C:\Users\anhde`. Approved out-of-sandbox retries passed the focused
suite, full regression, typecheck, and build. This was an execution-environment
restriction, not a test, TypeScript, or production build failure.

### Refactor review

**Decision:** No-op

The two direct guards are the minimum implementation for the approved input
rules. Reusing `ValidationError` avoids an unapproved KB-specific hierarchy,
and no further abstraction is justified by this slice.

### Scope review

- Query trimming and case normalization: implemented.
- Blank and whitespace-only query rejection: implemented.
- Zero, negative, and non-integer `topK` rejection: implemented.
- Filters: not implemented.
- Search scoring or ranking: not implemented.
- List, retrieve, and add: not implemented.
- KB commands: not implemented.
- `HTTPKBClient`: not implemented.
- Environment selection and real API integration: not implemented.

### Cycle assessment

Cycle 5A and 5B behavior is implemented and covered by the current focused
suite, but neither slice has a verified pre-implementation behavioral RED.
Search and `MockKBClient` remain partial because later operations, filters,
commands, HTTP behavior, and environment switching have not been implemented.

## Cycle 6 — Mock list exact nodePath and insertion order

### Behavior

`MockKBClient.list()` returns only documents whose `nodePath` exactly equals
the requested path and preserves deterministic seed/insertion order.

For:

```text
nodePath = "/templates/email"
```

the expected document IDs are:

```text
["doc-001", "doc-002"]
```

`doc-003`, whose path is `/team/devops`, is excluded.

### Structural setup

Before the behavioral RED, Cycle 6 introduced the minimum structure required
to make the list test executable:

- `ListInput` with `nodePath: string`;
- the asynchronous `KBClient.list(input)` contract returning `Document[]`;
- `MockKBClient.list(input)` as a temporary stub returning `[]`.

Interface creation, imports, and the empty stub are structural setup, not
behavioral RED evidence. Their purpose was to allow the test file to load and
the behavior assertion to execute normally.

### RED

The behavioral test requested:

```text
nodePath = "/templates/email"
expected = ["doc-001", "doc-002"]
received = []
```

**Classification: VALID BEHAVIORAL RED**

The test file loaded, `client.list()` existed, and there was no missing-module,
import, or type-setup failure. The assertion failed specifically because the
temporary stub returned no documents and the required exact-node behavior did
not yet exist. No unrecorded RED timing or duration is claimed.

### GREEN

The minimum implementation filters the deterministic seed using exact
`nodePath` equality:

```typescript
return documents.filter(
  (document) => document.nodePath === input.nodePath
);
```

`Array.filter()` preserves source-array order, so `doc-001` remains before
`doc-002`. No sorting, substring/prefix matching, or recursive hierarchy
traversal was added.

### Focused GREEN evidence

Human-reported results after test cleanup:

```text
Search regression:
Test Files  1 passed (1)
Tests       8 passed (8)

List focused suite:
Test Files  1 passed (1)
Tests       1 passed (1)
```

The list test is:

```text
returns documents for the exact nodePath in insertion order
```

### Refactor / cleanup

A duplicate copy of the list test temporarily existed in the search test file
and was removed as test-organization cleanup, not as new behavior. The final
separation is:

```text
tests/unit/mock-kb-client-search.test.ts -> search behavior only (8 tests)
tests/unit/mock-kb-client-list.test.ts   -> list behavior only (1 test)
```

### Post-documentation focused validation

List focused suite:

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    634ms
Exit code   0
```

Search regression:

```text
Test Files  1 passed (1)
Tests       8 passed (8)
Duration    730ms
Exit code   0
```

### Full regression

```text
Test Files  12 passed (12)
Tests       49 passed (49)
Duration    8.13s
Exit code   0
```

### Typecheck

```text
npm run typecheck
tsc --noEmit
Exit code: 0
```

### Build

```text
npm run build
tsc -p tsconfig.build.json
Exit code: 0
```

The initial sandboxed focused attempts could not start Vitest because of the
known environment-only `EPERM` restriction while Node resolved
`C:\Users\anhde`. Approved out-of-sandbox retries passed both focused suites,
the full regression, typecheck, and build. This was an execution-environment
restriction, not a test, TypeScript, or production build failure.

### Scope review

- Exact `nodePath` matching: implemented.
- Deterministic insertion order: implemented.
- Documents from other node paths are excluded: implemented.
- List limit: not implemented.
- Blank-`nodePath` validation: not implemented.
- Invalid-limit validation: not implemented.
- Recursive hierarchy traversal: not implemented.
- List CLI command: not implemented.
- Retrieve and add: not implemented.
- `HTTPKBClient` and environment switching: not implemented.

### Cycle assessment

Cycle 6 contains a valid behavioral RED and the minimum exact-node GREEN
behavior. List remains partial because Cycle 7 limit/validation behavior, CLI,
and HTTP integration have not been implemented.

## Cycle 7 — List limit and validation

Cycle 7 extends the existing exact-node list behavior with result limiting,
blank-path validation, and positive-integer limit validation. It reuses the
existing `ValidationError`.

### Contract preparation

`ListInput` gained exactly one field:

```typescript
interface ListInput {
  nodePath: string;
  limit: number;
}
```

The Cycle 6 exact-node/order test now supplies `limit: 10`, which is large
enough to preserve its original expectation of `doc-001` followed by
`doc-002`. Adding the field and updating the existing call site are structural
type-contract preparation, not behavioral RED evidence.

### Cycle 7A — List limit

When two documents match `/templates/email` and `limit` is `1`, list returns
only `doc-001`. Limit means “at most K,” not “exactly K,” and existing seed
order is preserved.

The actual implementation filters by exact path and then slices the result:

```typescript
return documents.filter(
  (document) => document.nodePath === input.nodePath
)
.slice(0,input.limit);
```

No sorting, prefix/substring matching, or recursive traversal was added.

#### RED evidence

**Classification: IMPLEMENTATION / BEHAVIOR VALIDATION WITHOUT CAPTURED
BEHAVIORAL RED**

No verified run proves that the limit test failed with two results before the
slice implementation existed. No RED was recreated after implementation.

### Cycle 7B — Blank nodePath validation

The implementation trims `nodePath` for validation and rejects a normalized
empty value with `ValidationError`:

```typescript
const normalizedNodePath = input.nodePath.trim();
if(!normalizedNodePath){
  throw new ValidationError('nodePath must not be blank');
}
```

The focused suite tests a whitespace-only value. An empty string reaches the
same guard, but no separate empty-string test exists. The current matching
expression still compares against raw `input.nodePath`; no executable test
establishes matching behavior for a nonblank path with surrounding whitespace.

#### RED evidence

**Classification: IMPLEMENTATION / BEHAVIOR VALIDATION WITHOUT CAPTURED
BEHAVIORAL RED**

No verified run proves that the whitespace-only test resolved instead of
rejecting before validation was implemented.

### Cycle 7C — Invalid limit validation

The implementation requires a positive integer and rejects `0`, `-1`, and
`1.5` with the existing `ValidationError`:

```typescript
if (!Number.isInteger(input.limit) || input.limit <= 0) {
  throw new ValidationError('topK must be a positive integer');
}
```

Current tests assert the error class, not the exact message. The production
message refers to `topK`, so it is not recorded as an approved list error
message contract.

#### RED evidence

**Classification: IMPLEMENTATION / BEHAVIOR VALIDATION WITHOUT CAPTURED
BEHAVIORAL RED**

No verified pre-GREEN failure is available for the zero-limit behavior. The
negative and decimal tests are regression/edge-case validation of the general
positive-integer guard, not separate RED/GREEN cycles.

### Focused validation

List focused suite:

```text
Test Files  1 passed (1)
Tests       6 passed (6)
Duration    655ms
Exit code   0
```

Search regression:

```text
Test Files  1 passed (1)
Tests       8 passed (8)
Duration    759ms
Exit code   0
```

### Full regression

```text
Test Files  12 passed (12)
Tests       54 passed (54)
Duration    7.26s
Exit code   0
```

### Typecheck

```text
npm run typecheck
tsc --noEmit
Exit code: 0
```

### Build

```text
npm run build
tsc -p tsconfig.build.json
Exit code: 0
```

These Node-based validations used approved out-of-sandbox execution because
the environment's `C:\Users\anhde` resolution has already been established to
produce sandbox-only `EPERM` failures. All requested project validations
passed; no code failure was observed.

### Refactor review

**Decision:** No-op behavioral refactor

The direct guards plus exact filter and final slice are sufficient for the
current behavior. No new error class or behavioral abstraction was needed.

### Scope review

- Exact `nodePath` matching and deterministic order: preserved.
- Result limiting: implemented.
- Blank/whitespace-only `nodePath` validation: implemented.
- Zero, negative, and non-integer limit validation: implemented.
- List CLI command and KB command registration: not implemented.
- Retrieve and add: not implemented.
- Recursive listing: not implemented.
- `HTTPKBClient`: not implemented.
- Environment switching and live API validation: not implemented.

### Cycle assessment

Cycle 7 behavior is implemented and covered by the current list suite, but no
verified pre-implementation behavioral RED is available for 7A, 7B, or 7C.
List remains partial because CLI, HTTP, and live API integration are absent.
