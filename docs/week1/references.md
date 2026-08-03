# References

## Reference Usage

Each source is assigned a unique reference ID.

Research claims in `research.md` should cite these IDs so that important
technical statements can be traced back to their sources.

---

## Reference List

### R-001

- **Title:** _Test-Driven Development: By Example_
- **Author or organization:** Kent Beck
- **Source type:** Foundational book; bibliographic record and preview.
- **URL:** https://books.google.com/books?id=O6FUu8c4HooC
- **Accessed:** 2026-08-02
- **Used for:** TDD definition and principles.
- **Reliability notes:** Canonical first-hand description from the author who
  formalized and named the discipline. Publisher promotional claims are not
  treated as empirical evidence.

### R-002

- **Title:** _Test Driven Development_
- **Author or organization:** Martin Fowler
- **Source type:** Recognized software engineering author; practitioner article.
- **URL:** https://martinfowler.com/bliki/TestDrivenDevelopment.html
- **Accessed:** 2026-08-02
- **Used for:** Red-Green-Refactor.
- **Reliability notes:** Clear, attributable synthesis that links to Beck's
  canonical formulation. Design benefits are treated as expert interpretation,
  not universal empirical results.

### R-003

- **Title:** _Certified Tester Foundation Level Syllabus v4.0.1_
- **Author or organization:** International Software Testing Qualifications
  Board (ISTQB)
- **Source type:** Official certification-body syllabus and testing terminology
  reference.
- **URL:** https://www.istqb.org/wp-content/uploads/2024/11/ISTQB_CTFL_Syllabus_v4.0.1.pdf
- **Accessed:** 2026-08-03
- **Used for:** Purposes and boundaries of component, component-integration,
  system, and system-integration testing.
- **Reliability notes:** Official, versioned ISTQB publication suitable for
  established terminology. Its taxonomy is used as a reference model, not as
  proof that every team uses identical test-level names.

### R-004

- **Title:** _Child Process — Node.js Documentation_
- **Author or organization:** OpenJS Foundation and Node.js contributors
- **Source type:** Official platform API documentation.
- **URL:** https://nodejs.org/api/child_process.html
- **Accessed:** 2026-08-03
- **Used for:** Process-level CLI testing through a spawned executable,
  including arguments, working directory, environment, standard streams, and
  exit status.
- **Reliability notes:** Authoritative for Node.js process behavior and
  cross-platform caveats. It documents mechanisms rather than prescribing a
  complete testing strategy.

### R-005

- **Title:** _Test Double_
- **Author or organization:** Martin Fowler; terminology attributed to Gerard
  Meszaros
- **Source type:** Recognized software engineering author; practitioner
  terminology article.
- **URL:** https://martinfowler.com/bliki/TestDouble.html
- **Accessed:** 2026-08-03
- **Used for:** The purpose of replacing dependencies and the distinction among
  test-double roles such as stubs, spies, mocks, and fakes.
- **Reliability notes:** Clear, attributable explanation that links the
  vocabulary to Meszaros's pattern catalog. It defines test-double roles but
  does not require a double for every collaborator.

### R-006

- **Title:** _Test Pyramid_
- **Author or organization:** Martin Fowler
- **Source type:** Recognized software engineering author; practitioner
  heuristic.
- **URL:** https://martinfowler.com/bliki/TestPyramid.html
- **Accessed:** 2026-08-03
- **Used for:** Test-portfolio distribution, broad-stack test trade-offs, and
  limitations of treating the pyramid as a rigid rule.
- **Reliability notes:** Clear, attributable explanation of an established
  practitioner heuristic. Its cost and distribution guidance is treated as
  contextual advice, not empirical proof or a mandatory ratio.

### R-007

- **Title:** _The Effects of Test-Driven Development on External Quality and
  Productivity: A Meta-Analysis_
- **Author or organization:** Yahya Rafique and Vojislav B. Mišić
- **Source type:** Peer-reviewed meta-analysis, IEEE Transactions on Software
  Engineering, 39(6), 835-856.
- **URL:** https://doi.org/10.1109/TSE.2012.28
- **Accessed:** 2026-08-02
- **Used for:** Aggregate evidence about external quality, productivity, and
  differences between study contexts.
- **Reliability notes:** Synthesizes 27 studies and reports subgroup effects;
  stronger than relying on a single experience report, but still constrained by
  the quality and heterogeneity of the included studies.

### R-008

- **Title:** _Realizing Quality Improvement Through Test Driven Development:
  Results and Experiences of Four Industrial Teams_
- **Author or organization:** Nachiappan Nagappan, E. Michael Maximilien,
  Thirumalesh Bhat, and Laurie Williams
- **Source type:** Peer-reviewed industrial case study, Empirical Software
  Engineering, 13, 289-302.
- **URL:** https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf
- **Accessed:** 2026-08-02
- **Used for:** Observed defect-density changes and initial development-time
  trade-offs in three Microsoft teams and one IBM team.
- **Reliability notes:** Primary empirical research with transparent context and
  quantitative results. It is observational and limited to four teams, so its
  figures are not generalized as guaranteed effects.

### R-009

- **Title:** _Factors Limiting Industrial Adoption of Test Driven Development:
  A Systematic Review_
- **Author or organization:** Adnan Causevic, Daniel Sundmark, and Sasikumar
  Punnekkat
- **Source type:** Peer-reviewed systematic literature review, IEEE ICST 2011.
- **URL:** https://www.diva-portal.org/smash/get/diva2:415324/FULLTEXT01.pdf
- **Accessed:** 2026-08-02
- **Used for:** Adoption barriers, skill and legacy-code constraints, and
  contextual limits of strict TDD.
