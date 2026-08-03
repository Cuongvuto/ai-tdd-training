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
not prove correctness [R-002] [R-007] [R-011] [R-013]. At the end of the Brief
stage, practical Red-Green-Refactor examples, testing-level comparisons, Ticket
Manager CLI test design, AI-generated-code validation, later research chapters,
and the Example and Validation stages were intentionally unfinished.

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
the Layered Questioning workflow complete. At the end of this human-evaluation
stage, testing-level research, broader Ticket Manager CLI test design,
AI-generated-code validation, Solution Exploration, and Iterative Refinement
were separate unfinished stages.

---

## 3. Solution Exploration

### 3.1 Objective

Explore multiple testing approaches, compare their trade-offs, and select an
approach based on the Ticket Manager CLI context.

### 3.2 Problem Selected for Exploration

How should unit, integration, and end-to-end tests be combined for a
file-backed Ticket Manager CLI?

The exploration compares portfolios rather than asking which testing level is
universally best. The relevant boundaries are in-process business behavior,
real JSON persistence, and the public CLI running as a separate process.

### 3.3 Options Considered

- **Option A — Unit-heavy strategy:** Emphasize isolated tests for domain rules,
  use cases, validation, and command handlers, with test doubles where useful.
  Retain only a small number of integration and E2E checks.
- **Option B — Balanced layered strategy:** Use many focused unit tests,
  targeted integration tests against real temporary JSON storage, and a small
  set of process-level E2E tests for critical journeys.
- **Option C — End-to-end-heavy strategy:** Exercise most behavior through the
  public CLI and real temporary file storage, with fewer isolated tests.

These descriptions establish alternatives only; no option is selected in this
section.

### 3.4 Comparison Criteria

The options are compared using feedback speed, failure localization, confidence
in component collaboration, confidence in real CLI behavior, file-system
coverage, test isolation, determinism, maintenance cost, brittleness, setup
complexity, suitability for TDD, ability to validate AI-generated
implementation, value for a small training project, and value if the
application grows later.

The comparison treats these as contextual criteria rather than assigning
universal weights. It also distinguishes a test's realism from the precision
and breadth of the evidence it actually supplies.

### 3.5 AI Comparison

This comparison was generated from the
[Solution Exploration prompt](prompts/solution-exploration-testing-levels.md)
and the boundary analysis in Chapter 4.

| Criterion | A — Unit-heavy | B — Balanced layered | C — E2E-heavy |
| --- | --- | --- | --- |
| Feedback speed | Fastest main loop | Fast unit loop; moderate seam and journey checks | Slowest main loop due to process and file setup |
| Failure localization | Usually precise | Precise locally; moderate at real seams; broad for few journeys | Often broad and diagnosis-intensive |
| Component collaboration | Low to moderate where doubles dominate | Strong at deliberately selected seams | Strong only for collaborations reached by chosen journeys |
| Real CLI behavior | Low except for a few smoke tests | Strong for a small critical command set | Strongest for the exercised public commands |
| File-system coverage | Sparse | Targeted, direct repository coverage plus journey confirmation | Frequent but often indirect through the whole CLI |
| Test isolation | Easy for unit tests | Manageable with one temporary directory per real-file test | More difficult because process, environment, and storage must be isolated |
| Determinism | Usually highest | High with controlled fixtures and process harness | Most exposed to platform, path, environment, and timing variation |
| Maintenance cost | Low initially; doubles can drift | Moderate across three harness types | High when many workflows and outputs change |
| Brittleness | Low unless coupled to implementation interactions | Moderate and controllable by keeping boundaries explicit | Highest tendency because each test crosses many boundaries |
| Setup complexity | Lowest | Moderate: doubles, temporary storage, and subprocess helpers | Highest per test and for failure cleanup |
| Suitability for TDD | Excellent for small Red-Green-Refactor steps | Excellent locally, with seam tests added where evidence requires | Weak as the dominant development loop |
| AI-generated implementation | Pinpoints rule defects but may miss wiring and real I/O errors | Checks generated logic, seams, and representative public behavior | Finds visible journey failures but gives weak fault localization |
| Small training project | Simple and fast, but can under-demonstrate storage and CLI reliability | Demonstrates the three boundaries without making every test broad | Easy to explain from a user view, but costly for systematic examples |
| Growth later | Fast base, but missing seam coverage creates migration risk | Adaptable if boundaries stay explicit and the mix is revisited | Suite time and brittleness risk growing rapidly |

**Option A — advantages, disadvantages, risks, and reasonable conditions.** Its
advantages are a very short feedback loop, simple fixtures, and precise signals
while using TDD or reviewing AI-generated logic. Its disadvantage is weak direct
evidence for JSON and executable wiring. The principal risk is false confidence
when a fake repository or directly invoked handler drifts from the real system.
It can be reasonable when the domain is complex, external adapters are already
covered by dependable contract checks, and the few retained broad tests protect
the highest-risk seams.

