// @vitest-environment node
//
// Guards the invariants that the golden fixture and its assets depend on. These are the
// rules written down in AGENTS.md, expressed as tests so that a well-meaning "fix" cannot
// quietly delete a test case — most importantly the missing-image negative test.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const repoRoot = resolve(import.meta.dirname, '..')

/** Documents whose relative paths are part of the rendering contract. */
const documents = [
  'tests/fixtures/Golden-Test-Document.md',
  'tests/articles/example.md',
]

/** Destinations that must stay broken: the fixture's deliberate negative cases. */
const intentionallyMissing = new Set(['../assets/does-not-exist.png'])

const read = (relativePath: string) =>
  readFileSync(join(repoRoot, relativePath), 'utf8')

/** Destinations that are not filesystem paths: anchors, absolute URLs and unsafe payloads. */
const nonFilePrefixes = [
  '#',
  'http://',
  'https://',
  'mailto:',
  'data:',
  'javascript:',
]

/**
 * Every link, image and reference-definition destination in a Markdown document that is
 * *not* an anchor, an absolute URL or a `data:`/`javascript:` payload. Fenced code is
 * skipped, because examples inside it are prose, not links.
 */
function relativeDestinations(markdown: string): string[] {
  const found = new Set<string>()
  let inFence = false

  for (const line of markdown.split('\n')) {
    if (/^\s*(`{3,}|~{3,})/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    for (const match of line.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      found.add(match[1])
    }
    for (const match of line.matchAll(/^\[[^\]]+\]:\s+(\S+)/g)) {
      found.add(match[1])
    }
  }

  return [...found].filter(
    (destination) =>
      !nonFilePrefixes.some((prefix) => destination.startsWith(prefix)),
  )
}

/** True when every code fence in the document is closed. */
function hasBalancedFences(markdown: string): boolean {
  let open: string | null = null

  for (const line of markdown.split('\n')) {
    const match = /^\s*(`{3,}|~{3,})/.exec(line)
    if (!match) continue

    const marker = match[1]
    if (open === null) {
      open = marker
    } else if (marker[0] === open[0] && marker.length >= open.length) {
      open = null
    }
  }

  return open === null
}

describe('repository invariants', () => {
  it('keeps .nojekyll in public/, which the Pages deploy depends on', () => {
    expect(existsSync(join(repoRoot, 'public/.nojekyll'))).toBe(true)
  })

  it('declares the Node range and pins it with .nvmrc', () => {
    const { engines } = JSON.parse(read('package.json')) as {
      engines?: { node?: string }
    }
    expect(engines?.node).toBe('^20.19.0 || ^22.13.0 || >=24')
    expect(read('.nvmrc').trim()).toMatch(/^\d+$/)
  })

  it('keeps the editor decision withdrawn and recorded', () => {
    // The roadmap once ended with an editor ambition. ADR 0004 withdrew it, and this guard keeps
    // the withdrawal deliberate: reintroducing editor phases must fail here first.
    const roadmap = read('ROADMAP.md')
    expect(roadmap).toContain('# Out of Scope — the Markdown Editor')
    expect(roadmap).toContain('0004-editor-out-of-scope.md')
    expect(roadmap).not.toMatch(/^## Phase 2[12] /m)
    expect(
      existsSync(
        join(repoRoot, 'docs/architecture/0004-editor-out-of-scope.md'),
      ),
    ).toBe(true)
  })
})

describe('golden fixture', () => {
  const fixture = read('tests/fixtures/Golden-Test-Document.md')

  it('is still the broad fixture, not a stub', () => {
    expect(fixture.length).toBeGreaterThan(10_000)
    expect(fixture).toContain(
      'This file is a rendering specification and regression fixture',
    )
  })

  it('keeps its numbered sections in order', () => {
    const sections = [...fixture.matchAll(/^# (\d+)\. /gm)].map((match) =>
      Number(match[1]),
    )
    expect(sections).toEqual(
      Array.from({ length: sections.length }, (_, index) => index + 1),
    )
    expect(sections.length).toBeGreaterThanOrEqual(19)
  })

  it('keeps the anchor target used by its own relative anchor link', () => {
    expect(fixture).toContain('#12-mermaid')
    expect(fixture).toMatch(/^# 12\. Mermaid$/m)
  })

  it('has balanced code fences', () => {
    expect(hasBalancedFences(fixture)).toBe(true)
  })

  it('still relies on a two-space hard line break, which must not be trimmed', () => {
    const linesWithHardBreak = fixture
      .split('\n')
      .filter((line) => line.endsWith('  '))
    expect(linesWithHardBreak.length).toBeGreaterThan(0)
  })

  it('keeps the missing-image negative test, and keeps it missing', () => {
    expect(fixture).toContain(
      '![This image intentionally does not exist](../assets/does-not-exist.png)',
    )
    expect(existsSync(join(repoRoot, 'tests/assets/does-not-exist.png'))).toBe(
      false,
    )
  })

  it('keeps the CJK emphasis case that pins a CommonMark limitation', () => {
    // Pinned on purpose: the expected output changes if a parser extension is adopted, and that
    // change must be deliberate rather than accidental. See docs/references.md.
    expect(fixture).toContain('CJK emphasis and the CommonMark flanking rules')
    expect(fixture).toContain('**「重要」**中文')
    expect(fixture).toContain('中文**强调**。')
  })
})

describe.each(documents)('relative paths in %s', (document) => {
  const markdown = read(document)
  const base = dirname(join(repoRoot, document))
  const destinations = relativeDestinations(markdown)

  it('references at least one relative destination', () => {
    expect(destinations.length).toBeGreaterThan(0)
  })

  it.each(destinations)('resolves %s', (destination) => {
    if (intentionallyMissing.has(destination)) {
      expect(existsSync(normalize(join(base, destination)))).toBe(false)
      return
    }
    expect(existsSync(normalize(join(base, destination)))).toBe(true)
  })
})
