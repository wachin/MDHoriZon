# 0002. Third-party reference material lives outside the repository

- **Status:** accepted
- **Date:** 2026-09-14
- **Context:** Phase 0/1 boundary — no roadmap phase requires this, but the question recurred

## Context

To decide how MDHoriZon should render Markdown, DeepSeek Harness (MIT) was added to this repository as a **git
submodule** at `third-party/deepseek-harness`, with the intent of studying a working implementation instead of
inventing one. The intent is right: the roadmap's own _Reference and Study Projects_ section asks for exactly that.
The mechanism was the problem.

Adding it as a submodule was committed and pushed. The consequences were measured before reverting:

- **122 MB and 11,229 files**, pinned to an **alpha** revision (`0d1f50007f`,
  `dsh-v0.1.6-alpha.1-5-g0d1f50007f`) rather than a stable one.
- `actions/checkout` does **not** fetch submodules by default, so in CI that directory is empty while locally it is
  full. The verification pipeline therefore stopped testing the same tree contributors have: `prettier --ignore-unknown .`
  and `eslint .` walk the whole repository, and would have scanned 11,229 third-party files locally while skipping
  them entirely in CI.
- Every contributor would need `git clone --recurse-submodules` or `git submodule update --init`; without it they get
  an empty directory and confusing failures. For a project whose stated priority is that others can continue it
  easily, that is a step backwards.
- A submodule is a **pointer to a commit**, not a copy: it does not make the reference searchable alongside our code
  without cloning, and it does not make studying it easier than the clone that already existed outside the
  repository.

The information the submodule was meant to provide is available anyway: the upstream repository is public and MIT,
the same checkout already existed at `~/Dev3/deepseek-harness`, and the durable output of studying it is **notes**,
not source.

## Decision

**Third-party projects are not vendored into this repository — not as a submodule, not as a copy.**

Reference material is recorded as:

1. A **link plus the pinned revision** in [`docs/references.md`](../references.md), together with what the project is
   useful _for_, what has been verified, and what is still unread.
2. A **local clone outside the tracked tree** when someone wants to read it:
   `~/Dev3/…` or `.cache/reference/<name>` (`.cache/` is already gitignored).
3. A **decision record** in `docs/architecture/` when a study turns into an actual choice.

If code from a permissive project is ever reused, it enters through the normal dependency policy — an npm
dependency if one exists, or a small, clearly attributed vendored file with its licence notice preserved — never as a
whole foreign repository wired into our tree.

## Alternatives considered

- **Keep the submodule.** Rejected: it costs every contributor a 122 MB recursive clone and breaks the equivalence
  between CI and local verification, in exchange for nothing that a clone outside the repository does not already
  give us.
- **Keep it but isolate it** (exclude `third-party/` from Prettier, ESLint and `tsconfig`, and document the recursive
  clone). Technically workable, but it keeps the clone cost on everyone and normalises having a foreign repository
  inside the tree, which invites copying code across the boundary without the licence notice.
- **Vendor a copy of the markdown module only.** Rejected for now: we do not need their code — we need their
  trade-offs, and those are recorded in `docs/references.md`. Vendoring can still be proposed later, for a specific
  file, with attribution and a licence notice.

## Consequences

- Contributors clone and build exactly as documented in `README.md`; nothing extra, and CI and local runs check the
  same tree again.
- The knowledge is preserved where the project looks for it: `docs/references.md` (what to read) and this directory
  (why we decided). A future contributor does not need the upstream checkout to benefit from the survey.
- Studying requires an explicit clone. That is the intended friction: reading a reference is a deliberate act, not
  a side effect of `npm ci`.
- The submodule remains in git history. It is only a pointer to a public repository, so it carries no licensing or
  size penalty for future clones, and no rewrite of published history is needed to remove it.
