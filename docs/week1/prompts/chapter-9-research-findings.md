# Chapter 9 — Research Findings Prompt

## Role

Act as a critical software-testing research synthesis and technical
documentation assistant.

Your task is to synthesize the completed Week 1 research into clear findings
and practical lessons.

The developer remains responsible for:

- checking whether the findings accurately represent the completed research
- distinguishing verified claims from practitioner guidance
- distinguishing confirmed project behavior from unresolved decisions
- reviewing AI-generated summaries for omissions and overstatements
- accepting or rejecting the final wording
- deciding how the findings should influence Week 2 implementation

Do not treat this synthesis as new execution evidence.

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

Completed research currently covers:

- TDD principles and limitations
- Red-Green-Refactor
- unit, integration, and end-to-end testing
- Solution Exploration of testing portfolios
- a selected balanced layered testing strategy
- Ticket Manager CLI testing examples
- JSON persistence and error handling
- validation of AI-generated implementation and tests
- common testing mistakes
- a practical Week 2 testing strategy

This prompt completes only Chapter 9.

Do not complete Chapter 10.

Do not perform Iterative Refinement, mentor review, Final Validation, or Week 2
implementation.

## Read First

Inspect:

```text
README.md
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
```

Inspect all available Week 1 prompts, especially:

```text
docs/week1/prompts/layered-questioning-research.md
docs/week1/prompts/layered-questioning-brief.md
docs/week1/prompts/layered-questioning-example.md
docs/week1/prompts/layered-questioning-validation.md
docs/week1/prompts/solution-exploration-testing-levels.md
docs/week1/prompts/chapter-5-ticket-manager-cli-testing.md
docs/week1/prompts/chapter-6-validating-ai-generated-code.md
docs/week1/prompts/chapter-7-common-testing-mistakes.md
docs/week1/prompts/chapter-8-practical-testing-strategy.md
```

Also inspect any available assignment or training material in the repository.

## Objective

Complete Chapter 9 in:

```text
docs/week1/research.md
```

Complete:

```text
9.1 Key Findings
9.2 Important Corrections to AI Suggestions
9.3 Lessons for Week 2
```

Chapter 9 must synthesize the accepted results from earlier chapters. It must
not introduce a new testing strategy or repeat every earlier section.

Do not complete Chapter 10.

## General Synthesis Rules

Every finding should be traceable to one or more of:

- completed research sections
- references
- validation-log entries
- accepted workflow decisions
- confirmed Ticket Manager behavior
- explicitly recorded project decisions

Clearly distinguish:

```text
Research finding
Practitioner recommendation
Empirical finding
Accepted project strategy
Confirmed project behavior
Unresolved project decision
Illustrative assumption
Future execution evidence
```

Do not collapse these categories.

Do not claim that:

- TDD guarantees defect-free software
- TDD always improves productivity or design
- tests prove complete correctness
- a large test count proves reliability
- coverage proves requirement correctness
- mocks prove real JSON persistence
- E2E tests make focused tests unnecessary
- AI-generated tests independently validate AI-generated code automatically
- the Chapter 8 plan has been executed
- the Ticket Manager CLI has already been implemented

## Section 9.1 — Key Findings

Write a structured synthesis of the most important Week 1 findings.

Organize the section into concise thematic groups.

### TDD findings

Include findings such as:

- TDD is more than writing tests first
- Red must fail for the expected missing behavior
- Green means the smallest responsible implementation
- Refactor must preserve observable behavior
- TDD supplies feedback rather than proof of correctness
- TDD suitability depends on context, cost, risk, feedback speed, and skill
- empirical results should not be generalized as guarantees

### Testing-level findings

Include:

- unit, integration, and E2E tests provide different evidence
- classification depends on the exercised boundary, not object count
- a handler test is not automatically E2E
- a real temporary file-system boundary is necessary for JSON persistence claims
- a separate process is necessary for the selected public CLI E2E boundary
- broader tests are not automatically more valuable
- purposeful overlap is valid when each level supplies distinct evidence
- fixed testing percentages are not required

### AI-assisted development findings

Include:

- AI output is a proposal requiring human review
- code that compiles can still implement the wrong behavior
- AI-generated tests can contain weak assertions or invented requirements
- implementation and tests generated by the same AI may share the same error
- tests should be reviewed against the original requirement
- human diff review remains necessary even when tests pass
- AI can assist with exploration, examples, comparison, and refinement but does
  not approve its own final output

### Ticket Manager strategy findings

Include:

- confirmed behavior remains deliberately small:
  - valid title is trimmed
  - blank or whitespace-only title is rejected
  - new ticket starts with status `open`
- the accepted starting portfolio is:
  - many focused unit tests
  - targeted real-file integration tests
  - a small process-level E2E suite
