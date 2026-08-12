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
---

## Cycle 10 — Remove Empty Tags

### Requirement

Tags that become empty after trimming must be removed.

Example:

```text
["bug", "   ", "auth"]
→
["bug", "auth"]
```

Duplicate-tag removal is intentionally excluded from this cycle.

### RED

Test added:

```ts
it('removes tags that are empty after trimming', () => {
  const ticket = createTicket({
    title: 'Fix login',
    tags: ['bug', '   ', 'auth'],
  });

  expect(ticket.tags).toEqual(['bug', 'auth']);
});
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 9 passed (10)
Duration    607ms
Exit code   1
```

Failure:

```text
expected [ 'bug', '', 'auth' ] to deeply equal [ 'bug', 'auth' ]
```

The Red was accepted because the previous nine tests passed and the new
empty-tag-removal behavior was specifically missing.

### GREEN

The tags normalization pipeline was extended with:

```ts
.filter((tag) => tag.length > 0)
```

Observed result:

```text
Test Files  1 passed (1)
Tests       10 passed (10)
Duration    563ms
Exit code   0
```

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The current `map → filter` pipeline is small, readable, and directly expresses
the required behavior. No additional abstraction is justified.

### Final Cycle 10 Behavior

```text
["bug", "   ", "auth"]
→
["bug", "auth"]
```

Existing Cycle 01–09 behaviors remain unchanged.

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: No-op accepted
- Regression tests: Passed
- Speculative behavior introduced: No
- Cycle status: Completed---

## Cycle 11 — Remove Duplicate Normalized Tags

### Requirement

Duplicate normalized tags must be removed while preserving first occurrence order.

Example:

```text
["bug", "auth", "BUG"]
→
["bug", "auth"]
```

### RED

Test added:

```ts
it('removes duplicate normalized tags', () => {
  const ticket = createTicket({
    title: 'Fix login',
    tags: ['bug', 'auth', 'BUG'],
  });

  expect(ticket.tags).toEqual(['bug', 'auth']);
});
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 10 passed (11)
Duration    622ms
Exit code   1
```

Failure:

```text
expected [ 'bug', 'auth', 'bug' ]
to deeply equal [ 'bug', 'auth' ]
```

The Red was accepted because the previous ten tests remained green and the
failure specifically demonstrated missing duplicate removal.

### GREEN

Duplicate normalized tags were removed using:

```ts
.filter(
  (tag, index, normalizedTags) =>
    normalizedTags.indexOf(tag) === index,
)
```

First occurrence order is preserved.

Observed result:

```text
Test Files  1 passed (1)
Tests       11 passed (11)
Duration    595ms
Exit code   0
```

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The implementation is currently readable and directly expresses the required
behavior. No additional abstraction is justified.

### Final Cycle 11 Behavior

```text
["bug", "auth", "BUG"]
→
["bug", "auth"]
```

Existing Cycle 01–10 behaviors remain unchanged.

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: No-op accepted
- Regression tests: Passed
- Speculative behavior introduced: No
- Cycle status: Completed
---

## Cycle 12 — Generate Ticket UUID

### Requirement

Each newly created ticket must automatically receive a UUID string.

The caller does not provide or override the ID.

### RED

Test added:

```ts
it('assigns a UUID ID to a newly created ticket', () => {
  const ticket = createTicket({ title: 'Fix login' });

  expect(ticket.id).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
});
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 11 passed (12)
Duration    713ms
```

Failure:

```text
TypeError: .toMatch() expects to receive a string, but got undefined
```

The Red was accepted because the previous eleven tests remained green and the
failure specifically demonstrated missing automatic ID generation.

### GREEN

Node.js built-in UUID generation was introduced:

```ts
import { randomUUID } from 'node:crypto';
```

The returned ticket now contains:

```ts
id: randomUUID(),
```

Observed result:

```text
Test Files  1 passed (1)
Tests       12 passed (12)
Duration    1.03s
```

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

Using Node.js `randomUUID()` directly is already minimal and readable. No
additional abstraction is justified at this stage.

### Final Cycle 12 Behavior

```text
create ticket
→ automatically generate UUID
→ return UUID as ticket.id
```

Existing Cycle 01–11 behaviors remain unchanged.

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: No-op accepted
- Regression tests: Passed
- Speculative behavior introduced: No
- Cycle status: Completed
---

## Cycle 13 — Missing JSON File Returns Empty Store

### Requirement

When the configured ticket JSON file does not exist:

```text
repository.findAll()
→ []
```

Reading a missing file must not create the file automatically.

This cycle uses the real filesystem through a temporary test directory rather
than mocking filesystem behavior.

### RED

Integration test file:

```text
tests/integration/json-ticket-repository.test.ts
```

The test uses a temporary directory created under the operating system's
temporary directory and points the repository to a `tickets.json` file that
does not exist.

