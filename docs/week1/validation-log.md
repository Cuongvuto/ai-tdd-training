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
- **Related validations:** [V-020], [V-037].
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

### V-019 - A Handler Test Is Not Automatically End-to-End

- **AI claim:** Calling a command handler directly is automatically an
  end-to-end CLI test.
- **Category:** Testing boundary classification.
- **Validation method:** Compared the invoked boundary with the documented CLI
  subprocess boundary and formal test-level purposes.
- **Evidence or reference:** [R-003], [R-004], [R-016].
- **Evaluation:** A direct handler call remains in the test process and bypasses
  executable startup, argument routing, environment, streams, and process exit.
  It may be a unit or integration test depending on its real collaborators.
- **Status:** Rejected
- **Correction or final wording:** Call a handler directly for focused behavior;
  call the public executable in a separate process for this project's E2E
  boundary.
- **Impact on research:** Sections 5.3 and 5.10 classify parser/handler checks
  separately from subprocess journeys.

### V-020 - Repository Doubles Do Not Exercise JSON Files

- **AI claim:** A mocked repository proves that tickets are persisted correctly
  in a JSON file.
- **Category:** Test doubles and persistence evidence.
- **Validation method:** Compared what a double replaces with the real temporary
  file boundary required by the claim.
- **Evidence or reference:** [R-005], [R-017].
- **Related validations:** [V-017], [V-037].
- **Evaluation:** A mock can check caller interactions and simulated failures,
  but it does not execute serialization, paths, encoding, or real file I/O.
- **Status:** Rejected
- **Correction or final wording:** Use a real repository in an isolated
  temporary directory when claiming evidence about JSON persistence.
- **Impact on research:** Sections 5.4, 5.5, 5.8, and the matrix distinguish
  coordination tests from real-file integration tests.

### V-021 - Does Not Throw Is Incomplete Evidence

- **AI claim:** Checking only that a command does not throw is sufficient to
  establish correct behavior.
- **Category:** Assertion quality.
- **Validation method:** Examined which expected outputs and state changes remain
  unobserved by a no-throw assertion.
- **Evidence or reference:** Technical reasoning and the limits of test evidence
  in [R-013].
- **Related validations:** [V-036].
- **Evaluation:** The command could return the wrong ticket, emit an error,
  silently skip persistence, or modify the wrong record without throwing.
- **Status:** Rejected
- **Correction or final wording:** Assert the smallest meaningful result, output,
  collaborator effect, or stored-state change required by the behavior.
- **Impact on research:** Sections 5.4 through 5.10 specify observable evidence
  instead of relying on absence of exceptions.

### V-022 - Exit Status Alone Does Not Prove CLI Behavior

- **AI claim:** A correct exit status proves the CLI command behaved correctly.
- **Category:** Public-boundary assertion quality.
- **Validation method:** Compared process status with the independent stdout,
  stderr, and storage observations available at the subprocess boundary.
- **Evidence or reference:** [R-004].
- **Evaluation:** A process can return the expected status while printing a
  misleading response, routing the wrong command, or mutating storage
  incorrectly.
- **Status:** Rejected
- **Correction or final wording:** Combine exit semantics with the output and
  storage observations relevant to the particular command claim.
- **Impact on research:** Sections 5.4 and 5.9 require multi-signal evidence for
  selected public success and failure paths.

### V-023 - Every Scenario Need Not Be Repeated at Every Level

- **AI claim:** Every scenario should be duplicated as unit, integration, and
  end-to-end tests.
- **Category:** Test portfolio design.
- **Validation method:** Evaluated the duplication against the testing-pyramid
  heuristic and the distinct evidence supplied by each boundary.
- **Evidence or reference:** [R-006].
- **Evaluation:** Repetition adds execution and maintenance cost without equal
  value when the wider boundary supplies no new evidence. Selected critical
  behavior may appear at multiple levels for different purposes.
- **Status:** Rejected
- **Correction or final wording:** Place a case at the narrowest sufficient
  boundary and add broader coverage only for a real seam or public-journey risk.
- **Impact on research:** Section 5.10 gives each matrix row a main risk and
  avoids a three-level copy of every behavior.

### V-024 - Temporary Directories Do Not Guarantee Determinism