- use the narrowest boundary that provides the needed evidence
- real JSON reader and writer need independent checks
- temporary directories improve isolation but do not guarantee determinism
- failure categories should remain distinguishable
- test plans are not execution evidence

### Testing-quality findings

Include:

- assertion strength matters more than professional-looking syntax
- tests should observe meaningful behavior
- excessive mocking can hide real-boundary defects
- over-testing concerns duplicated evidence and maintenance cost, not simply test
  count
- coverage is a diagnostic signal
- failure paths and edge cases are required
- tests written after implementation may be valuable but are not retrospective
  TDD

Add a concise summary table:

| Theme | Main finding | Practical implication |
| --- | --- | --- |

Keep the table concise and avoid repeating every validation entry.

## Section 9.2 — Important Corrections to AI Suggestions

Summarize the most important corrections made during Week 1.

Do not list every validation entry individually.

Group related corrections into categories such as:

### TDD corrections

Examples:

- “TDD only means tests first”
- “any Red failure is acceptable”
- “Green must be final production design”
- “passing tests prove defect-free software”
- “TDD always improves design or productivity”

### Test-boundary corrections

Examples:

- “one class or function always defines a unit”
- “multiple objects automatically means integration”
- “integration only means database”
- “direct handler calls are E2E”
- “repository mocks prove JSON persistence”
- “E2E tests replace lower levels”

### Assertion and evidence corrections

Examples:

- “does not throw is enough”
- “exit status alone proves CLI behavior”
- “professional-looking tests are trustworthy”
- “coverage or test count proves quality”
- “a round-trip test proves both reader and writer independently”
- “passing regression tests prove no unrelated changes”

### AI-assisted-development corrections

Examples:

- “compilation means generated code is correct”
- “generated tests prove generated implementation”
- “the same AI automatically provides independent validation”
- “tests remove the need to inspect the diff”
- “tests can decide ambiguous requirements”

### Strategy corrections

Examples:

- “fixed percentages are required”
- “every case must be repeated at every level”
- “random test data is always stronger”
- “test-data builders are mandatory”
- “all decisions must be made before starting TDD”
- “the visible command order dictates development order”
- “a complete test plan proves future reliability”

For each correction group, explain:

1. the original weak or misleading suggestion
2. why it was insufficient
3. the corrected conclusion
4. how the correction affected the research or strategy

Add a compact table:

| Incorrect or weak suggestion | Corrected conclusion | Impact |
| --- | --- | --- |

Use representative corrections rather than copying all validation-log entries.

Reference relevant validation IDs where useful, for example:

```text
[V-002]
[V-017]
[V-023]
```

Do not invent validation IDs.

## Section 9.3 — Lessons for Week 2

Translate the research into practical lessons for future implementation.

Organize the lessons as an implementation checklist or ordered guidance.

Include lessons such as:

### Clarify behavior before generating code

- choose one small behavior
- distinguish confirmed requirements from assumptions
- record unresolved decisions
- do not allow implementation convenience to define requirements

### Review the test before implementation

- ensure the test describes the actual requirement
- ensure assertions would detect a plausible defect
- ensure the boundary matches the intended evidence
- confirm the expected Red reason

### Ask AI for small changes

- request one focused test or implementation increment
- reject speculative fields, statuses, filters, abstractions, or dependencies
- inspect the diff rather than accepting a full generated feature blindly

### Use layered evidence

- unit tests for domain, parsing, and use-case behavior
- real temporary JSON integration tests for persistence claims
- a small subprocess E2E suite for public journeys
- avoid repeating every edge case at every level

### Preserve data and failure semantics

- distinguish invalid input, not-found, storage failure, and unexpected errors
- verify no false success after failure
- verify unrelated records survive updates
- independently test reader and writer behavior
- never use actual user storage during tests

### Keep tests maintainable

- assert meaningful public behavior
- avoid private implementation coupling
- use mocks only where they provide relevant focused evidence
- avoid shared mutable fixtures
- avoid exact decorative-output assertions unless part of the contract
- use coverage only to identify investigation areas

### Record actual evidence

During Week 2, record:

- expected Red output
- reason the Red failure is valid
- Green test result
- regression result
- integration or E2E result where relevant
- changed files
- assumptions and decisions
- human review findings
- remaining risks
- test duration, flakiness, and platform observations when available

### Revisit the strategy

Explain that the Chapter 8 strategy is an initial plan.

It should be adjusted using actual evidence about:

- test speed
- failure diagnosis
- maintenance burden
- platform differences
- flaky behavior
- duplicated coverage
- missed risks
- implementation architecture

Add a Week 2 readiness checklist:

```text
[ ] The next behavior is clear.
[ ] The expected public evidence is clear.
[ ] Unresolved decisions are recorded.
[ ] The test boundary is justified.
[ ] The proposed test has meaningful assertions.
[ ] The expected Red reason is known.
[ ] AI-generated code will be reviewed before acceptance.
[ ] Real-file evidence is planned when persistence is involved.
[ ] Process-level evidence is planned only for public CLI risks.
[ ] User data and shared mutable fixtures are excluded.
[ ] Failure paths and unchanged-state expectations are identified.
[ ] The final diff and test evidence will be recorded.
```

Do not claim the checklist guarantees correctness.

## Chapter 9 Closing Statement

End Chapter 9 with a short statement explaining that Week 1 produced:

- a validated understanding of TDD
- a contextual testing strategy
- examples and a test matrix
- corrections to unreliable AI suggestions
- a Week 2 implementation starting plan

Also state that Week 1 did not produce:

- a complete CLI implementation
- executable tests
- observed Red/Green results
- performance or flakiness data
- proof of reliability

## References

Prefer existing references.

This is primarily a synthesis chapter, so new references should normally not be
required.

Use existing references only where they support the summarized claim.

Do not cite every sentence unnecessarily.

Do not add new references merely to increase the reference count.

When summarizing empirical findings, preserve the limitations already stated in
the original research.

Do not add new empirical statistics unless already present and accurately
supported.

## Validation Log

Chapter 9 should primarily synthesize existing validated findings.

Do not create validation entries merely because a finding is summarized again.

Add a new validation entry only when Chapter 9 introduces a materially new claim
that has not already been evaluated.

Before adding any entry:

1. search the existing validation log
2. check whether the claim is already covered
3. reuse or cite the existing ID when possible
4. avoid paraphrased duplicate entries

It is acceptable for Chapter 9 to add zero new validation entries.

If a genuinely new entry is required:

- continue after the highest existing ID
- keep IDs unique and sequential
- use an appropriate status
- state why the existing log did not already cover the claim

## Requirements Mapping

Do not mark mentor review as completed.

Expected statuses should remain:

```text
Explain TDD principles → Completed
Explain Red-Green-Refactor → Completed
Compare testing levels → Completed
Provide Ticket Manager CLI test examples → Completed
Explain testing of file storage and errors → Completed
Explain how tests validate AI-generated code → Completed
Explain common testing mistakes → Completed
Apply Layered Questioning → Completed
Apply Solution Exploration → Completed
Apply Iterative Refinement → Not started
Record AI validation and corrections → In progress
Explain findings during mentor review → Not started
```

Chapter 9 research findings are not the same as actual mentor-review findings.

Modify `requirements-mapping.md` only if the current file is inconsistent with
the actual repository evidence.

## Allowed Changes

You may modify only:

```text
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/requirements-mapping.md
```

Expected minimum change:

```text
docs/week1/research.md
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

Do not create implementation or executable test files.

Do not stage, commit, push, merge, or create a pull request.

## Quality Requirements

Ensure that:

- Sections 9.1–9.3 contain no `_Not started._`
- Chapter 10 remains unfinished
- Chapter 9 synthesizes rather than duplicates earlier chapters
- key findings remain traceable
- empirical findings retain their limitations
- project strategy and universal testing claims remain separate
- confirmed behavior and unresolved decisions remain separate
- correction examples match existing validation entries
- no fake mentor-review findings are invented
- no Week 2 execution evidence is claimed
- no new business policy is introduced
- no fixed test ratio or coverage target is introduced
- no complete status lifecycle is invented
- no exact exit-code or output contract is invented
- no execution is falsely claimed
- references resolve
- validation IDs remain unique and sequential
- Markdown fences are balanced
- tables have consistent columns
- UTF-8 is valid

## Quality Checks

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Also verify:

- only allowed tracked files changed
- no files are staged
- no implementation or package files were created
- Sections 9.1–9.3 contain no placeholders
- Chapter 10 retains its placeholder
- all correction references point to existing validation IDs
- no duplicate validation entries were added
- no new unresolved decision was silently accepted
- Markdown fences and tables are valid
- LF/CRLF warnings are reported separately from actual errors

## Final Response

Return a structured report containing:

1. Files inspected.
2. Files modified.
3. Chapter 9 sections completed.
4. Main TDD findings.
5. Main testing-level findings.
6. Main AI-assisted development findings.
7. Ticket Manager strategy findings.
8. Testing-quality findings.
9. Important AI suggestions corrected.
10. Lessons for Week 2.
11. Week 2 readiness checklist.
12. Chapter 9 closing statement.
13. References added or reused.
14. Validation entries added or reused.
15. Requirements-mapping changes or confirmation of no change.
16. Topics intentionally left unfinished.
17. Quality-check results.
18. Confirmation that nothing was staged, committed, or pushed.