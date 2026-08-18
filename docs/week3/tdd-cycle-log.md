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