The test verifies:

```text
missing tickets.json
→ repository.findAll()
→ []
```

and also verifies that the read operation does not create the missing file.

Test command:

```bash
npm run test:run -- tests/integration/json-ticket-repository.test.ts
```

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed (1)
Duration    617ms
```

Observed failure:

```text
TypeError: JsonTicketRepository is not a constructor
```

The Red was accepted because:

* Vitest successfully discovered and executed the integration test;
* the temporary filesystem setup worked;
* the failure occurred because the required `JsonTicketRepository` API was not
  implemented;
* the failure was not caused by dependency, syntax, test configuration, or
  filesystem setup problems.

### GREEN

The repository boundary introduced:

```ts
export interface TicketRepository {
  findAll(): Promise<Ticket[]>;
}
```

`JsonTicketRepository` was implemented with an explicit storage path provided
through its constructor.

`findAll()` reads the configured path using the real filesystem.

Missing-file behavior:

```text
readFile()
→ ENOENT
→ return []
```

Other filesystem errors are rethrown unchanged.

No filesystem write operation was introduced.

Test command:

```bash
npm run test:run -- tests/integration/json-ticket-repository.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    614ms
```

The integration test also confirmed that the missing JSON file still did not
exist after `findAll()` completed.

### REFACTOR REVIEW

Decision:

```text
No-op refactor review
```

Reason:

The repository implementation is currently small and directly expresses the
required behavior:

```text
read configured path
→ missing file: return []
→ other error: rethrow
```

No additional helper, abstraction, error class, or storage behavior is
justified at this stage.

No production or test code was changed during the refactor review.

### Final Cycle 13 Behavior

```text
configured JSON file does not exist
→ findAll()
→ []
→ file remains nonexistent
```

### Current Repository Scope

Implemented:

```text
findAll(): Promise<Ticket[]>
missing file → []
explicit storage path
real filesystem integration
```

Not yet implemented:

```text
reading valid ticket data
corrupted JSON handling
save
findById
update
StorageError
default production storage path
CLI integration
```

### Human Review

* Red failure reason: Accepted
* Minimum Green implementation: Accepted
* Real filesystem integration: Accepted
* Missing-file behavior: Accepted
* Read does not create file: Confirmed
* Refactor: No-op accepted
* Speculative repository behavior introduced: No
* Cycle status: Completed

---

## Cycle 14 — Valid JSON Read Validation

### Intended Requirement

Given a valid JSON file containing tickets:

```text
findAll()
→ parse JSON
→ return Ticket[]
```

### Attempted RED

A new integration test was added expecting a valid JSON file to be parsed and
returned as tickets.

Test command:

```bash
npm run test:run -- tests/integration/json-ticket-repository.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    1.07s
```

### TDD Assessment

A valid RED was not established.

Inspection showed that Cycle 13 production code already contained:

```ts
return JSON.parse(contents) as Ticket[];
```

Therefore valid-JSON reading had already been implemented before the Cycle 14
test was written.

This was broader than the intended Cycle 13 scope, which was limited to:

```text
missing file
→ findAll()
→ []
```

### Human Validation

The issue was not hidden or rewritten.

The Cycle 14 test is retained because it provides useful integration coverage
for real JSON parsing, but it must not be presented as Red-Green-Refactor
evidence.

### Classification

```text
Integration validation / characterization test
```

This is not a valid TDD Red-Green-Refactor cycle.

### Confirmed Behavior

```text
valid tickets.json
→ findAll()
→ Ticket[]
```

### Human Review

- Valid JSON behavior confirmed: Yes
- Valid RED established: No
- Reason: Behavior was already implemented during Cycle 13
- AI scope overreach detected: Yes
- History preserved honestly: Yes

---

## Corrupted JSON Integration Validation

### Requirement

When the configured JSON file contains invalid JSON:

```text
findAll()
→ reject/throw an error
```

The repository must not:

- Reset the file
- Overwrite the corrupted contents
- Delete the file
- Treat the corrupted store as empty

### Validation Test

A real temporary `tickets.json` file was created with invalid JSON contents.

The test verified:

```text
invalid JSON
→ findAll() rejects
→ original file remains unchanged
```

Test command:

```bash
npm run test:run -- tests/integration/json-ticket-repository.test.ts
```

Observed result:

```text
Test Files  1 passed (1)
Tests       3 passed (3)
Duration    647ms
```

The thrown error type was:

```text
SyntaxError
```

### TDD Assessment

A valid RED was not established.

Reason: `JSON.parse()` was already present in the repository implementation
before this test was written, so corrupted JSON rejection already existed.

This test is retained as:

```text
Integration validation
```

It is not presented as a Red-Green-Refactor cycle.

### Data Preservation

After the rejection:

- The corrupted file still existed.
- The original corrupted contents were unchanged.

### Human Review

- Corrupted JSON rejection confirmed: Yes
- Data preservation confirmed: Yes
- Valid RED established: No
- Production code modified: No
- Validation status: Passed
---

## Cycle 15 — Save First Ticket

### 1. Requirement

When the configured JSON file does not exist:

```text
save(ticket)
→ create tickets.json
→ persist [ticket]
```

A later `findAll()` call must return the saved ticket.

---

### 2. RED Phase

A real-filesystem integration test called:

```typescript
await repository.save(ticket);
```

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed | 3 passed (4)
Duration    622ms
```