**Option B — advantages, disadvantages, risks, and reasonable conditions.** Its
advantage is differentiated evidence: focused rules, real persistence seams,
and public critical journeys are each tested at an appropriate boundary. It
costs more because the project must maintain unit, temporary-file, and process
harnesses. Its main risk is accidental duplication or ambiguous labels unless
each test states its purpose. It is reasonable when all three boundaries matter
and the team can keep integration tests isolated and the E2E set deliberately
small.

**Option C — advantages, disadvantages, risks, and reasonable conditions.** Its
advantage is frequent exercise of real CLI wiring and storage in user-shaped
flows. Its disadvantages are slower feedback, broader failures, and expensive
scenario setup. The main risks are brittle assertions, missed edge cases hidden
behind a few happy journeys, and an increasingly slow TDD loop. It can be
reasonable for a very thin wrapper with little internal logic when process
tests are demonstrably fast, deterministic, and cheap to diagnose and maintain.

**Provisional AI suggestion — not a project decision:** Option B is the most
plausible starting point for this file-backed training CLI: many focused unit
tests, targeted real-file integration tests, and a small number of subprocess
E2E journeys. It addresses the distinctive JSON and CLI risks without making
every behavior pay the broad-test cost. The developer must still accept,
modify, or reject this suggestion after evaluating actual toolchain speed,
platform targets, risks, and learning goals in Sections 3.6 through 3.8.

### 3.6 Human Evaluation

I reviewed the three testing strategies and agree with the AI's provisional
recommendation of **Option B — Balanced layered strategy**.

Option A provides the fastest feedback and precise failure localization, which
makes it useful for domain rules, validation, use cases, and small
Red-Green-Refactor cycles. However, relying mainly on unit tests would provide
insufficient evidence that real JSON persistence and public CLI wiring work
correctly.

Option C provides stronger evidence for complete user-facing journeys, but
using end-to-end tests as the dominant development loop would make feedback
slower and failures harder to diagnose. It would also increase setup and
maintenance costs because each test would cross the process, command parsing,
application, and file-system boundaries.

Option B provides the most appropriate balance for the planned Ticket Manager
CLI. It allows each important risk to be checked at a suitable boundary:

- unit tests for focused business and validation behavior
- integration tests for real JSON persistence
- end-to-end tests for selected public CLI journeys

I accept this recommendation as a contextual decision rather than a universal
testing rule. I reject the idea that the project must follow fixed testing
percentages or that every behavior must be repeated at all three levels.


### 3.7 Contextual Decision

For the future file-backed Ticket Manager CLI, the selected starting strategy
is **Option B — Balanced layered strategy**.

The planned approach is:

- Use many focused unit tests for ticket rules, input validation, use cases, and
  command-handler behavior.
- Use test doubles or an in-memory repository when the purpose is to test the
  caller's behavior without exercising real persistence.
- Use targeted integration tests against unique temporary directories when the
  claim concerns JSON serialization, deserialization, paths, missing files,
  read-after-write behavior, or storage errors.
- Use a small set of process-level end-to-end tests for critical journeys such
  as creating and listing a ticket, showing an existing ticket, updating a
  ticket, and handling an invalid command.
- Observe standard output, standard error, exit status, and resulting storage
  only when those details are part of the behavior being tested.

No fixed numerical ratio is selected. The guiding rule is to use the narrowest
test boundary that provides the required evidence, then add a broader test when
the risk exists at a real component seam or public CLI boundary.

The testing distribution should be reviewed during implementation. It may
change if subprocess tests are faster or slower than expected, persistence
becomes more complex, additional platforms are supported, or maintenance
experience reveals unnecessary duplication.


### 3.8 Assumptions and Limitations

This decision is based on the following assumptions:

- The application is a relatively small local CLI tool.
- Tickets are stored in local JSON files.
- Business rules can be tested independently from the real file system.
- Tests can create isolated temporary directories without modifying user data.
- The public CLI can be invoked as a separate process for selected end-to-end
  journeys.
- The application does not yet include a database, network service,
  concurrency requirements, or a graphical interface.

The recommendation has not been validated against an implemented test suite.
No actual test execution time, platform behavior, flakiness rate, or
maintenance cost has been measured. The current comparison is therefore a
research-based starting point rather than a permanent architecture decision.

The selected strategy does not guarantee complete correctness. Each test
provides evidence only for the behavior, inputs, dependencies, environment, and
assertions it exercises. Code review, exploratory testing, and later validation
remain necessary.

---

## 4. Iterative Refinement

### 4.1 Objective

Review and improve the research through several controlled refinement passes.

### 4.2 Initial Review Prompt

The initial review request is recorded at
[Iterative Refinement - Initial Review Prompt](prompts/iterative-refinement-initial-review.md),
with the repository path
`docs/week1/prompts/iterative-refinement-initial-review.md`.

The request asks for a repository-based review of `README.md`, the complete
Week 1 research, references, validation log, workflow evidence, requirements
mapping, all available prompts, and the supplementary `note/README.md`. The
review dimensions are correctness and internal consistency, structure and
readability, evidence and traceability, Ticket Manager scope, workflow evidence,
and the boundary of the Week 1 assignment.

