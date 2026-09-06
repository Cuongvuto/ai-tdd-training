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
[R-002]. This document examines the discipline, evidence, and trade-offs of TDD.
The completed research selects a contextual balanced layered starting strategy:
many focused unit tests, targeted real-file integration tests, and a small
process-level E2E suite. Implementation, execution evidence, and measurement
remain future work.

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

For the future file-backed CLI, the selected contextual starting strategy is
many focused unit tests, targeted real-file integration tests, and a small set
of process-level end-to-end journeys.

This balanced layered strategy is a project-specific starting point rather than
a universal testing ratio. The distribution should be revisited after the team
can measure toolchain speed, platform behavior, test reliability, and
maintenance cost during implementation.

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

Domain tests should describe ticket behavior without depending on CLI text,
argument syntax, or JSON representation. The confirmed creation rules are
deliberately small: a title is required, whitespace is trimmed, a title that is
empty after trimming is rejected, and a new ticket starts with status `open`.
These rules fit focused unit tests because neither a real process nor a real
file can add useful evidence to the claim [R-003] [R-015].

`priority`, `tags`, and further status behavior must be handled differently.
They are candidate fields, not confirmed rule sets. A priority vocabulary,
case-sensitivity rule, duplicate-tag policy, or transition from `open` to
another status may be explored only as an **illustrative assumption** and must
be revised when the requirements are agreed. Keeping those decisions inside a
domain surface also prevents CLI formatting or the JSON adapter from becoming
the accidental source of business rules.

The following example reuses the proposed `Ticket.create` surface from Section
3.5. It is conceptual TypeScript with Vitest-style `it` and `it.each` syntax
[R-018]; no import, package configuration, or execution currently exists.

```ts
// Conceptual Vitest-style unit test; not executed in this repository.
import { describe, expect, it } from 'vitest';
import { DomainValidationError, Ticket } from './ticket';

describe('Ticket.create', () => {
  it('trims a valid title and assigns the initial open status', () => {
    const ticket = Ticket.create('  Fix login  ');

    expect(ticket.title).toBe('Fix login');
    expect(ticket.status).toBe('open');
  });

  it.each(['', '   ', '\t\n'])('rejects blank title %j', (title) => {
    expect(() => Ticket.create(title)).toThrow(DomainValidationError);
  });
});
```

These assertions observe public domain behavior rather than private helpers.
They do not prove identifier generation, persistence, CLI output, or a complete
status lifecycle.

### 5.3 Testing Command Input Validation

Command validation has two useful boundaries. A parser or validation function
can be called directly in unit tests to cover a dense set of arguments quickly.
The public executable needs only representative process-level tests to prove
that the actual entry point routes arguments, help, and unknown commands as
intended. Directly invoking a command handler remains an in-process test; it is
not E2E because it does not cross the process boundary [R-004].

Direct tests should distinguish missing required arguments or options from
values that are present but blank. They should also cover malformed IDs,
unsupported values, repeated options, and invalid option combinations. The
expected rule for repeated options—reject, first wins, or last wins—is an
**unresolved project decision**. Likewise, allowed priority values, tag syntax,
ID grammar, and conflicting-filter semantics must be defined before a test can
claim one behavior is correct.

Help requests and unknown commands should additionally be observed through a
subprocess because their contract includes command routing and user-facing
streams. Assertions should check stable semantic evidence, such as the presence
of usage guidance or an unknown-command explanation, without coupling every
space, line break, or table border unless exact formatting is later declared a
contract.

This small conceptual unit example assumes a proposed `parseCreateArgs`
function and a proposed `UsageError`; neither API is implemented here:

```ts
// Conceptual Vitest-style unit test; not executed in this repository.
import { describe, expect, it } from 'vitest';
import { parseCreateArgs, UsageError } from './create-args';

describe('parseCreateArgs', () => {
  it.each([[], ['--title', '   ']])(
    'rejects a missing or blank title from %j',
    (args) => {
      expect(() => parseCreateArgs(args)).toThrow(UsageError);
    },
  );
});
```

### 5.4 Testing the Create Command

Create crosses several responsibilities, so its cases should be split by the
evidence required:

- **Unit:** The domain or create use case accepts a valid title, normalizes it,
  produces initial status `open`, and passes the intended ticket to a fake
  repository. A blank title is rejected before saving. A throwing repository
  can verify that a storage failure is propagated or mapped and that the
  command does not report success.
- **Integration:** The real JSON repository writes a created ticket to a unique
  temporary directory and can retrieve it. A selected real storage failure can
  check that the operation is not presented as successful and that previously
  stored data is not silently replaced.
- **End-to-end:** One critical journey invokes `tickets create` through the
  executable, checks stable output identifying the created ticket, observes a
  successful process result under the eventual exit-status contract, and
  confirms the observable storage result. A representative blank-title journey
  can establish public usage behavior without reproducing every domain case.

Output assertions should verify meaningful fields, such as the normalized title
and `open` status, rather than an entire decorative layout. When persistence
fails, there must be no success message or returned success result. Whether all
possible low-level write failures guarantee byte-for-byte atomic preservation
is a separate persistence-policy decision; tests must reflect the guarantee the
implementation actually adopts.

### 5.5 Testing the List Command

List behavior begins with collection and filtering decisions, which can be
tested cheaply against in-memory tickets. Cases should cover an empty
collection, several tickets, no matching tickets, invalid filter values, and a
persistence read failure. Status, priority, and tag filters are requested areas
for exploration, but their allowed values and syntax remain **illustrative
assumptions** until confirmed. Combined filters also need a project decision on
whether conditions use AND, OR, or another rule.

Focused unit tests should pass controlled collections to filter predicates or
the list use case and assert returned identities and fields, not complete CLI
table rendering. A fake repository that throws can verify error mapping for a
read failure, but it cannot prove JSON reading works. Targeted repository
integration tests cover the real read boundary; a small E2E list journey proves
that public options reach the selected filtering behavior.

No ordering guarantee has been established. Tests may compare a set of ticket
identities when order is irrelevant. If stable creation order, priority order,
or another sort is desired, it must first be recorded as a project decision
before order-sensitive assertions are added. The exact empty-list and no-match
messages are likewise public-contract decisions, even though both paths should
remain distinguishable during use-case testing.

### 5.6 Testing the Show Command

Show tests should preserve three separate failure meanings:

- **Invalid input:** the ID argument is missing or fails the agreed ID grammar,
  so the request should be rejected before repository lookup.
- **Ticket not found:** the ID is well formed and a successful repository read
  returns no matching ticket.
- **Storage unavailable:** the repository cannot complete the lookup because of
  malformed JSON, an inaccessible path, or another persistence failure.

Unit tests can cover missing/malformed parsing, the found/not-found use-case
decision, and infrastructure-error mapping with fakes. Repository integration
tests establish whether a seeded JSON record is read and whether corrupt
storage produces the intended persistence error. A small process-level test for
an existing ticket should verify that `tickets show <id>` routes correctly and
emits the stable fields in the public contract. The currently established
fields are title and status; identifiers implied by the command and any future
description, priority, or tags require an agreed schema.

The public response should allow a user or caller to distinguish invalid input,
absence, and unavailable storage. Exact wording and numerical exit codes remain
unresolved, so the documentation does not collapse these cases or assign them
fixed values.

### 5.7 Testing the Update Command

The assignment requires status update behavior, but only the initial `open`
status is currently established. Examples that update to `closed`, `done`, or
another value are therefore **illustrative assumptions pending confirmation**
of the status vocabulary. No complex transition graph should be tested until
the allowed transitions are defined.

At unit level, test an existing ticket update, missing ID, missing new-status
value, malformed ID, unsupported status after the allowed set is defined, and a
well-formed but unknown ID. A fake repository can make persistence fail and
allow the test to verify that no success output is produced and that its
pre-operation snapshot remains unchanged. This checks use-case coordination;
it does not establish real-file safety.

At integration level, seed multiple records in an isolated real file, update
one record, then verify that its other fields and all unrelated records remain
present. A selected failure-path integration test should check the documented
preservation guarantee. At E2E level, one representative successful status
change can verify argument routing, public output, process result, and the
subsequent observable stored value. The exact success format, supported status
set, transition rules, and exit codes remain project decisions.

### 5.8 Testing File Storage

Real JSON persistence requires integration tests that call the repository or
adapter against a unique temporary directory. A mock repository is appropriate
for testing its caller, but because it replaces encoding, paths, and file I/O,
it cannot prove that JSON persistence works [R-005]. Node.js `mkdtemp` creates a
unique temporary directory and is suitable for independent fixtures [R-017].

The integration suite should cover:

- first use when the storage file does not exist;
- writing syntactically valid JSON and reading an externally seeded valid file;
- reading back a saved ticket as a separate round-trip check;
- preserving several records across writes;
- updating one record without losing or changing unrelated records;
- malformed or corrupted JSON;
- an invalid path and selected permission or file-system failures;
- cleanup after every test, including failed assertions;
- separate directories for parallel and repeated tests.

Missing-file behavior is an **unresolved project decision**: it might initialize
an empty collection, or it might report a storage error. Corrupted-file policy
also needs an explicit decision; a test should not silently assume destructive
recovery. Permission failures are platform-specific and may not be reproducible
with the same setup on Windows, macOS, and Linux, so such cases should use
portable invalid-path checks where possible and platform-conditional tests only
when justified.

A temporary directory prevents tests from sharing user data, but it does not
automatically control time, random IDs, process environment, concurrency, or
every platform behavior. Isolation is one contributor to determinism, not proof
of it.

The following conceptual integration example assumes proposed repository APIs
and an illustrative on-disk location. It uses real temporary storage but was not
created or executed. Its per-test setup and teardown use Vitest lifecycle-hook
syntax [R-019]:

```ts
// Conceptual Vitest-style integration test; not executed in this repository.
import { afterEach, beforeEach, expect, it } from 'vitest';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { JsonTicketRepository } from './json-ticket-repository';

let directory: string;
let storagePath: string;
let repository: JsonTicketRepository;

beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), 'tickets-test-'));
  storagePath = join(directory, 'tickets.json');
  repository = new JsonTicketRepository(storagePath);
});

afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

it('writes valid JSON and reads the saved ticket', async () => {
  await repository.save({ id: 'ticket-1', title: 'Fix login', status: 'open' });

  const raw = await readFile(storagePath, 'utf8');
  expect(() => JSON.parse(raw)).not.toThrow();
  await expect(repository.findById('ticket-1')).resolves.toMatchObject({
    title: 'Fix login',
    status: 'open',
  });
});
```