**Failure:**

```text
TypeError: repository.save is not a function
```

> **Note:** The Red was accepted because the existing repository tests remained green and the failure specifically demonstrated that the `save` API was missing.

---

### 3. GREEN Phase

The repository interface was extended with:

```typescript
save(ticket: Ticket): Promise<void>;
```

`JsonTicketRepository` implemented:

```typescript
async save(ticket: Ticket): Promise<void> {
  await writeFile(this.storagePath, JSON.stringify([ticket]), 'utf8');
}
```

**Observed result:**

```text
Test Files  1 passed (1)
Tests       4 passed (4)
Duration    671ms
Exit code   0
```

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The implementation is currently minimal and directly expresses the required first-save behavior. Append behavior and additional persistence concerns are intentionally deferred.

---

### 5. Final Cycle 15 Behavior

```text
missing tickets.json
→ save(ticket)
→ create tickets.json containing [ticket]
→ findAll()
→ [ticket]
```

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Real filesystem persistence:** Confirmed
* **Speculative append behavior introduced:** No
* **Cycle status:** Completed
---

## Cycle 16 — Preserve Existing Tickets When Saving

### 1. Requirement

When the JSON file already contains existing tickets:

```text
[ticketA]
```

and another ticket is saved:

```text
save(ticketB)
```

the repository must preserve the existing ticket and append the new ticket:

```text
[ticketA, ticketB]
```

*Existing order must be preserved.*

---

### 2. RED Phase

A real-filesystem integration test was added for saving a second ticket.

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed | 4 passed (5)
Duration    712ms
Exit code   1
```

**Failure:**

```text
Expected: [ticketA, ticketB]
Received: [ticketB]
```

> **Note:** The Red was accepted because the previous four integration tests remained green and the failure directly demonstrated that the current `save()` implementation overwrote existing data.

---

### 3. GREEN Phase

`save()` was changed to read the existing tickets first and then append the new ticket:

```typescript
async save(ticket: Ticket): Promise<void> {
  const tickets = await this.findAll();

  await writeFile(
    this.storagePath,
    JSON.stringify([...tickets, ticket]),
    'utf8',
  );
}
```

**Observed result:**

```text
Test Files  1 passed (1)
Tests       5 passed (5)
Duration    660ms
Exit code   0
```

*Existing tickets retain their order and the newly saved ticket is appended last.*

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The implementation is already small and readable:
  ```text
  find existing tickets
  → append new ticket
  → write updated array
  ```
  No additional abstraction is justified at this stage. No production or test code was changed during the refactor review.

---

### 5. Final Cycle 16 Behavior

```text
[ticketA]
+ save(ticketB)
→
[ticketA, ticketB]
```

**Existing repository behaviors remain unchanged:**

* Missing file returns `[]`
* Valid JSON is read successfully
* Corrupted JSON throws
* First save creates the file
* Existing ticket order is preserved

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Existing data preservation:** Confirmed
* **Regression tests:** Passed
* **Speculative behavior introduced:** No
* **Cycle status:** Completed
---

## Cycle 17 — Find Existing Ticket by ID

### 1. Requirement

Given a JSON file containing multiple tickets:

```text
[ticketA, ticketB]
```

calling:

```text
findById(ticketB.id)
```

must return:

```text
ticketB
```

*Lookup uses exact ID equality.*

---

### 2. RED Phase

A real-filesystem integration test was added for finding an existing ticket by ID.

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed | 5 passed (6)
Duration    622ms
Exit code   1
```

**Failure:**

```text
TypeError: repository.findById is not a function
```

> **Note:** The Red was accepted because the previous five integration tests remained green and the failure directly demonstrated that the `findById` API was missing.

---

### 3. GREEN Phase

The repository interface was extended with:

```typescript
findById(id: string): Promise<Ticket undefined |>;
```

`JsonTicketRepository` implemented:

```typescript
async findById(id: string): Promise<Ticket undefined |> {
  const tickets = await this.findAll();

  return tickets.find((ticket) => ticket.id === id);
}
```

**Observed result:**

```text
Test Files  1 passed (1)
Tests       6 passed (6)
Duration    631ms
Exit code   0
```

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The implementation is already minimal and directly expresses the required lookup behavior.