- **AI claim:** Using a temporary directory automatically makes every file test
  deterministic.
- **Category:** Test isolation and reliability.
- **Validation method:** Compared the isolation provided by a unique directory
  with other uncontrolled inputs and platform behavior.
- **Evidence or reference:** [R-017].
- **Evaluation:** A unique directory reduces shared-file interference, but time,
  random IDs, process environment, concurrency, cleanup, and platform-specific
  file behavior can still vary.
- **Status:** Corrected
- **Correction or final wording:** Use a unique temporary directory as one
  isolation control and separately manage every nondeterministic dependency
  relevant to the test.
- **Impact on research:** Section 5.8 states the remaining controls and limits
  explicitly.

### V-025 - Missing, Malformed, and Unknown IDs Are Distinct

- **AI claim:** A missing ID, malformed ID, and well-formed unknown ID are
  equivalent errors.
- **Category:** Input and domain error taxonomy.
- **Validation method:** Traced where each condition can be known and whether a
  repository lookup is meaningful.
- **Evidence or reference:** Project command context and boundary reasoning from
  [R-003].
- **Evaluation:** Missing and malformed IDs are usage failures detectable before
  lookup. An unknown ID is a not-found result after valid input and a successful
  lookup. Storage unavailability is a fourth distinct condition.
- **Status:** Rejected
- **Correction or final wording:** Preserve the error categories while leaving
  exact messages and exit codes for the public-contract decision.
- **Impact on research:** Sections 5.6, 5.7, 5.9, and the matrix test the
  categories separately.

### V-026 - Exact CLI Formatting Is a Contextual Contract

- **AI claim:** Every CLI test should assert the complete output character for
  character.
- **Category:** Assertion brittleness and public contract.
- **Validation method:** Compared semantic behavior assertions with the
  maintenance cost of coupling tests to decorative formatting.
- **Evidence or reference:** Broad-test brittleness guidance in [R-006].
- **Evaluation:** Exact comparison is valuable when formatting itself is a
  documented machine- or user-facing contract. It is unnecessary for domain and
  filtering claims and can make unrelated layout changes break tests.
- **Status:** Contextual
- **Correction or final wording:** Assert stable semantic fields by default and
  use exact output checks only for explicitly selected formatting contracts.
- **Impact on research:** Sections 5.3 through 5.7 avoid whole-table assertions
  for business behavior.

### V-027 - A Write Test Does Not Prove the Reader

- **AI claim:** If a write test passes, the JSON read implementation is proven
  correct.
- **Category:** Persistence test design.
- **Validation method:** Separated writer behavior from reader behavior and
  considered correlated defects in a round-trip test.
- **Evidence or reference:** File-boundary mechanics in [R-017] and testing
  limits in [R-013].
- **Evaluation:** A writer and reader can share the same incorrect assumption,
  allowing a round trip to pass. A write-only assertion does not execute the
  reader at all.
- **Status:** Rejected
- **Correction or final wording:** Check valid written JSON and independently
  seed known JSON when testing the reader; keep a round-trip test as additional
  collaboration evidence.
- **Impact on research:** Section 5.8 and the storage matrix explicitly require
  both independent and round-trip cases.

### V-028 - Tests Must Not Share One Mutable JSON Fixture

- **AI claim:** File tests can safely share one mutable JSON file across cases.
- **Category:** Test isolation.
- **Validation method:** Evaluated execution-order, parallelism, cleanup, and
  failure contamination risks against unique-directory support.
- **Evidence or reference:** [R-017].
- **Evaluation:** One test can leave state that changes another test's starting
  condition, especially after failure or parallel execution. The outcome then
  depends on order rather than the documented fixture.
- **Status:** Rejected
- **Correction or final wording:** Give each test an independently created
  temporary directory and clean it in teardown without touching user data.
- **Impact on research:** Section 5.8 and each real-file matrix row require
  isolated temporary storage.

### V-029 - Failure Paths Are Required Evidence

- **AI claim:** Successful command paths are sufficient; validation and storage
  failures do not need tests.
- **Category:** Coverage quality.
- **Validation method:** Compared happy-path evidence with the documented error
  categories and their possible storage effects.
- **Evidence or reference:** Test-level purposes in [R-003] and assurance limits
  in [R-013].
