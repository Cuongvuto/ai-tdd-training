# Iterative Refinement — Human Evaluation and Pass 1

## Role

Act as a controlled documentation-refinement assistant.

The Initial Review has already produced findings `IR-F01` through `IR-F15`.
A human reviewer has now evaluated those findings.

Your task is to:

1. record the human decisions in Section 4.4;
2. apply only the approved Pass 1 refinements;
3. document the applied changes in Section 4.5.

Do not begin Refinement Pass 2, Refinement Pass 3, Final Validation, mentor
review, or Lessons Learned.

## Read First

Inspect:

```text
README.md
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
docs/week1/prompts/iterative-refinement-initial-review.md
```

Also inspect all other prompt files when needed for consistency.

## Human Decisions

Record these decisions accurately.

| Finding | Human decision |
| --- | --- |
| IR-F01 | Accepted |
| IR-F02 | Accepted |
| IR-F03 | Accepted |
| IR-F04 | Accepted |
| IR-F05 | Accepted with modification |
| IR-F06 | Deferred to a later refinement pass |
| IR-F07 | No change for now |
| IR-F08 | No change for now |
| IR-F09 | Accepted |
| IR-F10 | Deferred as separate supplementary-note housekeeping |
| IR-F11 | Preserve current content |
| IR-F12 | Preserve current content |
| IR-F13 | Preserve current content |
| IR-F14 | Preserve current content |
| IR-F15 | Deferred to Final Validation |

The human rationale is:

- fix current contradictions and misleading evidence paths first;
- preserve historical audit records;
- avoid readability-only rewrites until later;
- preserve correct testing boundaries, scope labels, and empirical limitations;
- defer external source re-verification to Final Validation.

Do not change or reinterpret these decisions.

## Section 4.4 — Human Evaluation

Complete:

```text
docs/week1/ai-workflow-evidence.md
### 4.4 Human Evaluation
```

Include:

- a concise explanation of the human evaluation process;
- a table containing all `IR-F01`–`IR-F15`;
- the decision for each finding;
- the reason for accepting, deferring, preserving, or making no change;
- the selected scope of Pass 1;
- explicit confirmation that AI suggestions were not accepted automatically.

Use this table:

| Finding | Human decision | Reason | Pass |
| --- | --- | --- | --- |

Use pass labels:

```text
Pass 1
Later pass
Final Validation
No change
Preserve
Separate housekeeping
```

## Pass 1 Scope

Apply only these substantive refinements:

```text
IR-F01
IR-F02
IR-F03
IR-F05
IR-F09
```

`IR-F04` is accepted as a Git traceability decision: the developer will include
the unmodified Initial Review prompt in the relevant commit. Do not edit that
prompt.

Do not apply `IR-F06`, `IR-F07`, `IR-F08`, `IR-F10`, or `IR-F15` during this
pass.

Do not alter the content protected by `IR-F11`–`IR-F14`.

## Refinement IR-F01 — Update the Stale Introduction

Modify:

```text
docs/week1/research.md
### 1.1 Background
```

Replace the stale statement claiming that the document has not selected a CLI
testing strategy.

The revised wording must state that the completed research selected a
contextual balanced layered starting strategy:

```text
many focused unit tests
targeted real-file integration tests
a small process-level E2E suite
```

Also state that implementation, execution evidence, and measurement remain
future work.

Do not introduce a fixed ratio or claim the strategy has been executed.

## Refinement IR-F02 — Update Workflow Status

Modify:

```text
docs/week1/requirements-mapping.md
```

Change:

```text
Apply Iterative Refinement → Not started
```

to:

```text
Apply Iterative Refinement → In progress
```

Keep the primary evidence:

```text
ai-workflow-evidence.md, Section 4
```

The workflow must not be marked `Completed`.

## Refinement IR-F03 — Repair README Markdown Fence

Modify only the malformed deliverables code fence in:

```text
README.md
## Deliverables
```

Close the fenced `text` block immediately after the deliverables tree.

Ensure the following content renders as normal Markdown:

- main-document descriptions
- Scope
- Acceptance Criteria
- Project Status

Do not rewrite README content beyond the minimum fence repair.

## Refinement IR-F05 — Add Temporal Qualifiers

Modify historical workflow-stage wording in:

```text
docs/week1/ai-workflow-evidence.md
### 2.5 Brief Result
### 2.10 Human Evaluation and Corrections
```

Preserve the historical facts but change ambiguous present-tense wording such as
“remain unfinished” to explicitly temporal wording, for example:

```text
At the end of this stage, ...
```

The revised wording must make clear that those statements describe the state at
that earlier workflow stage, not the repository’s current state.

Do not rewrite the accepted result or historical evidence.

## Refinement IR-F09 — Clarify Mentor-Review Mapping

Modify the requirement row:

```text
Explain findings during mentor review
```

in:

```text
docs/week1/requirements-mapping.md
```

Use wording that does not imply Chapter 9 or supplementary Vietnamese notes
already contain mentor-review findings.

Use:

```markdown
| Explain findings during mentor review | Mentor-review artifact to be added | Not yet available | Not started |
```

Do not mark the requirement as started or completed.

## Section 4.5 — Refinement Pass 1

Complete:

```text
docs/week1/ai-workflow-evidence.md
### 4.5 Refinement Pass 1
```

Record:

- findings selected for this pass;
- files changed;
- exact purpose of each refinement;
- what was deliberately deferred;
- content deliberately preserved;
- confirmation that no implementation or test execution occurred;
- confirmation that the pass was authorized by human evaluation.

Include a compact table:

| Finding | File | Refinement applied | Result |
| --- | --- | --- | --- |

Mention `IR-F04` separately as a commit-traceability decision, not a document
rewrite.

## Sections That Must Remain Unfinished

Do not complete or modify:

```text
4.6 Refinement Pass 2
4.7 Refinement Pass 3
4.8 Final Validation Prompt
4.9 Final Validation Result
5. Lessons Learned
```

They must retain `_Not started._`.

## Allowed Changes

You may modify only:

```text
README.md
docs/week1/research.md
docs/week1/requirements-mapping.md
docs/week1/ai-workflow-evidence.md
```

Do not modify:

```text
docs/week1/references.md
docs/week1/validation-log.md
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

- Section 4.4 is completed;
- Section 4.5 is completed;
- Sections 4.6–4.9 remain unfinished;
- Section 5 remains unfinished;
- all 15 human decisions are recorded;
- only accepted Pass 1 findings are applied;
- README fence is correctly balanced;
- the introduction reflects the completed strategy;
- Iterative Refinement is `In progress`, not `Completed`;
- mentor review remains `Not started`;
- historical workflow evidence remains historically accurate;
- no correct testing boundary or confirmed behavior is weakened;
- no unresolved Ticket Manager decision is accepted;
- no source re-verification is claimed;
- no implementation or tests are created or run;
- Markdown tables and fences are valid;
- UTF-8 remains valid.

## Quality Checks

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Also verify:

- only the four allowed tracked files changed;
- no files are staged;
- Section 4.4 has no placeholder;
- Section 4.5 has no placeholder;
- Sections 4.6–4.9 retain placeholders;
- Section 5 retains its placeholder;
- `README.md` fences are balanced;
- requirements statuses match the human decisions;
- no new references or validation IDs were added;
- no implementation or package files were created;
- LF/CRLF warnings are reported separately.

## Final Response

Return a structured report containing:

1. Files inspected.
2. Files modified.
3. Human decisions recorded.
4. Pass 1 findings applied.
5. Exact introduction correction.
6. Iterative Refinement mapping change.
7. README fence repair.
8. Historical wording correction.
9. Mentor-review mapping correction.
10. Findings deferred or preserved.
11. Sections intentionally left unfinished.
12. Quality-check results.
13. Confirmation that nothing was staged, committed, or pushed.

Also reproduce:

- the complete Human Evaluation decision table;
- the complete Refinement Pass 1 table.