This round-trip example is not sufficient by itself. A separate read test
should seed JSON without using the repository's write path, so the writer cannot
mask a matching defect in the reader.

### 5.9 Testing Error Handling

Errors should be classified by origin because each category suggests different
recovery, public evidence, and test boundary:

| Error category | Examples | Focused evidence | Broader evidence |
| --- | --- | --- | --- |
| Input or usage | Missing option, malformed ID, unknown command | Parser rejects before use-case or storage work | CLI uses the intended stream, process result, and does not modify storage |
| Domain validation | Blank title; unsupported status after the status set is defined | Domain error and unchanged collaborator state | Representative CLI response without false success |
| Ticket not found | Well-formed ID absent from a successful read | Distinct not-found result, not a syntax error | Public response remains distinguishable from invalid input |
| Persistence or infrastructure | Corrupt JSON, invalid path, denied operation | Use case maps a repository failure without claiming success | Real-file integration reproduces the selected failure and checks stored data |
| Unexpected internal | Unanticipated programming or runtime error | Error is not silently converted into success | CLI reports failure without exposing details beyond the eventual public policy |

At the public boundary, relevant observations can include standard output,
standard error, zero versus non-zero success semantics, and whether storage was
modified. Node.js subprocess APIs expose these channels separately [R-004]. No
exact numerical exit codes are assigned here because the project has not
defined that contract.

Checking only a message can miss an incorrect success exit status or an
unintended file mutation. Checking only the exit status can miss the wrong error
category, misleading output, or partial persistence. Strong failure-path tests
therefore combine the smallest meaningful set of observations for the claim.
They also cover validation and storage failures rather than documenting only
happy paths. Even a large passing suite remains scoped evidence and cannot by
itself prove the absence of defects [R-013].

### 5.10 Example Test Matrix

The following matrix is a proposed portfolio, not an executable suite. A row is
placed at the narrowest boundary that supplies its main evidence; selected E2E
rows intentionally add confidence in public wiring without repeating the full
unit matrix.

| Area | Scenario | Test level | Real dependencies | Expected evidence | Main risk covered |
| --- | --- | --- | --- | --- | --- |
| Domain | Trim a valid title and assign initial `open` | Unit | Real domain object only | Normalized title and `open` status | Creation rule implemented incorrectly |
| Domain | Reject empty and whitespace-only titles | Unit | Real domain object only | Domain validation error for each boundary case | Invalid ticket enters the system |
| Domain | **Illustrative assumption:** validate priority or tag rules after definition | Unit | Real domain object only | Agreed values accepted and rejected precisely | Candidate fields gain accidental rules |
| Input | Missing versus blank create title | Unit | Parser or validator only | Distinct inputs both produce the agreed usage error | Presence check misses whitespace |
| Input | Missing ID versus malformed ID for show/update | Unit | Parser or validator only | Both rejected before repository lookup and remain distinguishable | Invalid requests reach storage |
| Input | **Decision:** repeated options and invalid combinations | Unit | Parser or validator only | Behavior matches the chosen reject/precedence rule | Parser silently chooses unintended input |
| Input | **Decision:** help request | End-to-end | CLI subprocess; no user storage | Stable usage guidance and agreed process semantics | Help is not wired at the public entry point |
| Input | Unknown command | End-to-end | CLI subprocess; isolated storage | Unknown-command evidence and no storage mutation | Router accepts or misroutes invalid command |
| Create | Valid use case with normalized title | Unit | Fake repository | One intended ticket is offered for save; result contains title and `open` | Coordination differs from domain result |
| Create | Repository rejects the save | Unit | Throwing repository double | Failure is mapped; no success response is produced | False or partial success is reported |
| Create | Persist a created ticket | Integration | Real JSON file in a temporary directory | Stored and independently readable normalized ticket | Serialization or path defect |
| Create/List | Critical create-then-list journey | End-to-end | CLI subprocess and temporary JSON storage | Created ticket appears through public list behavior | Executable, routing, and persistence do not connect |
| List | Empty and multiple-ticket collections | Unit | Fake repository | Correct semantic results without assuming display order | Collection edge cases mishandled |
| List | **Illustrative assumption:** filter by status | Unit | In-memory ticket collection | Only matching identities returned | Status predicate is wrong |
| List | **Illustrative assumption:** filter by priority and tags | Unit | In-memory ticket collection | Each agreed predicate selects expected identities | Candidate filter semantics drift |
| List | **Decision:** combine filters | Unit | In-memory ticket collection | Result follows the chosen AND/OR rule | Combination is implemented inconsistently |
| List | No matches and invalid filter value | Unit | Parser plus list use case | Empty result differs from invalid-filter error | Absence and invalid input are collapsed |
| List | Repository read failure | Unit | Throwing repository double | Persistence error propagated or mapped; no normal list result | Failure is presented as an empty collection |
| Show | Existing well-formed ticket ID | Unit | Fake repository | Intended public fields returned | Wrong ticket or incomplete projection |
| Show | Missing/malformed ID variants | Unit | Parser or validator only | Usage failure occurs without repository call | Syntax errors become not-found errors |
| Show | Well-formed but unknown ID | Unit | Fake repository returning no match | Distinct ticket-not-found result | Unknown record is treated as invalid syntax |
| Show | Storage unavailable | Unit | Throwing repository double | Infrastructure result distinct from not found | Operational failure is hidden |
| Show | Existing ticket through public command | End-to-end | CLI subprocess and seeded temporary storage | Stable title/status fields appear for requested ID | Public show routing or rendering is broken |
| Update | **Illustrative assumption:** change `open` to an agreed second status | Unit | Stateful fake repository | Target status changes and unrelated fields remain | Update mutates the wrong state |
| Update | Missing status or unsupported status after vocabulary is defined | Unit | Parser or validator only | Request rejected before save | Invalid status reaches persistence |
| Update | Unknown ID and persistence-failure variants | Unit | Stateful/throwing repository doubles | Not-found remains distinct; failed save leaves snapshot unchanged | Update loses data or reports false success |
| Update | Representative successful public update | End-to-end | CLI subprocess and temporary JSON storage | Output and later stored value show the agreed new status | CLI reports an update that was not persisted |
| Storage | **Decision:** first use with no storage file | Integration | Unique temporary directory | Empty initialization or storage error matches chosen policy | Missing file is interpreted accidentally |
| Storage | Valid seeded read, round trip, multiple records, and one-record update | Integration | Real temporary JSON file | Reader accepts external JSON; writes stay valid; unrelated records survive | Writer/reader agree incorrectly or overwrite data |
| Storage | Corrupted JSON, invalid path, and portable selected file-system failure | Integration | Real temporary file system | Defined persistence errors; no silent destructive recovery | Infrastructure failure corrupts or hides data |

The matrix contains 30 rows. It intentionally leaves exact filter grammar,
ordering, missing-file policy, status vocabulary and transitions, output layout,
and numerical exit codes unresolved until the developer records those project
decisions.

---

## 6. Using Tests to Validate AI-Generated Code

### 6.1 Risks of AI-Generated Implementation

AI-generated code is an implementation proposal, not evidence that a
requirement has been met. It can be useful and still be wrong in a way that
looks plausible. A peer-reviewed study found insecure Copilot suggestions in
the security scenarios it evaluated; that result demonstrates a concrete risk,
but its measured frequency must not be generalized to every model, prompt, or
Ticket Manager change [R-020].

Important review risks for this CLI include:

- **Repository and dependency mismatch:** The proposal may invent APIs, assume
  a package version that is not installed, ignore an existing interface, or
  use naming and domain types inconsistent with the repository. Stale knowledge
  about a CLI or file API can produce code that looks idiomatic but does not fit
  the actual project.
- **Behavioral mismatch:** Code can type-check while accepting a blank title,
  assigning the wrong initial status, treating malformed and unknown IDs as the
  same condition, or implementing an undocumented status transition. Static
  checking evaluates types before execution; it is different evidence from the
  runtime behavior required by the project [R-021].
- **Incomplete paths:** A generated solution may handle only success, perform
  shallow validation, print an error but return success semantics, or convert a
  persistence exception into an empty collection. These failures are possible,
  not inevitable.
- **Data and asynchronous faults:** An update may replace the full collection,
  lose unrelated tickets, report success before an awaited write completes, or
  silently overwrite corrupted JSON. A generated test may then miss the stored
  state that exposes the problem.
- **Environment and safety assumptions:** Hard-coded paths, platform-specific
  permission behavior, or tests pointed at real user data are unsuitable for
  the isolated temporary-storage strategy. Error output may also expose
  sensitive internal paths or stack details unless the public policy permits
  them.
- **Unnecessary scope:** Extra abstractions, speculative fields, unsupported
  filters, or a complete status lifecycle can add complexity and requirements
  that were never requested.

Compilation, type checking, and linting can reject important classes of
mistakes, but code that passes them can still implement the wrong contract.
The developer must compare the proposal with repository state, the intended
behavior, and the evidence required at each boundary.

### 6.2 Tests as Executable Validation

A focused test translates an intended behavior into executable evidence. The
requirement remains the source of the expected result; neither the generated
implementation nor a generated test is allowed to redefine it. A disciplined
validation sequence is:

1. State one confirmed behavior before accepting implementation.
2. Review a focused test that represents that behavior.
3. Observe Red and confirm the failure is caused by the missing behavior.
4. Apply the smallest reviewed AI-generated implementation proposal.
5. Rerun the focused test and inspect the resulting evidence.
6. Run relevant regression tests for established behavior.
7. Add a real-file integration or subprocess E2E check when the risk crosses
   that boundary.
8. Reject code that passes only an irrelevant, disabled, or weak test.

This extends Red-Green-Refactor rather than replacing it [R-001] [R-002]. A
unit test can validate title normalization or a use-case decision. An
integration test can validate actual JSON and file behavior. An E2E test can
validate a selected public CLI journey [R-003]. A fake-repository test supplies
caller evidence only; it does not exercise real JSON serialization, paths, or
file I/O [R-005] [R-017].

The following conceptual and unexecuted example shows how a focused test would
detect an AI proposal that checks length before trimming. It is consistent with
the confirmed blank-title rule and uses Vitest-style syntax [R-018]:

```ts
// Conceptual AI implementation proposal; not executed in this repository.
import { expect, it } from 'vitest';
import { DomainValidationError } from './ticket';

function createTicket(title: string) {
  if (title.length === 0) throw new DomainValidationError();
  return { title: title.trim(), status: 'open' };
}

// Conceptual Vitest-style validation test; not executed in this repository.
it('rejects a title that is blank after trimming', () => {
  expect(() => createTicket('   ')).toThrow(DomainValidationError);
});
```

