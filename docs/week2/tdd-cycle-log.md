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

---

## Cycle 02 — Reject Whitespace-Only Title

### Requirement

Human-approved behavior:

- a blank or whitespace-only ticket title must be rejected.

Example:

```text
Input title:
"   "

Expected:
createTicket throws an error
```

No custom error type or exact error message was required in this cycle.

### RED

Test file:

```text
tests/unit/ticket-service-create.test.ts
```

New test:

```ts
it('rejects a whitespace-only title', () => {
  expect(() => createTicket({ title: '   ' })).toThrow();
});
```

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 1 passed (2)
Duration    643ms
Exit code   1
```

Observed failure:

```text
AssertionError: expected [Function] to throw an error
```

The Red was accepted because the existing Cycle 01 test still passed and the
new test failed specifically because `createTicket` accepted a whitespace-only
title.

### GREEN

Production file:

```text
src/services/ticket-service.ts
```

Minimum implementation:

```ts
export function createTicket({ title }: { title: string }) {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error();
  }

  return {
    title: normalizedTitle,
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
Tests       2 passed (2)
Duration    975ms
Exit code   0
```

Both Cycle 01 and Cycle 02 behaviors passed.

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The implementation was already minimal and clear. `normalizedTitle` expresses
the normalize → validate → return flow without duplication.

Extracting helpers, constants, models, or custom errors at this stage would
introduce premature abstraction.

No production or test code was changed during the refactor review.

Regression command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    597ms
Exit code   0
```

### Final Cycle 02 Behavior

```text
"   "
→ rejected by throwing an error
```

Cycle 01 behavior remains unchanged:

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

---

## Cycle 03 — Trim Provided Description

### Requirement

When a description is provided, leading and trailing whitespace must be removed.

Example:

```text
"  Login button does not work  "
→
"Login button does not work"
```

The omitted-description default was intentionally not implemented in this cycle.

### RED

Test added:

```ts
it('trims a provided description', () => {
  const ticket = createTicket({
    title: 'Fix login',
    description: '  Login button does not work  ',
  });

  expect(ticket.description).toBe('Login button does not work');
});
```

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 2 passed (3)
Duration    625ms
Exit code   1
```

Observed failure:

```text
AssertionError: expected undefined to be 'Login button does not work'
```

Expected:

```text
"Login button does not work"
```

Received:

```text
undefined
```

The Red was accepted because:

- Vitest successfully discovered and executed all three tests.
- The existing Cycle 01 and Cycle 02 tests continued to pass.
- The new test failed specifically because `createTicket` did not yet return
  the approved description behavior.
- The failure was not caused by test configuration, imports, syntax, or
  dependency problems.

### GREEN

`createTicket` was minimally extended to:

- accept an optional `description`;
- trim the description when it is provided;
- include the normalized description in the returned result.

The omitted-description default was intentionally not implemented during this
cycle.

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       3 passed (3)
Duration    687ms
Exit code   0
```

All three existing behaviors passed.

### REFACTOR

A small readability refactor was applied.

The conditional object-spread implementation was replaced with:

```ts
const ticket = {
  title: normalizedTitle,
  status: 'open',
};

if (description === undefined) {
  return ticket;
}

return {
  ...ticket,
  description: description.trim(),
};
```

### Refactor Reason

The explicit branch makes the two paths easier to read:

```text
description omitted
→ return base ticket

description provided
→ return base ticket + normalized description
```

No helper, model, constant, custom error, or other abstraction was introduced.

No new behavior was added.

### Regression Validation

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       3 passed (3)
Duration    635ms
Exit code   0
```

### Final Cycle 03 Behavior

```text
provided description
→ trim leading/trailing whitespace
→ include normalized description in returned ticket
```

Existing behaviors remain unchanged:

```text
Cycle 01:
valid title
→ title is trimmed
→ initial status is "open"

Cycle 02:
blank or whitespace-only title
→ rejected by throwing an error
```

### Human Review

- Red failure reason: Accepted
- Minimum Green implementation: Accepted
- Refactor: Accepted
- Regression tests: Passed
- Existing behavior preserved: Yes
- Speculative behavior introduced: No
- Cycle status: Completed
---

## Cycle 04 — Default Omitted Description

### Requirement

When description is omitted, the returned ticket must contain an empty string.

Example:

```text
createTicket({
  title: "Fix login"
})

→

description = ""
```

This behavior was already approved in W2-D05.

### RED

Test added:

```ts
it('defaults an omitted description to an empty string', () => {
  const ticket = createTicket({ title: 'Fix login' });

  expect(ticket.description).toBe('');
});
```

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 3 passed (4)
Duration    867ms
Exit code   1
```

Observed failure:

```text
AssertionError: expected undefined to be ''
```

The Red was accepted because:

- the existing Cycle 01–03 tests continued to pass;
- the new test failed specifically because omitted description returned
  `undefined`;
- the failure was not caused by configuration, imports, syntax, or dependencies.

### GREEN

`createTicket` was minimally changed so that an omitted description becomes an
empty string.

Provided descriptions continued to be trimmed.

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       4 passed (4)
Duration    593ms
Exit code   0
```

### REFACTOR

A small readability simplification was applied.

Because every successful ticket now contains a description, the temporary base
ticket and multiple return branches were no longer necessary.

The resulting return structure became:

```ts
return {
  title: normalizedTitle,
  status: 'open',
  description: description === undefined ? '' : description.trim(),
};
```

No new behavior was introduced.

### Regression Validation

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       4 passed (4)
Duration    563ms
Exit code   0
```

### Final Cycle 04 Behavior

```text
description omitted
→ description = ""
```

Existing Cycle 01–03 behaviors remain unchanged.

### Human Review

- Red failure reason: Accepted
- Minimum Green implementation: Accepted
- Refactor: Accepted
- Regression tests: Passed
- Existing behavior preserved: Yes
- Speculative behavior introduced: No
- Cycle status: Completed
---

## Cycle 05 — Default Omitted Priority

### Requirement

When priority is omitted:

```text
priority = "medium"
```

### RED

Test added:

```ts
it('defaults an omitted priority to medium', () => {
  const ticket = createTicket({ title: 'Fix login' });

  expect(ticket.priority).toBe('medium');
});
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 4 passed (5)
Duration    577ms
Exit code   1
```

Failure:

```text
AssertionError: expected undefined to be 'medium'
```

The Red was accepted because the previous four tests passed and only the new
default-priority behavior was missing.

### GREEN

The minimum implementation added:

```ts
priority: 'medium'
```

Observed result:

```text
Test Files  1 passed (1)
Tests       5 passed (5)
Duration    647ms
Exit code   0
```

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The implementation is already minimal and readable. No structural improvement
is justified at this stage.

No production or test code was changed during the refactor review.

### Final Cycle 05 Behavior

```text
priority omitted
→ priority = "medium"
```

Existing Cycle 01–04 behaviors remain unchanged.

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: No-op accepted
- Speculative behavior introduced: No
- Cycle status: Completed
---

## Cycle 06 — Normalize Provided Priority

### Requirement

When priority is provided:

- leading and trailing whitespace is removed;
- the value is normalized to lowercase.

Example:

```text
" HIGH "
→
"high"
```

### RED

Test added:

```ts
it('normalizes a provided priority', () => {
  const ticket = createTicket({
    title: 'Fix login',
    priority: ' HIGH ',
  });

  expect(ticket.priority).toBe('high');
});
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 5 passed (6)
Duration    602ms
Exit code   1
```

Failure:

```text
AssertionError: expected 'medium' to be 'high'
```

The Red was accepted because the previous five tests passed and the new test
failed specifically because the provided priority was ignored.

### GREEN

`createTicket` was extended so that:

```text
priority omitted
→ "medium"

priority provided
→ trim
→ lowercase
```

Observed result:

```text
Test Files  1 passed (1)
Tests       6 passed (6)
Duration    633ms
Exit code   0
```

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The implementation is already minimal and readable. No structural refactor is
currently justified.

No production or test code was changed during the refactor review.

### Final Cycle 06 Behavior

```text
" HIGH "
→
"high"
```

Existing Cycle 01–05 behaviors remain unchanged.

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: No-op accepted
- Regression tests: Passed
- Speculative behavior introduced: No
- Cycle status: Completed---

## Cycle 07 — Reject Invalid Priority

### Requirement

Priority must be one of:

```text
low | medium | high
```

Any other normalized value must be rejected.

### RED

Test added:

```ts
it('rejects an invalid priority', () => {
  expect(() =>
    createTicket({ title: 'Fix login', priority: 'urgent' }),
  ).toThrow();
});
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 6 passed (7)
Duration    610ms
Exit code   1
```

Failure:

```text
AssertionError: expected [Function] to throw an error
```

The Red was accepted because the previous six tests passed and only invalid
priority rejection was missing.

### GREEN

The implementation normalized priority and validated it against:

```text
low | medium | high
```

Invalid values now throw an error.

Observed result:

```text
Test Files  1 passed (1)
Tests       7 passed (7)
Duration    656ms
Exit code   0
```

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

The implementation was already sufficiently clear and no structural change was
justified.

### Final Cycle 07 Behavior

```text
"urgent"
→ rejected
```

Existing Cycle 01–06 behaviors remain unchanged.

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: No-op accepted
- Regression tests: Passed
- Speculative behavior introduced: No
- Cycle status: Completed---

## Cycle 08 — Default Omitted Tags

### Requirement

When tags are omitted:

```text
tags = []
```

### RED

Test added:

```ts
it('defaults omitted tags to an empty array', () => {
  const ticket = createTicket({ title: 'Fix login' });

  expect(ticket.tags).toEqual([]);
});
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 7 passed (8)
Duration    865ms
Exit code   1
```

Failure:

```text
AssertionError: expected undefined to deeply equal []
```

The Red was accepted because the previous seven tests passed and only the new
default-tags behavior was missing.

### GREEN

The minimum implementation added an empty tags array when tags are omitted.

Observed result:

```text
Tests  8 passed (8)
Exit code  0
```

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The change is already minimal and readable. No meaningful structural refactor
is justified.

### Final Cycle 08 Behavior

```text
tags omitted
→ tags = []
```

Existing Cycle 01–07 behaviors remain unchanged.

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: No-op accepted
- Regression tests: Passed
- Speculative behavior introduced: No
- Cycle status: Completed
---

## Cycle 09 — Normalize Provided Tags

### Requirement

When tags are provided, each tag must:

- be trimmed;
- be normalized to lowercase.

Example:

```text
[" Bug ", "AUTH"]
→
["bug", "auth"]
```

Empty-tag removal and duplicate-tag removal are intentionally excluded from
this cycle.

### RED

Test added:

```ts
it('normalizes provided tags', () => {
  const ticket = createTicket({
    title: 'Fix login',
    tags: [' Bug ', 'AUTH'],
  });

  expect(ticket.tags).toEqual(['bug', 'auth']);
});
```

Test command:

```bash
npm run test:run -- tests/unit/ticket-service-create.test.ts
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 8 passed (9)
Duration    622ms
Exit code   1
```

Failure:

```text
AssertionError: expected [] to deeply equal [ 'bug', 'auth' ]
```

The Red was accepted because the previous eight tests passed and the new test
failed specifically because provided tags were ignored.

### GREEN

`createTicket` was minimally extended to accept optional tags.

Provided tags are normalized using:

```ts
tags.map((tag) => tag.trim().toLowerCase())
```

Omitted tags still default to an empty array.

Empty-tag and duplicate-tag removal were not implemented.

Observed result:

```text
Test Files  1 passed (1)
Tests       9 passed (9)
Duration    563ms
Exit code   0
```

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The implementation is currently small and readable. No structural refactor is
justified without introducing unnecessary abstraction.

No production or test code was changed during the refactor review.

### Final Cycle 09 Behavior

```text
[" Bug ", "AUTH"]
→
["bug", "auth"]
```

Existing Cycle 01–08 behaviors remain unchanged.

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: No-op accepted
- Regression tests: Passed
- Speculative behavior introduced: No
- Cycle status: Completed