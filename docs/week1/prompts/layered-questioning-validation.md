# Layered Questioning — Validation Prompt

## Role

Act as a critical technical reviewer for a Test-Driven Development research
document.

The developer remains responsible for evaluating the review findings,
accepting or rejecting corrections, and recording the final human decision.

## Repository Context

This repository contains the Week 1 assignment:

**Test-Driven Development for building reliable CLI tools with AI assistance.**

The Layered Questioning workflow is:

```text
Research → Brief → Example → Validation
```

The Research, Brief, and Practical Example stages have been completed.

This prompt performs only the **Validation** stage.

Do not perform Solution Exploration or Iterative Refinement.

Do not complete the unfinished research Chapters 4 through 10.

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
docs/week1/prompts/layered-questioning-example.md
```

Also inspect any Week 1 assignment or training material available in the
repository.

## Validation Scope

Validate only the work completed during the Layered Questioning workflow:

```text
research.md:
- Section 1.1
- Sections 2.1 through 2.7
- Sections 3.1 through 3.6

ai-workflow-evidence.md:
- Sections 2.1 through 2.7

references.md:
- References currently cited by the completed research

validation-log.md:
- Existing validation entries

requirements-mapping.md:
- Statuses affected by Layered Questioning
```

Do not complete research Chapters 4 through 10.

## Validation Objectives

Evaluate the documentation for:

### 1. TDD accuracy

Check whether the document correctly explains:

- Test-Driven Development
- test-first versus full TDD
- Red, Green, and Refactor
- why Red must fail for the expected reason
- minimum responsible implementation during Green
- behavior-preserving refactoring
- benefits, limitations, and contextual suitability
- the limits of automated testing

Identify absolute or misleading claims such as:

- TDD guarantees defect-free software
- TDD always improves design
- TDD always improves productivity
- every TDD test must be a unit test
- high code coverage proves correctness
- tests written after implementation are automatically TDD
- a passing test suite proves complete correctness

### 2. Practical example consistency

Review the conceptual TypeScript and Vitest-style example in Section 3.5.

Confirm that:

- the desired behavior is clearly stated
- the Red test expresses that behavior
- the expected failure is caused by missing behavior
- syntax, import, fixture, or dependency failures are not presented as valid Red
- Green contains only the smallest responsible implementation
- Green does not add persistence, CLI parsing, repositories, or unrelated rules
- Refactor preserves observable behavior
- Refactor does not introduce a new business feature
- the tests remain conceptually consistent with Green and Refactor
- title trimming and blank-title rejection are consistent
- the error type and error message remain consistent
- status remains `open`
- any introduced type name accurately describes its responsibility
- no execution or passing result is falsely claimed

Pay particular attention to whether:

```text
TicketStatus = 'open'
```

is an appropriate name for the conceptual type or whether a more precise name
would avoid implying that the future domain can only contain one status.

Do not change this automatically unless the review concludes that a correction
is clearly necessary.

### 3. Reference traceability

Confirm that:

- every reference ID cited in completed research exists
- citations support the statements to which they are attached
- foundational, practitioner, empirical, and contextual sources are clearly
  distinguished
- contextual observations are not presented as universal facts
- no reference metadata appears invented or unsupported
- empirical findings are described with their original limitations

Do not add new sources unless correcting a material factual problem genuinely
requires one.

If source verification is unavailable, state that limitation rather than
claiming independent verification.

### 4. Validation-log quality

Check that:

- existing validation IDs are unique
- statuses are used consistently
- corrected or contextual claims are not later presented as universal truths
- important TDD misunderstandings are represented
- validation conclusions match the final research wording

Add new validation entries only for material findings discovered during this
Validation stage.

Continue sequentially after the highest existing validation ID.

Do not create entries for trivial formatting corrections.

### 5. Workflow-evidence accuracy

Confirm that Sections 2.2 through 2.7 accurately summarize:

- what each prompt requested
- what the AI produced
- which stages remain unfinished
- the conceptual and unexecuted nature of the example

Update only:

```text
2.8 Validation Prompt
2.9 Validation Result
```

In Section 2.8, link to:

```text
prompts/layered-questioning-validation.md
```

Do not duplicate the full prompt.

In Section 2.9, summarize:

- what was reviewed
- what was validated
- corrections made
- contextual findings
- remaining limitations

Do not complete:

```text
2.10 Human Evaluation and Corrections
```

That section must remain for the developer to complete after reviewing this
validation report.

### 6. Requirements mapping

Update only requirements directly affected by this Validation stage.

The complete Layered Questioning workflow must remain:

```text
Partially completed
```

until the developer records the human evaluation in Section 2.10.

Do not mark unrelated requirements as completed.

### 7. Markdown and structural checks

Check:

- completed sections do not contain `_Not started._`
- unfinished sections retain their placeholders
- headings are correctly ordered
- code fences are balanced
- tables have consistent columns
- relative prompt links resolve
- reference IDs use consistent formatting
- validation IDs are unique
- UTF-8 text is valid
- no accidental duplicated content exists

## Allowed Changes

You may modify only:

```text
docs/week1/research.md
docs/week1/references.md
docs/week1/validation-log.md
docs/week1/ai-workflow-evidence.md
docs/week1/requirements-mapping.md
```

Modify a file only when validation finds a necessary correction.

Do not modify:

```text
README.md
docs/week1/prompts/
note/
src/
package.json
package-lock.json
.gitignore
```

Do not create implementation or test files.

Do not stage, commit, push, merge, or create a pull request.

## Correction Rules

Make only corrections that are supported by:

- the existing references
- the assignment requirements
- internal consistency
- sound technical reasoning

For every material correction:

1. Identify the original problem.
2. Explain why it was inaccurate or misleading.
3. Record the validation result.
4. Correct the affected wording.
5. Preserve the intended scope of the document.

Do not rewrite correct sections merely for stylistic preference.

Do not expand unfinished Chapters 4 through 10.

## Quality Checks

Before finishing, run:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Also verify:

- no source or package file changed
- only allowed documentation files changed
- no files were staged
- no new implementation files were created
- completed Markdown fences remain balanced
- unfinished workflow stages remain unfinished

## Final Response

Return a structured report containing:

1. Verdict:
   - Valid
   - Valid with minor corrections
   - Requires material correction

2. Files inspected.

3. Files modified.

4. TDD claims validated.

5. Practical example findings.

6. Reference-traceability findings.

7. Validation entries added or updated.

8. Corrections made.

9. Remaining uncertainties or limitations.

10. Requirements statuses updated.

11. Quality-check results.

12. Confirmation that nothing was staged, committed, or pushed.

Finally, provide a concise copy-ready summary that the developer may use when
completing:

```text
Section 2.10 — Human Evaluation and Corrections
```

Do not insert that human evaluation into the file automatically.