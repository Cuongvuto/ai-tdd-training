# Layered Questioning — Research Prompt

## Role

Act as a technical research assistant.

The developer remains responsible for evaluating sources, validating claims,
accepting or rejecting suggestions, and making final decisions.

## Repository Context

This repository contains the Week 1 assignment:

**Test-Driven Development for building reliable CLI tools with AI assistance.**

The practical context is a future Ticket Manager CLI.

The required Layered Questioning workflow is:

```text
Research → Brief → Example → Validation
```

This prompt performs only the **Research** stage.

Do not perform the Brief, Example, Validation, Solution Exploration, or
Iterative Refinement stages yet.

## Read First

Inspect these files before making changes:

```text
README.md
docs/week-1/research.md
docs/week-1/references.md
docs/week-1/validation-log.md
docs/week-1/ai-workflow-evidence.md
docs/week-1/requirements-mapping.md
```

Also inspect any assignment or training material available in the repository
that defines the Week 1 requirements.

## Research Objectives

Research the following subjects:

1. What Test-Driven Development is.
2. The goals and mindset of TDD.
3. TDD as a development and design practice.
4. The Red–Green–Refactor cycle.
5. Why a newly written test should first fail for the expected reason.
6. Benefits of TDD.
7. Limitations and trade-offs of TDD.
8. Situations where TDD is useful.
9. Situations where strict TDD may be excessive or unsuitable.
10. Common misunderstandings about TDD.

## Source Requirements

Use reliable and traceable sources.

Prefer, in this order:

1. Original or foundational sources.
2. Official documentation.
3. Recognized books or publications by established software engineering
   authors.
4. Reputable engineering organizations.

Avoid using low-quality blogs, AI-generated summaries, SEO content, or sources
without identifiable authorship as primary evidence.

Do not treat one author's opinion as a universal rule.

Clearly distinguish between:

- sourced factual claims
- professional opinions
- contextual recommendations
- project-specific decisions

Do not invent references, URLs, authors, quotations, or publication details.

When a source cannot be verified, do not include it as confirmed evidence.

## Allowed Changes

You may modify only:

```text
docs/week-1/research.md
docs/week-1/references.md
docs/week-1/validation-log.md
docs/week-1/ai-workflow-evidence.md
docs/week-1/requirements-mapping.md
```

Do not modify:

```text
README.md
note/
src/
package.json
package-lock.json
.gitignore
docs/week-1/prompts/
```

Do not create implementation files.

Do not stage, commit, push, merge, or create a pull request.

## Research Document Scope

In `docs/week-1/research.md`, complete only these parts:

```text
1.1 Background

2.1 What Is Test-Driven Development?
2.2 The Main Goals of TDD
2.3 TDD as a Development and Design Practice
2.4 Benefits of TDD
2.5 Limitations and Trade-Offs
2.6 When TDD Is Suitable
2.7 When TDD May Be Excessive

3.1 Red: Write a Failing Test
3.2 Green: Write the Minimum Code to Pass
3.3 Refactor: Improve the Design Safely
3.4 Why the Test Must Fail for the Expected Reason
3.6 Common Misunderstandings
```

Do not complete:

```text
3.5 Practical Red–Green–Refactor Example
Chapters 4–10
```

Those sections belong to later workflow stages.

## Writing Requirements

Write in clear professional English.

Preserve the existing heading structure.

Use concise paragraphs instead of repetitive explanations.

For every important research claim, add the relevant reference ID, for example:

```text
[R-001]
```

Do not copy long passages from sources.

Paraphrase accurately and keep quotations minimal.

Avoid claims such as:

- TDD always produces better design.
- TDD eliminates all defects.
- Every test must be a unit test.
- Writing tests after code is automatically TDD.
- High code coverage proves software correctness.
- TDD is always appropriate for every project.

Where evidence or professional opinion is mixed, explain the trade-off.

## References

Update `docs/week-1/references.md`.

At minimum, populate references covering:

- the definition and discipline of TDD
- Red–Green–Refactor
- benefits and limitations
- testing and design feedback

You may add additional reference IDs after R-006 when needed.

For each reference record:

- title
- author or organization
- source type
- URL
- access date
- purpose in the research
- reliability assessment

Do not remove unused placeholder references unless there is a clear reason.
They may be used during later workflow stages.

## Validation Log

Add initial validation entries for important or easily misunderstood claims.

Include at least these topics:

1. Whether TDD means only “writing tests before code.”
2. Whether the Red test needs to fail for the expected reason.
3. Whether Green means writing production-quality final code immediately.
4. Whether Refactor may change externally observable behavior.
5. Whether TDD guarantees defect-free software.
6. Whether TDD always improves design.
7. Whether all projects should use strict TDD.

Use the existing validation template and assign unique sequential IDs beginning
with `V-001`.

Possible statuses include:

```text
Validated
Corrected
Rejected
Contextual
Project Decision
```

Do not mark a claim as validated without supporting reasoning or a reliable
reference.

## AI Workflow Evidence

Update only these sections in
`docs/week-1/ai-workflow-evidence.md`:

```text
2.2 Research Prompt
2.3 Research Result
```

For Section 2.2, link to:

```text
prompts/layered-questioning-research.md
```

Do not duplicate the complete prompt inside the evidence file.

For Section 2.3, provide a concise summary of:

- topics researched
- sources selected
- important claims identified
- uncertainties or trade-offs found
- validation entries created
- sections intentionally left for later stages

Do not complete Sections 2.4 onward.

## Requirements Mapping

Update only requirements directly supported by this research stage.

Use honest statuses such as:

```text
In progress
Partially completed
Completed
Not started
```

Do not mark the full Week 1 assignment as complete.

## Quality Checks

Before finishing, run or perform equivalent checks:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Confirm that:

- only allowed documentation files changed
- no source code was added
- no package files changed
- Markdown fences are balanced
- headings remain correctly ordered
- references cited in research exist
- validation IDs are unique
- unfinished sections remain clearly marked
- UTF-8 text is valid

## Final Response

Return a report containing:

1. Files inspected.
2. Files modified.
3. Research sections completed.
4. References added or updated.
5. Validation entries created.
6. Important corrections or uncertainties.
7. Sections intentionally left unfinished.
8. Quality-check results.
9. Confirmation that no files were staged, committed, or pushed.