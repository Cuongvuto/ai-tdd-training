# Iterative Refinement — Final Validation Rerun

## Role

Act as a critical final-validation reviewer.

The first Final Validation completed with result:

```text
Fail
```

It identified one `Important` contradiction in:

```text
docs/week1/research.md
Sections 10.5–10.6
```

A separately authorized correction has now been applied.

Your task is to rerun Final Validation against the corrected repository state.

Preserve the original failed validation as historical evidence. Do not delete,
replace, conceal, or rewrite it.

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
iterative-refinement-final-validation.md
iterative-refinement-final-validation-correction.md
iterative-refinement-final-validation-rerun.md
```

Inspect the current Git state and recent commits.

## Objectives

1. Verify that the contradiction in Sections 10.5–10.6 is resolved.
2. Rerun the Final Validation dimensions A–K.
3. Preserve the original `Fail` result.
4. Append a clearly identified rerun result.
5. Update workflow requirement statuses only when justified.
6. Keep mentor review unfinished.
7. Keep Lessons Learned unfinished.

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

Problems in protected files must be reported rather than silently fixed.

Do not stage, commit, push, merge, or create a pull request.

## Preserve the Initial Failed Result

In:

```text
docs/week1/ai-workflow-evidence.md
### 4.9 Final Validation Result
```

Do not remove or alter the first validation result.

Append a new subsection such as:

```text
#### Final Validation Rerun After Authorized Correction
```

The rerun record must state:

- why the first run failed;
- which correction was authorized;
- where the correction was applied;
- that the original failure remains preserved;
- the result of the rerun;
- whether workflow requirements may now become `Completed`.

## Rerun Validation Dimensions

Use the same dimensions A–K from the original Final Validation.

### A. Assignment and Requirements Coverage

Verify every requirements-mapping row and supporting evidence.

Check especially:

```text
Apply Layered Questioning
Apply Solution Exploration
Apply Iterative Refinement
Record AI validation and corrections
Explain findings during mentor review
```

Mentor review must remain:

```text
Not started
```

unless a real mentor-review artifact exists.

### B. Research Completion

Verify:

- Chapters 1–10 exist;
- Chapters 1–10 contain no `_Not started._`;
- Sections 10.5–10.6 now agree with workflow evidence;
- Section 10.5 includes all three workflows;
- Section 10.6 no longer makes a stale workflow-status assertion;
- implementation and execution limitations remain accurate;
- no new contradiction was introduced.

Explicitly compare:

```text
research.md, Sections 10.5–10.6
```

with:

```text
ai-workflow-evidence.md, Sections 4.8–4.9
requirements-mapping.md
```

### C. Workflow Evidence

Verify:

#### Layered Questioning

- Research
- Brief
- Practical Example
- Validation
- Human Evaluation
- accepted corrections

#### Solution Exploration

- alternatives
- comparison
- provisional recommendation
- Human Evaluation
- Contextual Decision
- assumptions and limitations

#### Iterative Refinement

- Initial Review Prompt
- Initial AI Feedback
- Human Evaluation
- Refinement Pass 1
- Refinement Pass 2
- Refinement Pass 3
- initial Final Validation
- authorized correction
- Final Validation rerun

### D. Prompt Traceability

Verify that all completed workflow prompts exist and are tracked or are clearly
identified as needing inclusion in the current commit.

Check:

```text
iterative-refinement-final-validation.md
iterative-refinement-final-validation-correction.md
iterative-refinement-final-validation-rerun.md
```

The current rerun prompt may be untracked while this task is running, but the
report must state that it must be included in the eventual commit.

Preserve intentional historical `docs/week-1/` evidence.

### E. Reference Audit

Confirm:

- `R-001`–`R-023` remain unique and sequential;
- all citations resolve;
- no reference changed during correction;
- the original source-verification results remain usable;
- `R-001` remains preview/bibliographic level;
- `R-007` remains abstract/bibliographic level;
- empirical limitations remain visible.

Do not repeat unnecessary external retrieval when the earlier validation record
already contains adequate verification evidence.

Do not claim a stronger verification level than the repository records.

### F. IR-F15 Verification-Level Review

Confirm that the previous Final Validation evaluated `IR-F15`.

Preserve the recorded conclusions:

- `R-001`: bibliographic metadata and preview;
- `R-007`: bibliographic metadata and abstract;
- `R-008`: full text;
- `R-009`: full text;
- historical limited-access IDs beyond the recorded set cannot be reconstructed
  with certainty.

Classify this dimension as:

```text
Pass with limitation
```

unless new evidence shows the record is incorrect.

### G. Validation Log Audit

Verify:

- `V-001`–`V-060` remain unique and sequential;
- required fields remain present;
- statuses remain internally consistent;
- related-validation links resolve;
- no validation was modified during the conclusion correction;
- no `V-061` was created.

### H. Iterative Refinement Finding Audit

Confirm final dispositions for `IR-F01`–`IR-F15`.

Also record the new Final Validation correction and rerun as workflow events,
not as new `IR-F` findings.

Do not create `IR-F16` solely for the stale-conclusion correction.

### I. Markdown and Repository Integrity

Verify:

- Markdown fences are balanced;
- tables have consistent columns;
- UTF-8 is valid;
- relative links resolve;
- current navigation uses `docs/week1/`;
- historical mismatches remain clearly historical;
- no unexpected placeholder remains except Section 5;
- no prohibited implementation or package file exists.

### J. Scope and Execution Claims

Verify no false claim exists regarding:

- implementation;
- executable tests;
- installed framework;
- compilation;
- passing tests;
- observed Red/Green;
- coverage;
- duration;
- flakiness;
- portability;
- production reliability;
- absence of defects.

### K. Git and Change Audit

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
git diff --cached --name-only
git log --oneline --decorate -15
```

