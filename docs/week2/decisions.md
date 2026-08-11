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

## Unresolved Decisions

**Status:** `Unresolved`

The following decisions have not yet been approved:

- ID format and generation
- Complete status vocabulary
- Allowed status transitions
- Priority values
- Description validation
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