---

### 5. Final Cycle 17 Behavior

```text
existing ID
→ findById(id)
→ matching Ticket
```

*Not-found behavior remains separate and has not been implemented as an error.*

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Regression tests:** Passed
* **Speculative behavior introduced:** No
* **Cycle status:** Completed
---

## Repository Not-Found Integration Validation

### 1. Requirement

When no stored ticket matches the requested ID:

```text
findById(id)
→ undefined
```

---

### 2. Validation

A real-filesystem integration test was added:

```typescript
it('returns undefined when no ticket has the requested ID', async () => {
  // real temporary tickets.json

  await expect(
    repository.findById('missing-id'),
  ).resolves.toBeUndefined();
});
```

**Observed result:**

```text
Test Files  1 passed (1)
Tests       7 passed (7)
Duration    641ms
```

---

### 3. TDD Assessment

* **A RED was not established.**
* The behavior already existed because `findById()` uses `Array.find()`, which returns `undefined` when there is no matching ticket.
* This test is retained as integration validation rather than Red-Green-Refactor evidence.

---

### 4. Confirmed Repository Contract

```text
existing ID
→ Ticket

missing ID
→ undefined
```

*The repository does not convert a missing ticket into a business error.*

---

### 5. Human Review

* **Missing-ID behavior confirmed:** Yes
* **Valid RED established:** No
* **Production code modified:** No
* **Validation status:** Passed
---

## Cycle 18 — Reject Missing Ticket at Service Layer

### 1. Requirement

Repository lookup behavior remains:

```text
missing ID
→ undefined
```

The service converts that persistence result into a business-level error:

```text
missing ID
→ getTicketById()
→ TicketNotFoundError
```

*The exact error message is not part of the contract.*

---

### 2. RED Phase

A unit test used an in-memory fake repository configured so that:

```text
findById("missing-id")
→ undefined
```

The test expected:

```text
getTicketById(...)
→ reject with TicketNotFoundError
```

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed (1)
Duration    630ms
```

**Failure:**

```text
TypeError: getTicketById is not a function
```

> **Note:** The Red was accepted because the unit test and fake repository executed correctly and the missing service API was the direct cause of failure.

---

### 3. GREEN Phase

A minimal business error was introduced:

```typescript
export class TicketNotFoundError extends Error {}
```

The service implemented:

```typescript
export async function getTicketById(
  repository: TicketRepository,
  id: string,
): Promise<Ticket> {
  const ticket = await repository.findById(id);

  if (ticket === undefined) {
    throw new TicketNotFoundError();
  }

  return ticket;
}
```

**Show-service test result:**

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    651ms
```

**Create-service regression result:**

```text
Test Files  1 passed (1)
Tests       12 passed (12)
Duration    650ms
```

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The service currently expresses the business rule directly:
  ```text
  repository lookup
  → ticket exists: return ticket
  → ticket missing: throw TicketNotFoundError
  ```
  No additional abstraction is justified.

---

### 5. Final Cycle 18 Behavior

```text
repository.findById(id) → undefined
→ service throws TicketNotFoundError
```

*Existing create-ticket behavior remains unchanged.*

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Unit boundary:** Accepted
* **Create regression:** Passed
* **Speculative behavior introduced:** No
* **Cycle status:** Completed
---

## Cycle 19 — Replace Existing Ticket in JSON Storage

### Requirement

Given:

```text
[ticketA, ticketB]
```

and an updated ticket with the same ID as `ticketB`:

```text
updatedTicketB.status = "closed"
```

calling:

```text
repository.update(updatedTicketB)
```

must persist:

```text
[ticketA, updatedTicketB]
```

Requirements:

- matching is performed by exact ticket ID;
- the existing ticket is replaced rather than appended;
- all other tickets remain unchanged;
- array ordering remains unchanged.

### RED

A real-filesystem integration test was added.

Observed result:

```text
Test Files  1 failed (1)
Tests       1 failed | 7 passed (8)
Duration    733ms
Exit code   1
```

Failure:

```text
TypeError: repository.update is not a function
```

The Red was accepted because the previous seven repository integration tests
remained green and the failure directly demonstrated the missing `update` API.

### GREEN

The repository interface was extended with:

```ts
update(ticket: Ticket): Promise<void>;
```

`JsonTicketRepository` implemented:

```ts
async update(ticket: Ticket): Promise<void> {
  const tickets = await this.findAll();

  const updatedTickets = tickets.map((storedTicket) =>
    storedTicket.id === ticket.id ? ticket : storedTicket
  );

  await writeFile(
    this.storagePath,
    JSON.stringify(updatedTickets),
    'utf8',
  );
}
```

Observed result:

```text
Test Files  1 passed (1)
Tests       8 passed (8)
Duration    689ms
Exit code   0
```

