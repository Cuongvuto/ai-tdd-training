# Chapter 7 — Common Testing Mistakes Prompt

## Role

Act as a critical software-testing research and technical documentation
assistant.

The developer remains responsible for:

- deciding which risks matter for the project
- reviewing AI-generated recommendations
- distinguishing confirmed requirements from assumptions
- accepting or rejecting proposed testing practices
- validating the final documentation

Do not treat confident AI output, a large test suite, or high code coverage as
automatic evidence of quality.

## Repository Context

This repository contains the Week 1 assignment:

**Test-Driven Development for building reliable CLI tools with AI assistance.**

The practical context is a future file-backed Ticket Manager CLI with commands
such as:

```text
tickets create
tickets list
tickets show <id>
tickets update <id>
```

The completed documentation already covers:

- TDD principles
- Red-Green-Refactor
- testing levels
- a balanced layered testing strategy
- domain, command, JSON-storage, and error testing
- validation of AI-generated code and AI-generated tests

This prompt completes only Chapter 7.

Do not complete Chapters 8 through 10.

Do not perform Iterative Refinement or Final Validation.

## Read First

Inspect:

```text
README.md
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md

docs/week1/prompts/layered-questioning-research.md
docs/week1/prompts/layered-questioning-brief.md
docs/week1/prompts/layered-questioning-example.md
docs/week1/prompts/layered-questioning-validation.md
docs/week1/prompts/solution-exploration-testing-levels.md
docs/week1/prompts/chapter-5-ticket-manager-cli-testing.md
docs/week1/prompts/chapter-6-validating-ai-generated-code.md
```

Also inspect any available Week 1 assignment or training material in the
repository.

## Objective

Complete Chapter 7 in:

```text
docs/week1/research.md
```

Complete:

```text
7.1 Blindly Trusting AI-Generated Tests
7.2 Testing Implementation Details
7.3 Weak or Meaningless Assertions
7.4 Excessive Mocking
7.5 Over-Testing
7.6 Ignoring Failure Paths and Edge Cases
7.7 Confusing Code Coverage with Test Quality
7.8 Writing Tests After the Implementation and Calling It TDD
```

For every section:

1. Define the mistake.
2. Explain why it is risky.
3. Connect it to the Ticket Manager CLI.
4. Give one or more warning signs.
5. Explain how to improve or prevent it.
6. Preserve any unresolved project decisions.
7. Avoid universal claims not supported by evidence.

Do not merely copy the validation log. Synthesize the findings into practical
guidance.

## Section 7.1 — Blindly Trusting AI-Generated Tests

Explain why AI-generated tests require the same critical review as generated
implementation.

Cover risks such as:

- testing an invented requirement
- reproducing the same misunderstanding as the implementation
- asserting behavior that is convenient rather than required
- using nonexistent APIs or incorrect framework syntax
- omitting failure paths
- generating impressive-looking but weak tests
- using mocks that remove the dependency being claimed as validated
- accepting a test only because it passes

Explain correlated-error risk when the same AI generates:

```text
requirement interpretation
implementation
test
expected result
```

Connect this to examples such as:

- accepting whitespace-only ticket titles
- inventing status transitions
- treating malformed and unknown IDs as the same error
- claiming a repository mock proves JSON persistence
- generating a test for an undocumented ordering rule

Provide a practical human-review checklist.

## Section 7.2 — Testing Implementation Details

Explain the difference between:

- observable behavior
- public contract
- collaborator interaction when that interaction is itself relevant
- private implementation detail

Describe brittle tests such as:

- calling private helpers directly
- asserting internal variable names
- requiring a particular loop or data structure
- asserting the exact sequence of internal method calls without a contract
- snapshotting internal objects unnecessarily
- coupling tests to private JSON transformation helpers

Explain that not every mock-interaction assertion is automatically wrong.
Interaction checks can be appropriate when the interaction is part of the
behavior or architectural contract.

Use Ticket Manager examples:

- test `Ticket.create()` output rather than private trimming helper
- test that unrelated tickets survive an update rather than asserting the
  exact array-manipulation algorithm
- test public CLI output semantics rather than parser internals at E2E level
- test repository behavior through its public interface rather than private
  serialization functions

Include one concise conceptual before-and-after example.

## Section 7.3 — Weak or Meaningless Assertions

Build on Chapter 6 without duplicating it word-for-word.

Discuss assertions such as:

```ts
expect(result).toBeDefined();
expect(value).toBeTruthy();
expect(command).not.toThrow();
expect(exitCode).toBe(0);
expect(mock.save).toHaveBeenCalled();
expect(tickets.length).toBeGreaterThan(0);
```

Explain why these may pass even when the important behavior is wrong.

Show stronger alternatives that check:

