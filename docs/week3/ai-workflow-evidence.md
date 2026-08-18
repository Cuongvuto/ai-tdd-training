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