- **Reliability notes:** Systematic synthesis focused on industrial adoption.
  Its conclusions reflect the evidence available through 2011 and identify
  potential limiting factors rather than universal causes.

### R-010

- **Title:** _What Is Test Driven Development (TDD)?_
- **Author or organization:** Agile Alliance
- **Source type:** Professional association glossary.
- **URL:** https://agilealliance.org/glossary/tdd/
- **Accessed:** 2026-08-02
- **Used for:** TDD activities, minimum implementation, expected benefits,
  common pitfalls, and the relationship to acceptance-level test-first work.
- **Reliability notes:** Reputable practitioner organization with an
  attributable, traceable summary. Practitioner-reported benefits are kept
  separate from empirical findings.

### R-011

- **Title:** _Definition of Refactoring_
- **Author or organization:** Martin Fowler
- **Source type:** Recognized software engineering author; terminology article.
- **URL:** https://martinfowler.com/bliki/DefinitionOfRefactoring.html
- **Accessed:** 2026-08-02
- **Used for:** Behavior-preserving definition and purpose of refactoring.
- **Reliability notes:** Primary definition from the author of the established
  refactoring catalog; appropriate for terminology and practitioner intent.

### R-012

- **Title:** _Get Started with Test-Driven Development Using Test Explorer_
- **Author or organization:** Microsoft
- **Source type:** Official product documentation and TDD tutorial.
- **URL:** https://learn.microsoft.com/en-us/visualstudio/test/quick-start-test-driven-development-with-test-explorer
- **Accessed:** 2026-08-02
- **Used for:** Inspecting an initial failure, rerunning regression tests, and
  keeping refactoring separate from behavior changes.
- **Reliability notes:** Official, reproducible workflow guidance. The examples
  are specific to Visual Studio and MSTest, while the cited reasoning is
  framework-independent.

### R-013

- **Title:** _Notes on Structured Programming (EWD 249)_
- **Author or organization:** Edsger W. Dijkstra; E.W. Dijkstra Archive,
  University of Texas at Austin
- **Source type:** Foundational primary manuscript and institutional archive.
- **URL:** https://www.cs.utexas.edu/~EWD/transcriptions/EWD02xx/EWD249/EWD249.html
- **Accessed:** 2026-08-02
- **Used for:** The fundamental limitation that program testing cannot generally
  demonstrate the absence of defects.
- **Reliability notes:** Primary historical source hosted by an academic
  archive. Used for the narrow testing limitation, not as TDD-specific
  empirical evidence.

### R-014

- **Title:** _Acceptance Test Driven Development (ATDD)_
- **Author or organization:** Agile Alliance
- **Source type:** Professional association glossary.
- **URL:** https://agilealliance.org/glossary/atdd/
- **Accessed:** 2026-08-02
- **Used for:** Distinguishing developer TDD's common unit-test focus from the
  related test-first practice at an acceptance boundary.
- **Reliability notes:** Reputable practitioner organization and a direct
  description of ATDD. Used to clarify terminology, not to collapse ATDD and
  TDD into the same practice.

### R-015

- **Title:** _Unit Test_
- **Author or organization:** Martin Fowler
- **Source type:** Recognized software engineering author; practitioner
  terminology article.
- **URL:** https://martinfowler.com/bliki/UnitTest.html
- **Accessed:** 2026-08-03
- **Used for:** Unit-test scope, fast feedback, and the distinction between
  solitary and sociable unit tests.
- **Reliability notes:** Attributable synthesis from a long-standing testing
  practitioner. It deliberately documents competing schools, so it supports a
  boundary-aware definition rather than one universal unit size.

### R-016

- **Title:** _Integration Test_
- **Author or organization:** Martin Fowler
- **Source type:** Recognized software engineering author; practitioner
  terminology article.
- **URL:** https://martinfowler.com/bliki/IntegrationTest.html
- **Accessed:** 2026-08-03
- **Used for:** Narrow versus broad integration tests and ambiguity in common
  uses of the term.
- **Reliability notes:** Useful attributable analysis of industry terminology.
  It is used to expose definitional variation, while ISTQB [R-003] supplies the
  more formal test-level reference.

### R-017

- **Title:** _File System — Node.js Documentation_
- **Author or organization:** OpenJS Foundation and Node.js contributors
- **Source type:** Official platform API documentation.
- **URL:** https://nodejs.org/api/fs.html#fspromisesmkdtempprefix-options
- **Accessed:** 2026-08-03
- **Used for:** Creating unique temporary directories for isolated tests against
  a real file system.
- **Reliability notes:** Authoritative for the documented Node.js API and its
  platform-specific path behavior. It supports fixture mechanics, not a claim
  that temporary directories alone make a test deterministic.

### R-018

- **Title:** _Test API Reference_
- **Author or organization:** Vitest maintainers
- **Source type:** Official test-framework API documentation.
- **URL:** https://vitest.dev/api/test.html
- **Accessed:** 2026-08-03
- **Used for:** Conceptual TypeScript examples using Vitest-style `it`,
  `it.each`, and expectation callbacks.
- **Reliability notes:** Authoritative for current Vitest test syntax. It
  supports the illustrative API usage only; it does not imply that Vitest is
  installed or configured in this repository.

### R-019

- **Title:** _Hooks API Reference_
- **Author or organization:** Vitest maintainers
- **Source type:** Official test-framework API documentation.
- **URL:** https://vitest.dev/api/hooks.html
- **Accessed:** 2026-08-03
- **Used for:** Conceptual per-test setup and cleanup with `beforeEach` and
  `afterEach` in the temporary-file integration example.
- **Reliability notes:** Authoritative for Vitest lifecycle-hook behavior. It is
  used only to support the illustrative syntax and does not claim that the
  repository currently has a runnable Vitest environment.