### REFACTOR REVIEW

A type-level refactor was justified because the approved W2-D17 status vocabulary
had expanded beyond the earlier creation-only `open` status.

`TicketStatus` was changed to:

```ts
export type TicketStatus = 'open' | 'in_progress' | 'closed';
```

No runtime repository behavior changed.

### Typecheck Support Adjustments

Running the full TypeScript typecheck exposed two support issues.

`tsconfig.json` was updated with:

```json
"types": ["node"]
```

The unit-test `FakeTicketRepository` was also given a no-op `update()` method so
it continued to satisfy the expanded `TicketRepository` interface.

These were type/configuration support changes and did not introduce new
application behavior.

### Regression Validation

Repository integration tests:

```text
Test Files  1 passed (1)
Tests       8 passed (8)
Duration    631ms
```

Typecheck:

```text
tsc --noEmit
Exit code: 0
```

### Final Cycle 19 Behavior

```text
existing ticket
→ update(ticket with same ID)
→ replace ticket in place
→ preserve other tickets and ordering
```

### Human Review

- Red: Accepted
- Green: Accepted
- Refactor: Accepted
- Status type aligned with approved decision: Yes
- Typecheck: Passed
- Runtime behavior changed during refactor: No
- Cycle status: Completed
---

## Cycle 20 — Update Ticket Status at Service Layer

### 1. Requirement

Given an existing ticket:

```text
status = "open"
```

**When:**

```typescript
updateTicketStatus(repository, {
  id: ticket.id,
  status: "closed",
})
```

**Then:**

* Only the ticket status changes;
* All other fields are preserved;
* `repository.update()` receives the updated ticket;
* The updated ticket is returned.

---

### 2. RED Phase

A unit test using an in-memory fake repository was added.

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed (1)
Duration    626ms
```

**Failure:**

```text
TypeError: updateTicketStatus is not a function
```

> **Note:** The Red was accepted because the fake repository executed correctly and the failure directly represented the missing service API.

---

### 3. GREEN Phase

`UpdateTicketInput` was introduced:

```typescript
export interface UpdateTicketInput {
  id: string;
  status: TicketStatus;
}
```

The service implemented:

```typescript
export async function updateTicketStatus(
  repository: TicketRepository,
  input: UpdateTicketInput,
): Promise<Ticket> {
  const ticket = await getTicketById(repository, input.id);

  const updatedTicket = {
    ...ticket,
    status: input.status,
  };

  await repository.update(updatedTicket);

  return updatedTicket;
}
```

**Update-service result:**

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    649ms
```

**Create/show regression result:**

```text
Test Files  2 passed (2)
Tests       13 passed (13)
Duration    882ms
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

> **Note:** An initial sandbox execution encountered an environment-level `EPERM` error. The command was rerun outside that sandbox and passed successfully.

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** `updateTicketStatus()` is already small and reuses `getTicketById()` for ticket lookup and existing not-found behavior. No additional abstraction is justified.

---

### 5. Final Cycle 20 Behavior

```text
existing ticket
→ getTicketById()
→ copy existing ticket
→ replace status only
→ repository.update()
→ return updated ticket
```

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Service regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 21 — Reject Invalid Runtime Ticket Status

### 1. Requirement

Runtime status values are restricted to:

- `open`
- `in_progress`
- `closed`

An invalid runtime status must be rejected before persistence.

---

### 2. RED Phase

The test attempted:

```typescript
status: 'done' as TicketStatus
```

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed | 1 passed (2)
Duration    650ms
Exit code   1
```

**Failures showed that the service:**

* Resolved successfully instead of rejecting;
* Returned a ticket with `status: "done"`;
* Called `repository.update()` with the invalid ticket.

> *This was accepted as a behavioral RED.*

---

### 3. GREEN Phase

A minimal validation error was introduced:

```typescript
export class ValidationError extends Error {}
```

Runtime validation was added before lookup and persistence:

```typescript
if (!['open', 'in_progress', 'closed'].includes(input.status)) {
  throw new ValidationError();
}
```

**Update-service result:**

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    637ms
Exit code   0
```

**Create/show regression:**

```text
Test Files  2 passed (2)
Tests       13 passed (13)
Duration    887ms
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The validation is small and occurs before any persistence side effect.

---

### 5. Final Behavior

```text
valid status
→ continue update

invalid status
→ ValidationError
→ repository.update() not called
```

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 22 — List All Tickets

### 1. Requirement

When no filters are provided, the service returns every ticket supplied by the repository while preserving repository order.

---

### 2. RED Phase

