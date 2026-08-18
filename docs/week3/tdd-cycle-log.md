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
