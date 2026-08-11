# Week 2 — Project Decisions

This document records human-approved decisions for the Ticket Manager CLI.

- A decision marked `Approved` may be used in tests and implementation.
- A decision marked `Unresolved` must not be assumed by AI or implementation.

---

## W2-D01 — First TDD Behavior

**Status:** `Approved`

The first TDD cycle covers ticket creation with a valid title.

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

---

## W2-D02 — Title Normalization

**Status:** `Approved`

A valid ticket title is trimmed before being stored or returned.

### Example

```text
"  Fix login  " → "Fix login"
```

A blank or whitespace-only title must be rejected.

This behavior was implemented separately from the first TDD cycle so that it
could be demonstrated through its own Red-Green-Refactor cycle.

---

## W2-D03 — Initial Ticket Status

**Status:** `Approved`

A newly created ticket starts with:

```text
open
```

The caller does not choose another status during ticket creation at this stage.

The complete status vocabulary and status-transition rules are still unresolved.

---

## W2-D04 — Cycle 01 Scope

**Status:** `Approved`

Cycle 01 intentionally covered only:

1. Accept a valid title.
2. Trim the title.
3. Set the initial status to `open`.

The following behaviors were intentionally excluded from Cycle 01 and are
introduced through later TDD cycles as separately tested behaviors:

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

---

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
```

```text
description omitted
→
description = ""
```

### Current Limitation

No description length limit has been approved at this stage.

---

## W2-D06 — Ticket Priority

**Status:** `Approved`

### Allowed Values

Ticket priority uses exactly:

- `low`
- `medium`
- `high`

### Normalization

When priority is provided:

- Leading and trailing whitespace is removed.
- The value is normalized to lowercase.

### Examples

```text
" HIGH " → "high"
" Low "  → "low"
```

### Default

When priority is omitted:

```text
priority = "medium"
```

### Validation

Any normalized value outside:

```text
low | medium | high
```

must be rejected.

The exact custom error type and error message are not yet defined.

---

## W2-D07 — Cycle 05 Scope

**Status:** `Approved`

Cycle 05 covers only the default value for an omitted priority:

```text
priority omitted
→ priority = "medium"
```

Cycle 05 does not cover:

- Normalizing values such as `"HIGH"`
- Rejecting invalid priority values

These behaviors will be introduced through separate TDD cycles.

---

## Unresolved Decisions

**Status:** `Unresolved`

The following decisions have not yet been approved:

- ID format and generation
- Complete status vocabulary
- Allowed status transitions
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