A focused unit test used an in-memory repository containing two distinguishable tickets.

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed (1)
Duration    891ms
Exit code   1
```

**Failure:**

```text
TypeError: listTickets is not a function
```

> **Note:** The RED was accepted because the test and fake repository executed correctly and the failure directly represented the missing service API.

---

### 3. GREEN Phase

The minimal implementation was added:

```typescript
export async function listTickets(
  repository: TicketRepository,
): Promise<Ticket[]> {
  return repository.findAll();
}
```

**List-service result:**

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    654ms
Exit code   0
```

**Service regression:**

```text
Test Files  3 passed (3)
Tests       15 passed (15)
Duration    1.22s
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

> **Note:** An initial sandbox execution encountered an environment-level `EPERM` error. The compiler passed when rerun outside that sandbox.

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The implementation directly delegates to `repository.findAll()` and contains no unnecessary abstraction or duplication.

---

### 5. Final Behavior

```text
repository.findAll()
→ listTickets()
→ same Ticket[] in repository order
```

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 23 — Filter Tickets by Status

### 1. Requirement

Ticket listing may optionally filter tickets by exact status.

Given repository order:

```text
ticketA → open
ticketB → closed
ticketC → open
```

**When:**

```typescript
listTickets(repository, { status: "open" })
```

**Then:**

```text
[ticketA, ticketC]
```

*Must be returned while preserving repository order.*

---

### 2. RED Phase

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed | 1 passed (2)
Duration    662ms
Exit code   1
```

**Expected:**

```text
[ticketA, ticketC]
```

**Received:**

```text
[ticketA, ticketB, ticketC]
```

> **Note:** The existing no-filter listing test remained green. The RED was accepted because the service API existed but ignored the status filter.

---

### 3. GREEN Phase

`TicketFilter` was introduced:

```typescript
import type { TicketStatus } from './ticket.js';

export interface TicketFilter {
  status?: TicketStatus;
}
```

`listTickets()` became:

```typescript
export async function listTickets(
  repository: TicketRepository,
  filter?: TicketFilter,
): Promise<Ticket[]> {
  const tickets = await repository.findAll();

  if (filter?.status === undefined) {
    return tickets;
  }

  return tickets.filter((ticket) => ticket.status === filter.status);
}
```

**List-service result:**

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    617ms
Exit code   0
```

**Service regression:**

```text
Test Files  3 passed (3)
Tests       15 passed (15)
Duration    1.18s
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The implementation is already small and `Array.filter()` naturally preserves relative repository order.

---

### 5. Final Behavior

```text
no status filter
→ return all tickets

status filter
→ exact status match
→ preserve repository order
```

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 24 — Filter Tickets by Priority

### 1. Requirement

* Ticket listing may optionally filter by exact priority.
* When multiple filters are supplied, all supplied filters must match (AND semantics).

---

### 2. RED Phase

**Observed result:**

```text
Test Files  1 failed (1)
Tests       2 failed | 2 passed (4)
Duration    674ms
Exit code   1
```

**Priority-only filtering failure:**
* **Expected:** `[ticketA, ticketC]`
* **Received:** `[ticketA, ticketB, ticketC]`

**Combined status + priority filtering failure:**
* **Expected:** `[ticketA]`
* **Received:** `[ticketA, ticketB]`

> **Note:** The existing no-filter and status-filter tests remained green. The RED was accepted because the failures directly demonstrated that priority was being ignored.

---

### 3. GREEN Phase

`TicketFilter` was extended:

```typescript
import type {
  TicketPriority,
  TicketStatus,
} from './ticket.js';

export interface TicketFilter {
  status?: TicketStatus;
  priority?: TicketPriority;
}
```

`listTickets()` now applies supplied filters using AND semantics:

```typescript
export async function listTickets(
  repository: TicketRepository,
  filter?: TicketFilter,
): Promise<Ticket[]> {
  const tickets = await repository.findAll();

  if (
    filter?.status === undefined &&
    filter?.priority === undefined
  ) {
    return tickets;
  }

  return tickets.filter((ticket) =>
    (filter.status === undefined || ticket.status === filter.status) &&
    (filter.priority === undefined || ticket.priority === filter.priority)
  );
}
```

**List-service result:**

```text
Test Files  1 passed (1)
Tests       4 passed (4)
Duration    644ms
Exit code   0
```

**Service regression:**

```text
Test Files  3 passed (3)
Tests       15 passed (15)
Duration    1.17s
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The implementation is already small, preserves order naturally, and clearly expresses AND semantics.

---

### 5. Final Behavior

```text
no filters
→ all tickets

priority only
→ exact priority match

status + priority
→ both must match
```

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 25 — Filter Tickets by Tags

### 1. Requirement

Ticket listing may optionally filter by tags.

**Tag semantics:**

```text
["bug"]
→ ticket must contain "bug"

