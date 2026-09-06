# Layered Questioning — Practical Example Prompt

## Role

Act as a TypeScript testing and technical documentation assistant.

The developer remains responsible for checking whether the example correctly
demonstrates Test-Driven Development and whether the design decisions are
appropriate for the Ticket Manager CLI context.

## Repository Context

This repository contains the Week 1 research assignment:

**Test-Driven Development for building reliable CLI tools with AI assistance.**

The required workflow is:

```text
Research → Brief → Example → Validation
```

The Research and Brief stages are complete.

This prompt performs only the **Practical Example** stage.

Do not perform final Validation, Solution Exploration, or Iterative Refinement.

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
```

## Objective

Create one clear conceptual TypeScript example demonstrating a complete
Red–Green–Refactor cycle for the future Ticket Manager CLI.

The example must focus on this behavior:

> A newly created ticket must have a non-empty title and its initial status must
> be `open`.

The example is documentation only. Do not create implementation files.

## Example Scope

Complete only:

```text
docs/week1/research.md
Section 3.5 — Practical Red–Green–Refactor Example
```

The example must contain:

1. A small statement of desired behavior.
2. The Red test.
3. The expected reason for failure.
4. The minimum Green implementation.
5. The passing-test expectation.
6. A Refactor step.
7. The unchanged externally observable behavior.
8. A brief explanation of what the example demonstrates.
9. Limitations of the conceptual example.

## Technical Context

Use conceptual TypeScript with Vitest-style syntax.

The example may use names such as:

```text
Ticket
Ticket.create()
TicketStatus
DomainValidationError
```

Do not require an existing package, test runner, or implementation.

Do not imply that the code was executed unless it actually was.

Clearly label all snippets as conceptual or illustrative.

## Red Requirements

The Red stage should demonstrate a focused failing test for the desired
behavior.

It must include assertions that:

- the created ticket has the supplied title
- the created ticket initially has status `open`
- an empty or whitespace-only title is rejected

Explain that the initial failure must be caused by missing behavior, not by:

- a syntax error
- an incorrect import
- a broken test fixture
- a missing test dependency
- an unrelated repository error

## Green Requirements

Provide the smallest responsible implementation that satisfies the tests.

The implementation may:

- trim the title
- reject an empty title
- assign initial status `open`

Do not add unrelated properties, persistence, CLI parsing, JSON storage,
repository interfaces, or advanced validation.

Green must not be presented as the final production design.

## Refactor Requirements

Show a small behavior-preserving improvement, such as:

- extracting title validation
- introducing a status type
- improving names
- reducing duplication

Explain why the refactor does not intentionally change observable behavior.

Do not add a new business feature during Refactor.

## Evidence Rules

Use only existing research claims and references.

Do not:

- conduct new research
- add new references
- add unsupported universal claims
- claim that the example proves TDD always produces good design
- claim that passing tests prove complete correctness

Reference existing IDs where appropriate.

## Allowed Changes

Modify only:

```text
docs/week1/research.md
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
```

Do not modify:

```text
README.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/prompts/
note/
src/
package.json
package-lock.json
.gitignore
```

Do not create source code or test files.

Do not stage, commit, push, merge, or create a pull request.

## AI Workflow Evidence

Update only:

```text
Section 2.6 — Practical Example Prompt
Section 2.7 — Practical Example Result
```

In Section 2.6, link to:

```text
prompts/layered-questioning-example.md
```

Do not duplicate the complete prompt.

In Section 2.7, summarize:

- the chosen behavior
- the Red failure
- the Green implementation
- the Refactor
- important limitations

Do not complete Section 2.8 or later workflow sections.

## Requirements Mapping

Update only statuses directly affected by the practical example.

Do not mark these requirements as complete:

- complete Ticket Manager CLI testing examples
- testing-level comparison
- file-storage testing
- AI-generated code validation
- full Layered Questioning workflow

## Quality Checks

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Confirm that:

- only allowed files changed
- no source or package files changed
- all code fences are balanced
- the example clearly separates Red, Green, and Refactor
- no code execution is falsely claimed
- unfinished sections remain marked
- no new references or validation IDs were created

## Final Response

Return a report containing:

1. Files inspected.
2. Files modified.
3. Behavior demonstrated.
4. Red stage summary.
5. Green stage summary.
6. Refactor stage summary.
7. Limitations recorded.
8. Requirements statuses updated.
9. Quality-check results.
10. Confirmation that nothing was staged, committed, or pushed.