- **Evaluation:** Success cases cannot show that invalid data is rejected, errors
  remain distinguishable, false success is avoided, or prior data survives a
  persistence failure.
- **Status:** Rejected
- **Correction or final wording:** Add representative domain, usage,
  not-found, persistence, and unexpected failure paths at suitable boundaries.
- **Impact on research:** Sections 5.4 through 5.10 include both successful and
  failure-path evidence.

### V-030 - Test Count Does Not Establish Reliability

- **AI claim:** A large number of passing tests proves the CLI is reliable.
- **Category:** Evidence and test quality.
- **Validation method:** Compared raw test count with requirement relevance,
  assertion strength, boundary coverage, and the general limits of testing.
- **Evidence or reference:** [R-013].
- **Evaluation:** Many redundant or weak tests can miss the same requirement,
  real dependency, failure path, or platform risk. Passing selected examples
  does not prove the absence of defects.
- **Status:** Rejected
- **Correction or final wording:** Evaluate the risks, behaviors, boundaries,
  assertions, and failure modes covered rather than using count as proof.
- **Impact on research:** Section 5.10 justifies boundaries and main risks for
  the proposed cases instead of presenting quantity as assurance.

### V-031 - Compilation Does Not Establish Required Behavior

- **AI claim:** AI-generated code is correct if it compiles or type-checks.
- **Category:** Static evidence versus behavioral correctness.
- **Validation method:** Compared TypeScript's static-checking purpose with the
  Ticket Manager's runtime and domain requirements.
- **Evidence or reference:** [R-021], [R-013].
- **Evaluation:** Type checking can detect incompatible operations and shapes,
  but validly typed code can still assign the wrong status, lose tickets, or
  report success after persistence fails.
- **Status:** Rejected
- **Correction or final wording:** Treat compilation and type checking as useful
  static evidence that complements, but does not replace, requirement-focused
  tests and review.
- **Impact on research:** Sections 6.1 and 6.6 distinguish static and runtime
  evidence.

### V-032 - Generated Tests Do Not Prove Generated Code Correct

- **AI claim:** Passing AI-generated tests prove the AI-generated implementation
  is correct.
- **Category:** Scope and independence of evidence.
- **Validation method:** Compared selected passing oracles with empirical oracle
  limitations and the general limits of testing.
- **Evidence or reference:** [R-022], [R-013].
- **Evaluation:** Generated tests may be valuable, but weak assertions, missing
  cases, and incorrect expected results can allow the implementation to pass.
- **Status:** Rejected
- **Correction or final wording:** Review the tests against the requirement and
  treat their passing results as scoped evidence only.
- **Impact on research:** Sections 6.2, 6.3, and 6.6 require review of both
  generated artifacts.

### V-033 - A Shared Generator Is Not Automatic Independence

- **AI claim:** Tests generated by the same AI are automatically independent
  validation of its implementation.
- **Category:** Correlated-assumption risk.
- **Validation method:** Traced both outputs to their shared prompt and compared
  that relationship with measured limitations of generated test oracles.
- **Evidence or reference:** [R-022] and project reasoning about common input
  assumptions.
- **Evaluation:** Both proposals can infer the same invented API or expected
  result from an ambiguous prompt. Different files do not make their reasoning
  independent.
- **Status:** Rejected
- **Correction or final wording:** Compare each artifact separately with the
  original requirement, repository, and reliable sources.
- **Impact on research:** Section 6.3 explains correlated mistakes explicitly.

### V-034 - Coverage Does Not Prove Requirement Correctness

- **AI claim:** High code coverage proves that the requirements and expected
  behavior are correct.
- **Category:** Metric interpretation.
- **Validation method:** Compared executed code locations with the adequacy of
  assertions and the correctness of the requirement oracle.
- **Evidence or reference:** [R-013].
- **Evaluation:** Coverage can show which code ran, but not that expectations
  were correct, edge cases were selected, or assertions detected wrong results.
- **Status:** Rejected
- **Correction or final wording:** Use coverage to find unexercised areas, not as
  proof that requirements or behavior are correct.
- **Impact on research:** Section 6.6 lists coverage among scoped, potentially
  stale evidence.

