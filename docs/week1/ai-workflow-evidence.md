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

_Not started._

### 2.7 Practical Example Result

_Not started._

### 2.8 Validation Prompt

_Not started._

### 2.9 Validation Result

_Not started._

### 2.10 Human Evaluation and Corrections

_Not started._

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