["bug", "auth"]
→ ticket must contain BOTH tags
```

*When status, priority, and tags are supplied together, all conditions must match.*

---

### 2. RED Phase

**Observed result:**

```text
Test Files  1 failed (1)
Tests       3 failed | 4 passed (7)
Duration    668ms
Exit code   1
```

*The existing Cycle 22–24 tests remained green. New failures showed that tag filtering was ignored.*

* **Single tag:**
  * **Expected:** `[ticketA, ticketC]`
  * **Received:** `[ticketA, ticketB, ticketC]`
* **Multiple tags:**
  * **Expected:** `[ticketA]`
  * **Received:** `[ticketA, ticketB, ticketC]`
* **Combined status + priority + tags:**
  * **Expected:** `[ticketA]`
  * **Received:** `[ticketA, ticketB]`

> **Note:** The RED was accepted because all failures directly represented missing tag filter behavior.

---

### 3. GREEN Phase

`TicketFilter` was extended with:

```typescript
tags?: string[];
```

The service now applies:

```typescript
filter.tags.every((tag) => ticket.tags.includes(tag))
```

*alongside the existing status and priority conditions.*

**List-service result:**

```text
Test Files  1 passed (1)
Tests       7 passed (7)
Duration    637ms
Exit code   0
```

**Service regression:**

```text
Test Files  3 passed (3)
Tests       15 passed (15)
Duration    1.15s
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

---

### 4. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The implementation is already small and directly expresses the approved filter semantics.

---

### 5. Final Behavior

```text
no filters
→ all tickets

status
→ exact status match

priority
→ exact priority match

tags
→ every requested tag must be present

status + priority + tags
→ all supplied conditions must match
```

---

### 6. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 26 — Create Ticket Through Real CLI Process

### 1. Requirement

Running the real CLI:

```bash
tickets create --title " Fix login "
```

with an isolated `TICKETS_FILE` must create and persist one ticket.

**Expected persisted behavior:**

```text
title  → "Fix login"
status → "open"
```

---

### 2. RED Phase

The CLI subprocess launched successfully and exited with status `0`, but no ticket file was created.

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed (1)
Duration    2.15s
Exit code   1
```

**Failure:**

```text
ENOENT: no such file or directory, open '<temp>/tickets.json'
```

> **Note:** The RED was accepted because the real subprocess environment worked correctly. The failure directly represented missing CLI wiring and persistence behavior.

---

### 3. GREEN Phase

Storage-path resolution was implemented:

```typescript
export function resolveStoragePath(): string {
  return process.env.TICKETS_FILE ??
    resolve(process.cwd(), 'data', 'tickets.json');
}
```

The `create` command was registered with `create --title <title>` and delegates ticket construction to the service:

```typescript
const ticket = createTicket({ title });
await repository.save(ticket);
```

*The CLI composition root now creates the repository, registers the command, and awaits Commander parsing.*

---

### 4. Validation

**CLI E2E:**

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    1.88s
Exit code   0
```

**Repository regression:**

```text
Test Files  1 passed (1)
Tests       8 passed (8)
Duration    672ms
Exit code   0
```

**Create-service regression:**

```text
Test Files  1 passed (1)
Tests       12 passed (12)
Duration    636ms
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

---

### 5. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The composition and command implementations are already small and preserve the intended dependency direction.

---

### 6. Final Behavior

```text
CLI create
→ raw title
→ createTicket()
→ business normalization
→ repository.save()
→ JSON storage
```

---

### 7. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **Real subprocess used:** Yes
* **Real JSON persistence used:** Yes
* **Regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 27 — Create Ticket with Optional CLI Fields

### 1. Requirement

The `create` command supports:

```text
--title <title>
--description <description>
--priority <priority>
--tags <comma-separated-tags>
```

* The command layer only converts the CLI-specific comma-separated tag representation into `string[]`.
* All business normalization remains in `createTicket()`.

---

### 2. RED Phase

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed | 1 passed (2)
Duration    2.57s
Exit code   1
```

**Commander rejected the first unsupported option:**

```text
error: unknown option '--description'
```

> **Note:** The base Cycle 26 CLI create test remained green.

---

### 3. GREEN Phase

The `create` command added optional Commander options:

```typescript
.requiredOption('--title <title>')
.option('--description <description>')
.option('--priority <priority>')
.option('--tags <tags>')
```

The command options are represented as:

```typescript
interface CreateCommandOptions {
  title: string;
  description?: string;
  priority?: string;
  tags?: string;
}
```

* The action delegates to the existing service.
* Because `exactOptionalPropertyTypes` is enabled, optional properties are added only when their CLI option is actually present.
* Tag handling at the command boundary is limited to:

```typescript
options.tags.split(',')
```

> *No business normalization is duplicated in the command.*

---

### 4. Validation

**CLI E2E:**

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    2.62s
Exit code   0
```

**Create-service regression:**

```text
Test Files  1 passed (1)
Tests       12 passed (12)
Duration    633ms
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

---