### V-035 - Happy Paths Are Insufficient for Generated CLI Code

- **AI claim:** Successful-path tests are sufficient for AI-generated CLI code.
- **Category:** Missing failure-path coverage.
- **Validation method:** Compared happy-path evidence with domain, input,
  persistence, and not-found risks at the documented test boundaries.
- **Evidence or reference:** [R-003], [R-013].
- **Evaluation:** Success cases do not expose blank input, corrupt JSON, unknown
  IDs, failed writes, false success, or preservation failures.
- **Status:** Rejected
- **Correction or final wording:** Add representative boundary and failure cases
  at the narrowest level that can supply the required evidence.
- **Impact on research:** Sections 6.1, 6.3, and 6.5 connect generated-code review
  to the Chapter 5 failure matrix.

### V-036 - Not Throwing Is Not Command Correctness

- **AI claim:** `not.toThrow()` alone is enough to validate a command.
- **Category:** Weak assertion.
- **Validation method:** Listed plausible wrong outputs and state changes that do
  not require an exception.
- **Evidence or reference:** Testing limits in [R-013].
- **Related validations:** [V-021].
- **Evaluation:** A command can silently do nothing, return the wrong result,
  print an error, or mutate the wrong ticket without throwing.
- **Status:** Rejected
- **Correction or final wording:** Assert the smallest meaningful output,
  result, collaborator effect, or stored-state change for the requirement.
- **Impact on research:** Section 6.4 pairs this weak assertion with stronger
  observable evidence.

### V-037 - Mock Success Is Not Real Persistence Evidence

- **AI claim:** A successful mock interaction proves real JSON persistence.
- **Category:** Test-double boundary.
- **Validation method:** Compared mock observations with the replaced
  serialization, path, and file-system behavior.
- **Evidence or reference:** [R-005], [R-017].
- **Related validations:** [V-017], [V-020].
- **Evaluation:** A mock records an assumed interaction; it does not write,
  parse, preserve, or recover a real JSON file.
- **Status:** Rejected
- **Correction or final wording:** Use mock assertions for caller coordination
  and an isolated real-file integration test for persistence claims.
- **Impact on research:** Sections 6.2 and 6.4 state the boundary of mock-based
  evidence.

### V-038 - E2E Success Does Not Remove Code Review

- **AI claim:** Passing E2E tests eliminate the need to review AI-generated code.
- **Category:** Broad-test evidence and human accountability.
- **Validation method:** Compared selected public journeys with hidden code paths,
  security risks, and the general limits of testing.
- **Evidence or reference:** [R-004], [R-013], [R-020].
- **Evaluation:** E2E tests can miss insecure error handling, unexecuted branches,
  unnecessary complexity, stale dependencies, and unsupported features.
- **Status:** Rejected
- **Correction or final wording:** Use E2E evidence for selected public behavior
  and retain human diff, code, dependency, and risk review.
- **Impact on research:** Sections 6.6 and 6.7 keep code review as a separate
  required activity.

### V-039 - Tests Cannot Decide an Ambiguous Requirement

- **AI claim:** Tests can resolve ambiguous requirements without human
  clarification.
- **Category:** Requirement ownership.
- **Validation method:** Traced a test's expected result back to the source that
  authorizes it.
- **Evidence or reference:** Project requirements and testing limits in [R-013].
- **Evaluation:** A test can make one interpretation executable, but it cannot
  determine whether missing-file behavior, status transitions, or exit codes
  were intended by stakeholders.
- **Status:** Rejected
- **Correction or final wording:** Record ambiguity, obtain a human project
  decision, and only then encode the selected behavior as a test.
- **Impact on research:** Sections 6.3, 6.5, and 6.7 keep unresolved Chapter 5
  decisions open.

### V-040 - More Generated Tests Do Not Always Add Confidence

- **AI claim:** Generating more tests always increases confidence.
- **Category:** Test quantity versus evidence quality.
- **Validation method:** Compared count with assertion strength, duplication,
  boundaries, and empirical limitations of generated oracles.
- **Evidence or reference:** [R-006], [R-013], [R-022].
- **Evaluation:** Additional weak or duplicate tests can add cost without
  detecting another plausible defect. Confidence depends on relevant evidence,
  not count alone.
