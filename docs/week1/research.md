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
[R-002]. This document examines the discipline, evidence, and trade-offs of TDD. At this
stage, it includes one conceptual Red-Green-Refactor example but does not yet
select a complete CLI testing strategy.

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
sources describe useful design pressure [R-002]. Empirical results for outcomes
such as external quality and productivity vary with the study setting,
participant experience, task, and adherence to the process [R-007] [R-009]. TDD
can expose design problems; it cannot replace design skill.

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

The following TypeScript and Vitest-style snippets are **conceptual
documentation only**. They were not added to the repository as implementation
files and were not executed.

#### Desired Behavior

When the future Ticket Manager creates a ticket, the ticket must keep the
supplied non-empty title and start with status `open`. An empty or
whitespace-only title must be rejected.

This is one small domain behavior. It deliberately excludes identifiers,
timestamps, persistence, CLI argument parsing, JSON storage, and repository
interfaces.

#### Red: Describe the Behavior First

The illustrative test is written before the behavior is implemented:

```ts
// Conceptual Vitest-style test; not executed in this repository.
import { describe, expect, it } from 'vitest';
import { DomainValidationError, Ticket } from './ticket';

describe('Ticket.create', () => {
  it('creates a ticket with the supplied title and open status', () => {
    const ticket = Ticket.create('Fix login');

    expect(ticket.title).toBe('Fix login');
    expect(ticket.status).toBe('open');
  });

  it.each(['', '   ', '\t\n'])(
    'rejects an empty or whitespace-only title: %j',
    (title) => {
      expect(() => Ticket.create(title)).toThrow(DomainValidationError);
    },
  );
});
```

At Red, the expected failure is that the callable `Ticket.create` surface does
not yet implement the specified creation and validation behavior. Depending on
the deliberately incomplete starting point, the valid-title case would fail
because no ticket with the expected values is returned, or the invalid-title
case would fail because the required domain error is not thrown. The developer
must inspect the failure and confirm that it represents this missing behavior
[R-001] [R-012].

A syntax error, incorrect import, broken fixture, missing Vitest dependency, or
unrelated repository failure would not be a valid Red for this example. The
snippets assume those supporting concerns are already correct; no actual test
result is claimed here.

#### Green: Add the Smallest Responsible Implementation

The minimum illustrative implementation trims the input, rejects a title that
is then empty, and assigns `open`. It adds no unrelated behavior:

```ts
// Conceptual minimum implementation; not executed in this repository.
export class DomainValidationError extends Error {}

export class Ticket {
  private constructor(
    public readonly title: string,
    public readonly status: string,
  ) {}

  static create(title: string): Ticket {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      throw new DomainValidationError('Ticket title must not be empty');
    }

    return new Ticket(trimmedTitle, 'open');
  }
}
```

If the conceptual test and implementation were placed in a correctly configured
project, the expected Green result would be that all three requirements pass:
the title is retained, the status is `open`, and blank input throws
`DomainValidationError`. Green supplies only enough behavior for these examples;
it is not presented as the final production design [R-001] [R-010].

#### Refactor: Clarify the Same Behavior

With the same tests kept unchanged, title validation and normalization can be
extracted and named explicitly:

```ts
// Conceptual behavior-preserving refactor; not executed in this repository.
export class DomainValidationError extends Error {}

function requireNonBlankTitle(input: string): string {
  const title = input.trim();

  if (title.length === 0) {
    throw new DomainValidationError('Ticket title must not be empty');
  }

  return title;
}

export class Ticket {
  private constructor(
    public readonly title: string,
    public readonly status: string,
  ) {}

  static create(title: string): Ticket {
    return new Ticket(requireNonBlankTitle(title), 'open');
  }
}
```

This refactor does not intentionally change externally observable behavior:
the same inputs produce the same title and `open` status, while the same blank
inputs produce the same error type and message. It only names the validation
and normalization responsibility. A general `TicketStatus` type is intentionally
deferred because the example specifies only the initial status; defining the
future lifecycle or additional statuses would introduce domain decisions outside
this behavior. An intentional new status or validation rule would require
another Red-Green cycle, not this Refactor step [R-011] [R-012].

#### What the Example Demonstrates

The example moves from a focused behavioral expectation, through the smallest
responsible implementation, to a small behavior-preserving design improvement.
It also shows why observing the intended Red failure matters and why Green and
Refactor are separate decisions. This illustrates the TDD feedback loop; it
does not prove that TDD always produces a good design [R-002].