This stage produces findings only. It explicitly performs no refinement,
external source re-verification, implementation, or test execution. The human
developer remains responsible for accepting, rejecting, or modifying every
suggestion before any later document change.

### 4.3 Initial AI Feedback

The review inspected the current repository documentation and prompt inventory
without re-verifying external sources. Findings distinguish correctness and
traceability concerns from optional readability preferences. A positive finding
uses `No change recommended` only when the inspected wording or evidence should
be preserved.

| ID | Severity | Location | Finding | Proposed refinement | Basis |
| --- | --- | --- | --- | --- | --- |
| IR-F01 | Important | `docs/week1/research.md`, `### 1.1 Background` | The introduction says the document “does not yet select a complete CLI testing strategy,” but Sections 8.6–8.7 and 10.2 now record an accepted contextual starting strategy. This is a current-state contradiction rather than a historical workflow snapshot. | In a later accepted refinement, replace the stale sentence with wording that reflects the completed research while retaining that implementation and execution remain future work. | Repository consistency |
| IR-F02 | Important | `docs/week1/requirements-mapping.md`, `Apply Iterative Refinement` row; `docs/week1/ai-workflow-evidence.md`, Sections 4.2–4.3 | Once this prompt and initial feedback are recorded, `Not started` no longer describes the Iterative Refinement workflow accurately. The workflow has started, although no refinement pass or human evaluation is complete. | After human review authorizes a mapping change, set the workflow to an honest in-progress status and cite the completed initial-review evidence; do not mark it completed. | Requirement mapping |
| IR-F03 | Important | `README.md`, `## Deliverables` | The opening `text` fence for the deliverables tree has no closing fence. As rendered Markdown, the main-document descriptions, Scope, Acceptance Criteria, and Project Status can all be swallowed into one code block, obscuring the assignment state. | Close the tree fence after `prompts/` and restore explicit Markdown headings and lists for the following material. | Readability judgment; repository consistency |
| IR-F04 | Important | `docs/week1/prompts/iterative-refinement-initial-review.md`, `# Iterative Refinement — Initial Review Prompt`; `docs/week1/ai-workflow-evidence.md`, `### 4.2 Initial Review Prompt` | The evidence now points to the correct prompt path, but that prompt is currently untracked. A commit containing only the evidence file would leave its traceability target absent from the committed repository. Git does not establish who created the file. | Have the developer review the prompt provenance and decide whether to include the unmodified prompt in the same later change set. | Repository consistency; project scope |
| IR-F05 | Minor | `docs/week1/ai-workflow-evidence.md`, `### 2.5 Brief Result` and `### 2.10 Human Evaluation and Corrections` | These historical stage records say later chapters, testing-level work, AI-code validation, and Solution Exploration “remain” unfinished, although those activities are now documented. The surrounding workflow order implies a snapshot, but present-tense wording can look stale when read independently. | Preserve the historical evidence but add an explicit temporal qualifier such as “At the end of this stage” rather than rewriting the recorded outcome as if later work had already existed. | Repository consistency; readability judgment |
| IR-F06 | Minor | `docs/week1/validation-log.md`, `V-017`, `V-020`, `V-037`, `V-021`, and `V-036` | The log contains semantically overlapping corrections about doubles not proving real JSON persistence and `not.toThrow()` not proving command correctness. The entries arose in different stages and have distinct impact fields, but their conclusions substantially overlap and increase maintenance cost. | Let the human decide whether audit-history value justifies keeping all entries; if retained, add cross-links or an explicit “related validation” note instead of renumbering IDs. | Existing validation entry; readability judgment |
| IR-F07 | Optional | `docs/week1/research.md`, `### 9.1 Key Findings` and `### 9.2 Important Corrections to AI Suggestions` | Chapter 9 uses 69 validation-ID mentions in addition to 19 reference mentions. This is highly traceable, but clusters of IDs can interrupt the synthesis and make the chapter read like an index to the validation log. | If the mentor does not need claim-by-claim IDs inline, keep representative IDs near each conclusion and move exhaustive traceability to the correction table or validation log. | Readability judgment |
| IR-F08 | Optional | `docs/week1/research.md`, `### 8.7 Closing Strategy Summary`, `### 9.4 Chapter 9 Closing Statement`, and Sections 10.5–10.6 | The layered portfolio, unresolved decisions, and “produced versus not produced” boundary are repeated across three consecutive chapter endings. The repetition reinforces scope for a mentor reader but creates several places that must remain synchronized. | Ask the human reviewer whether repetition is useful for the intended audience; if not, retain the full conclusion and shorten earlier closing statements to focused transitions. | Readability judgment |
| IR-F09 | Minor | `docs/week1/requirements-mapping.md`, `Explain findings during mentor review` row | Supporting evidence is described as “Vietnamese notes later,” but no exact future artifact is named and `note/README.md` explicitly says that `note/` is supplementary rather than an official deliverable. The status is correctly `Not started`, but the evidence path may mislead a reviewer. | Keep the status unfinished and replace the provisional supporting-evidence text only after an actual mentor-review artifact and location are authorized. | Requirement mapping; project scope |
| IR-F10 | Minor | `note/README.md`, `# Personal Vietnamese Notes` | The supplementary note uses the historical path `docs/week-1/` instead of the actual `docs/week1/` path and also leaves its `text` fence unclosed. It is not an official deliverable, so this does not invalidate the Week 1 research, but it can misdirect personal review. | Treat this as a separate, human-approved housekeeping change; do not silently rewrite the supporting note as part of research refinement. | Repository consistency; project scope |
| IR-F11 | No change recommended | `docs/week1/research.md`, Chapter 4 and Sections 5.8, 8.1–8.3, and 10.2 | Testing levels are classified by the boundary and real dependency exercised: focused in-process behavior for unit tests, a named real seam for integration tests, and the public CLI in a separate process for this project's E2E tests. No handler test or mock is mislabeled as proof of the broader boundary. | Preserve the boundary-based classification and the narrowest-sufficient-evidence principle. | Existing reference; existing validation entry |
| IR-F12 | No change recommended | `docs/week1/research.md`, Sections 5.2–5.10, 8.6, 9.1, and 10.4 | Confirmed behavior remains limited to title trimming, blank-title rejection, and initial `open`. ID, later statuses, filters, ordering, file policies, output, exit codes, platform support, and concurrency remain decisions or illustrative assumptions. | Preserve the explicit labels and do not promote an illustrative example into a requirement during refinement. | Repository consistency; project scope |
| IR-F13 | No change recommended | `docs/week1/research.md`, Sections 2.4–2.7, 6.6, 9.1, and 10.1; `docs/week1/references.md`, `R-007`–`R-009` and `R-013` | TDD benefits and empirical results retain their contextual limitations, and tests are consistently described as scoped evidence rather than proof of defect absence, universal design improvement, or universal productivity gain. | Preserve the qualified claims and the separation between practitioner reasoning and empirical evidence. | Existing reference; existing validation entry |
| IR-F14 | No change recommended | `docs/week1/ai-workflow-evidence.md`, Sections 2.9–2.10 and 3.5–3.8; `docs/week1/requirements-mapping.md` | Layered Questioning includes validation and an explicit human acceptance; Solution Exploration includes alternatives, provisional AI advice, Human Evaluation, Contextual Decision, and limitations. The historical `docs/week-1/` prompt path is disclosed, and neither workflow is falsely presented as implementation evidence. | Preserve these human-decision and provenance records; do not invent a missing evaluation or silently rewrite the historical prompt. | Repository consistency; requirement mapping |
| IR-F15 | Minor | `docs/week1/ai-workflow-evidence.md`, `### 2.9 Validation Result`; `docs/week1/references.md`, `### R-001` and source reliability notes | The validation result records that some claims received only bibliographic or abstract-level checks because full text was unavailable, but it does not identify every affected reference ID. `R-001` explicitly records a preview, while the other affected IDs cannot be recovered from this summary alone. | During a later authorized Final Validation, identify the affected IDs and their verification level, then decide which sources require re-verification; do not claim that this initial review performed it. | Existing reference; repository consistency |

