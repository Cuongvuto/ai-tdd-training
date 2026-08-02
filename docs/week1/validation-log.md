# Validation Log

## Purpose

This document records the evaluation of AI-generated claims and examples.

A claim is not accepted only because it was generated confidently. Important
statements must be checked against reliable sources, project requirements, or
technical reasoning.

## Status Definitions

- **Pending:** Not yet checked.
- **Validated:** Supported by reliable evidence.
- **Corrected:** Partially incorrect and revised.
- **Rejected:** Incorrect, misleading, or unsuitable.
- **Contextual:** Valid only under specific conditions.
- **Project Decision:** A deliberate decision for this project rather than a
  universal testing rule.

---

## Validation Entry Template

### V-XXX - Title

- **AI claim:**
- **Category:**
- **Validation method:**
- **Evidence or reference:**
- **Evaluation:**
- **Status:**
- **Correction or final wording:**
- **Impact on research:**

---

## Validation Entries

### V-001 - TDD Is More Than Test-First Ordering

- **AI claim:** TDD means only “writing tests before code.”
- **Category:** Definition and common misunderstanding.
- **Validation method:** Compared the claim with Beck's foundational discipline,
  Fowler's cycle, and the Agile Alliance definition.
- **Evidence or reference:** [R-001], [R-002], [R-010].
- **Evaluation:** Test-first ordering is necessary in canonical TDD, but it omits
  the short feedback loop, minimum implementation, and refactoring discipline.
- **Status:** Corrected
- **Correction or final wording:** TDD repeatedly uses a failing test to drive a
  minimal implementation and then improves the design while tests remain green.
- **Impact on research:** Sections 2.1 and 3.6 use the complete discipline rather
  than equating TDD with test-first alone.

### V-002 - Red Must Provide the Intended Evidence

- **AI claim:** Any failure is sufficient for the Red step.
- **Category:** Process discipline.
- **Validation method:** Checked the canonical cycle and official Microsoft TDD
  guidance, including inspection of the failure details.
- **Evidence or reference:** [R-001], [R-010], [R-012].
- **Evaluation:** A failure is informative only when it is attributable to the
  intentionally missing behavior. An expected missing-symbol or compilation
  failure can be valid; an unrelated environment or fixture failure is not.
- **Status:** Corrected
- **Correction or final wording:** Run the new test and confirm that it fails for
  the expected reason before implementing the behavior.
- **Impact on research:** Section 3.4 explains failure calibration rather than
  treating a red test-run indicator as sufficient evidence.

### V-003 - Green Is Not the Final Design

- **AI claim:** Green means writing production-quality final code immediately.
- **Category:** Process discipline.
- **Validation method:** Compared the claim with Beck's separation of quick
  success from duplication removal and the documented TDD sequence.
- **Evidence or reference:** [R-001], [R-002], [R-010].
- **Evaluation:** Green asks for the smallest responsible change that passes the
  test. Structural improvement follows in Refactor.
- **Status:** Rejected
- **Correction or final wording:** Make the test pass with minimal code, then
  improve the design before starting the next behavior.
- **Impact on research:** Section 3.2 permits a temporary simple solution but
  explicitly rejects leaving shortcuts unrefactored.

### V-004 - Refactoring Preserves Observable Behavior

- **AI claim:** Refactor may intentionally change externally observable behavior
  as long as the current tests pass.
- **Category:** Terminology and process boundary.
- **Validation method:** Checked Fowler's primary definition and Microsoft's
  separation of refactoring from feature changes.
- **Evidence or reference:** [R-011], [R-012].
- **Evaluation:** A passing suite may be incomplete. An intentional external
  behavior change is development, not a refactoring under the established
  definition.
- **Status:** Rejected
- **Correction or final wording:** Refactoring changes internal structure while
  preserving observable behavior; new behavior starts another Red-Green cycle.
- **Impact on research:** Section 3.3 states the boundary explicitly.

### V-005 - TDD Does Not Guarantee Defect-Free Software

- **AI claim:** Following TDD guarantees that the software has no defects.
- **Category:** Evidence and assurance.
- **Validation method:** Compared the universal claim with the fundamental limit
  of program testing and the scope of observed empirical results.
- **Evidence or reference:** [R-007], [R-008], [R-013].
- **Evaluation:** Tests exercise selected cases. Studies can report lower defect
  density in a context, but neither passing tests nor reported averages prove
  the absence of all defects.
- **Status:** Rejected
- **Correction or final wording:** TDD can improve feedback and may reduce defect
  density, but it cannot guarantee defect-free software.
- **Impact on research:** Sections 2.2, 2.4, 2.5, and 3.6 avoid absolute quality
  claims.

### V-006 - Design Improvement Is Conditional

- **AI claim:** TDD always improves software design.
- **Category:** Benefit and professional opinion.
- **Validation method:** Separated practitioner design reasoning from empirical
  evidence and adoption constraints.
- **Evidence or reference:** [R-002], [R-007], [R-009].
- **Evaluation:** Interface-first feedback and refactoring can support better
  design, but outcomes depend on test boundaries, developer skill, task, and
  context. The evidence does not justify “always.”
- **Status:** Contextual
- **Correction or final wording:** TDD can provide useful design pressure, but it
  does not replace design skill or guarantee a better design.
- **Impact on research:** Sections 2.2 and 2.3 label design benefits as
  conditional rather than universal.

### V-007 - Strict TDD Is a Contextual Choice

- **AI claim:** Every project should use strict TDD for all development work.
- **Category:** Contextual recommendation.
- **Validation method:** Compared the universal recommendation with systematic
  adoption barriers and evidence heterogeneity.
- **Evidence or reference:** [R-007], [R-009].
- **Evaluation:** Automation cost, feedback speed, uncertainty, legacy
  constraints, risk, and team capability vary substantially by project.
- **Status:** Contextual
- **Correction or final wording:** Apply strict TDD where its feedback and
  regression value justify the cost; choose complementary verification methods
  where it does not.
- **Impact on research:** Sections 2.6 and 2.7 present suitability as a project
  decision and leave the Ticket Manager's exact strategy for a later stage.
