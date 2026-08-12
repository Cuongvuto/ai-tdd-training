# Week 2 Final Validation

## Functional coverage

| Area | Validated state |
| --- | --- |
| Create | Required title; optional description, priority, and comma-separated tags; UUID and defaults supplied by the service |
| List | All tickets plus status, priority, and all-requested-tags filters; repository order preserved |
| Show | Existing ticket details include id, title, description, status, priority, and tags |
| Update | Status changes to an approved value while all other fields remain unchanged |
| Storage | Missing file reads as empty; first write creates parents; valid JSON persists; malformed JSON is preserved and classified |

## Error presentation

| Condition | CLI result |
| --- | --- |
| Invalid domain input | stderr contains `Invalid input`; exit code 1 |
| Missing ticket | stderr contains `Ticket not found`; exit code 1 |
| Corrupted JSON storage | stderr contains `Storage error`; exit code 1; corrupted contents unchanged |
| Unexpected error | Rethrown rather than classified as a known user-facing error |

## Automated validation

The final complete suite was run with:

```text
npm run test:run
```

Observed result:

```text
Test Files  10 passed (10)
Tests       40 passed (40)
Duration    6.85s
Exit code   0
```

TypeScript validation was run with:

```text
npm run typecheck
tsc --noEmit
Exit code: 0
```

The production build was run with:

```text
npm run build
tsc -p tsconfig.build.json
Exit code: 0
```

The build includes `src/` only, emits to `dist/`, produces `dist/cli.js`, and
retains the Node shebang required by the package executable.

## Packaging validation

- `package.json` exposes `tickets` through `./dist/cli.js`.
- `npm pack` produced `ai-tdd-training-1.0.0.tgz`.
- The tarball was installed into a temporary local consumer; no global install
  and no `npm link` were used.
- The package-local `tickets --help` exposed create, list, show, and update.
- An isolated `TICKETS_FILE` smoke test created and listed a ticket through the
  packaged binary.
- Observed create stdout contained `Created ticket: Packaging smoke test`.
- Observed list stdout contained `Packaging smoke test`.

## Known deferred concerns

- Concurrency and file locking.
- Atomic writes, backups, and recovery.
- Runtime JSON schema validation and migration.
- Exact stable long-term success-output wording/layout.
- Platform support beyond the recorded validation environment.
- Description length limits.
- Library-package semantics for the stale `package.json` `main` field.

These are delivery notes, not claims that the deferred behavior is implemented.