#### Strongest Parts

- The TDD account separates Red, minimum responsible Green, and
  behavior-preserving Refactor while rejecting universal correctness, design,
  and productivity claims.
- Testing levels are consistently tied to observable boundaries and the real
  dependency exercised, not to incidental object counts.
- Ticket Manager examples carefully distinguish confirmed behavior,
  illustrative assumptions, and unresolved decisions.
- AI-generated code and tests remain separate reviewable proposals, with human
  diff review and requirement ownership preserved.
- The documentation repeatedly distinguishes conceptual plans from execution
  evidence and explicitly records missing measurements.

#### Highest-Priority Candidates

The most valuable candidates for human evaluation are `IR-F01`, `IR-F02`,
`IR-F03`, `IR-F04`, and `IR-F05`. They address a current research contradiction,
workflow-status accuracy, README rendering, prompt traceability, and historical
stage wording. None is accepted automatically by this review.

#### Suggestions That Are Optional

`IR-F07` and `IR-F08` are presentation choices rather than correctness fixes.
Reducing citation density or repeated summaries could improve reading and
maintenance, but the existing detail may be useful during mentor review.

#### Items Requiring Human Decision

- Whether and when the requirements mapping should move Iterative Refinement
  from `Not started` to an in-progress status.
- Whether the untracked initial-review prompt should be included in a later
  reviewed change set.
- Whether overlapping validation entries should remain separate as an audit
  history or gain cross-links.
- Which references had limited-content verification and whether Final
  Validation should re-verify them.
- How much citation density and repeated scope explanation the mentor audience
  needs.
- Whether the supplementary Vietnamese note should receive a separate
  housekeeping correction.

#### Review Limitations

No research, reference, validation, mapping, prompt, or earlier workflow content
was refined in response to these findings. No external source was re-verified,
and no implementation was compiled or test executed. The findings are review
proposals for human evaluation, not accepted changes. A polished-looking
document is not automatically correct, and this repository-only review cannot
supply the implementation and execution evidence that Week 1 intentionally
lacks.

