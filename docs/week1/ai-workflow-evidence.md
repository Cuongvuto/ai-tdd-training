# AI Workflow Evidence

## 1. Purpose

This document records how AI was used as a collaborative tool during the Week 1
TDD research assignment.

The developer remains responsible for:

- defining the research scope
- selecting questions
- evaluating suggestions
- checking sources
- rejecting unsuitable output
- making contextual technical decisions
- validating the final documentation

---

## 2. Layered Questioning

### 2.1 Objective

Use the sequence:

```text
Research -> Brief -> Example -> Validation
```

to develop an accurate understanding of TDD and testing for CLI tools.

### 2.2 Research Prompt

The repository-aware prompt for this stage is recorded at
[Layered Questioning - Research Prompt](prompts/layered-questioning-research.md).
It limits this pass to research, source evaluation, and initial claim
validation; later Layered Questioning stages remain separate.

### 2.3 Research Result

Research covered the definition and mindset of TDD, its role as a development
and design-feedback practice, Red-Green-Refactor, expected Red failures,
benefits, limitations, suitable contexts, excessive use, and common
misunderstandings.

Sources were selected in layers: Beck's foundational book; Fowler's practitioner
explanations of TDD and refactoring; official Microsoft guidance; an Agile
Alliance glossary; a meta-analysis, an industrial case study, and a systematic
review; and Dijkstra's foundational statement about the limits of testing.
Important conclusions were that test-first alone is not the full discipline,
Green is not the final design, refactoring preserves observable behavior, and
TDD neither guarantees defect-free software nor universally improves design.

The empirical evidence suggests possible quality benefits but also shows
context-sensitive productivity, skill, legacy-code, and automation trade-offs.
Seven validation entries (`V-001` through `V-007`) record corrections and
contextual qualifications. The practical cycle example, testing levels, Ticket
Manager test design, AI-code validation, later research chapters, and the Brief,
Example, and Validation workflow stages were intentionally left for later
passes.

### 2.4 Brief Prompt

The repository-aware prompt for this stage is recorded at
[Layered Questioning - Brief Prompt](prompts/layered-questioning-brief.md).
It requests a concise synthesis of the completed Research stage without adding
new claims, sources, reference IDs, or validation entries.

### 2.5 Brief Result

Test-Driven Development (TDD) is a development technique in which a developer
repeatedly describes the next desired behavior with an automated test, observes
that test fail, writes enough production code to make it pass, and then improves
the structure while keeping the tests green [R-001] [R-002]. Its mindset is
incremental and feedback-oriented: clarify one behavior, obtain evidence
quickly, avoid speculative implementation, and continuously remove unnecessary
complexity. Writing a test first is therefore necessary in canonical TDD but is
not the whole practice. Without the short cycle, minimal implementation, and
refactoring, test-first ordering alone does not provide the complete discipline
[R-002] [R-010].

The cycle has three closely connected steps. In **Red**, the developer chooses
one unsupported behavior, writes a focused test, runs it, and confirms that it
fails because the behavior is missing. Inspecting the failure matters: a broken
fixture, unavailable dependency, or unrelated error does not demonstrate that
the test detects the intended gap. An expected compilation failure can be a
valid early Red when it directly represents a deliberately missing type or
operation [R-001] [R-012]. In **Green**, the developer writes the smallest
responsible production change that makes the new test pass and reruns relevant
existing tests. Green is not a demand for the final design; speculative code is
deferred and structural cleanup follows [R-001] [R-010]. In **Refactor**, the
developer removes duplication and improves names, control flow, and boundaries
through small changes. Refactoring preserves externally observable behavior;
an intentional behavior change belongs in a new Red-Green cycle [R-011].

Potential benefits include fast feedback, a growing regression suite, clearer
thinking about interfaces, controlled implementation scope, and a safer basis
for structural improvement [R-001] [R-002] [R-012]. Evidence should be stated
carefully. A meta-analysis found a small overall positive effect on external
quality and little to no discernible overall productivity effect, with results
varying across settings [R-007]. A four-team industrial study reported lower
pre-release defect density alongside increased initial development time, but
those observations are contextual rather than guaranteed outcomes [R-008].

TDD also has costs. Developers must design useful tests, maintain the suite,
and preserve fast, trustworthy feedback. Reported adoption barriers include
limited TDD or test-writing skill, legacy code, additional development time,
and domain or tooling constraints [R-009]. A passing suite checks only the cases
and expectations it expresses; it cannot generally prove that no defects or
misunderstood requirements remain [R-013]. TDD therefore complements rather
than replaces broader testing, review, security analysis, and design judgment.

As a contextual recommendation, TDD is well suited to behavior that can be
expressed in small, observable, deterministic examples, such as business rules,
validation, transformations, parsers, calculations, and reproducible defect
fixes. It can be disproportionate for short-lived exploration, poorly understood
behavior, slow or unstable automation, hardware-dependent work, or tightly
coupled legacy systems [R-009]. Teams should decide based on risk, feedback
speed, maintainability needs, and capability rather than treating strict TDD as
a universal requirement [R-007] [R-009].

The Research stage corrected several misconceptions: TDD is more than writing
tests first; Green is not the final design; refactoring does not intentionally
change observable behavior; TDD does not guarantee defect-free software,
better design, or higher productivity; tests written after implementation can
be valuable without having driven that implementation; and high coverage does
not prove correctness [R-002] [R-007] [R-011] [R-013]. Practical
Red-Green-Refactor examples, testing-level comparisons, Ticket Manager CLI test
design, AI-generated-code validation, later research chapters, and the Example
and Validation stages remain intentionally unfinished.

