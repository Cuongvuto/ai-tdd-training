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

### V-008 - Do Not Overstate the Known Ticket Status Domain

- **AI claim:** `TicketStatus = 'open'` accurately represents the Ticket
  Manager's status type in this conceptual refactor.
- **Category:** Practical example naming and domain scope.
- **Validation method:** Compared the type name with the example's single
  requirement and the rule that Refactor must not introduce a new business
  feature.
- **Evidence or reference:** Internal scope consistency and the
  behavior-preserving definition of refactoring [R-011].
- **Evaluation:** The broad name implies that the future domain permits only
  `open`, while the example establishes only the initial status. Inventing
  additional literals would also exceed the documented behavior.
- **Status:** Corrected
- **Correction or final wording:** Remove the premature general status type and
  limit this refactor to extracting title validation. Define `TicketStatus`
  later when lifecycle requirements are known.
- **Impact on research:** Section 3.5 no longer presents a one-literal type as
  the complete status domain, and workflow evidence records the correction.

### V-009 - A Unit Is Not Always One Class or Function

- **AI claim:** A unit test must always test exactly one class or one function.
- **Category:** Testing-level definition.
- **Validation method:** Compared the absolute claim with formal component-test
  purposes and the documented solitary and sociable unit-test styles.
- **Evidence or reference:** [R-003], [R-015].
- **Evaluation:** The useful unit boundary is a cohesive behavior chosen for the
  architecture. It can be one function, one object, or a small collaborating
  cluster; the system under test must be stated.
- **Status:** Rejected
- **Correction or final wording:** A unit test exercises one deliberately narrow
  behavioral boundary, whose physical size depends on context.
- **Impact on research:** Section 4.1 avoids defining unit tests by a fixed
  function or class count.

### V-010 - Multiple Objects Do Not Automatically Mean Integration

- **AI claim:** Every test that uses multiple real objects is automatically an
  integration test.
- **Category:** Boundary classification.
- **Validation method:** Checked sociable unit testing and the ambiguity of the
  term integration test.
- **Evidence or reference:** [R-015], [R-016].
- **Evaluation:** A sociable unit test can include real in-process collaborators
  while exercising one cohesive unit. Classification requires the purpose and
  boundary, not an object count.
- **Status:** Rejected
- **Correction or final wording:** Name the system under test and real seam being
  verified before classifying a multi-object test.
- **Impact on research:** Sections 4.1 and 4.2 define levels by evidence and
  boundaries rather than object count.

### V-011 - Integration Testing Is Not Limited to Databases

- **AI claim:** Integration testing means only testing code against a database.
- **Category:** Testing-level definition.
- **Validation method:** Compared the claim with component- and system-
  integration purposes and narrow-integration terminology.
- **Evidence or reference:** [R-003], [R-016].
- **Evaluation:** Integration tests can examine any selected interaction or
  interface, including a file system, external service, process, or pair of
  components. A database is only one possible seam.
- **Status:** Rejected
- **Correction or final wording:** Integration testing verifies collaboration
  across a named real boundary; for this CLI, JSON persistence is a key seam.
- **Impact on research:** Section 4.2 uses the real file-system boundary as the
  principal project example.

### V-012 - Unit Tests Cannot Prove the Complete CLI Works

- **AI claim:** Passing unit tests prove that the complete Ticket Manager CLI
  works for users.
- **Category:** Scope of assurance.
- **Validation method:** Compared what unit tests omit with the mechanisms needed
  to execute and observe a separate CLI process.
- **Evidence or reference:** [R-004], [R-015].
- **Evaluation:** Unit tests can strongly verify selected logic, but they do not
  exercise the public executable, process environment, standard streams, exit
  status, or real persistence when those dependencies are replaced.
- **Status:** Rejected
- **Correction or final wording:** Unit tests provide local behavioral evidence;
  broader tests are needed for real CLI wiring and storage.
- **Impact on research:** Sections 4.1, 4.3, and 4.4 separate local confidence
  from public-application confidence.

### V-013 - End-to-End Tests Do Not Eliminate Lower Levels

- **AI claim:** End-to-end tests make unit and integration tests unnecessary.
- **Category:** Test-strategy composition.
- **Validation method:** Evaluated the claim against the test-portfolio heuristic
  and the diagnostic role of focused tests.