### 4.4 Human Evaluation

The human reviewer evaluated all 15 Initial Review findings, distinguished
current consistency and traceability problems from readability preferences,
and authorized a limited first refinement pass. The decisions below are human
decisions recorded by the AI; the AI suggestions were not accepted
automatically.

| Finding | Human decision | Reason | Pass |
| --- | --- | --- | --- |
| IR-F01 | Accepted | The introduction contains a current contradiction with the completed strategy. | Pass 1 |
| IR-F02 | Accepted | The workflow has begun and the mapping should report an honest in-progress state. | Pass 1 |
| IR-F03 | Accepted | The unclosed fence obscures normal README rendering. | Pass 1 |
| IR-F04 | Accepted | The unmodified Initial Review prompt must remain available with its evidence for Git traceability. | Pass 1 |
| IR-F05 | Accepted with modification | Add temporal qualifiers while preserving the historical result rather than rewriting it from the current perspective. | Pass 1 |
| IR-F06 | Deferred to a later refinement pass | Preserve the validation audit history until a later pass evaluates cross-links without renumbering IDs. | Later pass |
| IR-F07 | No change for now | Citation density is a readability preference and may be useful to the mentor audience. | No change |
| IR-F08 | No change for now | Repeated scope summaries may help the mentor audience and do not create a correctness defect. | No change |
| IR-F09 | Accepted | The mentor-review row must not imply that supplementary notes already contain review evidence. | Pass 1 |
| IR-F10 | Deferred as separate supplementary-note housekeeping | The note is outside the official deliverables and should not be silently changed during research refinement. | Separate housekeeping |
| IR-F11 | Preserve current content | The boundary-based testing classification is correct and should not be weakened. | Preserve |
| IR-F12 | Preserve current content | Confirmed behavior, assumptions, and unresolved decisions are correctly separated. | Preserve |
| IR-F13 | Preserve current content | Empirical limitations and scoped testing claims are correctly qualified. | Preserve |
| IR-F14 | Preserve current content | Existing human decisions, workflow evidence, and historical path disclosure are accurate. | Preserve |
| IR-F15 | Deferred to Final Validation | External source re-verification and verification-level tracing belong in the authorized Final Validation stage. | Final Validation |

Pass 1 therefore authorizes substantive document refinements only for `IR-F01`,
`IR-F02`, `IR-F03`, `IR-F05`, and `IR-F09`. `IR-F04` is accepted as a Git
traceability decision rather than a document rewrite. Readability-only changes,
validation-log consolidation, supplementary-note housekeeping, and source
re-verification remain outside this pass.

### 4.5 Refinement Pass 1

Pass 1 applied only the refinements authorized by the Human Evaluation. Each
change corrects current wording, rendering, or evidence status without changing
the accepted testing strategy, Ticket Manager scope, validation history, or
empirical limitations.

| Finding | File | Refinement applied | Result |
| --- | --- | --- | --- |
| IR-F01 | `docs/week1/research.md` | Replaced the stale Introduction statement with the completed contextual balanced layered strategy and retained implementation, execution, and measurement as future work. | Section 1.1 now agrees with Chapters 8–10 without claiming a fixed ratio or executed strategy. |
| IR-F02 | `docs/week1/requirements-mapping.md` | Changed `Apply Iterative Refinement` from `Not started` to `In progress` while retaining Section 4 as primary evidence. | The mapping reflects the started workflow without claiming completion. |
| IR-F03 | `README.md` | Closed the `text` fence immediately after the deliverables tree. | The following descriptions, Scope, Acceptance Criteria, and Project Status render as normal Markdown. |
| IR-F05 | `docs/week1/ai-workflow-evidence.md` | Added explicit “At the end of...” qualifiers to the Brief and Layered Questioning human-evaluation snapshots. | Historical facts are preserved without appearing to describe the repository's current state. |
| IR-F09 | `docs/week1/requirements-mapping.md` | Replaced provisional mentor-note evidence with `Mentor-review artifact to be added` and `Not yet available`. | Mentor review remains `Not started` and no supplementary note is presented as completed evidence. |

`IR-F04` is recorded separately as a commit-traceability decision. The Initial
Review prompt is tracked at
`docs/week1/prompts/iterative-refinement-initial-review.md` in the current
repository and was not edited during this pass.

`IR-F06`, `IR-F10`, and `IR-F15` remain deferred to their authorized later
stages. `IR-F07` and `IR-F08` receive no change for now. The content protected by
`IR-F11` through `IR-F14` remains unchanged. No external source was re-verified,
no implementation or test file was created, and no code was compiled or test
executed. This pass was performed only after the recorded human authorization.

### 4.6 Refinement Pass 2

Pass 2 was authorized by the Human Evaluation decision for `IR-F06`. It reviewed
two clusters of related validation entries and added reciprocal cross-references
without treating contextually distinct audit records as duplicates.

