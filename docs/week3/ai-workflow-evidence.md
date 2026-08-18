# Week 3 AI Workflow Evidence

## Control model

- Mentor-provided Week 3 documents are the authoritative requirement sources.
- AI proposals are labeled separately from mentor-specified requirements.
- A human approves project technical decisions before implementation.
- Work is scoped to one observable TDD behavior at a time.
- Tests are written and run before the corresponding minimum implementation.
- RED classification is reviewed by the human rather than accepted from an AI
  claim.
- Scope review checks whether future-cycle behavior was added accidentally.
- The AI does not stage, commit, or push changes.

## Cycle 1 correction

The initial Cycle 1 run failed because `MockKBClient` could not be imported. The
test body did not run. Human review correctly reclassified this as a structural
or setup failure, not a behavioral RED.

The project did not manufacture a replacement RED after implementation or
rewrite the observed history. The correction is recorded in
`tdd-cycle-log.md`.

## Week 3 Cycle 2

The human wrote the Cycle 2 behavioral test before the production change.

The initial test run produced a genuine behavioral RED:

```text
Expected 1 result
Received 0 results
```

The existing title-search test remained green, showing that the failure was
specific to the missing content-search behavior.

After the RED was reviewed, the implementation was changed only enough to add
content matching while preserving title precedence.

Scope review confirmed that tag matching, `topK`, validation, list, retrieve,
add, commands, and HTTP behavior were not implemented early.

## Week 3 Cycle 3

The human selected the tag-only query `support` so the test could distinguish
tag matching from title or content matching. Scope remained limited to the tag
search branch and preservation of title, content, then tag precedence.

No verified pre-implementation failing run is available for Cycle 3, so no
behavioral RED is claimed. Future cycles must run and capture their focused RED
before production implementation.

Validation exposed a stale Cycle 1 full-object expectation after `support` was
added to the deterministic seed tags. The expected fixture was corrected to
match the approved seed change; production search behavior was not altered to
satisfy the stale assertion. The title, content, and tag tests then passed.

## Week 3 Cycle 4

The human wrote and ran a focused test for deterministic ordering and `topK`
limiting. Its first version used `topK = 5` with two matching documents while
expecting one result.

Human/Agent review investigated the failure instead of automatically treating
it as a valid TDD RED. Because `topK` is an upper bound, returning both
available matches was correct. The expectation was corrected to `topK = 1`,
and the focused suite then passed.

No fake RED was manufactured after the production implementation was known.
This cycle records the distinction between a failing test and evidence of
missing behavior: every failure must be checked against the approved contract
before it is accepted as a behavioral RED.

## Week 3 Cycle 5

Cycle 5 remained limited to search input validation. The implementation reused
the existing `ValidationError` for blank queries and invalid `topK` values;
no KB-specific validation hierarchy or later-cycle behavior was introduced.

No verified pre-GREEN behavioral RED was captured for Cycle 5A or Cycle 5B,
so none is claimed. The negative and decimal `topK` tests were added after the
implementation already handled those values and are recorded as
regression/edge-case coverage, not as separate RED/GREEN evidence.

Human review continues to accept a RED only when an observed failing run shows
that approved behavior is absent or incorrect. Passing tests, source
inspection, typecheck, and build are current validation evidence; they do not
rewrite the order of earlier implementation events.

## Week 3 Cycle 6

Structural setup was deliberately separated from behavioral TDD evidence.
`ListInput`, the client contract, and an empty `MockKBClient.list()` stub were
introduced so the list test could execute. The test then received `[]` instead
of the expected exact-node documents, which was accepted as a valid behavioral
RED because the required behavior—not module or type setup—was missing.

The minimum GREEN used exact `nodePath` filtering, preserving deterministic
seed order without sorting or recursive traversal. A duplicate list test found
in the search test file was removed as organization cleanup, leaving search
and list behavior in separate focused suites.

Human-controlled scope kept list limit and validation, CLI behavior, retrieve,
add, HTTP integration, and environment switching out of Cycle 6.

## Week 3 Cycle 7

Cycle 6 exact-node matching and seed order were preserved while list limiting
and validation were introduced. Adding `limit` to `ListInput` and updating the
existing Cycle 6 call site were treated as structural/type preparation rather
than behavioral RED evidence. Limit retained “at most K” semantics.

No verified pre-GREEN failure is available for Cycle 7A, 7B, or 7C, so none is
claimed. The negative and decimal limit cases are recorded as
regression/edge-case coverage of the general positive-integer rule rather than
separate RED/GREEN cycles.

List validation reused `ValidationError` instead of introducing another error
class. Scope remained limited to `MockKBClient.list`; CLI, retrieve, add,
recursive listing, HTTP integration, and environment switching were not added.

## Week 3 Cycle 8

Human review resolved the pre-cycle CLI contract before implementation:
`tickets kb list`, required `--node` and `--limit` options without defaults,
and title-per-line stdout with silent empty results. These choices are recorded
as project technical decisions rather than mentor-specified syntax or schemas.

Accidental zero-byte scaffolds were removed before Cycle 8 because their
module/test-suite failure was structural and could not be used as RED evidence.
Typed registrar stubs plus an `it.todo` scaffold were then validated separately
as structural preparation.

The executable test was accepted as a valid behavioral RED only after it ran,
failed because `--node` was not registered, and the 54 prior tests remained
green. The minimum GREEN added nested command registration, required option
parsing, numeric conversion, and exact-once `KBClient.list()` delegation.

Typecheck subsequently caught a Commander overload problem involving an
`undefined` option description. It was corrected as a type-validation issue,
not relabeled as behavioral RED. Final evidence was one focused test passing,
55 full-suite tests passing, and a passing typecheck.

Scope review prevented stdout implementation, production `src/cli.ts` wiring,
subprocess E2E, other KB commands, HTTP integration, and environment switching
from entering this first Cycle 8 slice. The approved stdout behavior remains a
separate test-driven slice.

For the stdout slice, the human-approved contract was converted into a focused
test before production changed. The test received no log calls while the prior
delegation test passed, and the full RED run left all 55 earlier tests green.
This was accepted as Cycle 8's second valid behavioral RED because the approved
output behavior—not module setup—was absent.

The minimum GREEN printed each returned document title in client order. Silent
empty-result behavior and both missing-required-option cases were added only
after GREEN and are classified as regression/contract coverage, not newly
manufactured REDs. Test setup was refactored without changing production
behavior.

Final evidence is five focused tests passing, 59 full-suite tests passing,
typecheck passing, and build passing. Scope review still excludes production
`src/cli.ts` wiring, subprocess E2E, other KB commands, HTTP integration, and
environment switching. Cycle 8 is complete for its approved in-process scope.

## Evidence standard

AI statements are not proof that behavior works. Evidence comes from:

- focused executable tests;
- full regression tests;
- TypeScript typecheck;
- production build;
- Git diff and status review;
- human review of requirement source, RED classification, and implementation
  scope.

Cycle 1 scope review confirmed that content search, tag search, `topK`,
validation, list, retrieve, add, commands, and HTTP/configuration behavior were
not implemented.
