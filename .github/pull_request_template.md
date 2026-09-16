<!-- Keep pull requests small and focused: one concern per PR. Split rather than mix. -->

## What

<!-- One paragraph: what this pull request changes. -->

## Why

<!-- Link the roadmap phase/milestone or the issue it addresses. -->

## How it was verified

- [ ] `npm run format:check` passes
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes
- [ ] `npm run build` passes
- [ ] Checked manually in the desktop browser
- [ ] Added or updated a fixture/test (required for any new Markdown feature)

## Platforms checked (golden rule)

> No Markdown feature is complete until it works on the desktop browser, mobile browser and Android WebView, and
> has a reproducible automated or fixture-based test.

- [ ] Desktop browser
- [ ] Mobile browser
- [ ] Android WebView
- [ ] iOS WebView (when available)
- [ ] Not applicable — this change does not affect rendering

## Scope check

- [ ] The Golden Test Document still renders correctly (if the renderer is involved)
- [ ] No unrelated files modified
- [ ] No secrets, keys, credentials or local machine configuration committed
- [ ] No dependency added without a stated reason and bundle-impact consideration
- [ ] This adds no editor code and no editor dependency (out of scope — see `docs/architecture/0004-editor-out-of-scope.md`)

## Notes for reviewers

<!-- Open questions, trade-offs, or parts you are unsure about. -->