- **Status:** Rejected
- **Correction or final wording:** Add a test when it covers a meaningful risk,
  partition, failure mode, or real boundary not already evidenced.
- **Impact on research:** Sections 6.3 and 6.5 favor targeted case discovery over
  arbitrary generation volume.

### V-041 - A Regression Suite Cannot Prove No Other Change

- **AI claim:** A passing regression suite proves that no unrelated behavior
  changed.
- **Category:** Regression evidence limits.
- **Validation method:** Compared the behaviors selected by the suite with all
  possible observable behavior.
- **Evidence or reference:** [R-013].
- **Evaluation:** A passing suite supports its existing assertions and cases;
  uncovered behavior or stale expectations can still change.
- **Status:** Rejected
- **Correction or final wording:** Use regression results with diff review and
  add focused tests when the change exposes an uncovered risk.
- **Impact on research:** Sections 6.2, 6.6, and 6.7 require both regression
  execution and human review.

### V-042 - Professional Appearance Is Not Test Evidence

- **AI claim:** AI-generated tests should be trusted when they look detailed and
  professionally written.
- **Category:** Evaluation bias.
- **Validation method:** Separated presentation quality from compilation,
  requirement fidelity, assertion strength, and fault detection.
- **Evidence or reference:** [R-020], [R-022].
- **Evaluation:** Plausible naming and extensive setup can hide an invented API,
  wrong expected value, weak oracle, or missing failure path.
- **Status:** Rejected
- **Correction or final wording:** Judge a generated test by traceable
  requirements and its ability to fail for relevant defects, not appearance.
- **Impact on research:** Section 6.3 provides an evidence-based review
  checklist.

### V-043 - Type Checking and Tests Supply Different Evidence

- **AI claim:** Type checking and automated testing provide identical evidence.
- **Category:** Verification-method distinction.
- **Validation method:** Compared TypeScript's pre-execution type analysis with
  test-level execution of selected behaviors.
- **Evidence or reference:** [R-021], [R-003].
- **Evaluation:** Type checking evaluates permitted shapes and operations;
  tests observe selected runtime results and dependencies. Neither subsumes all
  evidence from the other.
- **Status:** Rejected
- **Correction or final wording:** Use type checking and tests as complementary
  controls with distinct failure signals.
- **Impact on research:** Sections 6.1 and 6.6 explain the distinction.

### V-044 - Passing Tests Do Not Justify Skipping Diff Review

- **AI claim:** A developer can accept AI changes without inspecting the diff
  when tests pass.
- **Category:** Human review and change control.
- **Validation method:** Compared test scope with risks visible only in the
  proposed source, dependency, path, error, or architectural changes.
- **Evidence or reference:** [R-020], [R-013].
- **Evaluation:** Passing tests may miss speculative features, unsafe errors,
  security weaknesses, unnecessary complexity, or changes outside their
  assertions.
- **Status:** Rejected
- **Correction or final wording:** Inspect the complete intended diff and accept
  only reviewed changes supported by relevant static and runtime evidence.
- **Impact on research:** Section 6.7 requires code and diff review before test
  execution can lead to acceptance or commit.

### V-045 - Private Access Does Not Improve Behavioral Evidence

- **AI claim:** Tests should call private methods directly to maximize coverage
  because private implementation details are stable testing contracts.
- **Category:** Public behavior versus implementation coupling.
- **Validation method:** Compared the evidence visible through a unit's public
  boundary with failures caused only by renaming, extracting, or replacing a
  private algorithm.
- **Evidence or reference:** [R-015], [R-013], and existing coverage correction
  [V-034].
- **Evaluation:** Direct private access can execute more code while freezing an
  incidental design. It may fail after a behavior-preserving refactor and does
  not establish that callers receive the correct result.
- **Status:** Rejected
- **Correction or final wording:** Test observable behavior through a deliberate
  public boundary; assert a collaborator interaction only when that interaction
  is itself an agreed contract.
- **Impact on research:** Section 7.2 distinguishes public behavior, relevant
  collaboration, and private implementation details.

### V-046 - Verifying Every Mock Interaction Does Not Strengthen a Test

- **AI claim:** Verifying every mock interaction always makes a test stronger.
- **Category:** Interaction overspecification.
- **Validation method:** Compared required outcomes with internal call sequences
  that could change without altering the behavior.