Conceptually, the proposal returns a ticket with an empty normalized title, so
the assertion would fail instead of throwing. No test was run here; the example
demonstrates the evidence the future test must produce. After correction, the
focused test and relevant creation regressions would be required before the
proposal could be considered for acceptance.

### 6.3 Reviewing AI-Generated Tests

AI-generated tests are proposals too. Research on LLM-generated test oracles
shows that they can add useful fault-detection value in the studied Java corpus,
while also reporting compilation failures, false positives, and limitations in
complex oracle generation [R-022]. This is evidence to evaluate generated tests,
not permission to accept them on appearance.

For every proposed test, the developer should ask:

- Does its expected result come from the actual requirement?
- Would it fail if the behavior were absent or replaced by a plausible faulty
  implementation?
- Was Red observed, and did it fail for the expected reason?
- Do the assertions check meaningful public behavior rather than private
  helpers or incidental structure?
- Are validation, not-found, persistence, and other relevant failure paths
  represented?
- Is the boundary appropriate for the claim?
- Does a mock replace the dependency the test claims to validate?
- Is setup isolated from user data, shared mutable files, execution order, and
  avoidable platform assumptions?
- Does the case add evidence rather than duplicate an existing test?
- Does the test name describe what its assertions actually establish?
- Has the AI invented an API, field, status, filter, ordering rule, output
  format, or exit-code contract?

When the same AI sees the same incomplete requirement and generates both code
and tests, both proposals can encode the same mistaken assumption. Agreement
between them is therefore not automatically independent validation. The human
review compares each proposal separately with the original requirement,
repository interfaces, and external source documentation—not merely code
against its generated tests.

### 6.4 Detecting Weak Assertions

An assertion is weak when it can pass despite a defect relevant to the test's
name or requirement.

| Weak assertion when used alone | What it misses | Stronger evidence for this CLI |
| --- | --- | --- |
| `expect(result).toBeDefined()` | Wrong ticket values or an error-shaped result can still be defined | Normalized title, initial `open`, identity, and relevant result category |
| `expect(command).not.toThrow()` | The command may do nothing, print an error, or mutate the wrong record | Intended return/output plus required storage or collaborator effect |
| `expect(exitCode).toBe(0)` | Output, routing, and stored state may be wrong despite success semantics | Stable stdout/stderr meaning, process semantics, and observable storage effect |
| `expect(mock.save).toHaveBeenCalled()` | The wrong ticket or call count may pass; real JSON is not exercised | Expected argument and count for coordination, plus a separate real-file test for persistence |

The goal is not to assert every internal field or formatting character. It is
to check the smallest observable evidence that would distinguish the required
behavior from a plausible defect: exact ticket identity where relevant, the
normalized title, `open` status, error category, valid JSON, preservation of
unrelated records, the appropriate output stream, and absence of false success.

This conceptual before-and-after example assumes proposed `createTicket` and
repository APIs. It was not created or executed:

```ts
// Weak AI-generated test: passes for many wrong results.
const result = await createTicket('  Fix login  ', repository);
expect(result).toBeDefined();
expect(repository.save).toHaveBeenCalled();

// Human-reviewed, strengthened unit evidence.
expect(result).toMatchObject({ title: 'Fix login', status: 'open' });
expect(repository.save).toHaveBeenCalledTimes(1);
expect(repository.save).toHaveBeenCalledWith(
  expect.objectContaining({ title: 'Fix login', status: 'open' }),
);
```

The stronger version validates use-case coordination with a test double; it
still makes no claim about real JSON persistence.

### 6.5 Detecting Missing Edge Cases

Generated tests often emphasize the example named in a prompt. Review should
expand that example into meaningful partitions rather than requesting an
arbitrary number of cases:

- valid and typical input;
- boundary, blank, and whitespace-only input;
- malformed input versus well-formed but unknown input;
- empty collections, multiple records, and no-match results;
- dependency failure, corrupted storage, and partial-operation risk;
- repeated execution and preservation of pre-existing state;
- platform-specific behavior and test isolation; and
- concurrency only where the project actually permits or risks it.

For this CLI, the review checklist includes blank title after trimming; missing,
malformed, and unknown IDs; missing status; unsupported status after its
vocabulary is defined; empty and no-match lists; missing or corrupted storage;
invalid paths; a failure while updating one ticket; preservation of unrelated
records; and separate temporary storage for concurrently or repeatedly run
tests.

The reviewer can discover cases by deriving them from each requirement,
partitioning inputs, inspecting every conditional branch, listing real
dependencies and their failure modes, comparing success with failure paths,
and asking which state must remain unchanged after failure. The Chapter 5 test
matrix supplies a boundary-aware checklist. A deliberate faulty implementation
is also useful: if replacing all tickets during one update would still pass,
the preservation assertion is missing.

This process must not invent answers to ambiguous requirements. Missing-file
policy, ordering, filter grammar, status vocabulary and transitions, exact
output layout, and numerical exit codes remain project decisions. A checklist
can reveal omitted categories, but it cannot guarantee completeness [R-013].

### 6.6 Tests Do Not Prove Complete Correctness

Passing tests provide strong but scoped evidence for the selected inputs,
environment, dependencies, and assertions. They do not generally demonstrate
the absence of defects [R-013]. Their limits include:

- the examples may omit important partitions or failure paths;
- assertions may be weak or may encode a misunderstood requirement;
- generated code and tests may share the same wrong assumption;
- mocks may behave differently from JSON, a filesystem, or a process;
- platforms, permissions, timing, and concurrency may differ from the test
  environment;
- security, usability, performance, and operational risks may be outside the
  functional suite; and
- a regression suite or coverage metric can become stale while still passing.

Type checking and test execution provide complementary evidence. TypeScript
checks type relationships before runtime and erases type information from the
emitted JavaScript; it does not decide whether `open` is the required initial
status or whether an update preserved unrelated tickets [R-021]. Tests execute
selected behavior, but they do not prove that the requirements or selection are
complete.

The correct response is not to dismiss tests. They give rapid, repeatable
feedback, protect known behavior, and expose many plausible defects. Their
evidence should be combined with human diff and code review, static analysis and
type checking, source verification, requirement clarification, exploratory
testing, appropriate integration and E2E checks, security review where
relevant, and measurement in representative execution environments.

### 6.7 Recommended AI-Assisted Development Workflow

The following workflow is proposed for future Week 2 implementation. It applies
TDD, layered evidence, and human accountability; it does not describe actions
executed during this documentation task [R-001] [R-002] [R-012].

| Step | AI contribution | Human responsibility | Evidence to record |
| --- | --- | --- | --- |
| 1. Clarify one behavior | Identify ambiguities and propose examples | Confirm the requirement and reject invented rules | Requirement, open questions, and explicit assumptions |
| 2. Define acceptance evidence | Suggest observable outcomes and likely boundary | Choose what result would actually demonstrate the behavior | Expected values, errors, state, dependencies, and test level |
| 3. Propose a focused test | Draft concise TypeScript/Vitest-style test code | Check API fit, requirement fidelity, isolation, and assertion strength | Reviewed test proposal and rationale |
| 4. Correct the test | Offer alternatives for identified weaknesses | Edit or reject generated expectations and remove unsupported behavior | Review notes and corrected test diff |
| 5. Observe Red | Help interpret the failure output | Run the test and confirm it fails for the intentionally missing behavior | Command, relevant failure, and expected-reason decision |
| 6. Propose minimum implementation | Generate the smallest change aimed at Green | Prevent speculative features and check repository contracts | Proposed production diff and assumptions |
| 7. Review code before acceptance | Explain code paths and flag possible risks | Inspect the complete diff, dependencies, errors, data safety, and async behavior | Human review findings and corrections |
| 8. Run the focused test | Help diagnose a failure without redefining the requirement | Execute and inspect the meaningful assertion result | Focused test command and result |
| 9. Run regressions | Suggest the relevant existing suites | Confirm established behavior still has passing evidence and investigate failures | Regression commands, scope, and results |
| 10. Cross real boundaries | Propose integration or E2E cases for the identified seam | Decide whether real JSON, filesystem, or subprocess evidence is required | Boundary, real dependencies, and observed outputs/state |
| 11. Refactor while green | Suggest small structure improvements | Preserve observable behavior and rerun focused and regression tests | Refactor diff and green evidence |
| 12. Record residual risk | Summarize assumptions, corrections, and uncovered risks | Verify the summary and keep unresolved decisions open | Validation log, decisions, limitations, and follow-ups |
| 13. Commit reviewed work | Draft a concise change summary | Stage only intended files and commit only after review and validation | Final diff, clean scope, checks, and commit reference |

At no point does the AI approve its own implementation or tests. The developer
owns the requirement, interprets Red and Green, selects broader evidence,
reviews the diff, and decides whether the residual risk is acceptable.

---

## 7. Common Testing Mistakes

### 7.1 Blindly Trusting AI-Generated Tests

Blind trust means accepting an AI-generated test because it looks detailed,
compiles, or passes, without checking whether its expected result comes from a
confirmed requirement. Generated tests can be useful proposals, but the
measured strengths and limitations of generated test oracles do not make any
particular proposal correct by default [R-022].

The risk is correlated error. If one AI interprets the requirement, proposes
the implementation, writes the test, and supplies the expected result, all four
artifacts can repeat the same misunderstanding. A test may then pass while both
code and oracle accept a whitespace-only title, invent an undocumented status
transition, collapse malformed and unknown IDs, assume an ordering rule, or
claim that a repository mock proves real JSON persistence. Professional naming
and extensive setup do not repair a wrong oracle.

Warning signs include a test that:

- cites no requirement for its expected result;
- uses an API or matcher not present in the repository or framework contract;
- passes immediately against code it was meant to drive;
- covers only success or asserts only that a value exists;
- replaces JSON or the subprocess boundary while claiming to validate it;
- copies the implementation's condition into the test; or
- introduces status, filter, ordering, output, or exit-code behavior that the
  project has not decided.

A human review should answer the following before accepting the proposal:

1. Which confirmed requirement authorizes the expectation?
2. Would a plausible faulty implementation make the test fail?
3. Is the selected unit, integration, or E2E boundary able to support the
   claim?
4. Are assertions strong enough to distinguish the required outcome from false
   success?
5. Are validation, not-found, persistence, and relevant edge paths represented?
6. Do mocks remove the dependency named in the test's claim?
7. Was Red observed for the intended missing behavior?
8. Does every proposed API and rule match the repository and recorded project
   decisions?

The developer should correct or reject a test that cannot answer these
questions. Passing generated tests remain scoped evidence and do not replace
requirement review, code review, or broader validation [R-013] [R-020].

