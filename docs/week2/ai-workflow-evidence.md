# Week 2 AI Workflow and Validation Evidence

## Control model

AI assistance was used inside a human-controlled, scoped TDD workflow.

The human reviewer:

- approved one observable behavior at a time;
- constrained which files could be read or changed;
- reviewed whether each failure was a valid RED;
- approved GREEN behavior and no-op refactor decisions;
- controlled Git staging and commits.

The AI assistant:

- inspected only the requested project context for each cycle;
- added focused RED tests and reported the observed command output;
- implemented only the approved GREEN behavior;
- reran focused tests, regressions, and typecheck as requested;
- did not stage, commit, or push during the implementation cycles.

## Evidence that results were checked rather than manufactured

- The Cycle 14 valid-JSON test passed immediately because Cycle 13's existing
  `JSON.parse()` already supplied the behavior. It was recorded as validation,
  not relabeled as a fabricated RED/GREEN cycle.
- The first corrupted-JSON preservation test also passed immediately under the
  existing parse behavior. Error classification as `StorageError` was added
  later only after its own behavioral RED.
- Behavioral REDs were accepted when the API existed but behaved incorrectly:
  invalid runtime status was persisted, list filters returned extra tickets,
  and tag filtering was ignored.
- Final validation found an unrelated zero-byte file under `src/test/` that
  Vitest collected as an empty test suite. Removing that unused scaffold was
  recorded as repository cleanup, not as feature TDD.
- Build configuration, npm `bin`, the CLI shebang, and package smoke testing
  were handled as delivery/packaging work rather than forced into a false
  Red -> Green -> Refactor narrative.

## Validation sources

- Vitest unit tests verify service behavior through in-memory fake
  repositories.
- Repository integration tests verify the real filesystem, missing paths,
  valid/corrupted JSON, persistence, lookup, update, and directory creation.
- E2E tests launch the real CLI process and isolate state with `TICKETS_FILE`.
- `npm run typecheck` checks source and tests under strict TypeScript options.
- `npm run build` verifies the source-only production compilation target.
- Package inspection and a temporary local installation validate the npm bin
  without changing global npm state.
- Human review decides whether the observed evidence satisfies the approved
  behavior and whether any scope expansion is acceptable.

AI output is not treated as proof of correctness. The evidence is the checked
repository state, executable tests, typecheck/build results, filesystem
observations, package smoke tests, and human review of scope and behavior.