- **Evidence or reference:** [R-005] and project reasoning about the documented
  use-case/repository boundary.
- **Evaluation:** Assertions about every call can make the test mirror one
  implementation and fail during safe refactoring. They add evidence only when
  an argument, count, or absence of a call is behaviorally relevant.
- **Status:** Rejected
- **Correction or final wording:** Prefer observable outcomes and verify only
  interactions that express a requirement or architectural contract.
- **Impact on research:** Sections 7.2 and 7.4 explain when interaction checks
  are useful and when they are brittle.

### V-047 - More Mocks Do Not Automatically Improve Isolation

- **AI claim:** Adding more mocks always makes tests faster and better isolated.
- **Category:** Test-double selection.
- **Validation method:** Compared a focused dependency replacement with setup
  complexity, behavioral drift, and the real boundaries removed by additional
  mocks.
- **Evidence or reference:** [R-005], [R-006], and existing persistence findings
  [V-017] and [V-037].
- **Evaluation:** A double can control a difficult dependency, but unnecessary
  doubles can duplicate production logic, obscure the scenario, and remove the
  JSON or process evidence the test claims to supply.
- **Status:** Rejected
- **Correction or final wording:** Replace only dependencies needed for the
  focused claim, and retain real-file or subprocess tests for risks at those
  boundaries.
- **Impact on research:** Section 7.4 presents mocks contextually instead of as
  universally good or harmful.

### V-048 - Branch Coverage Does Not Establish Edge-Case Completeness

- **AI claim:** High or complete branch coverage proves that all important edge
  cases have been tested.
- **Category:** Coverage interpretation.
- **Validation method:** Compared branch execution counts with input partitions,
  dependency failures, state preservation, and assertion adequacy.
- **Evidence or reference:** [R-023], [R-013], and existing coverage finding
  [V-034].
- **Evaluation:** One input can execute a branch without representing every
  meaningful value in that branch, and a weak oracle can accept the wrong
  outcome after execution.
- **Status:** Rejected
- **Correction or final wording:** Use branch coverage to locate unvisited code,
  then derive meaningful cases from requirements and risks rather than treating
  the metric as a completeness proof.
- **Impact on research:** Section 7.7 separates diagnostic coverage signals from
  edge-case and requirement quality.

### V-049 - Tests Added After Implementation Are Not Retrospective TDD

- **AI claim:** Tests written after an implementation was accepted show that the
  original implementation followed TDD.
- **Category:** Development-process classification.
- **Validation method:** Compared the observed work order with the test-first
  Red-Green-Refactor sequence.
- **Evidence or reference:** [R-001], [R-002], [R-010].
- **Evaluation:** Later tests may document behavior, reproduce defects, and add
  regression protection, but they did not drive an implementation that already
  existed.
- **Status:** Rejected
- **Correction or final wording:** Describe later tests by their actual purpose;
  claim TDD only when an expected failing test preceded and guided the minimum
  implementation.
- **Impact on research:** Section 7.8 distinguishes TDD, tests-after,
  characterization, regression, and bug-reproduction tests.

### V-050 - Immediate Green Is Not the Red Step

- **AI claim:** A new test that passes immediately can be accepted as the Red
  step of TDD.
- **Category:** Red evidence.
- **Validation method:** Compared immediate success with the purpose of observing
  a failure caused by intentionally missing behavior.
- **Evidence or reference:** [R-002], [R-012], and existing Red correction
  [V-002].
- **Evaluation:** Immediate Green may mean the behavior already exists, the test
  is weak, or the test does not reach the intended path. It provides no observed
  missing-behavior failure.
- **Status:** Rejected
- **Correction or final wording:** Confirm a meaningful failure for the expected
  reason before implementation; separately investigate syntax, dependency, and
  environment failures because they are not the intended Red.
- **Impact on research:** Section 7.8 states the evidence required before calling
  a step Red.

### V-051 - A Snapshot Is Not Automatically a Meaningful Oracle

- **AI claim:** Creating a snapshot automatically gives a test a meaningful
  assertion.
- **Category:** Oracle quality and maintenance.
- **Validation method:** Compared recorded output with confirmed semantic
  requirements and plausible wrong values that a reviewer might approve by
  updating the snapshot.
