# Week 2 — Project Decisions

This document records human-approved decisions for the Ticket Manager CLI.

- A decision marked `Approved` may be used in tests and implementation.
- A decision marked `Unresolved` must not be assumed by AI or implementation.

---

## W2-D01 — First TDD Behavior

**Status:** `Approved`

The first TDD cycle will cover ticket creation with a valid title.

### Input

```ts
{
  title: string;
}
```

### Example

```text
"  Fix login  "
```

### Expected Observable Result

```text
title = "Fix login"
status = "open"
```

## W2-D02 — Title Normalization

**Status:** `Approved`

A valid ticket title is trimmed before being stored or returned.

### Example

```text
"  Fix login  " → "Fix login"
```

Blank or whitespace-only title rejection is already a confirmed requirement,
but it will be implemented in a separate TDD cycle.

## W2-D03 — Initial Ticket Status

**Status:** `Approved`

A newly created ticket starts with:

```text
open
```

The complete status vocabulary and status-transition rules are not yet defined.

The first TDD cycle does not allow the caller to choose another status.

## W2-D04 — First Cycle Scope

**Status:** `Approved`

Cycle 01 will cover only:

1. Accept a valid title.
2. Trim the title.
3. Set the initial status to `open`.

Cycle 01 will not implement:

- Blank-title rejection
- Description
- Priority
- Tags
- ID generation
- Timestamps
- JSON persistence
- CLI commands
- Filtering
- Ticket update

These will be introduced through later TDD cycles.

## W2-D05 — Ticket Description

**Status:** `Approved`

### Behavior

Ticket description is optional.

When provided, leading and trailing whitespace is removed.

When omitted, the description is stored as an empty string.

### Examples

```text
description = "  Login button does not work  "
→
description = "Login button does not work"

description omitted
→
description = ""
```

### Current Limitation

No description length limit has been approved at this stage.

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

Command:

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

Failure:

```text
AssertionError: expected undefined to be 'Login button does not work'
```

The Red was accepted because the existing behaviors passed and only the new
description behavior was missing.

### GREEN

`createTicket` was extended to accept an optional description and trim it when
provided.

Command:

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

### REFACTOR

A small readability refactor replaced the conditional object spread with an
explicit base ticket and description branch.

No new behavior was introduced.

Regression result:

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

Existing Cycle 01 and Cycle 02 behaviors remain unchanged.

### Human Review

- Red failure reason: Accepted
- Green implementation: Accepted
- Refactor: Accepted
- Regression tests: Passed
- Speculative behavior introduced: No
- Cycle status: Completed

## Unresolved Decisions

**Status:** `Unresolved`

The following decisions have not yet been approved:

- ID format and generation
- Complete status vocabulary
- Allowed status transitions
- Priority values
- Description length limits
- Tag syntax and normalization
- Filter semantics
- List ordering
- Missing JSON file behavior
- Corrupted JSON behavior
- Default storage path
- Output format
- `stdout`/`stderr` rules
- Numerical exit codes
- Platform support
- Concurrency/file locking