- **Evidence or reference:** [R-006].
- **Evaluation:** Broad tests cover more wiring per journey but usually provide
  slower feedback and less precise failure localization. Focused tests can
  exercise rule and seam cases more economically.
- **Status:** Rejected
- **Correction or final wording:** Combine levels when they provide distinct
  evidence; broad journeys are a complement, not a universal replacement.
- **Impact on research:** Sections 4.5 and 4.6 explain complementary coverage.

### V-014 - Realism Does Not Make Every End-to-End Test More Valuable

- **AI claim:** End-to-end tests are always more valuable because they are more
  realistic.
- **Category:** Contextual value judgment.
- **Validation method:** Compared realism with execution cost, brittleness,
  diagnostic precision, and exceptions acknowledged by the pyramid heuristic.
- **Evidence or reference:** [R-006].
- **Evaluation:** Realism is valuable when the risk crosses the public boundary,
  but a narrow test can provide faster and more complete evidence for a local
  rule. Broad tests can also be highly valuable when they remain fast and
  reliable.
- **Status:** Contextual
- **Correction or final wording:** Choose the boundary whose evidence matches the
  risk; realism is one criterion, not an automatic ranking.
- **Impact on research:** Sections 4.3 through 4.6 compare evidence and cost
  without declaring one level universally superior.

### V-015 - The Testing Pyramid Does Not Require Fixed Percentages

- **AI claim:** Following the testing pyramid requires a universal numerical
  ratio of unit, integration, and end-to-end tests.
- **Category:** Practitioner heuristic.
- **Validation method:** Checked Fowler's description, assumptions, and stated
  exceptions to the pyramid.
- **Evidence or reference:** [R-006].
- **Evaluation:** The pyramid communicates a direction for a balanced portfolio;
  it does not supply an immutable percentage for every architecture or team.
- **Status:** Rejected
- **Correction or final wording:** Treat the pyramid as a cost-and-feedback
  heuristic and justify the actual distribution from project context.
- **Impact on research:** Section 4.5 intentionally gives no fixed ratio.

### V-016 - One Distribution Does Not Fit Every Project

- **AI claim:** The same testing distribution is suitable for every project and
  remains suitable as the project evolves.
- **Category:** Contextual recommendation.
- **Validation method:** Tested the universal claim against the assumptions and
  exceptions behind broad-versus-focused test costs.
- **Evidence or reference:** [R-006].
- **Evaluation:** Risk, architecture, execution time, dependencies, platforms,
  and maintenance cost vary; the useful distribution can change with them.
- **Status:** Rejected
- **Correction or final wording:** Select and revisit the mix using current
  project risks and feedback economics.
- **Impact on research:** Sections 4.5 and 4.6 leave the Ticket Manager mix
  provisional pending developer evaluation.

### V-017 - A Mock Cannot Prove Real JSON Persistence

- **AI claim:** A passing repository mock proves that the application can store
  and retrieve real JSON files.
- **Category:** Test doubles and evidence boundary.
- **Validation method:** Compared what a test double replaces with the real file
  API and fixture required to cross the storage boundary.
- **Evidence or reference:** [R-005], [R-017].
- **Evaluation:** A mock can verify the caller's interaction with its assumed
  contract. It does not execute encoding, paths, permissions, or real
  read/write behavior.
- **Status:** Rejected
- **Correction or final wording:** Use an isolated real temporary directory when
  the claim concerns JSON persistence; use doubles for caller behavior when
  appropriate.
- **Impact on research:** Sections 4.1, 4.2, and 4.4 distinguish fake-repository
  confidence from real-storage confidence.

### V-018 - Passing End-to-End Tests Do Not Prove Complete Correctness

- **AI claim:** A passing end-to-end test proves that the entire application is
  correct.
- **Category:** Scope of assurance.
- **Validation method:** Compared the finite journeys exercised by a broad test
  with the general limitation of program testing.
- **Evidence or reference:** [R-013].
- **Evaluation:** A passing journey supports only the observed behavior for its
  selected inputs, environment, and assertions. Untested rules, failure paths,
  platforms, and weak assertions can still hide defects.
- **Status:** Rejected
- **Correction or final wording:** Treat each passing E2E test as scoped evidence
  for one journey, not proof of complete correctness.
- **Impact on research:** Sections 4.3 and 4.4 state the confidence boundary of
  process-level tests explicitly.