### 7.2 Testing Implementation Details

A test is coupled to an implementation detail when it requires one private way
of producing a result even though the public behavior permits other correct
implementations. The useful distinctions are:

| Observation | Appropriate focus |
| --- | --- |
| Observable behavior | Result, error, state, output, or other effect visible through the selected boundary |
| Public contract | Confirmed API or CLI semantics that callers may rely on |
| Relevant collaborator interaction | Argument, count, or absence of a call when coordination is itself part of the behavior |
| Private implementation detail | Helper name, local variable, loop, internal collection, or incidental call order not promised to callers |

Brittle tests call private helpers directly, assert internal variable names,
require a particular loop or array algorithm, demand an exact sequence of
internal method calls without a contract, snapshot internal objects
unnecessarily, or couple repository tests to private JSON transformation
functions. Such tests can fail during a behavior-preserving refactor and can
also pass while the public outcome is wrong. The problem is the unsupported
coupling, not the mere presence of more than one object in a unit test
[R-015].

For the Ticket Manager, test `Ticket.create()` through its public result rather
than a private trimming helper. After an update, assert that the target changed
and unrelated tickets survived instead of prescribing an array-mutation
algorithm. At E2E level, observe public output and process semantics rather than
parser internals. For JSON claims, call the repository's public interface and
inspect the real temporary file rather than its private serializer.

Not every interaction assertion is wrong. It is meaningful to check that blank
input causes no repository save, that a use case sends the normalized ticket
once, or that a persistence failure is not converted into success. The check
should express an architectural or behavioral contract, not freeze incidental
call choreography [R-005].

This before-and-after example assumes the proposed `Ticket` API. It is
conceptual TypeScript with Vitest-style assertions and was not executed:

```ts
// Brittle: couples the test to a proposed private helper.
expect((Ticket as any).trimTitle('  Fix login  ')).toBe('Fix login');

// Better: observes the public creation behavior.
const ticket = Ticket.create('  Fix login  ');
expect(ticket).toMatchObject({ title: 'Fix login', status: 'open' });
```

This example does not define identifier generation, persistence, or any status
transition beyond the confirmed initial `open` value.

### 7.3 Weak or Meaningless Assertions

A weak assertion can pass even when the defect named by the test remains. It
often checks existence, truthiness, absence of an exception, or one incidental
interaction instead of the smallest observable evidence that distinguishes the
required behavior from a plausible failure.

| Weak assertion when used alone | Plausible false pass | Stronger evidence |
| --- | --- | --- |
| `expect(result).toBeDefined()` | A wrong ticket or error-shaped result is defined | Normalized title, initial `open`, identity, and result category |
| `expect(value).toBeTruthy()` | Any non-empty wrong value passes | The required semantic value or object fields |
| `expect(command).not.toThrow()` | The command can do nothing or print false success | Intended result/output and required state or collaborator effect |
| `expect(exitCode).toBe(0)` | Routing, output, or persistence can still be wrong | Agreed success semantics plus relevant stdout and stored state |
| `expect(mock.save).toHaveBeenCalled()` | Wrong argument or repeated saves pass | Expected argument and call count when coordination matters |
| `expect(tickets.length).toBeGreaterThan(0)` | Wrong tickets, duplicates, or omitted records pass | Expected identities and count without inventing an order |

The stronger assertion depends on the claim. Domain creation should show a
trimmed title and initial `open`; show/update behavior should preserve the
expected identity and error category; persistence tests should parse real JSON
and verify unrelated records; public error tests should distinguish false
success through the eventual stdout, stderr, and process contract. Exact
decorative formatting and every internal field should not be asserted unless
they are intentionally part of the public contract.

This conceptual and unexecuted Vitest-style example uses a proposed list use
case with a fake repository. It validates returned behavior but makes no claim
about real JSON or ordering:

```ts
// Weak: any non-empty collection passes.
const tickets = await listTickets(repository);
expect(tickets.length).toBeGreaterThan(0);

// Stronger: checks the required records without inventing list order.
expect(tickets).toHaveLength(2);
expect(tickets).toEqual(expect.arrayContaining([
  expect.objectContaining({ id: 'ticket-1', title: 'Fix login', status: 'open' }),
  expect.objectContaining({ id: 'ticket-2', title: 'Write tests', status: 'open' }),
]));
```

The reviewer should be able to name the plausible defect each assertion would
detect. If the assertion cannot fail for a relevant wrong result, it adds little
acceptance evidence even when the test passes [R-013] [R-018].

### 7.4 Excessive Mocking

Excessive mocking means replacing more real behavior than the focused claim
requires, or prescribing every internal interaction until the test mainly
verifies its own setup. Test doubles are legitimate tools for controlling a
dependency; they are not evidence about the behavior they replace [R-005].

Warning signs include mocks that reproduce production algorithms, verify every
internal call, require setup more complex than the use case, replace simple
deterministic collaborators, or assert only choreography instead of outcomes.
A fake repository can also drift from the real JSON adapter. The unit tests may
remain green while serialization, path handling, malformed JSON, or record
preservation is broken.

Doubles remain useful when they provide focused evidence:

- isolate domain/use-case coordination for fast TDD feedback;
- make a repository throw to exercise persistence-error mapping;
- prove invalid input does not trigger storage;
- control time, randomness, or another difficult dependency when relevant; or
- inspect a collaborator argument and call count that form part of the
  architectural contract.

For this project, a fake repository is appropriate for a create or update use
case. Real JSON claims require the real adapter in a unique temporary directory
[R-017]. Public CLI claims require a subprocess with selected real wiring
[R-004]. A balanced suite can use all three without treating one boundary as a
universal substitute for the others.

To prevent over-mocking, start with the behavior being claimed, name the real
seam, and replace only dependencies that would otherwise obscure or slow the
focused evidence. Prefer state or public-result assertions when interaction is
incidental. If a mock removes the exact risk in the test name, move that claim
to an integration or E2E boundary.

### 7.5 Over-Testing

Over-testing is not the same as having many useful tests. It is spending suite
cost on cases or assertions that do not add meaningful evidence. Common forms
include repeating one scenario at unit, integration, and E2E levels without a
new boundary claim; testing language or framework behavior; fixing decorative
output character by character; testing private choices; generating many
near-duplicates; retaining obsolete expectations; and using a subprocess for
every small rule merely to increase count or coverage.

The cost can appear as slower feedback, duplicated failures, greater fixture
and environment maintenance, resistance to safe refactoring, and an unclear
suite purpose. These costs do not prove a broad test is bad; they mean its
additional evidence should justify its broader setup and failure surface. The
testing pyramid is a contextual cost-and-feedback heuristic rather than a
mandatory ratio [R-006].

The Chapter 5 matrix applies the rule: **use the narrowest boundary that
provides the required evidence**. Title partitions belong mainly at the domain
boundary; JSON shape and preservation cross the real file seam; a few critical
journeys cross the executable boundary. Purposeful overlap is valuable when
each level answers a different question—for example, create normalization at
unit level, serialization at integration level, and create-then-list wiring at
E2E level.

Warning signs are identical expected outcomes repeated across levels, broad
fixtures for a local rule, failures that provide no new diagnosis, and tests
whose only stated purpose is a larger count or percentage. Before adding a
case, record the risk, behavior, boundary, and assertion it contributes. Remove
or rewrite obsolete and brittle coverage only after checking that important
behavior remains protected; deleting one poor test does not automatically
reduce quality.

### 7.6 Ignoring Failure Paths and Edge Cases

Happy-path-only testing is risky for a CLI backed by files because user input,
process routing, parsing, paths, permissions, JSON content, and partial updates
all introduce failure modes. A successful create case cannot establish what
happens when validation or persistence fails, and a successful list cannot
show that corrupted storage is not silently treated as an empty collection.

The review inventory for the Ticket Manager includes:

- empty and whitespace-only titles;
- missing arguments, malformed IDs, and well-formed unknown IDs;
- empty collections and no filter matches;
- unsupported filters or statuses after their definitions exist;
- missing storage, corrupted JSON, invalid paths, and selected portable
  persistence failures;
- failure during create or update, including whether unrelated records remain
  preserved after the failure;
- repeated execution and independently isolated parallel tests; and
- platform-specific path or permission behavior where it materially affects
  the supported environment.

Useful discovery techniques are input partitioning, boundary analysis,
reviewing every conditional branch, listing dependency failure modes, comparing
state before and after an unsuccessful operation, and considering a deliberately
faulty implementation. For example, if an update implementation replaced the
whole collection, would the assertions notice the lost unrelated ticket? The
Chapter 5 matrix supplies a starting inventory, not a completeness guarantee
[R-013].

Cases should be placed at the boundary that can reproduce the risk: parser or
domain tests for input partitions, throwing doubles for use-case coordination,
real temporary files for JSON/path behavior, and selected subprocess tests for
public streams and process semantics [R-003] [R-017].

The checklist must not invent the answer. Missing-file policy, corrupted-file
recovery, status vocabulary and transitions, filter grammar and combination,
list ordering, exact output layout, and numerical exit codes remain unresolved
until the developer records a project decision.

### 7.7 Confusing Code Coverage with Test Quality

Code coverage reports show which configured source locations were executed
during a test run. Vitest can collect runtime coverage through V8 or
instrumented coverage through Istanbul, and its include/exclude configuration
affects which files appear in a report [R-023]. This information can reveal unexecuted statements,
unvisited branches, or areas worth investigating.

Coverage does not inspect whether the requirement, expected result, or
assertion is correct. It does not prove that relevant input partitions are
complete, a mock behaves like JSON, users observe the intended CLI semantics,
security risks are addressed, or defects are absent [R-013]. Statement and
branch percentages are therefore diagnostic signals, not acceptance criteria
by themselves; this research introduces no universal target percentage.

Examples of misleading confidence include:

- `createTicket()` executes while the test asserts only `toBeDefined()`;
- the corrupted-JSON branch executes while the oracle accepts silent data loss;
- every parser branch executes while malformed and unknown IDs are assigned the
  same wrong result; and
- a fake repository gives the use case full coverage while no real JSON file is
  written or read.

The reviewer should use a coverage gap to ask which risk or behavior lacks
execution, then add a meaningful test only when it supplies missing evidence.
High coverage with weak assertions requires stronger oracles; low coverage in a
high-risk branch may justify a new case; uncovered generated or unreachable
code may require a code decision rather than a test. Acceptance still depends
on requirements, assertions, appropriate real boundaries, review, and observed
results.

### 7.8 Writing Tests After the Implementation and Calling It TDD