#### Limitations

- The snippets are illustrative and have not been compiled or executed.
- Only one domain factory behavior is covered; this is not a complete Ticket
  Manager CLI test example or testing strategy.
- The example does not address CLI parsing, persistence, file errors,
  identifiers, concurrency, integration, or end-to-end behavior.
- The API shape and error type remain proposals for a later implementation and
  require developer review.
- Passing these examples would provide evidence only for the stated cases; it
  would not prove complete correctness or the absence of defects [R-013].

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
  possible outcomes, but practitioner design reasoning and empirical outcome
  evidence do not establish universal results [R-002] [R-007] [R-009].
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

The word *unit* does not impose one universal physical size. Depending on the
team and architecture, a unit may be a function, an object, or a small cluster
that exposes one cohesive behavior. A more useful description states the
chosen system under test and its boundary. Fowler, for example, distinguishes
solitary unit tests, which replace collaborators, from sociable unit tests,
which may use real in-process collaborators [R-015]. Therefore, a test does not
automatically become an integration test merely because several objects
participate.

For this research, a unit test exercises a narrowly scoped behavior in one
process and normally replaces slow, nondeterministic, or externally observable
dependencies such as the real file system and a spawned CLI process. Test
doubles can stand in for such dependencies, but the kind of double and the
interaction being asserted should be explicit [R-005]. Representative future
Ticket Manager targets include title validation, ticket state rules, command
argument interpretation behind a stable interface, and a use case interacting
with a fake repository. These examples identify suitable boundaries; they do
not yet define the complete test suite.

The principal benefits are fast feedback, deterministic setup, precise failure
localization, and a short Red-Green-Refactor loop. Those properties make unit
tests especially useful while shaping business behavior with TDD [R-001]
[R-015]. Their limitation is equally important: replacing persistence or the
process boundary removes those mechanisms from the evidence. A passing unit
test with a fake repository cannot demonstrate that JSON is encoded correctly,
that a real path is used, or that the executable parses arguments and returns
the intended exit code.

### 4.2 Integration Testing

Integration testing focuses on interactions across a selected boundary.
ISTQB separates component integration from system integration and describes
their targets as interfaces and interactions, rather than restricting
integration testing to databases [R-003]. Practitioner terminology varies as
well: a narrow integration test can exercise one adapter and its external
resource, while a broad test may connect much more of the application
[R-016]. Consequently, every integration test here must name both the
components being combined and the dependencies kept real.

For a file-backed Ticket Manager, a targeted integration test could exercise a
JSON repository against a unique real temporary directory. This crosses the
file-system boundary and can reveal path construction, serialization,
deserialization, encoding, missing-file behavior, and write/read mismatches.
Node.js provides `mkdtemp` specifically for creating a unique temporary
directory, making isolated real-file fixtures practical [R-017]. Another
integration boundary could connect a use case to the real repository while
still calling application code in the test process. Neither example needs to
spawn the public CLI, so neither alone proves command-line wiring.

These tests give stronger evidence about component collaboration and real JSON
persistence than tests built entirely on doubles. The costs are additional
setup and cleanup, slower execution, and failures that can have more candidate
causes. Isolation remains essential: each test should own its temporary
directory and avoid shared user data, current-working-directory assumptions,
or execution-order dependencies. Integration tests complement rather than
invalidate narrower tests because they answer a different question about a
real seam.

### 4.3 End-to-End Testing

End-to-end terminology also depends on the declared endpoints. In this
research, an end-to-end Ticket Manager test starts at the public command-line
entry point, runs the CLI in a separate process, and observes user-visible
results while using real temporary JSON storage. It supplies arguments,
environment, and working directory; captures standard output, standard error,
and exit status; and may inspect the resulting file. Node.js child-process APIs
support spawning a separate process and piping these streams, so this is a
genuine process-boundary check rather than a direct call to a command handler
[R-004].

This level is well suited to a small set of critical journeys, such as creating
a ticket and then listing it, because it can expose faults in executable
wiring, argument parsing, output formatting, exit-code mapping, configuration,
and collaboration with real persistence. It offers the closest automated
evidence here to how a user invokes the CLI. It is not synonymous with a UI
test, and the exact endpoint must still be stated [R-006].

The wider boundary also makes these tests slower, more expensive to arrange,
and harder to diagnose: the same visible failure can originate in the process
launcher, parser, use case, repository, file fixture, or assertion. Platform
and path differences can add brittleness unless the harness controls them.
Broad tests are therefore valuable evidence, but passing selected journeys does
not prove all rules, error paths, or inputs correct; testing cannot generally
demonstrate the absence of defects [R-013].

