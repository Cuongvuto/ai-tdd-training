# Chapter 8 — Practical Testing Strategy for the Ticket Manager CLI

## Role

Act as a software-testing strategy and technical-documentation assistant.

The developer remains responsible for:

- deciding the final project requirements
- evaluating the proposed test portfolio
- accepting or rejecting priorities
- reviewing assumptions
- validating references and technical claims
- deciding the actual Week 2 implementation order

AI recommendations must be presented as contextual proposals, not universal
rules or automatic project approval.

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

Completed research already covers:

- TDD principles
- Red-Green-Refactor
- unit, integration, and end-to-end testing
- Solution Exploration of three testing portfolios
- selection of a balanced layered strategy
- domain and command testing
- JSON persistence and error testing
- validation of AI-generated code and tests
- common testing mistakes

This prompt completes only Chapter 8.

Do not complete Chapters 9 or 10.

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
docs/week1/prompts/chapter-7-common-testing-mistakes.md
```

Also inspect any available Week 1 assignment or training materials.

## Objective

Complete Chapter 8 in:

```text
docs/week1/research.md
```

Complete:

```text
8.1 Proposed Unit Tests
8.2 Proposed Integration Tests
8.3 Proposed End-to-End Tests
8.4 Test Data and Isolation
8.5 Recommended Development Order
8.6 Contextual Decisions
```

Chapter 8 must turn the earlier research into a practical, prioritized starting
strategy for Week 2.

Do not copy the complete Chapter 5 test matrix. Synthesize it into an
implementation-oriented strategy.

## Strategy Foundation

Use the selected contextual strategy:

```text
Many focused unit tests
+ targeted real-file integration tests
+ a small number of process-level E2E tests
```

This is a balanced layered starting point, not a fixed ratio.

Do not provide universal percentages such as:

```text
70% unit
20% integration
10% E2E
```

The strategy must follow this principle:

```text
Use the narrowest boundary that supplies the required evidence, then add a
broader test when the risk crosses a real file-system, component, or public CLI
boundary.
```

## Section 8.1 — Proposed Unit Tests

Create a prioritized unit-test strategy.

Organize unit tests into useful groups such as:

### Domain behavior

Include confirmed behavior:

- trim valid ticket titles
- reject empty or whitespace-only titles
- assign initial status `open`

Do not invent the complete status lifecycle.

### Command input and parsing

Include proposed tests for:

- missing required title
- blank title option
- missing ID
- malformed ID
- missing update status
- unknown command or unsupported option at a focused parser boundary where
  appropriate

Clearly mark unresolved parser policies such as repeated-option handling.

### Use-case behavior

Include proposed tests for:

- create with a fake repository
- list with controlled collections
- show existing ticket
- show well-formed but unknown ID
- update existing ticket
- propagation or mapping of repository failures
- ensuring invalid input does not call persistence
- ensuring false success is not produced after a simulated failure

### Filtering behavior

Status, priority, tag, combined-filter, and ordering tests may be included only
as conditional future tests.

Clearly label them as depending on unresolved project decisions.

For each unit-test group, explain:

- main behavior
- test boundary
- dependencies replaced or kept real
- evidence obtained
- evidence not obtained
- priority for Week 2

Use priority labels such as:

```text
Initial
Next
Later after requirement decision
```

Do not use arbitrary numerical scoring.

Add a concise table:

| Unit-test area | Example behavior | Priority | Main evidence | Not proven |
| --- | --- | --- | --- | --- |

## Section 8.2 — Proposed Integration Tests

Create a targeted real-file integration strategy for the JSON repository.

Include:

- reading an independently seeded valid JSON file
- writing syntactically valid JSON
- write and read round trip
- preserving multiple records
- updating one ticket without losing unrelated tickets
- corrupted or malformed JSON
- invalid path
- selected portable file-system failure
- first use when the storage file does not exist
- cleanup after failed and successful tests
- isolation for repeated and parallel runs

Explain that:

- each test should use its own temporary directory
- tests must not use real user data
- reader and writer need independent checks
- round-trip tests alone can allow correlated defects
- fake repositories do not prove real JSON persistence
- permission behavior may differ across operating systems
- temporary directories improve isolation but do not automatically guarantee
  determinism

Missing-file and corrupted-file recovery behavior remain project decisions.

Add a concise table:

| Integration area | Real boundary | Priority | Evidence | Main risk |
| --- | --- | --- | --- | --- |

Avoid duplicating every domain case through the real file system.

## Section 8.3 — Proposed End-to-End Tests

Propose a small, high-value process-level E2E suite.

The E2E boundary for this project must:

- invoke the public CLI as a separate process
- supply actual command-line arguments
- use isolated temporary JSON storage
- observe relevant stdout
- observe relevant stderr
- observe success or failure process semantics
- inspect storage only when storage effects are part of the claim

Include a small set of candidate journeys such as:

1. create a ticket and list it
2. show an existing ticket
3. update a ticket and verify the stored result
4. reject a representative invalid create request
5. reject or report an unknown command
6. report one representative persistence failure when a portable setup exists

Do not require all six if some produce duplicated evidence. Prioritize a minimal
initial subset and explain which cases can be added later.

Do not assign exact numerical exit codes.

Do not assert complete decorative output unless exact formatting becomes a
public contract.

Add a concise table:

| E2E journey | Initial or later | Public evidence | Broader risk covered |
| --- | --- | --- | --- |

Explain why detailed domain edge cases should usually remain at unit level
instead of being repeated through subprocess tests.

## Section 8.4 — Test Data and Isolation

Define a practical test-data and isolation strategy.

Discuss:

- fixed, readable IDs for focused tests
- deterministic titles and statuses
- small explicit fixtures
- test-data factory or builder only when repetition justifies it
- independently seeded JSON for reader tests
- separate temporary directory for each real-file or E2E test
- explicit storage-path configuration
- cleanup in teardown
- avoiding current user files and production paths
- controlling clock, random ID generation, environment variables, working
  directory, and process configuration when they affect behavior
- avoiding dependency on test execution order
- avoiding shared mutable fixtures
- making tests safe for repeated and parallel execution
- platform-aware path and permission cases

Clarify that random test data is not automatically better. Randomness can make
failures difficult to reproduce unless a seed and failing input are recorded.

Clarify that factories are tools, not mandatory architecture.

Add a short checklist for test isolation.

## Section 8.5 — Recommended Development Order

Create a practical Week 2 development order based on TDD.

The order should use small behavior increments, not generate the entire
application before testing.

A reasonable sequence to evaluate is:

### Phase 0 — Confirm project contracts

Clarify only the decisions required for the next behavior, including:

- ID representation
- storage-path configuration
- status vocabulary needed for update
- missing-file behavior
- public error categories
- minimal output and process semantics

Do not require every future decision before development starts.

### Phase 1 — Domain creation behavior

Use Red-Green-Refactor for:

- trimmed title
- blank-title rejection
- initial `open` status

### Phase 2 — Repository foundation

Develop real-file behavior incrementally:

- read initial storage according to the selected missing-file policy
- write one ticket
- independently read seeded JSON
- preserve multiple tickets
- handle malformed storage according to the selected policy

### Phase 3 — Create command/use case

Connect domain creation with repository behavior.

Keep parser, use-case, repository, and public-process evidence separate.

### Phase 4 — List and show behavior

Add collection listing, ticket lookup, and distinct malformed/not-found/storage
errors.

Do not implement unresolved filters prematurely.

### Phase 5 — Status update

Define the minimum required status vocabulary and transitions before writing
update expectations.

Test preservation of unrelated records.

### Phase 6 — Selected public journeys

Add process-level tests for critical commands after their focused and
real-storage behavior exists.

### Phase 7 — Refactor and expand

Review duplication, test speed, missing risks, and whether broader tests provide
new evidence.

For every phase, explain:

- behavior clarified
- focused Red
- minimum Green
- relevant regression scope
- integration or E2E evidence added
- assumptions recorded
- completion evidence

Add a table:

| Phase | Main behavior | Primary test level | Broader evidence | Exit criterion |
| --- | --- | --- | --- | --- |

Do not claim that this order is the only valid implementation order.

## Section 8.6 — Contextual Decisions

Create a decision register that distinguishes:

### Decisions already accepted

Include only decisions actually supported by earlier documentation, such as:

- use a balanced layered testing strategy
- test domain logic mostly with focused unit tests
- use real temporary JSON storage for persistence claims
- use a small process-level E2E suite
- avoid fixed test-level percentages
- keep human review responsible for accepting AI-generated changes

### Confirmed behavior

Include:

- title is trimmed
- blank or whitespace-only title is rejected
- a new ticket initially has status `open`

### Decisions still required before relevant implementation

Include:

- ID representation and grammar
- full status vocabulary
- allowed status transitions
- repeated-option behavior
- filter grammar
- combined-filter semantics
- list ordering
- missing-file policy
- corrupted-file recovery policy
- storage-path configuration
- exact stdout/stderr contract
- exact output format
- numerical exit codes
- platform-support expectations
- concurrency or file-locking behavior, if relevant

### Decisions that can be deferred

Explain which choices do not need to block the first domain TDD cycle.

Do not silently convert an unresolved item into a recommendation.

Add a table:

| Topic | Current state | Needed before | Evidence or reason |
| --- | --- | --- | --- |

Use states such as:

```text
Accepted project strategy
Confirmed behavior
Decision required
Can be deferred
Illustrative assumption only
```

## Chapter 8 Closing Summary

End Chapter 8 with a concise practical summary.

It should state:

- the initial portfolio shape
- the first behaviors to implement with TDD
- when to add real-file evidence
- when to add process-level evidence
- which decisions remain unresolved
- why the strategy must be revisited after actual execution data exists

Do not claim that the plan has already been executed.

## Avoid These Mistakes

Do not:

- duplicate the entire Chapter 5 matrix
- introduce fixed test ratios
- invent a complete status lifecycle
- invent list ordering
- invent missing-file recovery behavior
- invent exact exit codes
- require all scenarios at all testing levels
- make every repository test E2E
- call a handler test E2E
- use shared user data
- assume a temporary directory guarantees determinism
- treat test count or coverage as a completion criterion
- treat an AI recommendation as final human approval
- claim tests were executed
- create implementation files

## Conceptual Examples

Chapter 8 is primarily a strategy chapter.

Do not add large code samples.

At most one short conceptual example may be added when necessary to clarify
test data or isolation.

Any snippet must be:

- TypeScript/Vitest style
- conceptual
- explicitly unexecuted
- concise
- consistent with earlier proposed APIs
- free from invented package configuration

## Sources

Prefer existing references:

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
R-023
```