Tests written after implementation can be valuable, but they did not drive the
already-written design and should not be presented as evidence that the
original work followed test-first TDD [R-001] [R-002]. The distinction concerns
workflow and evidence, not whether the later tests should be discarded.

| Practice | What it establishes |
| --- | --- |
| Test-first TDD | One reviewed behavior produces an expected Red, minimum Green, and behavior-preserving refactor |
| Tests added after implementation | Current code is checked after its design already exists; the tests may still add regression evidence |
| Characterization tests | Current observable behavior is recorded, especially before changing unfamiliar or legacy code; it is not automatically the desired requirement |
| Regression tests | Previously accepted behavior is protected against a later change |
| Bug-reproduction tests | A known defect is made observable before applying its fix |

AI-assisted work can accidentally become test-after when the developer asks for
an entire feature, accepts the implementation, asks the same AI for tests that
match it, and labels the passing result TDD. This sequence increases correlated-
assumption risk and loses the design feedback of a meaningful Red step.

The corrected future workflow is:

```text
Clarify one behavior
→ review a focused test
→ observe expected Red
→ request minimal implementation
→ observe Green
→ refactor
```

Red must fail because the intended behavior is missing. A syntax error,
unavailable dependency, broken import, or environment failure does not provide
that evidence; a test that passes immediately does not demonstrate Red either
[R-010] [R-012]. If implementation already exists, describe the honest purpose
of the new test—characterization, regression, or bug reproduction—and use it to
support future changes without rewriting history.

### 7.9 Chapter 7 Summary

| Mistake | Main risk | Ticket Manager example | Better practice |
| --- | --- | --- | --- |
| Blindly trusting AI-generated tests | Code and oracle share an invented requirement | Mock-backed test claims JSON persistence | Trace expectations to confirmed requirements and review both artifacts |
| Testing implementation details | Safe refactors break tests while public defects escape | Assert a private trimming or serialization helper | Assert public domain, repository, or CLI behavior |
| Weak or meaningless assertions | Plausible wrong results still pass | `toBeDefined()` accepts a ticket with wrong fields | Check the smallest meaningful value, error, state, or interaction |
| Excessive mocking | Replaced dependencies are never validated | Fake repository hides broken JSON handling | Use doubles for coordination and real boundaries for boundary claims |
| Over-testing | Cost and brittleness grow without new evidence | Repeat every title case through a subprocess | Use the narrowest sufficient boundary and overlap only for distinct evidence |
| Ignoring failure paths and edge cases | False success or data loss remains hidden | Update failure removes unrelated tickets | Partition inputs and exercise dependency and state-preservation risks |
| Confusing coverage with quality | Execution counts are mistaken for correct oracles | Full use-case coverage uses only weak mocks | Treat coverage as a diagnostic signal and inspect assertions and boundaries |
| Calling tests-after TDD | Workflow history and design evidence are misstated | Generate code first, then matching tests | Observe intended Red before minimum Green; label later tests honestly |

---

## 8. Practical Testing Strategy for the Ticket Manager CLI

### 8.1 Proposed Unit Tests

The initial unit portfolio should provide the fastest evidence for domain,
parsing, and use-case behavior while keeping the file system and process out of
scope. A unit is a deliberately narrow behavioral boundary, not necessarily one
class or function [R-015]. Test doubles are appropriate when the claim concerns
the caller rather than real persistence [R-005].

**Domain behavior — Initial.** Start with the confirmed creation contract:
trim a valid title, reject an empty or whitespace-only title, and assign initial
status `open`. Keep the real domain object and replace nothing. These tests can
establish domain results and errors, but not parsing, identifier generation,
JSON, or public CLI behavior.

**Command input and parsing — Initial, then Next.** First distinguish a missing
title from a supplied blank title and reject both before persistence. Next cover
missing and malformed IDs, a missing update-status value, and focused parser
handling for unknown commands or unsupported options where that logic has a
public surface. Repeated-option behavior remains undecided; its tests belong in
`Later after requirement decision` rather than encoding first-wins, last-wins,
or rejection accidentally.

**Use-case behavior — Initial and Next.** A fake repository can show that create
offers one normalized `open` ticket for persistence, invalid input makes no
storage call, and a simulated repository failure does not become false success.
Controlled collections can support list behavior; a fake can return an existing
ticket or no match for show; and a stateful or throwing double can support update
coordination after the status contract is known. These tests establish caller
decisions and relevant collaborator arguments, not real JSON or executable
wiring.

**Filtering behavior — Later after requirement decision.** Status, priority,
tag, combined-filter, and order-sensitive cases are conditional future tests.
They require the allowed fields, values, grammar, combination semantics, and
ordering contract before their expected results can be treated as requirements.

| Unit-test area | Example behavior | Priority | Main evidence | Not proven |
| --- | --- | --- | --- | --- |
| Domain creation | Trim title and assign initial `open` | Initial | Confirmed public domain result | Parser, identifier, JSON, or CLI behavior |
| Domain validation | Reject empty and whitespace-only title | Initial | Domain error for meaningful input partitions | Public message, stream, or process result |
| Create parsing | Reject missing and blank `--title` before storage | Initial | Focused input classification and no persistence call | Executable routing or real storage |
| ID parsing | Distinguish missing and malformed ID | Next | Usage categories before lookup | Well-formed not-found or public error format |
| Create use case | Send one normalized ticket to a fake repository | Initial | Result and caller/repository coordination | JSON serialization or file safety |
| List use case | Return controlled empty and multiple-ticket collections | Next | Collection semantics without an ordering assumption | Real JSON read or table rendering |
| Show use case | Return an existing ticket; distinguish a well-formed unknown ID | Next | Found versus not-found decision | ID grammar, storage failure, or CLI output |
| Failure mapping | Propagate or map a throwing repository without false success | Next | Use-case failure category and relevant side effects | Portable real file-system failure |
| Update use case | Change one ticket and preserve unrelated fake state | Later after requirement decision | Coordination under the agreed status contract | Real-file preservation or public command wiring |
| Filters and ordering | Apply an agreed predicate or ordering rule | Later after requirement decision | Confirmed filter/order behavior | Any policy not yet selected |

This prioritization is a Week 2 starting proposal. A discovered risk can move a
case earlier, but test count alone does not establish completion [R-013].

### 8.2 Proposed Integration Tests

Integration tests should target the real JSON repository or adapter in a unique
temporary directory. A fake repository remains useful for its caller, but it
replaces serialization, paths, and file I/O and therefore cannot support a real
persistence claim [R-005]. Node.js `mkdtemp` supplies a mechanism for unique
temporary directories; it is one isolation control rather than a guarantee of
determinism [R-017].

The reader and writer need independent evidence. A writer test should inspect
the produced text as syntactically valid JSON and verify relevant stored fields.
A reader test should seed known JSON without using the production writer. A
round trip adds collaboration evidence, but by itself it can pass when reader
and writer share a compatible defect.

Every case should receive its own directory and explicit storage path, avoid
real user data, and clean up in teardown after both successful and failed test
runs [R-019]. Parallel and repeated runs must not share one mutable file. Tests
for invalid paths or selected file-system failures should prefer portable setup;
permission behavior can differ across Windows, macOS, Linux, containers, and
CI environments.

| Integration area | Real boundary | Priority | Evidence | Main risk |
| --- | --- | --- | --- | --- |
| Fixture isolation | Unique temporary directory and explicit storage path | Initial | Test does not target shared or user storage | Hidden environment, clock, random, or process coupling |
| Independent reader | Read an externally seeded valid JSON file | Initial | Deserialization works without using the writer | Writer and reader mask the same defect |
| Independent writer | Write one ticket and parse the resulting file | Initial | Syntactically valid JSON and required stored fields | In-memory success differs from on-disk content |
| Round trip | Save and retrieve one ticket | Next | Reader/writer collaboration at the real seam | Correlated reader/writer defect if used alone |
| Multiple records | Preserve several records across writes | Next | Collection persistence without silent replacement | Existing data is lost during create |
| One-record update | Update the target while unrelated tickets survive | Next, after update contract | Real-file state preservation | Whole collection or unrelated fields are overwritten |
| Malformed JSON | Read corrupted or malformed storage | Later after requirement decision | Selected persistence error or recovery contract | Silent destructive recovery or false empty result |
| First use | Open a path with no storage file | Later after requirement decision | Selected initialization or error policy | Missing file gains accidental semantics |
| Invalid path or portable failure | Exercise a reproducible real file-system failure | Next where portable | Failure is surfaced without false success | Local-only behavior hides infrastructure errors |
| Cleanup and rerun | Teardown after pass/fail; run fixtures independently | Initial | Repeatable and parallel-safe storage scope | Leaked files and order-dependent failures |

Detailed title partitions should remain at unit level; repeating every domain
case through the file system would add cost without new persistence evidence.
Missing-file and corrupted-file recovery remain decisions, not assumptions.

### 8.3 Proposed End-to-End Tests

For this project, an E2E test must invoke the public CLI in a separate process
with actual arguments and isolated temporary JSON storage. Relevant observations
can include stdout, stderr, success-versus-failure process semantics, and stored
state when the journey claims a persistence effect. Node.js child-process APIs
expose these boundaries, but their existence does not prescribe exact messages
or numerical exit codes [R-004].

The minimal initial suite should prove selected public wiring rather than repeat
the complete unit matrix. A create-then-list journey crosses command routing,
domain creation, JSON persistence, and later public reading. One invalid-create
journey establishes representative public validation and absence of false
success. One unknown-command journey checks the executable/router boundary.
Show, update, and a portable persistence-failure journey can be added after
their focused requirements and lower-boundary evidence exist.

| E2E journey | Initial or later | Public evidence | Broader risk covered |
| --- | --- | --- | --- |
| Create a ticket, then list it | Initial | Actual arguments; stable created/listed fields; agreed success semantics; stored ticket | Entry point, routing, use case, and JSON adapter do not connect |
| Reject one representative invalid create | Initial | Relevant error stream/meaning; failure semantics; no storage mutation or false success | Domain/parser rejection is lost at the public boundary |
| Report an unknown command | Initial | Unknown-command meaning on the selected stream; failure semantics | Executable accepts or misroutes unsupported input |
| Show an existing seeded ticket | Later | Requested identity and stable public fields | Public lookup wiring or rendering is broken |
| Update and verify the stored result | Later after requirement decision | Public update result plus later observable state | CLI reports an update that was not persisted |
| Report one portable persistence failure | Later where reproducible | Failure meaning without success output; relevant state preservation | Infrastructure failure becomes success or data loss |

