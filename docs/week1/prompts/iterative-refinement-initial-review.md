# Iterative Refinement — Initial Review Prompt

## Role

Act as a critical software-testing research reviewer.

Your task is to perform the initial review stage of the Week 1 Iterative
Refinement workflow.

Do not refine or rewrite the research yet.

Produce structured feedback that a human developer can evaluate before any
changes are accepted.

The human developer remains responsible for:

- accepting, rejecting, or modifying every suggestion
- deciding which changes are worth making
- distinguishing correctness problems from stylistic preferences
- approving all later document modifications
- validating the final result

AI feedback is a review proposal, not an automatic decision.

## Repository Context

The repository contains the Week 1 assignment:

**Test-Driven Development for building reliable CLI tools with AI assistance.**

The main research document now contains Chapters 1–10 and covers:

- TDD principles and limitations
- Red-Green-Refactor
- unit, integration, and end-to-end testing
- Ticket Manager CLI testing
- JSON persistence and error handling
- validation of AI-generated code and tests
- common testing mistakes
- a practical Week 2 strategy
- findings and conclusion

The required AI workflows are:

```text
Layered Questioning
Solution Exploration
Iterative Refinement
```

Layered Questioning and Solution Exploration have already been documented.

This prompt begins only the Iterative Refinement workflow.

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

Inspect all prompt files under:

```text
docs/week1/prompts/
```

Also inspect:

```text
note/README.md
```

Use `note/README.md` only as personal supporting context. Do not treat it as an
official deliverable or rewrite it.

## Objective

Complete only these sections in:

```text
docs/week1/ai-workflow-evidence.md
```

```text
4.2 Initial Review Prompt
4.3 Initial AI Feedback
```

Do not complete or modify:

```text
4.4 Human Evaluation
4.5 Refinement Pass 1
4.6 Refinement Pass 2
4.7 Refinement Pass 3
4.8 Final Validation Prompt
4.9 Final Validation Result
5. Lessons Learned
```

Do not modify the research document during this task.

## Section 4.2 — Initial Review Prompt

Document the review request used for this stage.

Include:

- review objective
- prompt file path
- documents reviewed
- review dimensions
- explicit instruction that no refinement is performed yet
- human responsibility for accepting or rejecting feedback

Record the prompt path as:

```text
docs/week1/prompts/iterative-refinement-initial-review.md
```

Do not paste this entire prompt into the evidence file. Include a concise,
traceable summary of the actual review request.

## Section 4.3 — Initial AI Feedback

Review the completed Week 1 documentation across the following dimensions.

### A. Correctness and Internal Consistency

Check for:

- contradictions between chapters
- stale statements left from earlier workflow stages
- requirements statuses inconsistent with actual evidence
- confirmed behavior presented differently in different sections
- unresolved decisions accidentally presented as accepted requirements
- incorrect testing-level classification
- tests or plans described as executed when they are only conceptual
- TDD claims that overstate correctness, design, or productivity
- mentor-review or Iterative Refinement claims that are not yet supported

### B. Structure and Readability

Check for:

- unnecessary repetition across Chapters 5–10
- sections that are disproportionately long
- conclusions that repeat full earlier explanations
- unclear transitions between research, strategy, and findings
- headings that do not match their actual purpose
- dense citation placement that harms readability
- tables that duplicate nearby prose without adding useful structure

Do not recommend shortening merely to reduce word count. Explain the actual
readability or maintenance benefit.

### C. Evidence and Traceability

Check for:

- unresolved reference IDs
- unsupported important claims
- validation IDs that do not match the referenced correction
- empirical findings presented without their limitations
- project reasoning presented as external evidence
- citations that are technically valid but attached to the wrong claim
- duplicate validation entries
- requirements evidence paths that may mislead readers

Do not re-verify external sources online during this stage. Flag any source that
would need later re-verification.

### D. Ticket Manager Scope

Verify that confirmed behavior remains limited to:

```text
valid title is trimmed
blank or whitespace-only title is rejected
new ticket starts with status open
```

Check that the following remain unresolved or illustrative unless an authorized
decision exists:

```text
ID representation and grammar
complete status vocabulary
status transitions
priority
tags
filters
combined-filter semantics
ordering
missing-file policy
corrupted-file recovery
storage path
stdout and stderr contract
exact output
numerical exit codes
platform support
concurrency and file locking
```