Add new references only when an important strategy claim lacks adequate support.

Possible source categories:

- official Node.js test-runner or file-system documentation
- official Vitest documentation
- recognized testing-strategy authors
- test-data and isolation guidance
- reliable test-maintenance literature

Do not invent references or use arbitrary testing ratios.

Project-specific decisions do not require external sources, but must be
labelled as project decisions.

## Validation Log

Continue after the highest existing validation ID.

Validate only materially new strategy claims. Do not duplicate existing entries.

Review claims such as:

1. A practical strategy must define fixed percentages.
2. Every domain case should also be an integration and E2E test.
3. E2E tests should be written first for every behavior.
4. One shared JSON file is simpler and equally reliable.
5. Random test data always finds more defects than fixed data.
6. Test-data builders are required for every project.
7. A temporary directory controls all nondeterminism.
8. The implementation order must follow the visible CLI command list exactly.
9. Every project decision must be finalized before the first TDD cycle.
10. Unresolved requirements can always be decided by the implementation.
11. A fast subprocess test should replace focused unit tests.
12. The selected strategy should never change after implementation begins.
13. Repository round-trip tests are enough without independent reader fixtures.
14. Platform-specific failures can be ignored because the code works locally.
15. A complete test plan proves the future implementation will be reliable.

Use statuses consistently:

```text
Validated
Corrected
Rejected
Contextual
Project Decision
```

When an existing validation already covers a claim:

- cross-reference the existing ID
- do not create a paraphrased duplicate
- add a new ID only for a materially different strategy question

## Requirements Mapping

Chapter 8 may strengthen evidence for already completed requirements, but it
does not automatically complete Iterative Refinement or mentor review.

Expected statuses should remain:

```text
Provide Ticket Manager CLI test examples → Completed
Explain testing of file storage and errors → Completed
Explain how tests validate AI-generated code → Completed
Explain common testing mistakes → Completed
Apply Iterative Refinement → Not started
Explain findings during mentor review → Not started
Record AI validation and corrections → In progress
```

Modify `requirements-mapping.md` only if:

- an existing evidence path becomes inaccurate; or
- a status is inconsistent with the actual repository.

Do not change a status merely because Chapter 8 repeats supporting material.

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

Do not create executable implementation or test files.

Do not stage, commit, push, merge, or create a pull request.

## Quality Requirements

Ensure that:

- Sections 8.1–8.6 contain no `_Not started._`
- Chapters 9 and 10 retain their placeholders
- the strategy is practical and prioritized
- the strategy does not duplicate the Chapter 5 matrix
- unit, integration, and E2E responsibilities remain distinct
- each proposed test boundary matches its evidence
- accepted decisions and unresolved decisions remain separate
- no fixed testing ratio is introduced
- no invented business policy is presented as confirmed
- implementation order remains contextual
- test data does not touch user data
- shared mutable storage is not recommended
- no execution is falsely claimed
- new reference IDs resolve
- validation IDs remain unique and sequential
- duplicated validation claims are avoided
- Markdown code fences are balanced
- Markdown tables have consistent columns
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
- the Chapter 8 prompt remains input and is not modified
- no files are staged
- no implementation or package files exist
- Sections 8.1–8.6 contain no placeholders
- Chapters 9–10 remain unfinished
- citations resolve
- validation IDs remain sequential
- no fixed ratios or exact exit codes were introduced
- all decision-register states are consistent
- Markdown fences and tables are valid
- LF/CRLF warnings are reported separately

## Final Response

Return a structured report containing:

1. Files inspected.
2. Files modified.
3. Chapter 8 sections completed.
4. Proposed unit-test strategy.
5. Proposed integration-test strategy.
6. Proposed E2E strategy.
7. Test-data and isolation strategy.
8. Recommended development order.
9. Accepted contextual decisions.
10. Unresolved decisions.
11. Closing strategy summary.
12. References added or reused.
13. Validation entries added or reused.
14. Requirements-mapping changes or confirmation of no change.
15. Topics intentionally left unfinished.
16. Quality-check results.
17. Confirmation that nothing was staged, committed, or pushed.