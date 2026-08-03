# Chapter 5 — Testing a Ticket Manager CLI Prompt

## Role

Act as a software-testing research and technical documentation assistant.

The developer remains responsible for:

- evaluating all proposed test cases
- identifying unsupported assumptions
- accepting or rejecting recommendations
- deciding the final Ticket Manager behavior
- validating the completed documentation

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
- a conceptual Ticket creation example
- unit, integration, and end-to-end testing
- a balanced layered testing strategy

The selected contextual testing approach uses:

- focused unit tests for business behavior
- targeted integration tests for real JSON persistence
- a small number of process-level end-to-end tests for critical CLI journeys

This prompt completes only Chapter 5.

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
```

Also inspect any Week 1 assignment or training material available in the
repository.

## Objective

Complete Chapter 5 in:

```text
docs/week1/research.md
```

Complete:

```text
5.2 Testing Domain and Business Rules
5.3 Testing Command Input Validation
5.4 Testing the Create Command
5.5 Testing the List Command
5.6 Testing the Show Command
5.7 Testing the Update Command
5.8 Testing File Storage
5.9 Testing Error Handling
5.10 Example Test Matrix
```

Chapter 5 must explain what should be tested in a Ticket Manager CLI and at
which boundary each behavior should be tested.

Do not complete Chapters 6 through 10.

## Scope and Assumptions

The examples are conceptual documentation only.

Do not create:

```text
src/
tests/
package.json
package-lock.json
```

Do not claim that any test was executed.

Do not assume undocumented business rules are confirmed requirements.

The following behavior is already established by the existing conceptual
example:

- a ticket title must not be empty or whitespace-only
- a valid title is trimmed
- a newly created ticket initially has status `open`

Other possible fields include:

```text
description
priority
tags
status
```

However, validation limits, allowed status transitions, ordering rules, filter
syntax, file paths, and exact exit codes are not yet confirmed.

Where a concrete example requires such behavior:

- label it clearly as an illustrative assumption
- distinguish it from a confirmed requirement
- do not present it as a universal rule
- record important assumptions as project decisions or unresolved questions

## Testing Boundaries

For every proposed test, identify the appropriate level:

### Unit test

Use for focused behavior such as:

- title validation
- status rules
- filter predicates
- command-input parsing functions
- use-case decisions
- error mapping that does not require a real process

A unit test may use a fake or test double when real persistence is outside the
claim being tested.

### Integration test

Use when the claim concerns a real boundary such as:

- JSON serialization
- JSON deserialization
- writing to a real temporary file
- reading after writing
- missing storage files
- corrupted JSON
- path behavior
- selected file-system errors

Integration tests should use isolated temporary directories rather than user
data.

### End-to-end test

Use when the claim concerns the public executable behavior, such as:

- command-line arguments
- command routing
- standard output
- standard error
- exit status
- process working directory
- environment configuration
- observable storage results after a command runs

Do not classify a directly invoked command handler as an end-to-end test.

## Section 5.2 — Testing Domain and Business Rules

Explain tests for behavior such as:

- valid title creation
- title trimming
- blank-title rejection
- initial status `open`
- validation of priority or tags only when treated as an explicit illustrative
  assumption
- status updates only when the allowed behavior has been defined
- keeping business rules independent from CLI formatting and JSON storage

Include a concise conceptual Vitest-style unit-test example.

The example must remain consistent with Section 3.5.

Do not introduce a complete Ticket status lifecycle unless the requirements
support it.

## Section 5.3 — Testing Command Input Validation

Explain how to test:

- missing required arguments or options
- blank values
- unsupported option values
- malformed IDs
- repeated options
- invalid combinations of options
- help requests
- unknown commands

Distinguish between:

- parsing or validation functions tested directly
- public CLI behavior tested through a subprocess

Avoid asserting every formatting character unless exact formatting is a
documented contract.

Include one small conceptual example.

## Section 5.4 — Testing the Create Command

Cover at least:

- successful ticket creation
- title normalization
- initial `open` status
- rejected blank title
- storage call or persistence result
- output representing the created ticket
- storage failure
- no partial success when persistence fails

Distinguish which cases belong to:

- unit tests
- integration tests
- end-to-end tests

Do not require every case at all three levels.

## Section 5.5 — Testing the List Command

Cover at least:

- empty ticket collection
- multiple tickets
- filtering by status
- filtering by priority
- filtering by tags
- combined filters
- no matching tickets
- invalid filter values
- persistence read failure

Do not invent an ordering guarantee.

If ordering is discussed, mark it as an unresolved project decision unless the
assignment defines it.

Avoid brittle assertions based on complete table formatting when testing
business filtering behavior.

## Section 5.6 — Testing the Show Command

Cover at least:

- existing ticket ID
- missing ticket ID argument
- malformed ID
- well-formed but unknown ID
- persistence read failure
- correct output fields for an existing ticket

Explain the difference between:

- invalid input
- ticket not found
- storage unavailable

Do not collapse these errors into one category without explanation.

## Section 5.7 — Testing the Update Command

The assignment requires updating ticket status.

Cover at least:

- updating an existing ticket
- missing ID
- unknown ID
- missing new-status value
- unsupported status value
- persistence failure
- unchanged stored data when update fails
- output after successful update

Do not invent complex transition rules.

If examples use statuses other than `open`, clearly state that they are
illustrative assumptions pending confirmation of the complete status model.

## Section 5.8 — Testing File Storage

Explain integration tests for real JSON persistence using a unique temporary
directory for each test.

Cover:

- first use when the storage file does not exist
- writing valid JSON
- reading saved tickets
- preserving multiple records
- updating one record without losing others
- malformed or corrupted JSON
- invalid path
- selected permission or file-system errors
- cleanup after each test
- isolation between parallel or repeated tests

Do not assume whether a missing file means:

```text
empty ticket collection
```

or:

```text
storage error
```

Treat that behavior as a project decision unless defined elsewhere.

Explain that:

- a mock repository cannot prove real JSON persistence
- a temporary directory improves isolation but does not automatically prove
  determinism
- platform-specific permission behavior may differ

Include one concise conceptual integration-test example.

## Section 5.9 — Testing Error Handling

Organize errors into useful categories:

- input or usage errors
- domain-validation errors
- ticket-not-found errors
- persistence or infrastructure errors
- unexpected internal errors

Explain what should be checked at different levels.

At the public CLI boundary, relevant observable behavior may include:

- standard output
- standard error
- non-zero or zero exit status
- whether storage was modified

Do not assign exact numerical exit codes unless they are explicitly defined as
a project contract.

Explain why checking only an error message or only an exit status can provide
incomplete evidence.

Include failure-path cases rather than documenting only successful behavior.

## Section 5.10 — Example Test Matrix

Create a practical test matrix containing approximately 20–30 meaningful test
cases.

Use columns similar to:

| Area | Scenario | Test level | Real dependencies | Expected evidence | Main risk covered |
| --- | --- | --- | --- | --- | --- |

Include coverage for:

- domain rules
- command validation
- create
- list
- show
- update
- JSON storage
- error handling
- public CLI journeys

The matrix must not repeat every behavior at every level.

Each row should justify why its selected boundary is appropriate.

Clearly mark any scenario that depends on an unresolved project decision.

## Conceptual Code Requirements

Use TypeScript and Vitest-style syntax for examples.

Code snippets must:

- be concise
- demonstrate test intent
- avoid production-scale implementations
- contain meaningful assertions
- avoid excessive mocks
- avoid asserting private implementation details
- be clearly labelled as conceptual and unexecuted

Do not claim that imports, package configuration, or test execution currently
exist.

## Common Mistakes to Avoid in Chapter 5

Do not recommend:

- mocking the JSON repository and calling that a real persistence test
- testing private methods directly
- repeating every scenario at unit, integration, and E2E levels
- asserting only that a function “does not throw”
- asserting only an exit code when output or storage behavior matters
- using one shared real data file across tests
- modifying actual user ticket data
- depending on test execution order
- treating an unknown ID as the same error as malformed input
- using snapshots for all CLI output without evaluating brittleness
- assuming a high test count means sufficient coverage

## Source Requirements

Prefer existing references where they already support the claim, including:

```text
R-003
R-004
R-005
R-006
R-013
R-015
R-016
R-017
```

Use reliable sources only.

Add new references only when Chapter 5 makes an important claim not supported by
the existing reference set.

Prefer:

- official Node.js documentation
- official test-framework documentation
- recognized testing authors
- official CLI-library documentation when directly relevant
- reputable testing publications

Do not invent sources, URLs, authors, or publication metadata.

Do not use a source merely to justify a project-specific assumption.

## Validation Log

Add validation entries beginning after the highest existing ID.

Review at least these claims:

1. A command-handler test is automatically an end-to-end test.
2. A mock repository proves JSON file persistence.
3. Checking only that a command does not throw is sufficient.
4. Checking only the exit status proves correct CLI behavior.
5. Every scenario should be repeated at all testing levels.
6. Temporary directories automatically make file tests deterministic.
7. Missing, malformed, and unknown IDs are equivalent errors.
8. Exact CLI formatting should always be asserted in every test.
9. A passing write test proves the read implementation works.
10. Tests may safely share one mutable JSON fixture.
11. Successful paths are sufficient; storage and validation failures need not
    be tested.
12. A large number of tests proves the CLI is reliable.

Use statuses consistently:

```text
Validated
Corrected
Rejected
Contextual
Project Decision
```

Do not create entries for trivial formatting issues.

Continue sequentially after the highest existing validation ID.

## Requirements Mapping

Update only requirements directly affected by Chapter 5.

Expected status guidance:

```text
Provide Ticket Manager CLI test examples → Completed
Explain testing of file storage and errors → Completed
Explain common testing mistakes → In progress
Record AI validation and corrections → In progress
```

Do not mark these as completed:

```text
Explain how tests validate AI-generated code
Apply Iterative Refinement
Explain findings during mentor review
```

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

Do not create implementation or executable test files.

Do not stage, commit, push, merge, or create a pull request.

## Quality Requirements

Ensure that:

- Sections 5.2–5.10 contain no `_Not started._`
- Chapters 6–10 remain unfinished
- examples remain conceptual and unexecuted
- assumptions are clearly labelled
- test levels match the evidence they provide
- no command behavior is invented as a confirmed requirement
- no exact status lifecycle is invented
- no ordering guarantee is invented
- no fixed exit-code contract is invented
- references are traceable
- validation IDs are unique and sequential
- the test matrix has consistent columns
- code fences are balanced
- UTF-8 is valid

## Quality Checks

Before finishing, run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Confirm:

- only allowed files changed
- no implementation or package files exist
- no files were staged
- all Chapter 5 headings remain correctly ordered
- all new citations resolve
- validation IDs continue sequentially
- Chapters 6 through 10 remain untouched
- Markdown fences and tables are valid

## Final Response

Return a structured report containing:

1. Files inspected.
2. Files modified.
3. Chapter 5 sections completed.
4. Domain and command-validation examples added.
5. Create/list/show/update coverage.
6. File-storage coverage.
7. Error-handling coverage.
8. Test-matrix size and structure.
9. Assumptions or unresolved project decisions.
10. References added or reused.
11. Validation entries added.
12. Requirements statuses updated.
13. Topics intentionally left unfinished.
14. Quality-check results.
15. Confirmation that nothing was staged, committed, or pushed.