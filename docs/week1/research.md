# Test-Driven Development for Reliable CLI Tools with AI Assistance

## Document Purpose

This document researches Test-Driven Development, testing levels, CLI testing,
and the role of automated tests in validating AI-generated code.

The practical context used throughout the document is a Ticket Manager CLI.

---

## 1. Introduction

### 1.1 Background

The Week 1 assignment prepares for a future Ticket Manager CLI by establishing
the testing discipline that will guide later implementation. Test-Driven
Development (TDD) is relevant because it combines small implementation steps
with frequent automated feedback and deliberate design improvement, rather
than postponing testing until a feature is considered complete [R-001]
[R-002]. This research stage examines the discipline, evidence, and trade-offs
of TDD only; it does not yet select a detailed CLI testing strategy or provide
an implementation example.

### 1.2 Research Objectives

This research aims to:

- Explain Test-Driven Development.
- Explain the Red-Green-Refactor cycle.
- Compare unit, integration, and end-to-end testing.
- Identify suitable tests for a Ticket Manager CLI.
- Explain how tests help validate AI-generated code.
- Identify common testing mistakes and ways to avoid them.
- Prepare for implementing a reliable CLI tool in Week 2.

### 1.3 Research Scope

The research focuses on testing principles and conceptual examples.

It does not implement the complete Ticket Manager CLI.

---

## 2. Core Principles of Test-Driven Development

### 2.1 What Is Test-Driven Development?

TDD is a software development technique in which a developer repeatedly writes
a test for the next desired behavior, observes it fail, writes enough
production code to make it pass, and then improves the structure while keeping
the tests passing [R-001] [R-002]. Kent Beck's foundational formulation adds
two disciplines: write new code only in response to a failing automated test,
and remove duplication [R-001].

Writing a test before code is necessary in this formulation, but it is not a
complete definition of TDD. The short feedback loop, minimal implementation,
and refactoring step are equally important; test-first work that omits these
parts does not follow the full discipline [R-002] [R-010]. TDD also does not
mean merely adding tests after an implementation has already determined the
design.

### 2.2 The Main Goals of TDD

The immediate goal is to turn one small statement of desired behavior into
working, tested code. Frequent execution provides rapid feedback about whether
the new behavior exists and whether previously checked behavior still works
[R-001] [R-002]. Working in small steps also helps localize mistakes and makes
it easier to reverse an unproductive change.

TDD also encourages developers to think from the caller's perspective before
choosing an implementation. Fowler presents this interface-first thinking as a
design benefit, while Beck describes design as growing through feedback from
running code [R-001] [R-002]. These are practice goals and experienced-author
observations, not guarantees that every TDD-produced design will be good.

The mindset is therefore feedback-oriented and incremental: specify the next
behavior, seek evidence quickly, implement only what is currently required,
and continuously remove avoidable complexity. The aim is increased confidence,
not mathematical proof of correctness or the elimination of all defects
[R-013].

### 2.3 TDD as a Development and Design Practice

TDD is both a development workflow and a design feedback practice. A test
expresses how a client should use a piece of software before its internals are
fixed. Repeating this process can reveal awkward interfaces, excessive
coupling, and responsibilities that are difficult to isolate [R-002]. The
refactoring step then converts what was learned into clearer structure without
changing observable behavior [R-011].

This is evolutionary design rather than an instruction to avoid all prior
design. Architecture, domain constraints, security, data migration, operations,
and cross-system behavior may still require analysis beyond the scope of a
small test. TDD supplies local, executable feedback; developers remain
responsible for broader design decisions and for evaluating whether the tests
represent the right requirements.

Claims about design improvement should remain conditional. Practitioner
sources describe useful design pressure, but empirical results vary with the
study setting, participant experience, task, and adherence to the process
[R-002] [R-007] [R-009]. TDD can expose design problems; it cannot replace
design skill.

### 2.4 Benefits of TDD

Potential benefits include:

- **Fast behavioral feedback:** each small change is checked immediately, so a
  mismatch between intent and implementation can be discovered near the change
  that caused it [R-001] [R-002].
- **A growing regression suite:** completed examples are rerun during later
  changes and refactoring, providing evidence that previously checked behavior
  remains intact [R-002] [R-012].
- **Clearer interface thinking:** describing usage before implementation can
  reveal how convenient or difficult an API will be for its callers [R-002].
- **Controlled scope:** Green discourages speculative production code that no
  current behavior requires [R-001] [R-010].
- **Support for safe structural improvement:** small tests provide a feedback
  mechanism while behavior-preserving refactorings improve maintainability
  [R-011] [R-012].

The empirical evidence is encouraging but not universal. A meta-analysis of 27
studies found a small overall positive effect on external quality and little to
no discernible overall effect on productivity, with different effects in
industrial and academic subgroups [R-007]. A four-team industrial case study
reported 40% to 90% lower pre-release defect density relative to comparable
non-TDD projects, together with a subjectively estimated 15% to 35% increase in
initial development time [R-008]. These figures describe the studied teams;
they should not be treated as forecasts for every project.