| Cluster | Validation entries | Relationship | Refinement applied | Why entries remain separate |
| --- | --- | --- | --- | --- |
| Doubles and real JSON persistence | `V-017`, `V-020`, `V-037` | Mocks, fakes, and other doubles can verify caller behavior but do not execute real JSON serialization, paths, or file I/O. | Added a `Related validations` field to each entry linking it to the other two. | `V-017` arose from testing-level boundary classification in Chapter 4, `V-020` shaped the Ticket Manager persistence strategy in Chapter 5, and `V-037` reviews mock-based evidence in AI-generated tests in Chapter 6. |
| Weak `not.toThrow()` evidence | `V-021`, `V-036` | Absence of an exception does not establish the required output, result, collaborator effect, or state change. | Added reciprocal `Related validations` fields between the two entries. | `V-021` established general command-test evidence for Chapter 5, while `V-036` applies the same limit when reviewing AI-generated tests in Chapter 6. |

Nearby entries `V-018`, `V-019`, `V-022`, `V-035`, and `V-038` were inspected
but not cross-linked. They address broader assurance, handler classification,
exit-status evidence, missing failure paths, or code-review accountability
rather than the same two validation relationships.

All five entries retain their original IDs, titles, claims, categories,
validation methods, evidence, evaluations, statuses, correction wording,
impacts, and order. No validation was merged, removed, or renumbered; no status
or correction conclusion changed; and no new validation entry was created. The
sequence remains `V-001` through `V-060`.

#### Content Deliberately Preserved

Pass 2 does not change Chapter 9 citation density, repeated chapter summaries,
the supplementary Vietnamese notes, reference verification levels, Ticket
Manager requirements, or any implementation and test-execution claim.
`IR-F07` and `IR-F08` remain no-change decisions, `IR-F10` remains separate
housekeeping, and `IR-F15` remains deferred to Final Validation. The content
protected by `IR-F11` through `IR-F14` is unchanged. No external source was
re-verified, and no implementation was compiled or test executed.

### 4.7 Refinement Pass 3

Pass 3 applied only the separate supplementary-note housekeeping authorized by
the Human Evaluation decision for `IR-F10`. In `note/README.md`, the current
navigation path was corrected from `docs/week-1/` to `docs/week1/`, and the
missing closing `text` fence was added immediately after that path so the
following explanation renders as normal Markdown. The note remains personal
supporting material rather than an official Week 1 deliverable.

| Finding | Scope | Decision applied | Result |
| --- | --- | --- | --- |
| IR-F07 | Chapter 9 citation density | No change | Existing traceability retained |
| IR-F08 | Repeated chapter summaries | No change | Existing scope reinforcement retained |
| IR-F10 | `note/README.md` housekeeping | Applied | Fence repaired and canonical path restored |
| IR-F15 | Source verification levels | Deferred | Final Validation will evaluate verification depth |

Historical prompt-path evidence, including records of the old `docs/week-1/`
path, was not rewritten. `IR-F07` and `IR-F08` remain no-change decisions, and
`IR-F15` remains deferred to Final Validation. No research conclusion,
requirement, reference, or validation entry changed. No external source was
re-verified, no implementation was created or compiled, and no test was
executed.

#### Content Deliberately Preserved

Pass 3 does not modify `research.md`, `references.md`, `validation-log.md`,
`requirements-mapping.md`, official prompt history, Ticket Manager
requirements, mentor-review status, or any implementation or execution claim.

### 4.8 Final Validation Prompt

The independent Final Validation request is recorded at
`docs/week1/prompts/iterative-refinement-final-validation.md`. It requires a
repository-based review of `README.md`, the supplementary note, Chapters 1–10,
references, validation entries, all three workflow records, requirements
mapping, every prompt, Git history, and the current working tree.

The review covers assignment coverage, research completion, workflow and prompt
traceability, `R-001` through `R-023`, the deferred `IR-F15` verification-level
review, `V-001` through `V-060`, all `IR-F01` through `IR-F15` dispositions,
Markdown and repository integrity, execution-claim boundaries, and Git state.
Original papers, official documentation, and other primary sources are
preferred; every actual access level and limitation must be disclosed.

Completion requires all required evidence, resolved IDs, no blocker or
important contradiction, honest treatment of limited-access sources, complete
Sections 4.2–4.9, and an accurately unfinished mentor-review requirement.
Problems must be reported with severity rather than silently fixed, especially
when they occur in protected files. The result remains subject to human review;
the AI does not accept its own validation result or repository changes.

### 4.9 Final Validation Result

#### Overall Result

**Fail.** Most validation dimensions pass or pass with disclosed limitations,
but one `Important` current-state contradiction remains in the protected
research conclusion. Section 10.6 states that Iterative Refinement and Final
Validation are not complete, while this section records the completed Final
Validation activity; Section 10.5 also lists evidence of only the first two AI
workflows. The source document cannot be silently corrected during this task.
Under the completion rules, the unresolved important contradiction blocks
promotion of the two workflow requirements to `Completed`.

