# Week 1 — Lessons Learned

## Role

Act as a critical documentation synthesis assistant.

The Week 1 research document, three required AI workflows, validation log, and
Iterative Refinement workflow have now been completed.

Your task is to complete only:

```text
## 5. Lessons Learned
```

in:

```text
docs/week1/ai-workflow-evidence.md
```

Do not create mentor-review findings.

Do not modify the completed Initial Review, refinement passes, initial Final
Validation, authorized correction, or rerun result.

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

Inspect all prompts under:

```text
docs/week1/prompts/
```

Pay particular attention to evidence for:

```text
Layered Questioning
Solution Exploration
Iterative Refinement
Initial Final Validation Fail
Authorized correction
Final Validation rerun Pass with limitation
```

## Objective

Replace the `_Not started._` placeholder under:

```text
## 5. Lessons Learned
```

with a concise but complete synthesis of what was learned during Week 1.

The section must reflect actual repository evidence rather than generic advice.

## Required Structure

Use these subsections:

```text
### 5.1 Lessons from Layered Questioning
### 5.2 Lessons from Solution Exploration
### 5.3 Lessons from Iterative Refinement
### 5.4 Lessons about Human Critical Thinking
### 5.5 Lessons about TDD and Testing Evidence
### 5.6 Lessons for Working with AI
### 5.7 Lessons for Week 2
### 5.8 Remaining Limitations
```

## Section 5.1 — Lessons from Layered Questioning

Explain how the sequence:

```text
Research
→ Brief
→ Practical Example
→ Validation
→ Human Evaluation
```

improved the work.

Include lessons such as:

- broad research alone was not enough;
- the Brief made the core concepts easier to evaluate;
- the practical example exposed hidden assumptions;
- validation separated supported claims from overstatements;
- Human Evaluation determined which corrections were accepted;
- later stages should not rewrite historical workflow snapshots as though they
  described the current repository state.

Mention that the historical `docs/week-1/` path mismatch was preserved and
documented rather than silently rewritten.

## Section 5.2 — Lessons from Solution Exploration

Explain that comparing multiple options before choosing a strategy helped avoid:

- automatically accepting the first AI suggestion;
- treating unit-heavy, balanced, or E2E-heavy portfolios as universally correct;
- relying on fixed testing percentages;
- choosing a strategy without considering project context.

State that the selected balanced layered strategy is a contextual starting
point:

```text
many focused unit tests
targeted real-file integration tests
a small process-level E2E suite
```

Explain that the choice remains revisable when execution data becomes
available.

## Section 5.3 — Lessons from Iterative Refinement

Describe the actual refinement sequence:

```text
Initial Review
→ Human Evaluation
→ Pass 1
→ Pass 2
→ Pass 3
→ Initial Final Validation
→ Authorized Correction
→ Final Validation Rerun
```

Include concrete lessons:

- review findings must not be applied automatically;
- correctness issues should be separated from optional readability preferences;
- audit history should be preserved rather than erased;
- small authorized passes make changes easier to review;
- a failed validation is useful evidence when it exposes a real contradiction;
- the initial `Fail` result should remain visible;
- rerunning validation after an authorized correction provides stronger evidence
  than silently editing the failed result;
- `Pass with limitation` is more honest than forcing a perfect `Pass`.

Reference representative findings such as:

```text
IR-F01
IR-F02
IR-F03
IR-F06
IR-F10
IR-F15
```

Do not repeat the complete finding table.

## Section 5.4 — Lessons about Human Critical Thinking

Explain the human responsibilities demonstrated during the assignment:

- deciding whether a suggestion is accepted, rejected, deferred, preserved, or
  treated as optional;
- checking requirements rather than allowing implementation convenience to
  define behavior;
- distinguishing present-state contradictions from historical workflow
  snapshots;
- deciding whether repetition or citation density is useful for the intended
  audience;
- requiring source limitations to be disclosed;
- reviewing Git diffs and traceability before committing;
- preventing AI from approving its own output.

State explicitly that AI suggestions were never treated as automatic project
decisions.

## Section 5.5 — Lessons about TDD and Testing Evidence

Synthesize the most important testing lessons:

- TDD is Red-Green-Refactor, not merely writing tests first;
- Red must fail for the expected reason;
- Green should be the smallest responsible implementation;
- Refactor must preserve observable behavior;
- tests provide scoped evidence rather than complete proof;
- unit, integration, and E2E tests provide different evidence;
- mocks do not prove real JSON persistence;
- direct handler calls do not prove process-level CLI behavior;
- weak assertions such as only `not.toThrow()` do not prove correctness;
- coverage and test count do not prove quality;
- test plans are not execution evidence.

Keep empirical conclusions qualified by context.

## Section 5.6 — Lessons for Working with AI

Explain practical AI collaboration lessons:

- ask for one focused task at a time;
- record prompts for traceability;
- request alternatives before selecting a strategy;
- ask AI to expose assumptions and limitations;
- separate generated implementation from generated tests during review;
- inspect assertions, edge cases, failure paths, and the final diff;
- do not allow the same AI output to count as independent validation;
- use AI for exploration and refinement, not final authority;
- preserve failed reviews and corrections as evidence of critical thinking;
- use explicit allowed-file scopes to prevent uncontrolled changes.

Mention that a professional-looking answer can still be stale, unsupported, or
incorrect.

## Section 5.7 — Lessons for Week 2

Provide a concise transition to implementation.

Include:

- start with one confirmed behavior;
- write or review a focused failing test;
- confirm the Red reason;
- implement minimum Green;
- review code and test diffs separately;
- run regressions;
- add real temporary JSON evidence when persistence is introduced;
- add subprocess E2E evidence only for selected public CLI journeys;
- record decisions and unresolved assumptions;
- record actual execution results, durations, failures, flakiness, and platform
  observations;
- revisit the testing strategy based on observed evidence.

Keep confirmed Ticket Manager behavior limited to:

```text
title trimming
blank-title rejection
initial status open
```

Do not resolve the remaining project decisions.

## Section 5.8 — Remaining Limitations

State honestly that Week 1 still does not provide:

- a complete Ticket Manager implementation;
- executable automated tests;
- installed test infrastructure;
- observed Red/Green cycles;
- coverage, duration, or flakiness measurements;
- verified portability;
- production-reliability evidence;
- proof that no defects remain;
- mentor-review findings.

Also preserve source-access limitations:

- `R-001` remains bibliographic/preview level;
- `R-007` remains bibliographic/abstract level;
- the complete historical limited-access source set cannot be reconstructed with
  certainty.

Explain that these limitations do not invalidate the documentation workflow,
but they limit the conclusions that may be claimed.

## Closing Reflection

End Section 5 with a concise closing reflection.

It should state that the most important Week 1 lesson was not simply learning
TDD terminology, but learning to use AI through:

```text
structured questioning
option comparison
human evaluation
controlled refinement
honest validation
```

Do not claim mentor approval or production reliability.

## References and Validation IDs

Prefer existing references and workflow IDs.

Do not add a new reference merely for this synthesis.

Do not add a new validation entry merely because a prior lesson is summarized.

Preferred outcome:

```text
No new reference IDs
No new validation IDs
```

Use existing IDs selectively when useful.

## Requirements Mapping

Do not modify `requirements-mapping.md` unless an existing row has become
factually inaccurate.

Expected statuses remain:

```text
Apply Layered Questioning → Completed
Apply Solution Exploration → Completed
Apply Iterative Refinement → Completed
Record AI validation and corrections → Completed
Explain findings during mentor review → Not started
```

Lessons Learned does not complete mentor review.

## Allowed Changes

You may modify only:

```text
docs/week1/ai-workflow-evidence.md
```

Do not modify:

```text
README.md
note/README.md
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/requirements-mapping.md
docs/week1/prompts/
src/
tests/
package.json
package-lock.json
.gitignore
```

Do not stage, commit, push, merge, or create a pull request.

## Quality Requirements

Ensure:

- Section 5 contains no `_Not started._`;
- Sections 2–4 are not rewritten;
- initial Final Validation `Fail` remains intact;
- rerun `Pass with limitation` remains intact;
- lessons are based on repository evidence;
- optional readability suggestions are not rewritten as correctness defects;
- no mentor-review result is invented;
- no implementation or execution result is invented;
- confirmed Ticket Manager behavior remains limited;
- unresolved decisions remain unresolved;
- no new reference ID is added;
- no new validation ID is added;
- Markdown tables and fences remain valid;
- UTF-8 remains valid.

## Quality Checks

Run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
git diff --cached --name-only
```

Also verify:

- only `docs/week1/ai-workflow-evidence.md` is modified;
- no file is staged;
- Section 5 contains no placeholder;
- Sections 2–4 remain unchanged;
- initial `Fail` and rerun `Pass with limitation` both remain present;
- all five workflow requirements retain correct statuses;
- no mentor-review artifact is claimed;
- no implementation/package files exist;
- no reference or validation ID is added;
- Markdown and UTF-8 are valid;
- LF/CRLF warnings are reported separately.

## Final Response

Return a structured report containing:

1. Files inspected.
2. File modified.
3. Lessons from Layered Questioning.
4. Lessons from Solution Exploration.
5. Lessons from Iterative Refinement.
6. Human critical-thinking lessons.
7. TDD and testing-evidence lessons.
8. AI collaboration lessons.
9. Week 2 lessons.
10. Remaining limitations.
11. Closing reflection.
12. References and validation IDs reused.
13. Requirements-mapping confirmation.
14. Quality-check results.
15. Confirmation that nothing was staged, committed, or pushed.