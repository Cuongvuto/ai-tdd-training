# Iterative Refinement — Final Validation

## Role

Act as a critical final-validation reviewer for the Week 1 research
documentation.

The Iterative Refinement workflow has completed:

- Initial Review
- Human Evaluation
- Refinement Pass 1
- Refinement Pass 2
- Refinement Pass 3

Your task is to perform an independent final validation of the current
repository state and record the result.

Do not silently fix problems during this task.

If a problem is found:

- report it accurately;
- identify its severity;
- state whether it blocks completion;
- leave the affected source document unchanged;
- keep workflow requirements `In progress` when completion is not justified.

## Repository Context

The Week 1 assignment is:

**Test-Driven Development for building reliable CLI tools with AI assistance.**

The repository documents three required AI workflows:

```text
Layered Questioning
Solution Exploration
Iterative Refinement
```

The main research document contains Chapters 1–10.

The repository intentionally does not contain:

- a complete Ticket Manager implementation
- executable automated tests
- observed Red/Green results
- execution-duration or flakiness measurements
- verified production reliability

Final Validation must not treat documentation quality as implementation
evidence.

## Read First

Inspect:

```text
README.md
note/README.md

docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
```

Inspect every prompt under:

```text
docs/week1/prompts/
```

Pay particular attention to:

```text
iterative-refinement-initial-review.md
iterative-refinement-pass-1.md
iterative-refinement-pass-2.md
iterative-refinement-pass-3.md
```

Also inspect current Git state, tracked files, untracked files, staged files and
the full repository diff.

## Objective

Complete only:

```text
### 4.8 Final Validation Prompt
### 4.9 Final Validation Result
```

in:

```text
docs/week1/ai-workflow-evidence.md
```

Conditionally update:

```text
docs/week1/requirements-mapping.md
```

only when the final validation evidence justifies the status change.

Do not complete:

```text
## 5. Lessons Learned
```

Do not create mentor-review findings.

## Section 4.8 — Final Validation Prompt

Record a concise, traceable summary of this final-validation request.

Include:

- validation objective;
- prompt path;
- files and workflow evidence reviewed;
- validation dimensions;
- source-verification expectations;
- completion criteria;
- explicit rule that problems are reported rather than silently fixed;
- human responsibility for accepting the validation result.

Reference this prompt path:

```text
docs/week1/prompts/iterative-refinement-final-validation.md
```

Do not paste this entire prompt into the evidence document.

## Final Validation Dimensions

### A. Assignment and Requirements Coverage

Verify every requirement in:

```text
docs/week1/requirements-mapping.md
```

Confirm that the evidence path exists and supports the stated status.

Check especially:

```text
Apply Layered Questioning
Apply Solution Exploration
Apply Iterative Refinement
Record AI validation and corrections
Explain findings during mentor review
```

The mentor-review requirement must remain:

```text
Not started
```

unless a real mentor-review artifact exists.

Do not invent mentor feedback.

### B. Research Completion

Verify that:

- Chapters 1–10 exist;
- Chapters 1–10 contain no `_Not started._`;
- the research conclusion matches the rest of the document;
- no chapter falsely claims executable implementation or observed tests;
- confirmed behavior remains limited to:
  - title trimming;
  - blank-title rejection;
  - initial status `open`;
- unresolved Ticket Manager decisions remain unresolved.

Check for stale statements and contradictions introduced after refinement.

### C. Workflow Evidence

Verify Layered Questioning contains:

- Research;
- Brief;
- Practical Example;
- Validation;
- Human Evaluation;
- accepted corrections.

Verify Solution Exploration contains:

- alternatives;
- comparison;
- provisional recommendation;
- Human Evaluation;
- Contextual Decision;
- assumptions and limitations.

Verify Iterative Refinement contains:

- Initial Review Prompt;
- Initial AI Feedback;
- Human Evaluation;
- Refinement Pass 1;
- Refinement Pass 2;
- Refinement Pass 3;
- Final Validation Prompt;
- Final Validation Result.

Do not treat a prompt alone as proof that its result occurred.

### D. Prompt Traceability

For every prompt path referenced by workflow evidence:

