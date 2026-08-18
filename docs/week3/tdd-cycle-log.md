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