### 4.4 Comparison Table

The categories below are working boundaries for this CLI, not rigid definitions
for every project.

| Dimension | Unit | Integration | End-to-end for this CLI |
| --- | --- | --- | --- |
| System under test | One cohesive behavior or narrow in-process unit | Selected components plus a named real seam | Public CLI journey across the process and storage boundaries |
| Dependencies | Slow or external dependencies usually replaced; real in-process collaborators are possible | Relevant seam is real; unrelated dependencies may be replaced | Real CLI entry point, subprocess behavior, and temporary file storage |
| Best at detecting | Rule, validation, branching, and local contract defects | Interface, serialization, path, and collaboration defects | Wiring, argument, output, exit-status, configuration, and journey defects |
| Feedback speed | Usually fastest | Usually moderate | Usually slowest because process and storage setup are included |
| Isolation and determinism | High when inputs and doubles are controlled | High only with independent real fixtures | Lower by default; must control process, environment, paths, and fixtures |
| Failure localization | Usually narrow | Moderate; several collaborators may be responsible | Broad; diagnosis often requires reproduction at a lower level |
| Confidence in JSON persistence | None when persistence is replaced | Strong for the exercised repository cases | Strong for storage behavior reached by the exercised journey |
| Confidence in real CLI behavior | Low without the public entry point | Partial if command components are connected in-process | Highest of these levels for the exercised commands and platform |
| Maintenance and brittleness | Low to moderate; coupled doubles can make tests fragile | Moderate; schema and fixture changes require care | Highest tendency; public text, environment, timing, and workflow changes can affect tests |
| TDD and AI-code feedback | Excellent for small increments and pinpointing generated logic defects | Useful for driving or checking real adapters and seams | Useful as a final journey check, but inefficient as the only development loop |

No row says that one level is absolutely superior. Confidence is scoped to the
behavior and boundary actually exercised: an integration test may offer more
relevant evidence than an E2E test for a rare JSON recovery case, while an E2E
test is necessary to establish that the installed command reaches that code.

### 4.5 Testing Pyramid and Test Distribution

The testing pyramid is a portfolio heuristic: favor many focused, fast checks
and use fewer broad-stack checks when broad tests are slower, costlier, or more
brittle [R-006]. It does not define universal percentages, nor does it settle
the meaning of *unit* or *integration*. Fowler explicitly notes both exceptions
to the cost assumption and disagreement caused by differing definitions
[R-006].

The useful decision is therefore not to copy a numerical shape. A team should
consider product risk, architecture, feedback time, the cost of realistic
fixtures, platform variability, and how well each failure can be localized. A
small CLI with a fast subprocess may afford more broad checks than a distributed
system, while complex domain rules still benefit from many narrow examples.
The intended shape may also change as the application, dependencies, and test
infrastructure evolve.

For the Ticket Manager, the heuristic highlights a likely failure in either
extreme. Replacing the repository everywhere leaves real JSON and path behavior
unverified; executing every rule only through the CLI makes TDD feedback and
diagnosis unnecessarily broad. The pyramid is useful here as a prompt to cover
both gaps, not as a compliance target.

### 4.6 Choosing the Appropriate Testing Level

A practical rule is to use the narrowest boundary that can provide the required
evidence, then add a broader test when the risk exists only at a real seam or
public journey. The question being answered determines the level:

- Use a unit boundary to explore examples of a validation or business rule and
  to localize logic defects quickly.
- Cross the real file-system boundary when the claim concerns JSON shape,
  encoding, paths, persistence errors, or read-after-write behavior.
- Cross the real process and public-command boundary when the claim concerns
  arguments, environment, output streams, exit status, executable wiring, or a
  critical user journey.

Some important behavior may justifiably appear at more than one level. A
critical create flow can have detailed rule examples at unit level, persistence
cases at integration level, and one public smoke journey at E2E level. This is
purposeful overlap when each test supplies different evidence; duplicating the
same large matrix at every boundary would add cost without equal diagnostic
value.

For the future file-backed CLI, the provisional research direction is many
focused unit tests, targeted real-file integration tests, and a small set of
process-level E2E journeys. That resembles a balanced layered strategy, but it
is not yet a project decision. The developer still needs to evaluate expected
risks, toolchain speed, platform support, and maintenance experience before
accepting a distribution or designing the Chapter 5 test suite.

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