| Severity | Location | Finding | Blocks completion | Required follow-up |
| --- | --- | --- | --- | --- |
| Important | `docs/week1/research.md`, Sections 10.5–10.6 | The conclusion omits completed Iterative Refinement evidence and says Iterative Refinement and Final Validation are not complete. That wording becomes stale when Sections 4.8–4.9 record this validation. | Yes | In a separately authorized correction, update or temporally qualify the workflow-state wording without changing the accurate implementation and execution limitations, then rerun Final Validation. |

#### Validation Summary Table

| Area | Result | Evidence | Limitation or follow-up |
| --- | --- | --- | --- |
| A. Assignment and requirements coverage | Pass with limitation | Every mapping evidence file exists; research and the first two workflows support their completed rows; Iterative Refinement and validation records support their current `In progress` rows; mentor review remains `Not started`. | The two in-progress workflow rows cannot be promoted while the important Chapter 10 contradiction remains. |
| B. Research completion | Fail | Chapters 1–10 exist, contain no unfinished placeholder, retain the three confirmed Ticket Manager behaviors, preserve unresolved decisions, and distinguish plans from execution. | Sections 10.5–10.6 contain the important stale workflow-state conclusion described above. |
| C. Workflow evidence | Pass | Layered Questioning contains Research, Brief, Example, Validation, and Human Evaluation; Solution Exploration contains alternatives, comparison, provisional advice, Human Evaluation, Contextual Decision, and limitations; Iterative Refinement records Initial Review, Human Evaluation, three passes, and this Final Validation. | A completed validation activity may still return `Fail`; it does not make the overall workflow requirement complete. |
| D. Prompt traceability | Pass with limitation | All prompt links referenced by previously committed workflow evidence exist and are tracked; canonical relative links resolve; historical `docs/week-1/` records remain explicitly historical. | This Final Validation prompt exists but is untracked and must be included in the eventual reviewed commit. The untracked report prompt is not workflow-result evidence. |
| E. Reference audit | Pass with limitation | `R-001`–`R-023` are unique and sequential; all 23 are cited; all 177 research citation mentions resolve; titles, authors, source types, and claim use are coherent; empirical and practitioner claims remain qualified. | `R-001` remains preview-level and `R-007` remains abstract-level; neither is presented as full-text verified. |
| F. `IR-F15` verification-level review | Pass with limitation | The table below distinguishes the one explicitly recorded preview source from conservative publisher/repository candidates and records the current verification action and level. | Section 2.9 did not preserve every affected ID, so the exact historical limited-access set beyond `R-001` cannot be reconstructed with certainty. |
| G. Validation-log audit | Pass | `V-001`–`V-060` are unique, sequential, and complete; status counts are 52 `Rejected`, 4 `Corrected`, and 4 `Contextual`; all required fields exist; five related-entry links resolve and are reciprocal; no exact duplicate correction exists. | No new validation entry was created because this is an audit rather than a new technical claim evaluation. |
| H. Iterative Refinement finding audit | Pass | Every `IR-F01`–`IR-F15` has the final disposition shown below; authorized fixes, preserved content, no-change decisions, separate housekeeping, and `IR-F15` evaluation are traceable. | The new Final Validation defect is reported separately and not silently converted into an existing finding. |
| I. Markdown and repository integrity | Pass | All 24 Markdown files are valid UTF-8; fences are balanced; tables have consistent columns; internal Markdown links resolve; reference and validation IDs resolve; current navigation uses `docs/week1/`. | Section 5 intentionally retains its placeholder; historical path mismatches remain only as disclosed evidence or prompt history. |
| J. Scope and execution claims | Pass | README, research, validation records, and workflow evidence consistently label snippets and strategy as conceptual or planned and deny implementation, test execution, Red/Green observations, measurements, portability proof, and defect-free guarantees. | Documentation validation supplies no implementation evidence. |
| K. Git and change audit | Pass with limitation | Branch `docs/week1-tdd-research` was at `20dd27b` before this validation; the last 15 commits show the staged workflow history; no file is staged and no prohibited artifact exists. | The working tree is not clean because this evidence file is modified and the Final Validation and reporting prompts are untracked. |

#### Source Verification Table

Section 2.9 explicitly identifies only `R-001` as preview-based. It does not
preserve the other affected IDs. To avoid inventing history, Final Validation
treats the empirical publisher and repository endpoints `R-007`–`R-009` as a
conservative candidate set and distinguishes that inference from recorded fact.