Exact decorative output should be asserted only after it becomes a public
contract. Detailed blank-title partitions, malformed-ID variants, filtering
rules, and use-case failure permutations usually stay at unit level because a
subprocess adds no new evidence for those local rules. An E2E test is selected
for a real public journey, not merely because it is broader.

### 8.4 Test Data and Isolation

Focused tests should prefer small, explicit, readable data: fixed IDs such as
`ticket-1`, deterministic titles, and the confirmed initial status `open`.
Fixed values make failure output reproducible and keep each test's intent
visible. Random data is not automatically stronger; when randomness is useful,
the seed and failing input must be recorded so the case can be replayed.

A small inline fixture is preferable while setup remains clear. A factory or
builder becomes useful when repeated valid defaults obscure the behavior under
test, but it is a tool rather than mandatory project architecture. Overrides
should remain explicit enough that the input responsible for the expected
result is visible.

Reader integration tests should independently seed JSON rather than rely only
on production writing. Every real-file and E2E case should use a separate
temporary directory, an explicitly injected or configured storage path, and
teardown that removes only that test's fixture. Tests must never discover or
write the current user's real tickets or a production-style default path.

Isolation also requires control of every dependency that affects the claim:
clock, random ID generation, environment variables, working directory, command
arguments, process configuration, and platform-specific paths or permissions.
A temporary directory does not control these automatically. Tests should not
depend on execution order or shared mutable fixtures, and repeated or parallel
runs should produce separate storage scopes.

Test-isolation checklist:

- [ ] The case has a small fixture whose meaningful values are visible.
- [ ] IDs, time, and randomness are fixed or reproducibly controlled when used.
- [ ] A reader test seeds JSON independently from the production writer.
- [ ] Every real-file or subprocess case has its own temporary directory.
- [ ] The storage path is explicit and cannot resolve to user data.
- [ ] Environment, working directory, and process arguments are set deliberately.
- [ ] Teardown targets only the fixture created by that test and runs after
      failures where the framework permits.
- [ ] The case can run repeatedly, in another order, and in parallel without a
      shared mutable file.
- [ ] Platform-specific setup is isolated or conditional and its limitation is
      recorded.

### 8.5 Recommended Development Order

The following order is a contextual proposal for small TDD increments, not the
only valid implementation sequence. Each phase should clarify only the contract
needed for its next behavior, observe a focused Red for the expected reason,
apply minimum Green, run relevant regressions, and add broader evidence when a
real boundary becomes part of the claim [R-001] [R-002] [R-012].

**Phase 0 — Confirm Only the Next Required Contract.**

Before each development phase, confirm only the decisions needed by the next
behavior.

Before the first domain cycle, the existing title and initial-status behavior
is sufficient. ID representation, storage-path configuration, missing-file
behavior, public error categories, output formatting, and process semantics do
not need to block that first cycle.

Those decisions should instead be confirmed immediately before the phase that
depends on them:

- decide storage-path and missing-file behavior before repository development
- decide ID representation before persisted lookup behavior
- decide the minimum status vocabulary before status update
- decide public output and process semantics before the corresponding E2E tests

**Phase 1 — Domain creation behavior.** Drive trimmed title, blank-title
rejection, and initial `open` one behavior at a time. Each focused test should
fail because that rule is missing, then pass with minimum domain code. Run all
creation regressions after refactoring. No file or E2E evidence is required for
these domain-only claims. Completion evidence is reviewed Red/Green output and
a refactored public domain result; later status behavior remains recorded as
unresolved rather than entering the minimum Green.

**Phase 2 — Repository foundation.** Select the missing-file behavior required
for first use, then develop one real-file behavior at a time: initial read, one
valid write, an independently seeded read, multiple-record preservation, and
malformed storage after its policy is selected. Focused repository tests supply
Red; the minimum Green implements only the selected file behavior, while domain
and earlier repository regressions remain green. Completion evidence includes
the missing/corrupted-file assumptions or decisions, isolated real files,
inspected JSON/state, cleanup, and recorded platform limits.

**Phase 3 — Create command/use case.** Clarify the minimum create syntax and
public error meaning. First drive use-case coordination with a fake repository,
then connect the real adapter. A focused parser/use-case Red should lead to the
minimum coordination Green; parser, domain, use-case, and repository regressions
keep failures locally diagnosable. Add one real create-persistence integration
path, but defer create-then-list E2E until focused list behavior exists in Phase
4. Completion evidence combines clarified create assumptions, focused results,
relevant regressions, and inspected real storage.

**Phase 4 — List and show behavior.** Drive empty/multiple list results and
existing/not-found show behavior from focused Red to minimum Green with
controlled collections, then run creation and repository regressions and add
seeded-JSON evidence. Define ID grammar before malformed-ID expectations and
record filters and ordering as unresolved rather than implementing them
prematurely. After both create and list are available, add the initial
create-then-list public journey; a selected show E2E case remains optional where
it adds distinct wiring evidence. Completion evidence distinguishes malformed,
well-formed unknown, and storage errors without claiming exact undecided output.

**Phase 5 — Status update.** Define the minimum status vocabulary and allowed
transition needed by the assignment before writing update expectations. Drive
target selection and one agreed state change from focused Red to minimum Green,
then run domain, repository, create/list/show regressions and verify in a real
multi-record file that unrelated data survives. Add one public update journey
after lower boundaries are green. Completion evidence includes the recorded
status decision and remaining lifecycle assumptions, focused results,
preservation evidence, and relevant regressions.

**Phase 6 — Selected public journeys.** Review which critical behaviors still
need process-level evidence. Keep only journeys that establish executable,
routing, stream, process, or end-to-end storage behavior not already supplied
more narrowly. For each selected journey, observe Red for missing public wiring,
add only the minimum routing/output/process connection needed for Green, and
rerun its focused and real-file regressions. Record public-contract assumptions.
Completion evidence is a small documented E2E set with isolated storage and
meaningful public assertions.

**Phase 7 — Refactor and expand.** Review duplication, failure diagnosis, test
speed, flakiness, uncovered risks, and whether integration/E2E tests add distinct
evidence. Refactor while focused and regression tests remain green; add or
remove tests based on risk rather than count. A newly selected behavior begins
another focused Red/Green cycle; a structure-only refactor introduces no new
behavioral Green. Rerun the relevant layered regressions, record environment and
portfolio assumptions, and add broader evidence only for an uncovered real
boundary. Completion evidence includes the reviewed diff, rerun results,
measured observations, corrections, and residual risks.

| Phase | Main behavior | Primary test level | Broader evidence | Exit criterion |
| --- | --- | --- | --- | --- |
| 0. Confirm next contract | Decide only what the next behavior requires | Reviewable test proposal | None yet | The next behavior, expected Red, and currently unresolved decisions are recorded |
| 1. Domain creation | Trim, reject blank, initial `open` | Unit | None for domain-only claims | Focused Red/Green and creation regressions reviewed |
| 2. Repository foundation | Selected first-use, read, write, preservation, malformed storage | Integration | Independent reader plus inspected file state | Isolated real-file evidence and cleanup recorded |
| 3. Create command/use case | Parser, creation coordination, persistence | Unit, then integration | Public journey deferred until list exists | Focused layers green and one real create-persistence path observed |
| 4. List and show | Collections, lookup, distinct error categories | Unit | Seeded JSON, initial create-then-list, and optional show E2E | Found/not-found/input/storage meanings remain distinguishable |
| 5. Status update | Agreed status change and record preservation | Unit | Multi-record integration and one update E2E | Status decision recorded; target and unrelated data verified |
| 6. Public journeys | Critical executable behavior | E2E | Real process and isolated storage | Small suite adds distinct public evidence |
| 7. Refactor and expand | Maintainability and residual risk | Relevant focused suites | Re-run only justified broader tests | Green evidence, measurements, review findings, and residual risks recorded |

### 8.6 Contextual Decisions

The register below separates accepted strategy, confirmed behavior, required
decisions, and items that can wait. `Decision required` means the topic must be
settled before tests claim its relevant behavior; it does not mean all such
decisions must block the first domain cycle.

| Topic | Current state | Needed before | Evidence or reason |
| --- | --- | --- | --- |
| Balanced layered portfolio | Accepted project strategy | Week 2 test planning | Human evaluation selected focused unit, targeted real-file integration, and small process-level E2E layers |
| Domain logic mainly at a focused boundary | Accepted project strategy | Domain implementation | Fast, local evidence; broader boundaries add no evidence to title rules |
| Real temporary JSON for persistence claims | Accepted project strategy | Claiming serialization, path, or file behavior | A fake replaces the boundary being claimed |
| Small process-level E2E suite | Accepted project strategy | Claiming public executable journeys | Handler calls do not cross the process boundary |
| No fixed test-level percentages | Accepted project strategy | Portfolio review | Boundaries follow evidence and risk rather than a universal ratio |
| Human acceptance of AI changes | Accepted project strategy | Accepting generated code or tests | AI proposals require requirement, diff, evidence, and residual-risk review |
| Trim a valid title | Confirmed behavior | First domain cycle | Recorded creation contract |
| Reject empty or whitespace-only title | Confirmed behavior | First domain cycle | Recorded creation contract |
| Initial status `open` | Confirmed behavior | First domain cycle | Recorded creation contract; no later lifecycle implied |
| ID representation and grammar | Decision required | Public create identity and show/update parsing | Missing, malformed, and well-formed unknown IDs need separate expectations |
| Minimum status vocabulary and transitions | Decision required | Update tests and implementation | Only initial `open` is confirmed |
| Repeated-option behavior | Decision required | Parser precedence/rejection tests | First-wins, last-wins, and reject are different contracts |
| Filter grammar | Decision required | Status, priority, or tag filter tests | Candidate filters do not define syntax |
| Combined-filter semantics | Decision required | Multiple-filter tests | AND, OR, and precedence cannot be inferred |
| List ordering | Decision required | Order-sensitive assertions | No ordering guarantee exists |
| Missing-file policy | Decision required | Initial repository read | Empty initialization and storage error are different behaviors |
| Corrupted-file recovery | Decision required | Malformed-JSON recovery tests | Silent replacement or recovery must not be assumed |
| Storage-path configuration | Decision required | Safe integration and E2E fixtures | Tests need an explicit path that cannot reach user data |
| Stdout/stderr and process semantics | Decision required | Public failure/success assertions | Meaningful streams and success/failure must be selected before exact E2E expectations |
| Exact output format and numerical exit codes | Can be deferred | Declaring formatting or numeric values as public contracts | Not needed for first domain or repository Red-Green cycles |
| Platform-support expectations | Can be deferred | Claiming portable path or permission behavior | Local success does not establish behavior on every supported environment |
| Concurrency or file locking | Can be deferred | Concurrent writes if they enter scope | No concurrency requirement is currently confirmed |
| Priority, tags, and advanced filters | Illustrative assumption only | Their requirements and tests | Candidate features must not block confirmed title behavior |

