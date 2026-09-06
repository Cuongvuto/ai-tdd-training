# Week 1 — Final Cleanup Audit

## Role

Act as a read-only final package reviewer.

The Week 1 research, three required AI workflows, Final Validation rerun, and
Lessons Learned have been completed.

Your task is to audit the repository package before mentor review.

Do not modify any file.

Do not invent mentor feedback or mark mentor review complete.

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

Inspect every file under:

```text
docs/week1/prompts/
```

Inspect Git status, recent commits, tracked files, untracked files and staged
files.

## Audit Objectives

Verify that the repository is ready to be presented to a mentor.

### A. Required Deliverables

Confirm that these files exist:

```text
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
docs/week1/prompts/
```

Confirm that `note/` remains supplementary.

### B. Research Completion

Verify:

- Chapters 1–10 exist;
- Chapters 1–10 contain no `_Not started._`;
- the conclusion reflects all three AI workflows;
- implementation and execution limitations remain accurate;
- confirmed Ticket Manager behavior remains limited to:
  - title trimming;
  - blank-title rejection;
  - initial status `open`;
- unresolved project decisions remain unresolved.

### C. Workflow Completion

Verify:

- Layered Questioning is complete;
- Solution Exploration is complete;
- Iterative Refinement is complete;
- AI validation and corrections are complete;
- Lessons Learned is complete;
- mentor review remains `Not started`.

Confirm that the initial Final Validation `Fail` and rerun
`Pass with limitation` are both preserved.

### D. Prompt Traceability

For every prompt referenced by workflow evidence:

- confirm that the file exists;
- confirm that the file is tracked in Git;
- confirm that paths use `docs/week1/`, except intentionally preserved
  historical evidence;
- identify any untracked prompt.

The reusable reporting prompt may be included even though it is not workflow
result evidence.

### E. References and Validations

Verify:

- references are unique and sequential from `R-001` to `R-023`;
- all research citations resolve;
- no unused reference exists;
- validations are unique and sequential from `V-001` to `V-060`;
- all related-validation links resolve;
- no missing or duplicated IDs exist;
- source-access limitations remain disclosed.

### F. Markdown and Links

Verify every Markdown file for:

- valid UTF-8;
- balanced code fences;
- consistent table columns;
- valid internal relative links;
- no malformed heading hierarchy;
- no unintended placeholder;
- canonical navigation paths.

### G. Requirements Mapping

Confirm these statuses:

```text
Apply Layered Questioning → Completed
Apply Solution Exploration → Completed
Apply Iterative Refinement → Completed
Record AI validation and corrections → Completed
Explain findings during mentor review → Not started
```

Confirm that evidence paths support each status.

### H. Git Integrity

Run:

```bash
git status --short
git diff --check
git diff --stat
git diff --name-only
git diff --cached --name-only
git log --oneline --decorate -20
```

Report:

- current branch;
- current HEAD;
- modified files;
- untracked files;
- staged files;
- whether the working tree is clean;
- whether local HEAD matches the upstream tracking reference;
- prompts missing from Git history.

Do not claim remote freshness without `git fetch`.

### I. Scope Protection

Confirm the repository does not falsely claim:

- implemented Ticket Manager CLI;
- executable test suite;
- installed dependencies;
- compilation;
- passing tests;
- observed Red/Green;
- measured coverage;
- measured duration or flakiness;
- verified portability;
- production reliability;
- mentor approval;
- proof that no defects remain.

## Result

Use one:

```text
Ready for mentor review
Ready with minor cleanup
Not ready
```

Use severities:

```text
Blocker
Important
Minor
Informational
```

A source-access limitation already disclosed in Final Validation is not a
cleanup defect.

## Findings Table

Use:

| ID | Severity | Location | Finding | Required action |
| --- | --- | --- | --- | --- |

Assign IDs:

```text
FC-01
FC-02
FC-03
...
```

Do not create findings for correct content merely to fill the table.

## Do Not Modify

Do not modify, stage, commit, push, merge or create a pull request.

This task is read-only.

## Final Response

Return:

1. Overall readiness result.
2. Files inspected.
3. Required-deliverables audit.
4. Research-completion audit.
5. Workflow-completion audit.
6. Prompt-traceability audit.
7. Reference and validation audit.
8. Markdown and link audit.
9. Requirements-mapping audit.
10. Git-state audit.
11. Scope-protection audit.
12. Complete findings table.
13. Required actions before mentor review.
14. Confirmation that no file was modified, staged, committed or pushed.