- verify the file exists;
- verify the path uses the actual repository structure;
- verify the prompt is tracked in Git when it belongs to completed evidence;
- distinguish current canonical paths from intentionally preserved historical
  `docs/week-1/` evidence.

The current Final Validation prompt may be untracked while this task is running,
but the final report must state that it needs to be included in the eventual
commit.

Do not silently rewrite historical prompt-path evidence.

### E. Reference Audit

Audit:

```text
R-001 through R-023
```

Verify:

- IDs are unique and sequential;
- every research citation resolves;
- source title, publisher/author and URL or bibliographic data are coherent;
- reliability notes accurately describe the source type;
- empirical claims retain their limitations;
- practitioner guidance is not presented as universal empirical proof;
- no citation is attached to a materially unrelated claim.

Do not add references merely to increase source count.

### F. IR-F15 — Verification-Level Review

Resolve the deferred review finding:

```text
IR-F15
```

Identify every reference that was previously checked only through:

```text
bibliographic metadata
preview
abstract
search-result excerpt
limited-content access
```

Create a verification table:

| Reference | Source type | Previous verification level | Final action | Final verification level | Claims affected | Limitation |
| --- | --- | --- | --- | --- | --- | --- |

Use the repository’s recorded URLs and bibliographic information.

When external access is available:

- prefer original papers, official documentation and primary sources;
- verify the source title and relevant supported claim;
- do not rely on unrelated secondary summaries when a primary source exists.

When full text is unavailable:

- record the actual access limitation;
- do not claim full-text verification;
- verify that the research wording does not exceed the available abstract,
  preview or official description;
- classify the result as `Pass with limitation` when the wording remains
  appropriately limited.

Do not require full-text access to every source merely for appearance.

A limited-access source may remain acceptable when:

- its verification level is disclosed;
- the claim does not exceed the accessible material;
- it is not used as stronger evidence than it provides.

### G. Validation Log Audit

Audit:

```text
V-001 through V-060
```

Verify:

- IDs are unique and sequential;
- every entry has a claim, method, evidence, evaluation, status and correction;
- statuses match the evaluation;
- cross-references resolve;
- `Related validations` links are reciprocal where intended;
- no entry was accidentally merged, removed or renumbered;
- no validation is presented as execution evidence;
- no materially duplicated entry remains unexplained.

Do not create a new validation ID solely to report this audit.

### H. Iterative Refinement Finding Audit

Audit:

```text
IR-F01 through IR-F15
```

Verify each finding has a final disposition:

- applied;
- preserved;
- no change;
- separate housekeeping completed;
- deferred and resolved during Final Validation.

Confirm:

- `IR-F01`, `IR-F02`, `IR-F03`, `IR-F05`, `IR-F09` were applied in Pass 1;
- `IR-F04` was handled through prompt traceability;
- `IR-F06` was applied in Pass 2;
- `IR-F07`, `IR-F08` remained no-change decisions;
- `IR-F10` was applied in Pass 3;
- `IR-F11`–`IR-F14` were preserved;
- `IR-F15` is evaluated in this Final Validation.

Add a final-disposition table:

| Finding | Human decision | Final state | Evidence |
| --- | --- | --- | --- |

### I. Markdown and Repository Integrity

Verify:

- Markdown fences are balanced in official and supplementary documentation;
- Markdown tables have consistent columns;
- UTF-8 is valid;
- current navigation uses `docs/week1/`;
- historical mismatches are clearly historical;
- no broken internal relative links exist;
- no unresolved reference or validation ID exists;
- no accidental placeholders remain outside intentionally unfinished sections.

### J. Scope and Execution Claims

Verify the repository does not falsely claim:

- production implementation;
- executable test suite;
- installed test framework;
- compilation;
- passing tests;
- observed Red/Green;
- measured coverage;
- measured duration;
- measured flakiness;
- verified portability;
- proof of no remaining defects.

Check that conceptual snippets remain labelled conceptual or unexecuted.