- normalized title
- initial `open` status
- expected ticket identity
- correct error category
- no false success
- valid JSON
- preservation of unrelated records
- expected stdout or stderr semantics
- expected collaborator argument and call count when interaction matters

Do not recommend asserting every internal field or every formatting character.

Include one concise conceptual TypeScript/Vitest example.

## Section 7.4 — Excessive Mocking

Explain the proper purpose and limitations of test doubles.

Cover risks such as:

- mocks reproducing the implementation instead of the contract
- verifying every internal call
- tests passing while real JSON behavior is broken
- fake repository behavior drifting from the real repository
- complex mock setup making the test harder to understand than production code
- replacing deterministic in-process collaborators unnecessarily
- asserting interaction details instead of outcomes

Clarify where doubles are still useful:

- isolating a use case
- simulating a persistence failure
- checking that invalid input does not trigger storage
- making focused TDD feedback fast
- controlling a difficult dependency

For the Ticket Manager:

- use a fake repository for domain/use-case coordination
- use real temporary storage for JSON claims
- use a subprocess for public CLI claims

Do not state that all mocks are harmful.

## Section 7.5 — Over-Testing

Explain that over-testing is not simply “having many tests.”

Discuss forms such as:

- repeating the same scenario at unit, integration, and E2E levels without new
  evidence
- testing trivial language or framework behavior
- asserting every decorative output detail
- testing private implementation choices
- creating many near-duplicate cases with no meaningful boundary difference
- maintaining obsolete tests after requirements change
- using broad E2E tests for every small rule
- adding tests only to increase count or coverage

Explain the cost:

- slower feedback
- maintenance burden
- brittle refactoring
- unclear suite purpose
- duplicated failures
- reduced attention to higher-risk gaps

Use the Chapter 5 test matrix and the rule:

```text
Use the narrowest boundary that provides the required evidence.
```

Explain that purposeful overlap is valid when different levels supply different
evidence.

## Section 7.6 — Ignoring Failure Paths and Edge Cases

Explain why happy-path-only testing is especially risky for CLI and persistence
software.

Include:

- blank or whitespace title
- missing argument
- malformed ID
- well-formed unknown ID
- empty collection
- no filter matches
- unsupported filter or status after definitions exist
- missing storage file
- corrupted JSON
- invalid path
- persistence failure during create or update
- preservation of unrelated records after failure
- repeated execution
- isolated parallel tests
- platform-specific behavior where relevant

Explain how to find edge cases using:

- input partitioning
- boundary analysis
- conditional-branch review
- dependency failure analysis
- state-before/state-after reasoning
- mutation or faulty-implementation thought experiments
- the Chapter 5 test matrix

Do not claim that a checklist guarantees completeness.

Do not decide unresolved behavior such as missing-file policy, status
vocabulary, filter grammar, ordering, output formatting, or numerical exit
codes.

## Section 7.7 — Confusing Code Coverage with Test Quality

Explain what coverage can and cannot show.

Coverage may reveal:

- unexecuted statements
- unvisited branches
- areas lacking test execution
- regression-suite gaps worth investigating

Coverage does not prove:

- assertions are meaningful
- requirements are correct
- edge cases are complete
- real dependencies were exercised
- business rules were understood
- the application is secure
- the CLI behaves correctly for users
- defects are absent

Discuss examples:

- a test calls `createTicket()` but asserts only `toBeDefined()`
- a corrupted-JSON branch executes but the test accepts silent data loss
- every parser branch runs but malformed and unknown IDs are expected to produce
  the same result incorrectly
- a repository mock reaches full use-case coverage while real JSON is never used

Do not introduce a universal coverage percentage.

Describe coverage as a diagnostic signal, not an acceptance criterion by
itself.

## Section 7.8 — Writing Tests After the Implementation and Calling It TDD

Explain carefully:

- tests written after implementation can still be valuable
- they can provide regression protection
- they can document current behavior
- they can reproduce bugs
- they can support safe refactoring

However, they did not drive the already-written implementation and should not
be presented as evidence that the original work followed TDD.

Distinguish:

```text
test-first TDD
tests added after implementation
characterization tests
regression tests
bug-reproduction tests
```

Explain how AI-assisted work can accidentally become test-after:

1. ask AI to implement a whole feature
2. accept the code
3. ask AI to generate tests that match it
4. call the result TDD

Provide the corrected workflow:

```text
Clarify one behavior
→ review a focused test
→ observe expected Red
→ request minimal implementation
→ observe Green
→ refactor
```

Mention that an expected Red must fail for the intended missing behavior rather
than an unrelated syntax, environment, or dependency problem.

## Summary Table

At the end of Chapter 7, add a concise table:

| Mistake | Main risk | Ticket Manager example | Better practice |
| --- | --- | --- | --- |

Include all eight Chapter 7 mistakes.

Keep entries concise and avoid duplicating the full section text.

## Conceptual Code Requirements

