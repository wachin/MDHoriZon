import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseMermaid } from '../src/core/mermaid/loader'

/**
 * Every diagram in the Golden Test Document, checked against the real Mermaid parser.
 *
 * This is the diagram half of the rendering contract. `mermaid.parse` runs the actual grammar with
 * the actual production configuration but needs no layout engine, which is what makes it usable here:
 * `mermaid.render` cannot run in jsdom (it asks for measurements jsdom does not implement), so the
 * *visual* result is Phase 20's validation. What is asserted here is that the document's diagrams are
 * valid — and that the two the document deliberately breaks really are broken, so the "invalid
 * diagrams must not crash the article" requirement has something to bite on.
 */
const repoRoot = resolve(import.meta.dirname, '..')
const fixture = readFileSync(
  join(repoRoot, 'tests/fixtures/Golden-Test-Document.md'),
  'utf8',
)

/** Fenced `mermaid` blocks, in document order. */
const blocks = [...fixture.matchAll(/^```mermaid\r?\n([\s\S]*?)^```$/gm)].map(
  (match) => match[1],
)

/** The two the fixture marks as broken, matched by their content rather than by position. */
const DELIBERATELY_BROKEN = /Unclosed label|not a valid mermaid diagram/

describe('the golden document’s diagrams', () => {
  it('finds every mermaid block in the document', () => {
    // A guard on the extraction itself: if the fence syntax changes, this fails loudly instead of
    // reporting success over an empty list.
    expect(blocks.length).toBe(7)
    expect(
      blocks.filter((block) => DELIBERATELY_BROKEN.test(block)),
    ).toHaveLength(2)
  })

  it('parses every diagram that is meant to be valid', async () => {
    const valid = blocks.filter((block) => !DELIBERATELY_BROKEN.test(block))

    expect(valid).toHaveLength(5)
    for (const block of valid) {
      await expect(
        parseMermaid(block),
        `diagram failed to parse:\n${block}`,
      ).resolves.toBeUndefined()
    }
  })

  it('covers the diagram types the roadmap asks about', async () => {
    const first = (block = blocks.join('\n')) => block

    // Flowchart, sequence, class, state and an additional type, exactly as the roadmap lists them.
    for (const keyword of [
      'flowchart',
      'sequenceDiagram',
      'classDiagram',
      'stateDiagram-v2',
      'pie',
    ]) {
      expect(first(), keyword).toContain(keyword)
    }
  })

  it('rejects the two diagrams that are deliberately broken', async () => {
    for (const block of blocks.filter((candidate) =>
      DELIBERATELY_BROKEN.test(candidate),
    )) {
      await expect(
        parseMermaid(block),
        `expected a parse error for:\n${block}`,
      ).rejects.toThrow()
    }
  })

  it('gives a readable error for the broken ones, which is what the reader sees', async () => {
    const broken = blocks.find((block) => block.includes('Unclosed label'))

    expect(broken).toBeDefined()
    await expect(parseMermaid(broken ?? '')).rejects.toThrow(/parse error/i)
  })
})