### 2.6 Practical Example Prompt

The repository-aware prompt for this stage is recorded at
[Layered Questioning - Practical Example Prompt](prompts/layered-questioning-example.md).
It requests one conceptual TypeScript and Vitest-style Red-Green-Refactor cycle
without creating or executing implementation files.

### 2.7 Practical Example Result

The example specifies that a newly created ticket retains a non-empty title,
starts with status `open`, and rejects empty or whitespace-only titles. Red uses
focused Vitest-style assertions and explains that the expected failure must be
caused by missing creation or validation behavior, not by syntax, imports,
fixtures, dependencies, or unrelated repository errors.

Green shows only the responsible minimum: trim the title, reject it when blank,
and create the ticket with `open` status. Refactor extracts title validation and
normalization while keeping inputs, outputs, and validation errors observably
unchanged. A premature one-literal `TicketStatus` type was removed during
Validation because the example establishes only the initial status, not the
future status lifecycle. The snippets are explicitly conceptual and were not
run. They do not cover CLI parsing, persistence, file-storage errors,
identifiers, integration, or end-to-end behavior, and passing them would not
establish complete correctness [R-011] [R-013].

### 2.8 Validation Prompt

The repository-aware prompt for this stage is recorded at
[Layered Questioning - Validation Prompt](prompts/layered-questioning-validation.md).
It requests a critical review of the completed Layered Questioning work while
leaving later research chapters and the other AI workflows unfinished.

### 2.9 Validation Result

The review covered TDD terminology and trade-offs, the conceptual
Red-Green-Refactor example, citation traceability, validation-log consistency,
workflow evidence, requirements statuses, and Markdown structure. The core TDD
account was validated: test-first alone is not full TDD, Red must fail for the
intended reason, Green is a minimum responsible step, Refactor preserves
observable behavior, and neither TDD nor a passing suite guarantees universal
quality, productivity, design, or correctness outcomes.

One example inconsistency required correction: `TicketStatus = 'open'` implied
a complete status domain even though only initial status is specified. The type
was removed, and the refactor now limits itself to the already demonstrated
title validation and normalization. This finding is recorded as `V-008`.
Reference wording was also tightened to distinguish practitioner reasoning about
design feedback from empirical findings about quality and productivity.

All cited reference IDs exist, and the accessible source records support the
attached foundational, practitioner, empirical, and contextual claims. The
empirical results remain qualified by study design and context. Some publisher
and repository endpoints did not expose their complete content through the
available verification interface, so bibliographic and abstract-level checks
were used where full-text access was unavailable; no new source was introduced.

The TypeScript remains conceptual and unexecuted. CLI parsing, persistence,
testing-level comparisons, AI-generated-code validation, Chapters 4 through 10,
Solution Exploration, and Iterative Refinement remain outside this validation.
The original Research prompt also contains legacy `docs/week-1` path examples;
the repository uses `docs/week1`, so the existing corresponding files were
reviewed without modifying the historical prompt. Section 2.10 is intentionally
left for the developer's human evaluation.

### 2.10 Human Evaluation and Corrections

I reviewed the AI validation findings and accepted the overall verdict of
**Valid with minor corrections**.

The validation confirmed that the completed research accurately explains TDD,
the distinction between test-first development and the complete TDD discipline,
the Red-Green-Refactor cycle, the need for Red to fail for the intended reason,
the minimum responsible implementation during Green, and behavior-preserving
refactoring.

I accepted the correction that removed the premature
`TicketStatus = 'open'` type. The practical example specifies only that a newly
created ticket starts with the status `open`; it does not yet define the
complete ticket status lifecycle. Keeping a general `TicketStatus` type with
only one literal would therefore imply a broader domain decision that has not
been researched or specified.

I also accepted the revised distinction between practitioner observations and
empirical evidence. Practitioner sources support the view that TDD can provide
useful design feedback, while empirical studies show that quality and
productivity outcomes vary by project context, developer experience, task, and
process adherence. These outcomes must not be presented as universal
guarantees.

The conceptual TypeScript example remains intentionally unexecuted. It
illustrates one Red-Green-Refactor cycle but does not prove complete correctness
and does not cover CLI parsing, persistence, file-storage errors, integration
testing, or end-to-end testing.

Based on this review, I accept the corrections recorded in `V-008` and consider
the Layered Questioning workflow complete. Testing-level research, broader
Ticket Manager CLI test design, AI-generated-code validation, Solution
Exploration, and Iterative Refinement remain separate unfinished stages.

---

## 3. Solution Exploration

### 3.1 Objective

Explore multiple testing approaches, compare their trade-offs, and select an
approach based on the Ticket Manager CLI context.

### 3.2 Problem Selected for Exploration

_Not started._

### 3.3 Options Considered

_Not started._

### 3.4 Comparison Criteria

_Not started._

### 3.5 AI Comparison

_Not started._

### 3.6 Human Evaluation

_Not started._

### 3.7 Contextual Decision

_Not started._

### 3.8 Assumptions and Limitations

_Not started._

---

## 4. Iterative Refinement

### 4.1 Objective

Review and improve the research through several controlled refinement passes.

### 4.2 Initial Review Prompt

_Not started._

### 4.3 Initial AI Feedback

_Not started._

### 4.4 Human Evaluation

_Not started._

### 4.5 Refinement Pass 1

_Not started._

### 4.6 Refinement Pass 2

_Not started._

### 4.7 Refinement Pass 3

_Not started._

### 4.8 Final Validation Prompt

_Not started._

### 4.9 Final Validation Result

_Not started._

---

## 5. Lessons Learned

_Not started._