### 2.5 Limitations and Trade-Offs

TDD has an up-front and continuing cost: developers must formulate useful
examples, maintain test code, and keep the suite fast and trustworthy. A
systematic review identified reported adoption barriers including increased
development time, insufficient TDD knowledge or test-writing skill, legacy
code, limited up-front design, domain or tool constraints, and weak adherence
to the process [R-009]. A slow or brittle suite reduces the rapid feedback on
which the practice depends [R-010].

Tests are also limited by what they express. A passing suite cannot reveal a
requirement that was misunderstood or an important case that nobody encoded.
Testing can demonstrate failures within exercised cases, but cannot in general
prove that no defects remain [R-013]. TDD therefore complements rather than
replaces code review, exploratory testing, integration and system testing,
security analysis, usability evaluation, and human judgment.

The productivity and quality trade-off is context-sensitive. Aggregate studies
do not establish a uniform productivity gain, and reported outcomes depend on
task size, experience, test effort, and study setting [R-007]. Poorly chosen
test boundaries can also couple tests to implementation details, making safe
internal changes unnecessarily expensive. These risks argue for skilled,
selective application rather than blind compliance.

### 2.6 When TDD Is Suitable

As a contextual recommendation, TDD is especially suitable when behavior can
be stated as small observable examples and checked quickly and deterministically.
Examples include business rules, parsers, validation, transformations,
calculations, and defect fixes where a failing test can first reproduce the
problem. It is also valuable in code expected to evolve, because the growing
regression suite supports repeated behavior-preserving refactoring [R-002]
[R-011].

Suitability improves when the team can control dependencies, run tests
frequently, and has enough testing and design skill to interpret feedback.
These conditions are recommendations inferred from the short feedback loop and
the adoption barriers in the evidence; they are not universal rules [R-009]
[R-010]. For the future Ticket Manager CLI, specific test boundaries and levels
remain a later-stage decision.

### 2.7 When TDD May Be Excessive

Strict test-first micro-cycles may be disproportionate when the main purpose of
work is short-lived exploration, when desired behavior is not yet understood,
or when automation is unusually slow, unstable, or more costly than the risk
being addressed. Examples may include throwaway prototypes, rapidly changing
visual experiments, hardware-dependent behavior, and early investigation of an
unfamiliar external system. Highly coupled legacy code can also make immediate
strict adoption impractical; creating safe seams or characterization tests may
need to come first [R-009].

This is not an argument for skipping verification. A team can use focused tests
for stable, high-risk logic; add broader tests once behavior becomes clear; or
combine examples with exploratory and system-level testing. Whether strict TDD
is worth its cost is a project decision based on risk, feedback speed,
maintainability needs, and team capability—not a property shared by all
projects [R-007] [R-009].

---

## 3. The Red-Green-Refactor Cycle

### 3.1 Red: Write a Failing Test

Choose one small, currently unsupported behavior and express it as an automated
test. Run the relevant suite and observe the new test fail because that behavior
is absent [R-001] [R-002]. The failure demonstrates that the test can detect a
difference between the current system and the desired result; an immediately
passing test might describe existing behavior or might not exercise the
intended path.

Red should stay focused. Writing many tests before returning to Green enlarges
the feedback gap and makes failures harder to interpret [R-010]. Classic
developer TDD commonly uses small unit tests. Related test-driven practices can
also express behavior at an acceptance boundary, so it is too broad to claim
that every test in test-driven delivery must be a unit test [R-010] [R-014].

### 3.2 Green: Write the Minimum Code to Pass

Write the simplest production change that makes the new test pass, then run the
relevant suite to check that earlier tests remain green [R-001] [R-002].
“Minimum” means no speculative behavior beyond the current example. It does not
mean ignoring correctness, safety, or repository constraints.

Green is not a demand for the final production-quality design immediately.
Beck explicitly separates making the test work quickly from the subsequent
removal of duplication, and the Agile Alliance description likewise places
structural cleanup after the passing result [R-001] [R-010]. A deliberately
simple implementation is acceptable only as a short step; leaving every
shortcut in place would omit Refactor and degrade the discipline.

### 3.3 Refactor: Improve the Design Safely

With all tests passing, improve production code and, where appropriate, test
code by removing duplication, clarifying names, simplifying control flow, and
improving boundaries. Run tests after small transformations so feedback remains
rapid [R-001] [R-002]. Neglecting this step can leave an accumulation of code
fragments that pass tests but are difficult to maintain [R-002].

Refactoring changes internal structure without changing observable behavior
[R-011]. If a step intentionally changes externally visible behavior, it is a
new behavior change and should begin another Red-Green cycle rather than be
classified as refactoring. A green suite increases confidence during this work,
but only for behavior the tests actually cover.

### 3.4 Why the Test Must Fail for the Expected Reason