### 8.7 Closing Strategy Summary

The proposed Week 2 starting portfolio is many focused unit tests, targeted
real-file integration tests, and a small number of process-level E2E journeys.
The first TDD increments should establish trimmed titles, blank-title rejection,
and initial `open`. Real-file evidence should be added when development reaches
JSON reading, writing, preservation, paths, or storage failures. Process-level
evidence should be added only for selected public routing and user journeys.

ID grammar, update statuses, filters, ordering, missing/corrupted-file policies,
storage-path configuration, public streams and formatting, numerical exit codes,
and platform/concurrency expectations remain decisions at the times identified
in the register. This plan has not been executed. Its distribution and order
should be revisited after Week 2 supplies actual duration, failure-diagnosis,
flakiness, platform, and maintenance evidence.

---

## 9. Research Findings

### 9.1 Key Findings

#### TDD findings

- **Research finding:** TDD is a repeated Red-Green-Refactor discipline, not
  merely writing tests before code. Red must fail because the intended behavior
  is missing; Green supplies the smallest responsible implementation for that
  behavior; Refactor improves structure while preserving observable behavior
  [R-001] [R-002].
- **Practitioner recommendation:** Inspect the reason for Red, keep behavior
  increments small, rerun relevant regressions, and separate refactoring from a
  new behavior cycle [R-010] [R-012]. These practices support feedback and
  diagnosis; they do not prove complete correctness [R-013].
- **Empirical finding with limitations:** The cited meta-analysis, industrial
  cases, and adoption review report context-dependent quality, productivity,
  and adoption outcomes [R-007] [R-008] [R-009]. Differences among teams,
  methods, skills, and study settings prevent treating those observations as a
  guarantee that TDD always improves design, productivity, or defect rates.
- **Research finding:** Suitability depends on risk, feedback speed, maintenance
  cost, legacy constraints, and developer skill. Strict TDD is therefore a
  contextual engineering choice rather than a universal rule [V-005] [V-006]
  [V-007].

#### Testing-level findings

- **Research finding:** Unit, integration, and E2E tests provide different
  evidence. Classification follows the behavioral boundary and real dependency
  exercised, not the number of functions or objects in the test [R-003]
  [R-015] [R-016].
- **Research finding:** A direct handler call remains in-process. The selected
  Ticket Manager E2E boundary invokes the public CLI as a separate process with
  actual arguments and observes relevant streams, process semantics, and state
  [R-004] [V-019].
- **Research finding:** A repository double can validate caller coordination,
  but it replaces encoding, paths, and file I/O. Persistence claims require the
  real adapter and isolated temporary storage [R-005] [R-017]. Reader and writer
  also need independent checks because a round trip can hide compatible defects
  [V-027].
- **Practitioner recommendation:** Use the narrowest boundary that supplies the
  required evidence, then cross a real seam or public boundary when the risk
  exists there. Broader tests are not automatically more valuable, and
  purposeful overlap is justified only when levels answer different questions
  [R-006] [V-014] [V-023]. No fixed test-level percentage is required.

#### AI-assisted development findings

- **Research finding:** AI-generated code and tests are proposals requiring
  human review. Compilation or type checking can reject type errors while code
  still implements the wrong requirement [R-021] [V-031].
- **Research finding:** Generated tests can use weak assertions, invented APIs,
  unsupported rules, or the wrong boundary. Empirical oracle research shows
  potential value and measured limitations in its studied Java corpus; it does
  not prove a particular TypeScript test correct [R-022].
- **Research finding:** When the same AI interprets the requirement and produces
  code, tests, and expected results, the artifacts can share the same mistake.
  Agreement is not automatically independent validation [V-032] [V-033].
- **Practitioner recommendation:** Review each expectation against the original
  requirement, inspect the complete intended diff, and retain human acceptance
  even when focused and regression tests pass [V-041] [V-044]. AI can assist
  with exploration, examples, comparisons, and small proposals; it does not
  approve its own final output.

#### Ticket Manager strategy findings

- **Confirmed project behavior:** A valid title is trimmed, an empty or
  whitespace-only title is rejected, and a new ticket starts with status
  `open`. These statements do not define identifier generation or a complete
  status lifecycle.
- **Accepted project strategy:** Start with many focused unit tests, targeted
  real-file integration tests, and a small process-level E2E suite. This is a
  contextual portfolio, not a fixed ratio or permanent architecture decision.
- **Research finding:** Unique temporary directories reduce shared-file risk but
  do not control clock, randomness, environment, working directory, process
  configuration, or every platform behavior [R-017] [V-024]. Tests must avoid
  real user data and independently isolate each mutable storage fixture.
- **Research finding:** Invalid input, well-formed not-found, persistence
  failure, and unexpected errors should remain distinguishable. Assertions need
  the smallest meaningful combination of result, output, process semantics, and
  stored-state evidence for the selected claim.
- **Unresolved project decision:** ID grammar, status transitions, filters,
  ordering, missing/corrupted-file policies, storage-path configuration, exact
  output, numerical exit codes, platform support, and concurrency remain open
  until an authorized decision is recorded.
- **Illustrative assumption:** Priority, tags, advanced filters, and any status
  beyond initial `open` remain candidate examples only. They are not requirements
  and must not enter tests or implementation before their contracts are agreed.
- **Future execution evidence:** Chapter 8 is a plan. No Week 2 implementation,
  Red/Green result, duration, flakiness, portability, or maintenance measurement
  currently validates its proposed distribution [V-060].

#### Testing-quality findings

- **Research finding:** Assertion strength matters more than detailed or
  professional-looking syntax. A test should fail for a plausible defect in the
  behavior named by the test [V-021] [V-042].
- **Research finding:** Excessive mocking can preserve fast feedback while
  removing the real dependency named in the claim. Interaction assertions are
  useful only when the argument, count, or absence of a call is behaviorally or
  architecturally relevant [V-037] [V-046].
- **Research finding:** Over-testing concerns duplicated evidence, brittleness,
  broad setup, and maintenance cost—not simply a high test count. Purposeful
  overlap can remain when it supplies distinct boundary evidence [V-030]
  [V-053].
- **Research finding:** Coverage identifies executed statements or branches; it
  does not evaluate the requirement or oracle. Failure paths, meaningful input
  partitions, and state-preservation checks remain necessary [R-023] [V-034]
  [V-048].
- **Research finding:** Tests written after implementation can document current
  behavior, reproduce bugs, and protect regressions, but they did not drive the
  already-written implementation and are not retrospective TDD [V-049].

| Theme | Main finding | Practical implication |
| --- | --- | --- |
| TDD | Red-Green-Refactor supplies disciplined feedback, not a correctness guarantee | Drive one behavior, inspect Red, implement minimum Green, and refactor while behavior stays stable |
| Test boundaries | Levels supply different evidence at different real boundaries | Choose the narrowest sufficient level and add broader evidence for real seams or public journeys |
| AI assistance | Generated code and tests remain correlated, reviewable proposals | Trace expectations to requirements, inspect the diff, and keep human acceptance |
| Ticket Manager | Confirmed rules are small; the accepted portfolio is balanced and layered | Start with title behavior, add real JSON evidence at persistence, and reserve E2E for selected wiring |
| Test quality | Assertions, failure paths, isolation, and distinct evidence matter more than count or coverage | Review what each test can detect and what its doubles or boundary leave unproven |

### 9.2 Important Corrections to AI Suggestions

#### TDD corrections

The weak suggestions reduced TDD to test-first order, accepted any failure as
Red, treated Green as final design, and implied that passing tests or TDD prove
defect-free software. These claims ignored failure cause, incremental design,
and testing limits. The corrected conclusion is Red for the expected missing
behavior, minimum Green, behavior-preserving Refactor, and scoped evidence—not
proof. This correction shaped the workflow and prevented guaranteed productivity
or design claims [V-001] [V-002] [V-003] [V-004] [V-005] [V-006].

#### Test-boundary corrections

The rejected suggestions defined a unit as exactly one class/function, called
multiple real objects integration, restricted integration to databases, called
a handler test E2E, and treated mocks as JSON evidence. They classified tests
by incidental structure instead of the real boundary. The corrected conclusion
names the system under test and dependency exercised: focused behavior for unit,
real component/file seam for integration, and separate public process for this
project's E2E boundary. This correction produced the layered portfolio and
separated caller, JSON, and CLI evidence [V-009] [V-010] [V-011] [V-017]
[V-019] [V-020].

#### Assertion and evidence corrections

The weak suggestions treated `not.toThrow()`, exit status, snapshots, detailed
appearance, test count, coverage, round trips, or regression success as complete
evidence. Each can pass while values, errors, state, requirements, or real
dependencies are wrong. The corrected conclusion selects meaningful behavioral
assertions, independently checks reader and writer, and treats metrics and
regressions as scoped signals. This correction added stronger-oracle guidance,
failure-path cases, and explicit `Not proven` columns [V-021] [V-022] [V-027]
[V-030] [V-034] [V-041] [V-042] [V-051].

#### AI-assisted-development corrections

The rejected suggestions equated compilation with correctness, generated tests
with proof, the same generator with independence, and passing tests with
permission to skip diff review. Tests were also asked to resolve ambiguous
requirements. The corrected conclusion reviews code and tests separately against
the authorized requirement, retains unresolved decisions, and requires human
diff and risk review. This correction established the Chapter 6 workflow and
the Chapter 8 decision register [V-031] [V-032] [V-033] [V-039] [V-044].

#### Strategy corrections

The weak suggestions required fixed ratios, repeated every case at every level,
preferred random data universally, required builders, blocked TDD until every
decision was complete, followed command-list order, or treated a complete plan
as reliability proof. These rules ignored project context, dependency order,
reproducibility, and the absence of execution. The corrected strategy uses
evidence-based boundaries, explicit fixtures, just-in-time decisions, small
increments, and later measurement. This correction made Chapter 8 a revisable
starting plan rather than an approved or executed implementation [V-015]
[V-023] [V-054] [V-055] [V-056] [V-058] [V-060].