- **Evidence or reference:** Testing limits in [R-013] and the contextual exact-
  output finding [V-026].
- **Evaluation:** A snapshot can preserve approved output, but it can also freeze
  decorative details, internal objects, or an already-wrong result without
  explaining which behavior matters.
- **Status:** Rejected
- **Correction or final wording:** Use a snapshot only for deliberately selected
  stable output and review its semantic changes; prefer focused assertions when
  only a few fields define the contract.
- **Impact on research:** Sections 7.2, 7.3, and 7.5 treat snapshot and exact-
  output checks as contextual choices.

### V-052 - Replacing a Brittle Test Can Improve Quality

- **AI claim:** Removing a brittle test always reduces test-suite quality.
- **Category:** Suite maintenance.
- **Validation method:** Compared the risk protected by a test with failures
  caused only by private structure or obsolete expectations.
- **Evidence or reference:** [R-006], [R-015], and project reasoning about
  behavior-preserving refactoring.
- **Evaluation:** Deleting protection for required behavior is risky, but
  removing or replacing a redundant, obsolete, or implementation-coupled test
  can reduce noise while preserving stronger behavioral evidence.
- **Status:** Rejected
- **Correction or final wording:** Identify the behavior and risk before removal;
  retain or replace meaningful protection rather than preserving brittleness by
  test count alone.
- **Impact on research:** Section 7.5 evaluates test value by distinct evidence,
  not mere presence.

### V-053 - Duplicate Tests Have Real Maintenance Cost

- **AI claim:** Test duplication is harmless because tests are not production
  code.
- **Category:** Test-suite maintainability.
- **Validation method:** Compared repeated evidence with execution cost,
  fixture maintenance, change amplification, and duplicate failure signals.
- **Evidence or reference:** [R-006] and existing boundary placement finding
  [V-023].
- **Evaluation:** Tests are executable project code. Near-duplicates can slow
  feedback and require coordinated updates without covering another risk,
  although purposeful overlap across boundaries can be justified.
- **Status:** Rejected
- **Correction or final wording:** Keep a duplicate-looking case only when it
  supplies distinct evidence, risk coverage, or boundary confidence; otherwise
  consolidate it.
- **Impact on research:** Section 7.5 distinguishes wasteful duplication from
  purposeful multi-level overlap.

### V-054 - Random Test Data Is Not Automatically Stronger

- **AI claim:** Random test data always finds more defects than fixed, readable
  test data.
- **Category:** Test-data selection and reproducibility.
- **Validation method:** Compared the potential variation from random input with
  the oracle, reproducibility, diagnosis, and requirement partitions needed by
  a focused test.
- **Evidence or reference:** Testing limits in [R-013] and project reasoning
  about deterministic Ticket Manager fixtures.
- **Evaluation:** Random values can explore additional inputs, but they may add
  no meaningful partition and can make a failure difficult to reproduce when
  the seed and failing value are not recorded.
- **Status:** Rejected
- **Correction or final wording:** Prefer small readable values for focused
  examples; use randomness only for a justified purpose with a reproducible seed
  and captured failing input.
- **Impact on research:** Section 8.4 makes fixed and random data contextual
  choices rather than ranking either universally.

### V-055 - Test-Data Builders Are Optional Tools

- **AI claim:** Every project requires a test-data builder or factory before
  useful tests can be written.
- **Category:** Fixture abstraction.
- **Validation method:** Compared a small explicit fixture with the repetition
  and invalid-default risk that can justify an abstraction later.
- **Evidence or reference:** Project reasoning and the contextual maintenance
  guidance in [R-006].
- **Evaluation:** A builder can reduce noisy repetition, but it can also hide the
  values responsible for a test result. Small fixtures do not require another
  abstraction merely to follow a pattern.
- **Status:** Rejected
- **Correction or final wording:** Start with explicit test data and introduce a
  factory or builder when repeated valid setup materially obscures test intent.
- **Impact on research:** Section 8.4 treats factories as optional tools whose
  value depends on actual repetition.

### V-056 - Not Every Decision Must Precede the First TDD Cycle

- **AI claim:** Every future project decision must be finalized before the first
  TDD cycle can begin.
