// @vitest-environment node
//
// Theme bugs of this family are invisible until someone opens the app in the other colour scheme:
// a literal colour outside the theme blocks looks right in light and disappears in dark. That is
// exactly how the table cell lines were lost — the rule predated the theme variables — so these
// checks replace the phone call that used to be the only way to find out.
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const repoRoot = resolve(import.meta.dirname, '../..')

const STYLESHEETS = ['src/styles/markdown.css', 'src/index.css']

const read = (relativePath: string): string =>
  readFileSync(join(repoRoot, relativePath), 'utf8')

/** The `:root` block that applies when no media query overrides it: the light theme. */
function lightBlock(css: string): string {
  const match = /^:root\s*\{([\s\S]*?)\n\}/m.exec(css)

  if (match === null) throw new Error('no light `:root` block found')

  return match[1]
}

/** The `:root` block inside the dark-mode media query. */
function darkBlock(css: string): string {
  const match =
    /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([\s\S]*?)\n\s*\}/m.exec(
      css,
    )

  if (match === null) throw new Error('no dark `:root` block found')

  return match[1]
}

const declared = (block: string): string[] =>
  [...block.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]).sort()

/** Everything except the two variable blocks: the rules that consume the variables. */
function rulesOnly(css: string): string {
  return css
    .replace(/^:root\s*\{[\s\S]*?\n\}/m, '')
    .replace(
      /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{[\s\S]*?\n\s*\}/m,
      '',
    )
}

const used = (css: string): string[] =>
  [...rulesOnly(css).matchAll(/var\((--[\w-]+)/g)].map((match) => match[1])

/**
 * Declarations that can carry a colour. Matching these is what catches a literal by accident:
 * `border-radius` and `border-collapse` cannot carry one, so they are not in the list.
 *
 * The declaration may follow a newline, a `{` or a `;`, so a rule written on one line is checked too
 * — an earlier version anchored to the start of a line and silently missed those. `--md-border: …` is
 * not matched, because the character before `border` is a hyphen.
 */
const COLOUR_DECLARATION =
  /(?:^|[\s{;])(border|border-(?:top|right|bottom|left|color|image|inline|inline-start|inline-end|block|block-start|block-end)|background|background-color|background-image)\s*:\s*([^;]+);/gm

const COLOUR_LITERAL = /(?:rgb|rgba|hsl|hsla)\(|#[0-9a-fA-F]{3,8}\b/

describe.each(STYLESHEETS)('%s', (stylesheet) => {
  const css = read(stylesheet)

  it('defines the same variables for both colour schemes', () => {
    const light = declared(lightBlock(css))
    const dark = declared(darkBlock(css))

    // A variable defined only for light leaves its rule broken in dark — the bug this file guards.
    expect(light.length).toBeGreaterThan(0)
    expect(dark).toEqual(light)
  })

  it('defines every variable it uses, in both schemes', () => {
    const light = declared(lightBlock(css))
    const missing = [...new Set(used(css))].filter(
      (name) => !light.includes(name),
    )

    expect(missing, 'used but never declared in the light block').toEqual([])
  })

  it('uses no literal colour outside the theme blocks', () => {
    const offenders: string[] = []

    for (const match of rulesOnly(css).matchAll(COLOUR_DECLARATION)) {
      const [, property, value] = match

      if (COLOUR_LITERAL.test(value)) {
        offenders.push(`${property}: ${value.trim()}`)
      }
    }

    // A literal here is a colour that cannot follow the reader's colour scheme.
    expect(offenders).toEqual([])
  })
})

describe('the table cell borders', () => {
  const css = read('src/styles/markdown.css')

  it('are drawn with the theme variable, at a hairline width in both schemes', () => {
    // The reported bug: black at 15 % is invisible on a dark surface. The width was never the
    // problem, so it stays 1px — only the colour follows the scheme.
    const rule = /\.markdown-body :is\(th, td\)\s*\{([\s\S]*?)\n\}/.exec(css)

    expect(rule?.[1]).toContain('border: 1px solid var(--md-border)')
  })

  it('gives the dark scheme a light border rather than a dark one', () => {
    const dark = darkBlock(css)
    const border = /--md-border:\s*([^;]+);/.exec(dark)

    expect(border?.[1].trim()).toMatch(/^rgb\(255 255 255/)
  })
})