### K. Git and Change Audit

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
git diff --cached --name-only
```

Also inspect:

```bash
git log --oneline --decorate -15
```

Verify that completed workflow prompts referenced by committed evidence are
tracked.

Report:

- tracked modifications;
- untracked files;
- staged files;
- current branch;
- current HEAD;
- whether the working tree is clean;
- whether the current Final Validation prompt still needs to be committed.

Do not stage, commit, push, merge or create a pull request.

## Result Vocabulary

Use only:

```text
Pass
Pass with limitation
Fail
Not applicable
```

Use severity values:

```text
Blocker
Important
Minor
Informational
```

A limitation is not automatically a failure.

## Completion Criteria

Final Validation may conclude `Pass` or `Pass with limitation` only when:

- Chapters 1–10 are complete;
- all three AI workflows have required evidence;
- all human decisions are traceable;
- no blocker remains;
- no important contradiction remains;
- references and validation IDs resolve;
- IR-F15 has been evaluated honestly;
- documentation does not claim execution evidence that does not exist;
- Iterative Refinement Sections 4.2–4.9 are complete;
- mentor review remains honestly unfinished.

If a blocker or unresolved important defect exists:

- result must be `Fail`;
- Iterative Refinement remains `In progress`;
- `Record AI validation and corrections` remains `In progress`;
- list the exact required follow-up.

## Section 4.9 — Final Validation Result

Complete Section 4.9 with:

### Overall Result

Use one:

```text
Pass
Pass with limitation
Fail
```

Explain why.

### Validation Summary Table

Use:

| Area | Result | Evidence | Limitation or follow-up |
| --- | --- | --- | --- |

Include all validation dimensions A–K.

### Source Verification Table

Include the complete IR-F15 verification table.

### IR Finding Final Disposition

Include all `IR-F01`–`IR-F15`.

### Remaining Limitations

State limitations honestly, including any sources that remain preview- or
abstract-level.

### Work Still Not Completed

Include:

- Lessons Learned;
- mentor review;
- Ticket Manager implementation;
- executable tests;
- execution measurements.

### Human Acceptance

State that the final validation result remains subject to human review and does
not approve its own repository changes.

## Requirements Mapping Status Rules

When the overall result is `Pass` or `Pass with limitation`, update:

```text
Apply Iterative Refinement → Completed
Record AI validation and corrections → Completed
```

Keep:

```text
Explain findings during mentor review → Not started
```

Use evidence paths:

```text
Apply Iterative Refinement
→ ai-workflow-evidence.md, Section 4

Record AI validation and corrections
→ validation-log.md and ai-workflow-evidence.md, Sections 2–4
```

Do not mark the entire Week 1 assignment complete solely because these two rows
are completed.

When the overall result is `Fail`, do not change those two statuses to
`Completed`.

## Allowed Changes

You may modify only:

```text
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
```

Do not modify:

```text
README.md
note/README.md
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/prompts/
src/
tests/
package.json
package-lock.json
.gitignore
```

Any defect found in a protected file must be reported, not silently fixed.

Do not stage, commit, push, merge or create a pull request.

## Quality Requirements

Ensure that:

- Section 4.8 contains no placeholder;
- Section 4.9 contains no placeholder;
- Section 5 remains `_Not started._`;
- Final Validation does not silently refine protected files;
- all result values use the allowed vocabulary;
- all findings have final dispositions;
- source verification levels are explicit;
- limited-access sources are not overstated;
- no new reference ID is added;
- no new validation ID is added;
- mentor review remains `Not started`;
- no execution evidence is invented;
- Markdown tables and fences are valid;
- UTF-8 remains valid.

## Final Response

Return a structured report containing:

1. Files inspected.
2. Files modified.
3. Overall Final Validation result.
4. Validation summary for dimensions A–K.
5. Chapters 1–10 audit.
6. Workflow evidence audit.
7. Prompt traceability audit.
8. Reference and citation audit.
9. Complete IR-F15 verification-level table.
10. Validation-log audit.
11. Complete `IR-F01`–`IR-F15` disposition table.
12. Markdown and repository-integrity audit.
13. Scope and execution-claim audit.
14. Requirements-mapping status changes or confirmation of no change.
15. Remaining limitations.
16. Work intentionally unfinished.
17. Git and quality-check results.
18. Confirmation that nothing was staged, committed or pushed.

Also reproduce:

- the complete validation summary table;
- the complete source-verification table;
- the complete IR finding final-disposition table.