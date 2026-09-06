# Layered Questioning — Brief Prompt

## Role

Act as a technical documentation assistant.

The developer remains responsible for evaluating the accuracy, relevance, and
clarity of the final summary.

## Repository Context

This repository contains the Week 1 research assignment:

**Test-Driven Development for building reliable CLI tools with AI assistance.**

The required Layered Questioning workflow is:

```text
Research → Brief → Example → Validation
```

The Research stage has already been completed.

This prompt performs only the **Brief** stage.

Do not perform the Example, Validation, Solution Exploration, or Iterative
Refinement stages.

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
```

## Objective

Produce a concise technical brief based only on the completed Research-stage
content.

The brief should help a developer or mentor quickly understand:

1. What TDD is.
2. Why TDD is more than writing tests before production code.
3. How Red–Green–Refactor works.
4. Why the Red test must fail for the expected reason.
5. The main potential benefits of TDD.
6. The limitations and trade-offs of TDD.
7. When TDD is suitable.
8. When strict TDD may be excessive or unsuitable.
9. Important misconceptions corrected during the Research stage.
10. Which topics remain intentionally unfinished for later stages.

## Evidence Rules

Use only claims already present in:

```text
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
```

Do not:

- conduct new research
- introduce new sources
- create new reference IDs
- create new validation IDs
- add unsupported claims
- present contextual recommendations as universal rules
- change the meaning of existing research

Preserve reference IDs where important claims are summarized.

## Allowed Changes

Modify only:

```text
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
```

Do not modify:

```text
README.md
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/prompts/
note/
src/
package.json
package-lock.json
.gitignore
```

Do not stage, commit, push, merge, or create a pull request.

## AI Workflow Evidence

Update only these sections in:

```text
docs/week1/ai-workflow-evidence.md
```

### Section 2.4 — Brief Prompt

Link to:

```text
prompts/layered-questioning-brief.md
```

Do not duplicate the full prompt.

Briefly explain that the prompt requested a concise synthesis of the completed
Research stage without introducing new claims or sources.

### Section 2.5 — Brief Result

Write a concise summary of approximately 400–700 words.

The result should include:

- definition and mindset of TDD
- Red–Green–Refactor
- benefits
- limitations
- suitability
- corrected misconceptions
- remaining research scope

The brief must remain readable as a standalone summary but should not duplicate
the full research document.

Do not complete Sections 2.6 onward.

## Requirements Mapping

Update only statuses directly affected by the completion of the Research and
Brief stages.

Use honest statuses such as:

```text
Not started
In progress
Partially completed
Completed
```

Do not mark the complete Week 1 assignment as finished.

Requirements involving these topics must remain incomplete:

- practical Ticket Manager CLI examples
- comparison of unit, integration, and end-to-end testing
- AI-generated code validation examples
- Solution Exploration
- Iterative Refinement
- Final Validation

## Quality Requirements

The brief must:

- use clear professional English
- remain concise
- avoid repeating the same idea in multiple paragraphs
- distinguish evidence from contextual recommendation
- avoid absolute claims
- preserve correct TDD terminology
- accurately reflect the completed Research stage

## Quality Checks

Before finishing, run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Confirm that:

- only the two allowed documentation files changed
- no new sources or validation IDs were introduced
- no unfinished workflow stage was completed
- Markdown headings and fences remain valid
- no source or package files changed

## Final Response

Return a report containing:

1. Files inspected.
2. Files modified.
3. Summary of the brief produced.
4. Requirements statuses updated.
5. Topics intentionally left unfinished.
6. Quality-check results.
7. Confirmation that nothing was staged, committed, or pushed.