Report:

- branch;
- HEAD;
- tracked modifications;
- untracked files;
- staged files;
- working-tree cleanliness;
- whether correction prompt is tracked;
- whether rerun prompt still needs to be committed.

## Result Vocabulary

Use only:

```text
Pass
Pass with limitation
Fail
Not applicable
```

Severity:

```text
Blocker
Important
Minor
Informational
```

## Expected Result Logic

Use:

```text
Pass
```

only when no meaningful limitation remains.

Use:

```text
Pass with limitation
```

when:

- the Chapter 10 contradiction is resolved;
- no blocker or Important defect remains;
- only disclosed source-access or historical-reconstruction limitations remain.

Use:

```text
Fail
```

when:

- the contradiction remains;
- a new blocker or Important contradiction exists;
- evidence paths do not support workflow completion.

Do not force a passing result merely because a correction was attempted.

## Rerun Result Structure

Append the following under Section 4.9:

### Rerun Overall Result

Use:

```text
Pass
Pass with limitation
Fail
```

### Correction Verification

State:

- original defect;
- correction location;
- result of comparing Sections 10.5–10.6 with workflow evidence;
- whether the blocker is resolved.

### Rerun Validation Summary

Use:

| Area | Result | Evidence | Limitation or follow-up |
| --- | --- | --- | --- |

Include dimensions A–K.

### Preserved Source-Verification Limitations

Summarize the existing `IR-F15` table rather than pretending all sources now
have full-text verification.

### Requirement Completion Decision

State whether these may change:

```text
Apply Iterative Refinement
Record AI validation and corrections
```

### Work Still Not Completed

Keep:

- Lessons Learned;
- mentor review;
- Ticket Manager implementation;
- executable tests;
- Red/Green and measurement evidence.

### Human Acceptance

State that the rerun remains subject to human review and does not approve its
own changes.

## Requirements Mapping

When the rerun result is:

```text
Pass
```

or:

```text
Pass with limitation
```

update:

```markdown
| Apply Iterative Refinement | `ai-workflow-evidence.md`, Section 4 | `prompts/` | Completed |
```

Update:

```markdown
| Record AI validation and corrections | `validation-log.md` and `ai-workflow-evidence.md`, Sections 2–4 | `references.md`; completed validation and refinement records | Completed |
```

Keep:

```markdown
| Explain findings during mentor review | Mentor-review artifact to be added | Not yet available | Not started |
```

Do not mark Lessons Learned or mentor review completed.

When the rerun result is `Fail`, keep both workflow rows `In progress`.

## Quality Requirements

Ensure:

- original failed validation remains intact;
- rerun result is clearly separate;
- contradiction resolution is explicitly checked;
- no protected file is changed;
- all A–K results use allowed vocabulary;
- no new reference ID is added;
- no new validation ID is added;
- all `IR-F01`–`IR-F15` dispositions remain traceable;
- source limitations remain honest;
- mentor review remains `Not started`;
- Section 5 remains `_Not started._`;
- no execution evidence is invented;
- Markdown and UTF-8 remain valid.

## Final Response

Return:

1. Files inspected.
2. Files modified.
3. Original failed result preserved.
4. Rerun overall result.
5. Correction verification.
6. Complete A–K rerun table.
7. Workflow evidence audit.
8. Prompt traceability audit.
9. Reference and IR-F15 audit.
10. Validation-log audit.
11. IR-finding disposition confirmation.
12. Requirements-mapping changes.
13. Remaining limitations.
14. Work intentionally unfinished.
15. Git and quality-check results.
16. Confirmation that nothing was staged, committed, or pushed.

Also reproduce:

- the complete rerun validation table;
- the exact requirements-mapping rows after the task;
- the appended rerun subsection from Section 4.9.