- **Category:** Decision timing and incremental development.
- **Validation method:** Compared the confirmed title-creation contract with
  later decisions about filters, updates, output, and concurrency.
- **Evidence or reference:** Incremental TDD workflow in [R-001] and [R-002],
  plus the recorded project requirements.
- **Evaluation:** The first domain behavior needs a clear local contract, but it
  does not depend on filter grammar, full status transitions, exact output, or
  concurrency policy.
- **Status:** Rejected
- **Correction or final wording:** Resolve the decisions required for the next
  behavior, record remaining questions, and decide each before tests rely on it.
- **Impact on research:** Sections 8.5 and 8.6 place decisions before their
  relevant phases without blocking all development.

### V-057 - Implementation Must Not Decide Requirements Accidentally

- **AI claim:** An unresolved requirement can always be decided implicitly by
  whichever implementation is written first.
- **Category:** Requirement ownership.
- **Validation method:** Compared implementation behavior with the authority
  needed to select missing-file, status, filter, ordering, and exit contracts.
- **Evidence or reference:** Existing ambiguity finding [V-039] and the Chapter
  8 decision register.
- **Evaluation:** Code can embody one interpretation, but its existence does not
  confirm that stakeholders intended that policy. Tests copied from it can then
  preserve an accidental decision.
- **Status:** Rejected
- **Correction or final wording:** Keep the item unresolved until the developer
  records an authorized project decision, then write expectations for that
  contract.
- **Impact on research:** Section 8.6 keeps required decisions separate from
  accepted strategy and confirmed behavior.

### V-058 - CLI Command Order Is Not the Only Development Order

- **AI claim:** The implementation must follow the visible CLI command list in
  exact order, starting with an E2E test for every command.
- **Category:** Implementation sequencing and test boundary.
- **Validation method:** Compared command-list order with dependency order,
  focused TDD feedback, and the evidence supplied by unit, repository, and
  process boundaries.
- **Evidence or reference:** [R-001], [R-003], [R-006], and existing boundary
  placement finding [V-023].
- **Evaluation:** Public commands depend on domain, parsing, use-case, and
  persistence behavior. Driving each rule first through a subprocess would
  broaden feedback without necessarily adding evidence.
- **Status:** Rejected
- **Correction or final wording:** Choose small increments from dependency and
  risk context, then add E2E evidence when the relevant public journey exists.
- **Impact on research:** Section 8.5 proposes a contextual phase order rather
  than treating the command list as mandatory sequencing.

### V-059 - Local File Success Does Not Establish Platform Support

- **AI claim:** Platform-specific file failures can be ignored because the
  persistence tests pass on one developer machine.
- **Category:** Environment and portability evidence.
- **Validation method:** Compared one local path and permission environment with
  the platform variation documented for subprocess and file-system mechanisms.
- **Evidence or reference:** [R-004], [R-017].
- **Evaluation:** Paths, permissions, process behavior, and reproducible failure
  setup can differ across operating systems and CI environments. One passing
  environment supplies evidence only for that environment and case.
- **Status:** Rejected
- **Correction or final wording:** Define supported platforms, prefer portable
  failure cases, and record or condition platform-specific evidence where it is
  relevant.
- **Impact on research:** Sections 8.2, 8.4, and 8.6 retain platform support as a
  contextual decision and limitation.

### V-060 - A Test Plan Is Not Execution Evidence

- **AI claim:** A complete-looking test plan proves that the future
  implementation will be reliable.
- **Category:** Planning versus observed evidence.
- **Validation method:** Compared proposed cases and boundaries with the results,
  environment, implementation, assertions, and maintenance data that do not yet
  exist.
- **Evidence or reference:** Testing limits in [R-013] and existing reliability
  finding [V-030].
- **Evaluation:** A plan can organize risks and intended evidence, but it cannot
  demonstrate behavior, test quality, duration, flakiness, portability, or the
  absence of defects before implementation and execution.
- **Status:** Rejected
- **Correction or final wording:** Treat Chapter 8 as a prioritized starting
  strategy and revise it using reviewed implementation and actual test results.
- **Impact on research:** Section 8.7 explicitly states that the plan has not
  been executed and must be revisited with Week 2 measurements.