| Incorrect or weak suggestion | Corrected conclusion | Impact |
| --- | --- | --- |
| Any failure is an acceptable Red | Confirm failure is caused by the intentionally missing behavior [V-002] | Prevents syntax or environment failures from driving implementation |
| Passing tests prove defect-free software | Treat results as scoped evidence [V-005] | Keeps review and broader validation necessary |
| A unit must be one class/function | Define a narrow behavioral boundary contextually [V-009] | Avoids structural misclassification |
| A handler call is E2E | Invoke the selected public CLI in a separate process [V-019] | Preserves executable and routing evidence |
| A repository mock proves JSON persistence | Use an isolated real-file integration test [V-017] | Exercises serialization, paths, and file I/O |
| Exit status alone proves CLI behavior | Combine relevant process, output, and state observations [V-022] | Detects false or misleading success |
| Coverage proves requirement quality | Use coverage to locate execution gaps [V-034] | Directs investigation without replacing oracles |
| Generated tests prove generated code | Review both proposals against the original requirement [V-032] | Reduces correlated-assumption risk |
| Tests can decide ambiguous requirements | Obtain and record a human project decision first [V-039] | Prevents accidental policies |
| Every scenario belongs at every level | Use the narrowest sufficient boundary and purposeful overlap [V-023] | Reduces duplicate cost while retaining distinct evidence |
| Random data is always stronger | Prefer readable cases; record seed and failing value when randomizing [V-054] | Preserves reproducibility and diagnosis |
| A complete test plan proves reliability | Treat the plan as unexecuted and revise it with results [V-060] | Separates preparation from observed evidence |

### 9.3 Lessons for Week 2

1. **Clarify one behavior before generating code.** Separate confirmed behavior,
   illustrative assumptions, and unresolved decisions. Record the contract
   needed for the next increment; do not let the first implementation silently
   choose status, filter, file, output, or exit behavior [V-057].
2. **Review the focused test before implementation.** Trace its expectation to
   the requirement, ask which plausible defect it detects, justify its boundary,
   and know why the initial Red should fail. A passing or irrelevant test cannot
   supply the intended Red evidence [V-050].
3. **Ask AI for one small proposal.** Request a focused test or minimum
   implementation increment. Reject speculative fields, statuses, filters,
   abstractions, dependencies, and full-feature rewrites. Inspect the complete
   proposed diff before acceptance.
4. **Use layered evidence.** Keep domain, parser, and use-case behavior focused;
   use the real adapter and unique temporary storage for JSON claims; invoke a
   subprocess for selected public CLI journeys. Do not repeat every edge case at
   all levels.
5. **Preserve data and failure semantics.** Distinguish invalid input,
   well-formed not-found, persistence failure, and unexpected errors. Check for
   false success, unchanged or preserved unrelated records, independent reader
   and writer behavior, and isolation from real user storage.
6. **Keep tests maintainable.** Assert meaningful public behavior, avoid private
   implementation coupling, use doubles only for relevant focused evidence, and
   avoid shared mutable fixtures. Do not freeze decorative output without a
   contract or use coverage as an acceptance target.
7. **Record actual evidence.** For every increment, retain the command and
   relevant expected Red output, why the failure is valid, Green result,
   regression scope/result, integration or E2E result where needed, changed
   files, decisions and assumptions, human review findings, and remaining risks.
   Record duration, flakiness, and platform observations when they become
   available.
8. **Revisit the strategy.** Chapter 8 is an initial plan. Adjust its order and
   distribution using measured feedback speed, failure diagnosis, maintenance
   burden, platform differences, flaky behavior, duplicate evidence, missed
   risks, and the architecture that actually emerges.

Week 2 readiness checklist:

- [ ] The next behavior is clear.
- [ ] The expected public evidence is clear.
- [ ] Unresolved decisions are recorded.
- [ ] The test boundary is justified.
- [ ] The proposed test has meaningful assertions.
- [ ] The expected Red reason is known.
- [ ] AI-generated code will be reviewed before acceptance.
- [ ] Real-file evidence is planned when persistence is involved.
- [ ] Process-level evidence is planned only for public CLI risks.
- [ ] User data and shared mutable fixtures are excluded.
- [ ] Failure paths and unchanged-state expectations are identified.
- [ ] The final diff and test evidence will be recorded.

This checklist reduces avoidable omissions but does not guarantee correctness.

### 9.4 Chapter 9 Closing Statement

Week 1 produced a source-traceable understanding of TDD and its limits, a
contextual layered testing strategy, conceptual examples and a Ticket Manager
test matrix, corrections to unreliable AI suggestions, and a prioritized Week
2 starting plan. The strategy and findings remain subject to developer review
and the unresolved decisions recorded above.

Week 1 did not produce a complete Ticket Manager CLI, executable tests,
observed Red or Green results, performance or flakiness data, or proof of
reliability. Those claims require future implementation and actual evidence;
they cannot be supplied by this synthesis.

---

## 10. Conclusion

### 10.1 Overall Research Conclusion

This research concludes that Test-Driven Development is a disciplined feedback
process built around a repeated cycle:

```text
Red
-> Green
-> Refactor
```

Red must fail because the intended behavior is genuinely missing, rather than
because of an unrelated syntax, fixture, dependency, or environment problem.
Green supplies the smallest responsible implementation that satisfies the
current behavior without adding speculative features. Refactor then improves
the internal structure while preserving observable behavior [R-001] [R-002]
[R-011]. Together, these steps support incremental learning, regression
feedback, and controlled design change.

The resulting tests are scoped evidence, not proof of complete correctness. A
passing suite can still omit an important case, encode a misunderstood
requirement, or use an assertion that cannot detect a plausible defect
[R-013] [V-005]. TDD's effectiveness therefore depends on context, feedback
speed, risk, developer skill, and test quality. The empirical and practitioner
evidence does not establish that TDD guarantees defect-free software, better
design, or higher productivity in every project; reported outcomes and
adoption costs vary across settings [R-007] [R-008] [R-009].

### 10.2 Testing Strategy Conclusion

For the future file-backed Ticket Manager CLI, the accepted contextual starting
strategy is:

```text
Many focused unit tests
+ targeted real-file integration tests
+ a small process-level end-to-end suite
```

Unit tests should provide fast, localized feedback for domain rules, parsing,
validation, and use-case behavior. Targeted integration tests should exercise
the real JSON adapter and file system with isolated temporary storage. A small
E2E suite should invoke the public CLI as a separate process for selected
user-visible journeys and observe only the streams, process result, and stored
state relevant to each claim [R-003] [R-004] [R-017].

The governing principle is: use the narrowest boundary that supplies the
required evidence, then add a broader test when the risk crosses a real
file-system or public-process boundary [V-017] [V-023]. This strategy is not a
fixed ratio, and it does not require every scenario at every level [R-006]. It
is a research-based starting point that may change after implementation
provides actual evidence about speed, diagnosis, maintenance, flakiness, and
platform behavior.

### 10.3 AI-Assisted Development Conclusion

AI can assist with research exploration, focused examples, comparison of
alternative strategies, proposed tests and implementation increments, edge-case
discovery, and documentation refinement. These uses can shorten exploration
and expose options, but they do not transfer technical accountability to the
model.

AI cannot establish that its own output is correct, independently validate code
and tests produced from the same assumptions, resolve ambiguous requirements
without an authorized decision, replace source verification or human diff
review, or approve final project changes. Generated tests may contain weak or
incorrect oracles, while generated code may compile and pass those tests yet
still implement the wrong contract [R-020] [R-022] [V-031] [V-032]. Code and
tests must therefore be reviewed as separate artifacts and each compared with
the original requirement, repository constraints, and relevant evidence. Human
review remains necessary even after focused, regression, or E2E tests pass
[V-033] [V-044].

### 10.4 Ticket Manager Scope

The confirmed Ticket Manager behavior remains deliberately small:

- a valid title is trimmed
- a blank or whitespace-only title is rejected
- a newly created ticket starts with status `open`

These rules do not define identifier representation, the complete status
vocabulary, status transitions, priority or tag behavior, filter grammar, list
ordering, missing-file behavior, corrupted-file recovery, exact output
formatting, stdout/stderr details, numerical exit codes, or platform and
concurrency policies. Those items remain unresolved project decisions or
illustrative assumptions. A future implementation or AI-generated test must not
silently convert one interpretation into an accepted requirement [V-008]
[V-039] [V-057].

### 10.5 What Week 1 Produced

Week 1 research produced:

- a documented understanding of TDD and its limitations
- a conceptual Red-Green-Refactor example
- a comparison of unit, integration, and E2E testing
- a balanced layered testing decision
- conceptual Ticket Manager test examples and a test matrix
- JSON storage and error-testing guidance
- an evaluation workflow for AI-generated code and tests
- guidance on common testing mistakes
- a prioritized Week 2 testing strategy
- a traceable reference set and validation log
- traceable evidence for all three required AI workflows: Layered Questioning,
  Solution Exploration, and Iterative Refinement

The Iterative Refinement evidence includes an Initial Review, Initial AI Feedback,
recorded Human Evaluation, and three authorized refinement passes. It also
includes a Final Validation record. The current validation result and
workflow-completion state are maintained in `ai-workflow-evidence.md` and
`requirements-mapping.md`.

These outputs organize current knowledge, corrections, risks, and planned
evidence. They are documentation and preparation, not execution results.

### 10.6 What Week 1 Did Not Produce

The research did not produce a complete Ticket Manager CLI, executable
production code, executable automated tests, or installed test infrastructure.
No Red or Green result was observed, and no test duration or flakiness was
measured. Platform portability and production reliability have not been
verified, and the documentation does not prove that no defects remain
[V-059] [V-060].

Mentor-review findings and Lessons Learned are not complete. The current
Iterative Refinement and validation status is recorded in
`ai-workflow-evidence.md` and `requirements-mapping.md`. Planned Week 2 work
must not be reported as completed Week 1 evidence, and the current strategy
remains subject to developer evaluation and later human approval.

### 10.7 Week 2 Direction

Week 2 should begin with one confirmed domain behavior. The developer should
review a focused test against that requirement, run it, and confirm the expected
Red before requesting or writing the minimum Green implementation. The code and
test diff should then be reviewed separately, relevant regressions run, and the
structure refactored only while observable behavior remains stable.

When persistence enters the increment, targeted tests should add real-file
evidence in isolated storage. Process-level checks should follow for selected
public CLI journeys rather than becoming the default boundary for every rule.
Throughout the work, the developer should record decisions, assumptions,
failures, corrections, remaining risks, and the evidence behind each accepted
change. The layered strategy should then be revisited using actual feedback
speed, maintenance cost, failure-diagnosis, flakiness, and platform observations.
This transition preserves the central conclusion of Week 1: confidence must be
earned incrementally through relevant evidence and critical human review, not
inferred from a plan, a test count, or AI agreement.