Use TypeScript and Vitest-style syntax.

Any code snippet must be:

- concise
- conceptual
- explicitly unexecuted
- consistent with earlier examples
- focused on public behavior
- free from invented package configuration
- supported by meaningful assertions

Do not create implementation or test files.

## Sources

Prefer existing references where appropriate:

```text
R-001
R-002
R-003
R-004
R-005
R-006
R-010
R-012
R-013
R-015
R-016
R-017
R-018
R-019
R-020
R-021
R-022
```

Add new references only when an important Chapter 7 claim is not adequately
supported.

Possible useful source categories include:

- recognized test-smell or test-maintenance literature
- official code-coverage documentation
- official Vitest or Istanbul coverage documentation
- recognized testing authors
- peer-reviewed studies on test smells or maintainability

Do not invent titles, URLs, authors, findings, dates, or quotations.

Do not use arbitrary coverage thresholds as evidence of quality.

## Validation Log

Add validation entries beginning after the highest existing ID.

Validate at least these claims:

1. A detailed AI-generated test can be trusted without review.
2. Tests should directly call private methods to maximize coverage.
3. Verifying every mock interaction makes tests stronger.
4. More mocks always make tests faster and better isolated.
5. Every scenario should be tested at every level.
6. More tests always mean better reliability.
7. Exact full-output assertions are always preferable.
8. Happy-path coverage is sufficient for a CLI.
9. Full statement coverage proves the requirements are correct.
10. High branch coverage proves edge cases are complete.
11. Tests written after implementation are still TDD.
12. A test that passes immediately can be accepted as the Red step.
13. A snapshot is automatically a meaningful assertion.
14. Removing a brittle test always reduces quality.
15. Test duplication is harmless because tests are not production code.
16. Private implementation details are stable testing contracts.

Use statuses consistently:

```text
Validated
Corrected
Rejected
Contextual
Project Decision
```

Continue sequentially after the highest current validation ID.

Do not create duplicate entries when an existing validation already resolves
the same claim. When a claim overlaps with an existing entry:

- cite or reference the existing validation
- add a new entry only when Chapter 7 introduces a materially different angle
- avoid inflating the validation count with paraphrased duplicates

## Requirements Mapping

Update only requirements affected by Chapter 7.

Expected status guidance:

```text
Explain common testing mistakes → Completed
Record AI validation and corrections → In progress
```

Do not change:

```text
Apply Iterative Refinement
Explain findings during mentor review
```

Do not alter already completed workflow statuses.

## Allowed Changes

You may modify only:

```text
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/requirements-mapping.md
```

Do not modify:

```text
README.md
docs/week1/ai-workflow-evidence.md
docs/week1/prompts/
note/
src/
tests/
package.json
package-lock.json
.gitignore
```

Do not stage, commit, push, merge, or create a pull request.

Do not create executable implementation or test files.

## Quality Requirements

Ensure that:

- Sections 7.1–7.8 contain no `_Not started._`
- the Chapter 7 summary table contains all eight mistakes
- Chapters 8–10 remain unfinished
- earlier chapters are not rewritten unnecessarily
- Chapter 7 synthesizes rather than copies the validation log
- AI-generated tests remain subject to human review
- testing private details is not recommended by default
- mocks are presented contextually, not universally rejected
- purposeful multi-level overlap remains allowed
- coverage is treated as a diagnostic signal
- tests written after code are not mislabeled as TDD
- unresolved project behavior remains unresolved
- no fixed coverage percentage is introduced
- no exact status lifecycle, ordering, output, missing-file, or exit-code policy
  is invented
- reference IDs resolve
- validation IDs are unique and sequential
- Markdown fences are balanced
- tables have consistent columns
- UTF-8 is valid
- no code execution is falsely claimed

## Quality Checks

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Also confirm:

- only allowed documentation files changed
- no implementation or package files were created
- no files were staged
- Sections 7.1–7.8 contain no placeholders
- Chapters 8–10 retain their placeholders
- all new references exist
- all cited references resolve
- validation IDs are unique and sequential
- duplicate validation claims were avoided
- code fences are balanced
- Markdown tables are consistent
- conceptual snippets are marked unexecuted
- LF/CRLF warnings are reported separately from actual errors

## Final Response

Return a structured report containing:

1. Files inspected.
2. Files modified.
3. Chapter 7 sections completed.
4. Blind-trust risks documented.
5. Implementation-detail testing guidance.
6. Weak-assertion guidance.
7. Mocking guidance.
8. Over-testing guidance.
9. Failure-path and edge-case guidance.
10. Coverage guidance.
11. TDD versus test-after distinction.
12. Summary table added.
13. References added or reused.
14. Validation entries added or reused.
15. Requirements statuses updated.
16. Topics intentionally left unfinished.
17. Quality-check results.
18. Confirmation that nothing was staged, committed, or pushed.