| Reference | Source type | Previous verification level | Final action | Final verification level | Claims affected | Limitation |
| --- | --- | --- | --- | --- | --- | --- |
| `R-001` | Foundational book | Explicitly recorded bibliographic record and preview | Rechecked Google Books title, author, publisher metadata, description, and available preview; compared the attached TDD claims with the accessible canonical/practitioner record. | Bibliographic metadata and preview | TDD definition, small test-driven steps, minimum implementation, refactoring, and incremental design feedback | Full book text was not available through the verification interface; the research does not treat promotional claims as empirical proof. |
| `R-007` | Peer-reviewed meta-analysis | Not individually recoverable from Section 2.9; conservatively treated as a publisher-endpoint candidate | Rechecked DOI and journal metadata plus the accessible abstract describing 27 studies, small positive external-quality effect, little-to-no overall productivity effect, subgroup differences, and moderators. | Bibliographic metadata and abstract | Aggregate external-quality, productivity, and context-sensitivity claims | IEEE full text was not accessible through the interface; the research wording remains within the abstract and keeps subgroup and heterogeneity limitations. |
| `R-008` | Peer-reviewed industrial case study | Not individually recoverable from Section 2.9; conservatively treated as a repository-endpoint candidate | Read the complete 14-page primary paper and checked title, authors, four-team scope, 40%–90% defect-density result, 15%–35% subjective initial-time increase, and case-study threats. | Full text | Four-team industrial quality and initial-development-time observations | No access limitation remains; observational context and non-generalizability still limit the claim. |
| `R-009` | Peer-reviewed systematic review | Not individually recoverable from Section 2.9; conservatively treated as a repository-endpoint candidate | Read the institutional full-text paper and checked title, authors, review method, and seven reported adoption-limiting factors. | Full text | TDD adoption barriers involving time, knowledge, design, tools/domain, test skill, adherence, and legacy code | No access limitation remains; evidence reflects studies available through 2011 and identifies potential factors rather than universal causes. |

The wider `R-001`–`R-023` audit also checked the current original or official
records. Notably, the primary full paper for `R-020` confirms 1,689 generated
programs across 89 security scenarios, and the author-hosted full paper for
`R-022` confirms 13,866 recent oracles from 135 Java projects. Their research
uses remain explicitly limited to the studied models, languages, prompts,
projects, scenarios, and oracle measures.

#### IR Finding Final Disposition

| Finding | Human decision | Final state | Evidence |
| --- | --- | --- | --- |
| `IR-F01` | Accepted | Applied in Pass 1 | `research.md` Section 1.1 records the contextual balanced layered strategy while keeping execution future work. |
| `IR-F02` | Accepted | Applied in Pass 1 | `requirements-mapping.md` changed Iterative Refinement from `Not started` to `In progress`. |
| `IR-F03` | Accepted | Applied in Pass 1 | `README.md` closes the deliverables `text` fence. |
| `IR-F04` | Accepted | Traceability satisfied | `iterative-refinement-initial-review.md` exists and is tracked with the committed Initial Review evidence. |
| `IR-F05` | Accepted with modification | Applied in Pass 1 | Sections 2.5 and 2.10 use explicit earlier-stage temporal qualifiers. |
| `IR-F06` | Deferred to a later refinement pass | Applied in Pass 2 | `V-017`, `V-020`, `V-037` and `V-021`, `V-036` contain resolved reciprocal cross-links without changing audit history. |
| `IR-F07` | No change for now | No change retained | Chapter 9 citation density remains available for traceability. |
| `IR-F08` | No change for now | No change retained | Sections 8.7, 9.4, and Chapter 10 retain repeated scope reinforcement. |
| `IR-F09` | Accepted | Applied in Pass 1 | Mentor-review mapping names a future artifact, reports no supporting evidence, and remains `Not started`. |
| `IR-F10` | Deferred as separate supplementary-note housekeeping | Applied in Pass 3 | `note/README.md` has a balanced fence and canonical `docs/week1/` navigation. |
| `IR-F11` | Preserve current content | Preserved | Test levels remain classified by the behavior and real boundary exercised. |
| `IR-F12` | Preserve current content | Preserved | Confirmed behavior remains title trimming, blank-title rejection, and initial `open`; other policies remain unresolved or illustrative. |
| `IR-F13` | Preserve current content | Preserved | TDD, empirical, and testing claims retain contextual limitations and avoid universal guarantees. |
| `IR-F14` | Preserve current content | Preserved | Human decisions, workflow provenance, historical path disclosure, and scope boundaries remain intact. |
| `IR-F15` | Deferred to Final Validation | Evaluated — Pass with limitation | The verification table records current levels and discloses that the exact earlier limited-access set cannot be fully reconstructed. |

#### Remaining Limitations

- `R-001` remains verified only through bibliographic metadata and preview.
- `R-007` remains verified only through bibliographic metadata and abstract.
- Section 2.9 did not preserve every limited-access reference ID; the
  conservative candidate review cannot retroactively prove the exact earlier
  set.
- The `Important` Sections 10.5–10.6 workflow-state contradiction remains in a
  protected file and blocks completion.
- The Final Validation prompt is currently untracked and needs inclusion in the
  eventual reviewed commit for durable traceability.

#### Work Still Not Completed

- Section 5, Lessons Learned;
- mentor review and any mentor-review artifact;
- Ticket Manager production implementation;
- executable automated tests and installed test infrastructure;
- observed Red/Green, compilation, coverage, duration, flakiness, portability,
  maintenance, and production-reliability evidence.

#### Human Acceptance

This Final Validation reports evidence and a blocking result; it does not
approve its own repository changes. A human remains responsible for accepting
the result, authorizing any correction to the protected research conclusion,
reviewing the eventual prompt/evidence commit, and deciding when another Final
Validation justifies requirement completion.

---

## 5. Lessons Learned

_Not started._
