# Solution Exploration — Testing Levels Prompt

## Role

Act as a software testing research and solution-exploration assistant.

The developer remains responsible for evaluating the alternatives, accepting
or rejecting recommendations, and making the final contextual decision.

## Repository Context

This repository contains the Week 1 assignment:

**Test-Driven Development for building reliable CLI tools with AI assistance.**

The practical context is a future Ticket Manager CLI with commands such as:

```text
tickets create
tickets list
tickets show <id>
tickets update <id>
```

Ticket data is expected to be stored locally in JSON files during later
implementation.

The Layered Questioning workflow has already been completed.

This prompt begins the **Solution Exploration** workflow:

```text
Explore options → Compare trade-offs → Human evaluation → Contextual decision
```

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
```

Also inspect any Week 1 assignment or training material available in the
repository.

## Exploration Problem

Explore this question:

> How should unit, integration, and end-to-end tests be combined for a
> file-backed Ticket Manager CLI?

The purpose is not to choose one testing level as universally superior.

The purpose is to understand:

- what each testing level verifies
- what dependencies each level includes
- which failures each level detects well
- the costs and limitations of each level
- how the levels complement one another
- which testing mix is suitable for the Ticket Manager CLI context

## Options to Explore

Compare at least these three strategies:

### Option A — Unit-heavy strategy

Emphasize fast isolated tests for domain rules, use cases, validation, and
command handlers, using test doubles where appropriate.

Use only a small number of integration and end-to-end tests.

### Option B — Balanced layered strategy

Use:

- many focused unit tests
- targeted integration tests for JSON persistence and component boundaries
- a small number of end-to-end CLI tests for critical user journeys

### Option C — End-to-end-heavy strategy

Test most behavior by executing the CLI through its public command interface
and real file storage.

Use fewer isolated unit tests.

Do not assume in advance that one option is correct. Compare all options
fairly before recommending a contextual approach.

## Comparison Criteria

Compare the options using:

1. Feedback speed.
2. Failure localization.
3. Confidence in component collaboration.
4. Confidence in real CLI behavior.
5. File-system coverage.
6. Test isolation.
7. Determinism.
8. Maintenance cost.
9. Brittleness.
10. Setup complexity.
11. Suitability for TDD.
12. Ability to validate AI-generated implementation.
13. Value for a small training project.
14. Value if the application grows later.

## Research Scope

Complete only Chapter 4 in:

```text
docs/week1/research.md
```

Complete:

```text
4.1 Unit Testing
4.2 Integration Testing
4.3 End-to-End Testing
4.4 Comparison Table
4.5 Testing Pyramid and Test Distribution
4.6 Choosing the Appropriate Testing Level
```

Do not complete Chapters 5 through 10.

Chapter 4 must explain the general concepts and connect them to the future
Ticket Manager CLI without designing the complete test suite yet.

## Definitions and Boundary Rules

Explain carefully that test-level terminology can depend on the chosen system
boundary.

Avoid oversimplified statements such as:

- a unit test must test exactly one function or class
- every test using more than one object is an integration test
- integration testing means only testing a database
- end-to-end testing replaces lower-level tests
- unit tests prove the complete application works
- end-to-end tests provide complete correctness
- more end-to-end tests always produce more confidence
- testing pyramids require a universal fixed percentage
- all projects must follow a specific numerical ratio

Clearly distinguish:

- the system under test
- real versus replaced dependencies
- process boundaries
- file-system boundaries
- public user-facing behavior
- test purpose

## Testing Pyramid

Explain the testing pyramid as a heuristic or strategy, not an immutable law.

Do not introduce fixed ratios such as:

```text
70% unit
20% integration
10% end-to-end
```

unless a source explicitly proposes them and the document clearly labels them
as contextual rather than universal.

Mention alternative test distributions only when supported and relevant.

## Source Requirements

Use reliable and traceable sources.

Prefer:

1. Foundational testing publications.
2. Official framework or platform documentation.
3. Recognized software-testing authors.
4. Reputable engineering organizations.
5. Peer-reviewed or academically credible research when appropriate.

Avoid treating low-quality blogs, SEO pages, or anonymous summaries as primary
evidence.

Do not invent references, authors, URLs, publication details, or quotations.

Distinguish between:

- definitions
- practitioner heuristics
- empirical evidence
- contextual recommendations
- project-specific decisions

## References

Update:

```text
docs/week1/references.md
```

Prefer using the existing placeholder IDs where appropriate:

```text
R-003
R-004
R-005
R-006
```

Add additional reference IDs only when necessary.

At minimum, provide references supporting:

- unit testing
- integration testing
- end-to-end or system-level testing
- testing pyramid or test distribution
- test doubles or isolation where relevant
- CLI or process-level testing where relevant

For every source record:

- title
- author or organization
- source type
- URL
- access date
- purpose
- reliability assessment

Do not remove existing references used by Chapters 1 through 3.

## Validation Log

Review important or frequently misunderstood testing-level claims.

Add validation entries beginning after the highest existing validation ID.

Include at least these questions:

1. Does a unit test always mean testing exactly one class or function?
2. Is every test using multiple objects automatically an integration test?
3. Does integration testing only mean testing a database?
4. Can unit tests prove the complete CLI works?
5. Do end-to-end tests eliminate the need for unit and integration tests?
6. Are end-to-end tests always more valuable because they are more realistic?
7. Does the testing pyramid require fixed percentages?
8. Is one testing distribution suitable for every project?
9. Can a mocked test prove that real JSON persistence works?
10. Can a passing end-to-end test prove complete correctness?

Use statuses consistently:

```text
Validated
Corrected
Rejected
Contextual
Project Decision
```

Do not add validation entries for trivial formatting matters.

## Solution Exploration Evidence

Update only these sections in:

```text
docs/week1/ai-workflow-evidence.md
```

Complete:

```text
3.2 Problem Selected for Exploration
3.3 Options Considered
3.4 Comparison Criteria
3.5 AI Comparison
```

### Section 3.2

State the selected problem:

> How should unit, integration, and end-to-end tests be combined for a
> file-backed Ticket Manager CLI?

### Section 3.3

Describe Options A, B, and C without selecting a winner prematurely.

### Section 3.4

Record the comparison criteria used.

### Section 3.5

Provide the AI-generated comparison.

Include:

- a concise comparison table
- advantages
- disadvantages
- risks
- conditions where each option could be reasonable
- a provisional recommendation clearly labeled as an AI suggestion

Do not complete:

```text
3.6 Human Evaluation
3.7 Contextual Decision
3.8 Assumptions and Limitations
```

Those sections must remain for the developer after reviewing the AI comparison.

Link this prompt from Section 3.5 or an appropriate introductory sentence using:

```text
prompts/solution-exploration-testing-levels.md
```

Do not duplicate the full prompt inside the evidence file.

## Requirements Mapping

Update only requirements affected by this stage.

Expected status guidance:

```text
Compare testing levels → Completed
Apply Solution Exploration → In progress
```

Do not mark Solution Exploration as completed until the developer records:

- Human Evaluation
- Contextual Decision
- Assumptions and Limitations

Do not change unrelated requirements.

## Allowed Changes

You may modify only:

```text
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
```

Do not modify:

```text
README.md
docs/week1/prompts/
note/
src/
package.json
package-lock.json
.gitignore
```

Do not create implementation or executable test files.

Do not stage, commit, push, merge, or create a pull request.

## Quality Requirements

Ensure that:

- definitions remain clear
- testing levels are not treated as rigid universal categories
- no testing level is presented as universally superior
- trade-offs are tied to context
- the recommendation remains provisional
- references are traceable
- empirical and practitioner claims are distinguished
- Chapters 5 through 10 remain unfinished
- no source-code execution is claimed

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
- no source or package files changed
- code fences are balanced
- tables have consistent columns
- reference IDs cited in Chapter 4 exist
- validation IDs are unique and sequential
- completed Chapter 4 sections no longer contain `_Not started._`
- unfinished Chapters 5 through 10 retain their placeholders
- Sections 3.6 through 3.8 remain unfinished
- UTF-8 text is valid
- no files were staged

## Final Response

Return a structured report containing:

1. Files inspected.
2. Files modified.
3. Testing-level definitions added.
4. Options compared.
5. Comparison criteria used.
6. Provisional AI recommendation.
7. References added or updated.
8. Validation entries added.
9. Requirements statuses updated.
10. Topics intentionally left unfinished.
11. Quality-check results.
12. Confirmation that nothing was staged, committed, or pushed.

Finally, provide a short summary of the provisional recommendation so the
developer can evaluate it before completing Sections 3.6 through 3.8.