### E. Workflow Evidence

Check:

- Layered Questioning evidence completeness
- Solution Exploration evidence completeness
- whether Human Evaluation and Contextual Decision are genuinely present
- whether prompt paths are correct
- whether historical `docs/week-1/` references are documented rather than
  silently rewritten
- whether Iterative Refinement is still correctly marked unfinished
- whether requirements mapping reflects actual workflow evidence

Do not invent missing human evaluations.

### F. Week 1 Scope

Verify that the repository does not falsely claim to contain:

- a complete CLI
- production implementation
- executable tests
- installed testing infrastructure
- observed Red or Green results
- test duration or flakiness data
- verified portability
- mentor-review findings
- Final Validation evidence

## Feedback Format

Create between 8 and 15 review findings.

Assign sequential finding IDs:

```text
IR-F01
IR-F02
IR-F03
...
```

Use this table:

| ID | Severity | Location | Finding | Proposed refinement | Basis |
| --- | --- | --- | --- | --- | --- |

Allowed severity values:

```text
Blocker
Important
Minor
Optional
No change recommended
```

For each finding:

- identify the exact file and heading
- describe the current issue
- explain why it matters
- suggest a focused refinement
- identify whether the basis is:
  - repository consistency
  - existing reference
  - existing validation entry
  - requirement mapping
  - readability judgment
  - project scope

Do not modify the document based on these findings yet.

## Feedback Summary

After the table, add a concise summary containing:

### Strongest Parts

Identify 3–5 aspects that should be preserved.

### Highest-Priority Candidates

Identify no more than five findings that appear most valuable to address.

### Suggestions That Are Optional

Separate stylistic preferences from correctness or traceability problems.

### Items Requiring Human Decision

Identify suggestions that cannot be accepted automatically because they involve:

- project preference
- acceptable document length
- desired level of citation density
- whether to preserve historical evidence exactly
- whether a repeated explanation is useful for a mentor audience

### Review Limitations

State that:

- no files were refined
- no external sources were re-verified
- no implementation or tests were run
- the findings are proposals for human evaluation
- a polished-looking document is not automatically correct

## Do Not Perform Refinement

During this task, do not:

- change `research.md`
- change `references.md`
- change `validation-log.md`
- change `requirements-mapping.md`
- edit earlier workflow evidence
- fill Human Evaluation
- accept your own suggestions
- create Refinement Pass 1
- create mentor-review findings
- perform Final Validation
- create implementation or test files

## Allowed Changes

You may modify only:

```text
docs/week1/ai-workflow-evidence.md
```

The prompt file is input and must not be modified by the Agent.

Do not modify:

```text
README.md
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/requirements-mapping.md
docs/week1/prompts/
note/
src/
tests/
package.json
package-lock.json
.gitignore
```

Do not stage, commit, push, merge, or create a pull request.

## Quality Requirements

Ensure that:

- Section 4.2 is completed
- Section 4.3 is completed
- Sections 4.4–4.9 remain `_Not started._`
- Section 5 remains `_Not started._`
- findings use unique sequential `IR-F` IDs
- every finding names an exact location
- severity values use only the allowed vocabulary
- correctness issues are separated from optional style suggestions
- no research refinement occurs
- no human decision is invented
- no external source verification is claimed
- no code or test execution is claimed
- Markdown tables have consistent columns
- Markdown fences are balanced
- UTF-8 remains valid

## Quality Checks

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Also verify:

- only `docs/week1/ai-workflow-evidence.md` is modified
- no files are staged
- Sections 4.2 and 4.3 contain no placeholders
- Sections 4.4–4.9 still contain placeholders
- Section 5 still contains its placeholder
- finding IDs are unique and sequential
- every finding has an allowed severity
- no implementation or package files were created
- no external verification or execution was falsely claimed
- LF/CRLF warnings are reported separately

## Final Response

Return a structured report containing:

1. Files inspected.
2. File modified.
3. Section 4.2 content added.
4. Number of initial findings.
5. Finding IDs and severity distribution.
6. Highest-priority findings.
7. Strong parts to preserve.
8. Optional suggestions.
9. Items requiring human decision.
10. Review limitations.
11. Sections intentionally left unfinished.
12. Quality-check results.
13. Confirmation that nothing was staged, committed, or pushed.

Also reproduce the complete `IR-F` findings table in the final response so the
developer can send it directly to a human reviewer.