### 5. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The command remains a thin adapter between Commander input and the existing service.

---

### 6. Final Behavior

```text
CLI options
→ command-boundary parsing
→ createTicket()
→ business normalization
→ repository.save()
```

---

### 7. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **E2E:** Passed
* **Service regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 29 — Filter Tickets Through CLI Options

### 1. Requirement

The `list` command supports:

```bash
--status <status>
--priority <priority>
--tags <comma-separated-tags>
```

**Example:**

```bash
tickets list --status open --priority high --tags bug,auth
```

* The command layer parses CLI representations and delegates filtering semantics to `listTickets()`.

---

### 2. RED Phase

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed | 1 passed (2)
Duration    2.74s
Exit code   1
```

**Commander reported:**

```text
error: unknown option '--status'
```

> **Note:** The existing base list E2E test remained green. The RED was accepted because the actual CLI subprocess and base list behavior worked while the new filter options were not registered.

---

### 3. GREEN Phase

The `list` command added:

```typescript
.option('--status <status>')
.option('--priority <priority>')
.option('--tags <tags>')
```

The CLI-boundary options type is:

```typescript
interface ListCommandOptions {
  status?: string;
  priority?: string;
  tags?: string;
}
```

A `TicketFilter` is constructed only from supplied options:

```typescript
const filter: TicketFilter = {
  ...(options.status === undefined
    ? {}
    : { status: options.status as TicketStatus }),
  ...(options.priority === undefined
    ? {}
    : { priority: options.priority as TicketPriority }),
  ...(options.tags === undefined
    ? {}
    : { tags: options.tags.split(',') }),
};
```

* This preserves `exactOptionalPropertyTypes`.
* The command does not implement filtering rules itself. It delegates:

```typescript
const tickets = await listTickets(repository, filter);
```

---

### 4. Validation

**CLI E2E:**

```text
Test Files  1 passed (1)
Tests       2 passed (2)
Duration    2.58s
Exit code   0
```

**List-service regression:**

```text
Test Files  1 passed (1)
Tests       7 passed (7)
Duration    651ms
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

---

### 5. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The command remains a thin CLI adapter:
  ```text
  Commander strings
  → TicketFilter
  → listTickets()
  ```
  No filtering business logic is duplicated.

---

### 6. Deferred Behavior

Runtime validation for invalid list filter values remains separate. For example:

```bash
--status invalid
--priority urgent
```

*does not yet have a finalized CLI error contract.*

---

### 7. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **E2E:** Passed
* **Service regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed
---

## Cycle 30 — Show Existing Ticket Through CLI

### 1. Requirement

The CLI supports:

```bash
tickets show <id>
```

For an existing ticket, the command retrieves the ticket through the service layer and writes human-readable ticket details to `stdout`.

**Required visible fields:**
* `id`
* `title`
* `description`
* `status`
* `priority`
* `tags`

*Exact final formatting is not yet a stable contract.*

---

### 2. RED Phase

**Observed result:**

```text
Test Files  1 failed (1)
Tests       1 failed (1)
Duration    1.64s
Exit code   1
```

**Commander reported:**

```text
error: unknown command 'show'
```

> **Note:** The RED was accepted because the real subprocess and temporary JSON storage worked correctly and the failure directly represented the missing CLI command.

---

### 3. GREEN Phase

The `show` command was implemented:

```typescript
export function registerShowCommand(
  program: Command,
  repository: TicketRepository,
): void {
  program
    .command('show <id>')
    .action(async (id: string) => {
      const ticket = await getTicketById(repository, id);

      console.log(`ID: ${ticket.id}`);
      console.log(`Title: ${ticket.title}`);
      console.log(`Description: ${ticket.description}`);
      console.log(`Status: ${ticket.status}`);
      console.log(`Priority: ${ticket.priority}`);
      console.log(`Tags: ${ticket.tags.join(', ')}`);
    });
}
```

* The command delegates lookup to `getTicketById(repository, id)` and does not access the repository directly.

---

### 4. Validation

**CLI E2E:**

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    1.82s
Exit code   0
```

**Show-service regression:**

```text
Test Files  1 passed (1)
Tests       1 passed (1)
Duration    923ms
Exit code   0
```

**Typecheck:**

```text
tsc --noEmit
Exit code: 0
```

---

### 5. REFACTOR REVIEW

* **Decision:** No-op refactor review
* **Reason:** The command is already a thin CLI adapter.

---

### 6. Final Behavior

```text
tickets show <id>
→ Commander
→ getTicketById()
→ repository lookup
→ Ticket
→ stdout
```

---

### 7. Human Review

* **Red:** Accepted
* **Green:** Accepted
* **Refactor:** No-op accepted
* **E2E:** Passed
* **Service regression:** Passed
* **Typecheck:** Passed
* **Cycle status:** Completed