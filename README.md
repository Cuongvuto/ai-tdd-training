# Ticket Manager CLI

## Overview

Ticket Manager is a local command-line application built with Node.js,
TypeScript, Commander.js, and a JSON file repository. Vitest covers the domain
services, real filesystem storage, and the CLI through real subprocesses.

The CLI supports creating, listing, showing, and updating tickets.

## Architecture

```text
CLI composition root and Commander commands
  -> ticket services
  -> TicketRepository interface
  -> JsonTicketRepository
  -> tickets.json
```

- `src/cli.ts` composes the application, registers commands, selects the
  storage path, and translates known domain/storage errors for CLI users.
- `src/commands/` parses command-line representations and delegates work. It
  does not duplicate domain normalization or validation.
- `src/services/` implements ticket creation, lookup, listing/filtering, and
  status-update rules.
- `src/models/` defines service inputs, filters, and the Ticket domain shape.
- `src/repositories/` defines the storage boundary and its real JSON-backed
  implementation.

## Setup and validation

```bash
npm install
npm run typecheck
npm run test:run
npm run build
```

`npm run typecheck` checks both source and tests without emitting files.
`npm run build` compiles production source only into `dist/`.

## Development usage

Run the TypeScript entry point directly with the development script:

```bash
npm run dev -- create --title "Fix login"
npm run dev -- list
npm run dev -- show 550e8400-e29b-41d4-a716-446655440000
npm run dev -- update 550e8400-e29b-41d4-a716-446655440000 --status closed
```

## Packaged CLI

The package exposes the executable name `tickets` through `package.json` and
the built entry point `dist/cli.js`. Build the package before using its npm bin:

```bash
npm run build
```

Once the package is installed in a project, the executable can be invoked as:

```bash
tickets create --title "Fix login"
tickets create \
  --title "Fix login" \
  --description "Authentication is broken" \
  --priority high \
  --tags bug,auth,backend

tickets list
tickets list --status open
tickets list --priority high
tickets list --tags bug,auth
tickets list --status open --priority high --tags bug,auth

tickets show 550e8400-e29b-41d4-a716-446655440000
tickets update 550e8400-e29b-41d4-a716-446655440000 --status closed
```

## Domain rules

- Ticket statuses are `open`, `in_progress`, and `closed`.
- Ticket priorities are `low`, `medium`, and `high`.
- A new ticket receives a UUID, starts with status `open`, defaults to priority
  `medium`, and defaults an omitted description to `""`.
- Titles and provided descriptions are trimmed. A blank title is invalid.
- Priorities supplied to `create` are trimmed and lowercased, then validated.
- Created tags are trimmed and lowercased; empty and duplicate normalized tags
  are removed while first-occurrence order is preserved.
- List filters use AND semantics across status, priority, and tags. A ticket
  must contain every requested tag, and repository order is preserved.
- Status updates accept only the three approved status values and preserve all
  other ticket fields.

## Storage

By default, tickets are stored at `data/tickets.json` relative to the current
working directory. Set `TICKETS_FILE` to use an explicit file instead:

```powershell
$env:TICKETS_FILE = 'C:\temp\tickets.json'
npm run dev -- list
```

- Reading a missing file returns an empty ticket list and creates nothing.
- The first write creates missing parent directories and the JSON file.
- A malformed JSON file is reported as a storage error. It is not deleted,
  reset, overwritten, or treated as an empty store.

## CLI errors

Known failures are translated at the CLI boundary and exit with code `1`:

| Failure | stderr |
| --- | --- |
| Invalid domain input | `Invalid input` |
| Missing ticket | `Ticket not found` |
| Corrupted JSON storage | `Storage error` |

Unexpected errors are rethrown rather than silently swallowed.

## Testing and TDD evidence

- Unit tests in `tests/unit/` isolate service behavior with fake repositories.
- Integration tests in `tests/integration/` use real temporary filesystem
  paths for `JsonTicketRepository`.
- E2E tests in `tests/e2e/` launch the actual CLI through project-local `tsx`
  and isolate storage with `TICKETS_FILE`.

Final Week 2 validation completed with **10 test files and 40 tests passing**.
The recorded Red -> Green -> Refactor cycles are in
`docs/week2/tdd-cycle-log.md`; requirement traceability and final validation
evidence are in `docs/week2/requirements-mapping.md` and
`docs/week2/final-validation.md`.
