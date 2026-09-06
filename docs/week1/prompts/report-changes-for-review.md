# Report Changes for Human Review

## Role

Act only as a repository change reporter.

Do not modify any file during this task.

Your job is to inspect the current working tree and produce a precise,
copy-ready report so the developer can send it to another reviewer.

Report in Vietnamese, but preserve all file paths, headings, identifiers,
commands, code, and technical terms in their original language.

## Repository Context

The repository is:

```text
ai-tdd-training
```

The current branch should be:

```text
docs/week1-tdd-research
```

The developer has just completed a documentation task with an AI Agent.

The report must describe only the changes currently present in the working
tree compared with the latest commit.

Do not describe changes based only on memory or the previous prompt. Inspect
the actual files and Git diff.

## Read and Inspect

Run:

```bash
git branch --show-current
git status --short
git diff --check
git diff --stat
git diff --name-only
git diff
```

Also inspect every modified or untracked documentation file relevant to the
completed task.

Do not stage, commit, push, restore, reset, or modify anything.

## Reporting Rules

Be exact and evidence-based.

Do not claim that:

- a section is completed unless its placeholder was actually removed
- a test was run unless there is real execution evidence
- a source was verified unless it was actually checked
- a requirement changed unless the mapping file changed
- a file was modified when it is only untracked and unchanged
- Git is clean when uncommitted files still exist

Clearly distinguish:

- modified tracked files
- newly created untracked files
- inspected but unchanged files
- staged files, if any
- commits or pushes, if any
- conceptual code versus executable code
- completed requirements versus in-progress requirements
- confirmed requirements versus assumptions or unresolved decisions

Do not paste entire files.

Include exact excerpts only for the most important changed sections.

## Required Report Format

Return the following report.

# Change Report

## 1. Task Identified

State what task appears to have been completed based on the actual diff.

Include the prompt filename used, when it can be identified.

## 2. Git State

Report:

- current branch
- whether tracked files are modified
- whether untracked files exist
- whether any file is staged
- whether a commit was created
- whether a push can be confirmed from local evidence
- result of `git diff --check`

Use precise wording. Do not infer a remote push when local Git output cannot
prove it.

## 3. Files Inspected

List the files inspected while preparing this report.

## 4. Files Changed

Use this table:

| File | Git state | Main sections changed | Purpose |
| --- | --- | --- | --- |

Git state examples:

```text
Modified
Untracked
Staged
Unchanged
```

Do not list unchanged files in this table unless they are necessary to explain
an inconsistency.

## 5. Detailed Changes

For each changed file, report:

### `<file path>`

- headings or line areas changed
- placeholders removed or retained
- content added
- content corrected
- content intentionally left unfinished
- references or IDs added
- status changes made
- assumptions recorded
- limitations recorded

Do not use vague statements such as “improved the document.”

Describe the actual technical change.

## 6. Important Exact Excerpts

Copy the exact current content of the most important changed blocks.

Include only blocks that the reviewer must inspect, such as:

- a newly completed research section
- a human evaluation
- a contextual decision
- a provisional recommendation
- a practical code example
- a test matrix summary
- a new validation entry
- a changed requirements-mapping row

For every excerpt, include:

```text
File:
Heading:
Purpose:
```

Then provide the exact Markdown excerpt.

Keep the combined excerpts focused. Do not paste the complete document.

## 7. References

Report:

- reference IDs added
- reference IDs modified
- reference IDs reused
- whether all newly cited IDs exist in `references.md`
- whether any citation appears unresolved
- any source-verification limitations reported by the task

Use a compact table when new references were added:

| ID | Source | Used for |
| --- | --- | --- |

## 8. Validation Log

Report:

- highest previous validation ID
- new validation IDs
- whether IDs are unique and sequential
- title and status of every new entry
- important corrections or rejected claims

Use:

| ID | Title | Status | Main conclusion |
| --- | --- | --- | --- |

If no entries were added, state that explicitly.

## 9. Requirements Mapping

Show every requirements row whose status changed:

| Requirement | Previous status | Current status | Evidence |
| --- | --- | --- | --- |

If the previous status cannot be established from the current diff, state:

```text
Previous status visible in diff: not available
```

Also list important requirements that intentionally remain unfinished.

## 10. Assumptions and Unresolved Decisions

List all project assumptions or unresolved decisions introduced or retained by
the completed task.

Examples include:

- status vocabulary
- allowed status transitions
- filter grammar
- filter combination semantics
- list ordering
- missing-file policy
- exact CLI output
- numerical exit codes
- path conventions
- platform-specific behavior

Do not accidentally present an unresolved decision as a confirmed requirement.

## 11. Conceptual Code and Execution Claims

Report:

- conceptual code snippets added
- language and test style used
- behavior demonstrated
- whether files were actually created
- whether dependencies were installed
- whether code was compiled
- whether tests were executed
- whether any passing result was actually observed

Use `Not executed` when there is no execution evidence.

## 12. Quality Checks

Report the actual results of:

```text
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Also check and report:

- allowed files only
- balanced Markdown code fences
- consistent Markdown tables
- unique reference IDs
- unique validation IDs
- UTF-8 validity where checked
- unfinished chapters still retain placeholders
- no accidental implementation or package files
- LF/CRLF warnings

Do not claim a check passed unless it was actually performed.

## 13. Potential Problems for Reviewer

Identify any possible inconsistency, stale sentence, overstatement, duplicated
content, incorrect status, historical path mismatch, or scope violation.

If none are found, write:

```text
No obvious blocker found from the current diff.
```

Do not silently fix the problem.

## 14. Topics Intentionally Left Unfinished

List the chapters, workflow sections, requirements, implementation work, or
validation steps that remain unfinished.

## 15. Git Operations Confirmation

Explicitly state whether the Agent:

- staged files
- committed
- pushed
- merged
- created a pull request

If not verifiable, say so rather than guessing.

## 16. Copy-Ready Reviewer Summary

End with a compact but complete summary that the developer can copy directly to
another reviewer.

It must contain:

1. task completed
2. files modified
3. important content added
4. references added
5. validation IDs added
6. requirements statuses changed
7. assumptions or unresolved decisions
8. quality-check outcome
9. Git state
10. any issue requiring reviewer attention

Do not include recommendations for the next task unless the current diff
contains an explicit next-step decision.