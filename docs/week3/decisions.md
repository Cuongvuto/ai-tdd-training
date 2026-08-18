# Week 3 Project Decisions

This document records the human-approved mock-phase contract and separates
mentor requirements from project choices. The authoritative mentor sources are
`overview.md`, `architecture.md`, and `tasks.md`.

Each decision has exactly one source classification:

- **MENTOR-SPECIFIED** — explicitly stated in the mentor documents.
- **PROJECT TECHNICAL DECISION** — chosen by the project and approved by a
  human for the mock-first phase.
- **DEFERRED FOR HTTP** — intentionally unresolved until the real API contract
  is available.

Project technical decisions are not claims about the production HTTP wire
contract.

## W3-D01 — Document model

**Source:** MENTOR-SPECIFIED  
**Status:** Approved

The Knowledge Base document has exactly these fields for the current scope:

```typescript
interface Document {
  id: string;
  title: string;
  content: string;
  nodePath: string;
  tags: string[];
}
```

No timestamps, author, score, or general metadata fields are included.

## W3-D02 — SearchResult shape

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved provisionally for the mock phase

`SearchResult` contains a full `Document` and one `matchType`. This is an
application contract for mock-first learning and is not the final HTTP response
schema.

## W3-D03 — Search match type

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved provisionally for the mock phase

The approved match types are `title`, `content`, and `tag`. When more than one
field matches, the precedence is title, then content, then tag.

## W3-D04 — KBQuery filters

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved for staged implementation

The staged search contract uses `query`. `topK` is introduced with its
dedicated behavior. Filter shape and behavior are not invented, and the
production HTTP representation remains unresolved.

## W3-D05 — Mock seed data

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved for staged implementation

The intended deterministic mock seed contains three documents:

1. Customer Response Template at `/templates/email`.
2. Password Reset Template at `/templates/email`.
3. DevOps Team Contacts at `/team/devops`.

This fixture stays small while supporting meaningful search, list, retrieve,
and add examples across more than one node.

## W3-D06 — Search matching

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved for staged implementation

Mock search checks title, content, and individual tags using case-insensitive
substring matching. It returns each matching document once and does not score
or rank results. Match precedence follows W3-D03: title, then content, then
tag.

## W3-D07 — Search ordering, topK, and validation

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved for staged implementation

Results preserve seed/insertion order. `topK` must be a positive integer. Blank
queries and invalid `topK` values are rejected.

## W3-D08 — List behavior

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved but not implemented

Mock list will return documents whose `nodePath` exactly equals the requested
path, preserve insertion order, apply a positive limit, return an empty list
for a valid node with no documents, and reject invalid input. It will not
perform recursive hierarchy traversal.

## W3-D09 — Retrieve behavior

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved but not implemented

Mock retrieve will use exact, case-sensitive document IDs, return the full
document, and use a KB-specific not-found error for a missing document.

## W3-D10 — Add command mapping

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved but not implemented

The add command will read UTF-8 file content, derive the title from the file
name stem, parse comma-separated tags, and pass title, content, node path, and
tags to `KBClient.add`. File paths do not belong in the client contract.

## W3-D11 — Mock add behavior

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved but not implemented

Mock add will generate deterministic per-instance sequential IDs, append and
return the document, and make it visible to search, list, and retrieve within
that client instance. Duplicate titles and paths are allowed because no
uniqueness rule is specified.

## W3-D12 — Mock state lifetime

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved but not implemented

Mock state belongs to one `MockKBClient` instance. It is not shared globally
and is not persisted across processes. JSON persistence will not be added to
the mock.

## W3-D13 — KBClient signatures

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved for staged implementation

Client methods are asynchronous for future HTTP parity and use typed domain
inputs and outputs. Operations are added when their behavior enters TDD. The
interface contains no HTTP-library, Commander, console, filesystem, or
environment details.

## W3-D14 — CLI organization

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved

KB command registration will be grouped under `src/commands/kb/`, with one
parent registrar and one file per operation. No `src/week3/` directory will be
created.

## W3-D15 — CLI nesting

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved for the mock-first CLI contract

The project will preserve the existing `tickets` executable and nest KB
commands beneath it. The mock-first list invocation is `tickets kb list`.
The mentor examples use `kb ...`; therefore this is a project integration
choice rather than a mentor-authored requirement.

For the Cycle 8 list command, `--node <path>` and `--limit <number>` are both
required and have no defaults. Commander handles presence and CLI parsing;
business validation remains in `KBClient` / `MockKBClient`.

The human-approved list stdout contract prints each document title on its own
line in the order returned by `KBClient.list()`, with no header or additional
fields. An empty result produces no stdout and completes successfully. This
format is a project integration choice based on the existing Week 2 list
convention, not a mentor-specified response format.

## W3-D16 — Service layer

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved

No `KBService` is introduced merely for symmetry with `TicketService`. Direct
`KB command -> KBClient` delegation is sufficient until real application
orchestration requires another layer.

## W3-D17 — Mock-phase error model

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved but not implemented

The mock phase will reuse the existing input validation classification and add
only a KB document-not-found error and a KB add-file error when those behaviors
are implemented. A broad KB error hierarchy is not introduced.

## W3-D18 — Test framework

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved for the mock-first phase

The project continues with Vitest 4.1.10 to preserve the validated Week 2 test
stack. The mention of Jest in `architecture.md` is not treated as a migration
requirement.

## W3-D19 — Mock E2E strategy

**Source:** PROJECT TECHNICAL DECISION  
**Status:** Approved but not implemented

Subprocess tests will remain independent. Add visibility across operations is
tested in process with one client instance rather than by adding mock
persistence.

## W3-D20 — HTTP and environment contract

**Source:** DEFERRED FOR HTTP  
**Status:** Deferred

The base URL, authentication, client-selection environment variables, full
response schemas, HTTP error mapping, timeout/retry behavior, response
validation, and live-test cleanup policy remain unresolved. These decisions
will be reviewed when the real API contract is available. No mock-phase
decision is presented as an authoritative HTTP wire requirement.
