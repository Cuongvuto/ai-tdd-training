# Week 2 — TDD Cycle Log

This document records observed Red-Green-Refactor evidence for the Ticket Manager CLI.

---

## Cycle 01 — Valid Title Normalization and Initial Status

### Requirement

Human-approved behavior:

- a valid title is trimmed;
- a newly created ticket starts with status `open`.

Example:

```text
Input title:
"  Fix login  "

Expected:
title = "Fix login"
status = "open"
```

### RED

Test file:

```text
tests/unit/ticket-service-create.test.ts
```

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed (1)

TypeError: createTicket is not a function
```

The Red was accepted because Vitest successfully discovered and executed the
test, and the failure was caused by the missing `createTicket` behavior/API.

An earlier sandbox `EPERM` execution failure was not counted as behavioral Red.

### GREEN

Production file:

```text
src/services/ticket-service.ts
```

Minimum implementation:

```ts
export function createTicket({ title }: { title: string }) {
  return {
    title: title.trim(),
    status: 'open',
  };
}
```

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    1.10s
Exit code   0
```

The existing test passed without modification.

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The implementation was already minimal and readable. Extracting a helper,
model, type, or status constant would introduce premature abstraction without
removing duplication or meaningful complexity.

No production or test code was changed during the refactor review.

Regression command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    587ms
Exit code   0
```

### Final Cycle 01 Behavior

```text
"  Fix login  "
→
title = "Fix login"
status = "open"
```

### Human Review

- Red failure reason: Accepted
- Minimum Green implementation: Accepted
- Refactor decision: Accepted
- Additional speculative behavior introduced: No
- Cycle status: Completed