The initial failure is a calibration check on the test. A failure caused by the
missing behavior shows that the test is capable of detecting the gap it was
written to describe. A failure caused by a broken fixture, unavailable
dependency, unrelated regression, or accidental syntax mistake provides no
such evidence. The developer should inspect the failure message and location,
not merely the red status [R-012].

The expected form depends on the step. Beck allows an early Red to include an
expected compilation failure, such as a deliberately not-yet-created type
[R-001]. That is different from an unrelated build error. Once the intended
failure has been observed, the transition to Green shows that the production
change—not a pre-existing pass or a disabled assertion—accounts for the new
success [R-010] [R-012].

### 3.5 Practical Red-Green-Refactor Example

_Not started._

### 3.6 Common Misunderstandings

- **“TDD only means writing tests first.”** Test-first ordering is one part of a
  repeating cycle that also limits implementation and includes refactoring
  [R-002] [R-010].
- **“Green means the final design must be perfect.”** Green establishes the
  smallest working behavior; Refactor is the explicit design-improvement step
  [R-001] [R-002].
- **“Refactoring may change public behavior if tests still pass.”** By
  definition, refactoring preserves observable behavior; passing tests may
  simply have missed the change [R-011].
- **“TDD guarantees defect-free software.”** Tests cover selected cases and
  cannot generally prove the absence of defects [R-013].
- **“TDD always creates a better design or higher productivity.”** These are
  possible outcomes, but the empirical evidence is mixed and context-dependent
  [R-007] [R-009].
- **“Every test in test-driven delivery must be a unit test.”** Small developer
  tests are common in TDD, while the related ATDD practice starts from
  acceptance tests representing the user's point of view [R-010] [R-014].
- **“Tests written after implementation are automatically TDD.”** They may be
  valuable tests, but they did not drive that implementation or its initial
  interface [R-002].
- **“High coverage proves correctness.”** Executing many code paths does not
  establish that assertions, requirements, and cases are sufficient [R-013].
- **“Strict TDD is mandatory for every project.”** Cost, risk, automation,
  legacy constraints, and team skill affect whether the discipline is suitable
  [R-007] [R-009].

---

## 4. Testing Levels

### 4.1 Unit Testing

_Not started._

### 4.2 Integration Testing

_Not started._

### 4.3 End-to-End Testing

_Not started._

### 4.4 Comparison Table

_Not started._

### 4.5 Testing Pyramid and Test Distribution

_Not started._

### 4.6 Choosing the Appropriate Testing Level

_Not started._

---

## 5. Testing a Ticket Manager CLI

### 5.1 Ticket Manager Context

The planned CLI includes commands such as:

```bash
tickets create
tickets list
tickets show <id>
tickets update <id>
```

### 5.2 Testing Domain and Business Rules

_Not started._

### 5.3 Testing Command Input Validation

_Not started._

### 5.4 Testing the Create Command

_Not started._

### 5.5 Testing the List Command

_Not started._

### 5.6 Testing the Show Command

_Not started._

### 5.7 Testing the Update Command

_Not started._

### 5.8 Testing File Storage

_Not started._

### 5.9 Testing Error Handling

_Not started._

### 5.10 Example Test Matrix

_Not started._

---

## 6. Using Tests to Validate AI-Generated Code

### 6.1 Risks of AI-Generated Implementation

_Not started._

### 6.2 Tests as Executable Validation

_Not started._

### 6.3 Reviewing AI-Generated Tests

_Not started._

### 6.4 Detecting Weak Assertions

_Not started._

### 6.5 Detecting Missing Edge Cases

_Not started._

### 6.6 Tests Do Not Prove Complete Correctness

_Not started._

### 6.7 Recommended AI-Assisted Development Workflow

_Not started._

---

## 7. Common Testing Mistakes

### 7.1 Blindly Trusting AI-Generated Tests

_Not started._

### 7.2 Testing Implementation Details

_Not started._

### 7.3 Weak or Meaningless Assertions

_Not started._

### 7.4 Excessive Mocking

_Not started._

### 7.5 Over-Testing

_Not started._

### 7.6 Ignoring Failure Paths and Edge Cases

_Not started._

### 7.7 Confusing Code Coverage with Test Quality

_Not started._

### 7.8 Writing Tests After the Implementation and Calling It TDD

_Not started._

---

## 8. Practical Testing Strategy for the Ticket Manager CLI

### 8.1 Proposed Unit Tests

_Not started._

### 8.2 Proposed Integration Tests

_Not started._

### 8.3 Proposed End-to-End Tests

_Not started._

### 8.4 Test Data and Isolation

_Not started._

### 8.5 Recommended Development Order

_Not started._

### 8.6 Contextual Decisions

_Not started._

---

## 9. Research Findings

### 9.1 Key Findings

_Not started._

### 9.2 Important Corrections to AI Suggestions

_Not started._

### 9.3 Lessons for Week 2

_Not started._

---

## 10. Conclusion

_Not started._
