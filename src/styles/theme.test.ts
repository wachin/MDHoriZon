// @vitest-environment node
//
// Two families of bug live in a stylesheet, and both are invisible until someone opens the app:
//
// 1. **A theme that is missing something.** A variable defined only for light leaves its rule broken
//    in dark — that is how the table cell lines disappeared — and a colour written as a literal
//    cannot follow the reader at all.
// 2. **Text nobody can read.** Contrast is measurable, so it is measured here instead of being
//    asserted in a comment. The roadmap asks to verify KaTeX, Mermaid and code readability in both
//    themes; this is the part of that verification a machine can check.
//
// What a machine cannot check is whether the result looks good, and that is what the phone test is
// for.
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const repoRoot = resolve(import.meta.dirname, '../..')

const read = (relativePath: string): string =>
  readFileSync(join(repoRoot, relativePath), 'utf8')

const theme = read('src/styles/theme.css')

/** Files that consume the variables and must never name a colour of their own. */
const CONSUMERS = ['src/styles/markdown.css', 'src/index.css']

// ---------------------------------------------------------------------------------------------
// Reading the stylesheet
// ---------------------------------------------------------------------------------------------

type Palette = Map<string, string>

function declarations(body: string): Palette {
  return new Map(
    [...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].trim(),
    ]),
  )
}

function bodyOf(selector: RegExp): string {
  const match = selector.exec(theme)

  if (match === null) throw new Error(`no block matched ${String(selector)}`)

  return match[1]
}

const LIGHT: Palette = declarations(bodyOf(/^:root\s*\{([^}]*)\}/m))
const DARK_BY_SYSTEM: Palette = declarations(
  bodyOf(
    /@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme='light'\]\)\s*\{([^}]*)\}/,
  ),
)
const DARK_BY_CHOICE: Palette = declarations(
  bodyOf(/:root\[data-theme='dark'\]\s*\{([^}]*)\}/),
)

const sortedKeys = (palette: Palette): string[] => [...palette.keys()].sort()

/** Whether a value is a colour, and therefore something a theme has to restate. */
const isColour = (value: string): boolean => /^(?:#|rgb|hsl)/.test(value)

/**
 * The variables a theme must define.
 *
 * Fonts, line height and the reading width do not change between schemes, so they live in the light
 * block alone; only colours have to be restated per theme.
 */
const themeDependentKeys = (palette: Palette): string[] =>
  [...palette.entries()]
    .filter(([, value]) => isColour(value))
    .map(([name]) => name)
    .sort()

// ---------------------------------------------------------------------------------------------
// Colour maths (WCAG 2.2 relative luminance and contrast ratio)
// ---------------------------------------------------------------------------------------------

type Rgba = { r: number; g: number; b: number; a: number }

function parseColour(value: string): Rgba {
  const hex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.exec(value)

  if (hex !== null) {
    const digits =
      hex[1].length === 3
        ? hex[1]
            .split('')
            .map((character) => character + character)
            .join('')
        : hex[1]
    const [r, g, b] = [0, 2, 4].map((offset) =>
      Number.parseInt(digits.slice(offset, offset + 2), 16),
    )
    const a =
      digits.length === 8 ? Number.parseInt(digits.slice(6, 8), 16) / 255 : 1

    return { r, g, b, a }
  }

  const rgb =
    /^rgb\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:\/\s*([\d.]+)%)?\s*\)$/.exec(
      value,
    )

  if (rgb === null) throw new Error(`cannot parse colour: ${value}`)

  return {
    r: Number(rgb[1]),
    g: Number(rgb[2]),
    b: Number(rgb[3]),
    a: rgb[4] === undefined ? 1 : Number(rgb[4]) / 100,
  }
}

/** Flattens a translucent colour onto what is behind it, which is what the eye actually sees. */
function over(colour: Rgba, background: Rgba): Rgba {
  const mix = (front: number, back: number): number =>
    front * colour.a + back * (1 - colour.a)

  return {
    r: mix(colour.r, background.r),
    g: mix(colour.g, background.g),
    b: mix(colour.b, background.b),
    a: 1,
  }
}

function luminance({ r, g, b }: Rgba): number {
  const channel = (value: number): number => {
    const scaled = value / 255

    return scaled <= 0.03928
      ? scaled / 12.92
      : ((scaled + 0.055) / 1.055) ** 2.4
  }

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrast(foreground: Rgba, background: Rgba): number {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  )

  return (lighter + 0.05) / (darker + 0.05)
}

/** Resolves a palette variable against the page background, flattening any translucency. */
function colour(palette: Palette, name: string, behind?: Rgba): Rgba {
  const raw = palette.get(name)

  if (raw === undefined) throw new Error(`${name} is not defined`)

  const background =
    behind ?? parseColour(palette.get('--background') ?? '#ffffff')
  const parsed = parseColour(raw)

  return parsed.a === 1 ? parsed : over(parsed, background)
}

// ---------------------------------------------------------------------------------------------

describe('the theme variables', () => {
  it('defines every colour in every theme', () => {
    // A colour defined for one theme only is a rule that breaks in the other one. Fonts and lengths
    // are deliberately absent from the dark blocks: they do not change with the scheme.
    expect(themeDependentKeys(DARK_BY_SYSTEM)).toEqual(
      themeDependentKeys(LIGHT),
    )
    expect(themeDependentKeys(DARK_BY_CHOICE)).toEqual(
      themeDependentKeys(LIGHT),
    )
    expect(sortedKeys(DARK_BY_SYSTEM).length).toBeGreaterThan(10)
  })

  it('keeps the two dark blocks identical', () => {
    // CSS cannot share a block between the media query and the attribute selector, so the values are
    // written twice. This is what stops the copies drifting.
    expect([...DARK_BY_CHOICE.entries()].sort()).toEqual(
      [...DARK_BY_SYSTEM.entries()].sort(),
    )
  })

  it('names the variables the roadmap asks for', () => {
    for (const name of [
      '--font-body',
      '--font-mono',
      '--text-primary',
      '--text-secondary',
      '--background',
      '--surface',
      '--border-color',
      '--link-color',
      '--code-background',
      '--blockquote-background',
    ]) {
      expect(LIGHT.has(name), name).toBe(true)
    }
  })

  it('is the only stylesheet that names a colour', () => {
    // Everywhere else must go through a variable, or the colour cannot follow the theme.
    const colourDeclaration =
      /(?:^|[\s{;])(border|border-(?:top|right|bottom|left|color|image|inline|inline-start|inline-end|block|block-start|block-end)|background|background-color|background-image|color|outline)\s*:\s*([^;]+);/gm
    const literal = /(?:rgb|rgba|hsl|hsla)\(|#[0-9a-fA-F]{3,8}\b/

    for (const stylesheet of CONSUMERS) {
      const offenders: string[] = []
      const css = read(stylesheet)

      for (const match of css.matchAll(colourDeclaration)) {
        if (literal.test(match[2]))
          offenders.push(`${match[1]}: ${match[2].trim()}`)
      }

      expect(offenders, stylesheet).toEqual([])
    }
  })

  it('declares every variable its consumers use', () => {
    const used = CONSUMERS.flatMap((stylesheet) =>
      [...read(stylesheet).matchAll(/var\((--[\w-]+)/g)].map(
        (match) => match[1],
      ),
    )
    const missing = [...new Set(used)].filter((name) => !LIGHT.has(name))

    expect(missing).toEqual([])
  })
})

describe('readability in both themes', () => {
  /** The pairs that carry text, and what each is read against. */
  const TEXT_PAIRS: Array<[string, string, string | undefined]> = [
    ['body text', '--text-primary', '--background'],
    ['secondary text, blockquotes, h5/h6', '--text-secondary', '--background'],
    ['links', '--link-color', '--background'],
    ['code on a code block', '--code-foreground', '--code-background'],
    ['inline code, on the raised surface', '--text-primary', '--surface'],
    [
      'quoted text, on the quote background',
      '--text-secondary',
      '--blockquote-background',
    ],
  ]

  const TOKENS = [
    '--token-comment',
    '--token-keyword',
    '--token-string',
    '--token-number',
    '--token-title',
    '--token-type',
    '--token-attr',
  ]

  it.each([
    ['light', LIGHT],
    ['dark', DARK_BY_SYSTEM],
  ])('meets WCAG AA for every text pair in %s mode', (_name, palette) => {
    for (const [label, foreground, background] of TEXT_PAIRS) {
      const behind =
        background === undefined ? undefined : colour(palette, background)
      const ratio = contrast(
        colour(palette, foreground, behind),
        behind ?? colour(palette, '--background'),
      )

      // AA for normal-size text. The reading experience is the product, so this is a floor, not a
      // target to be traded away.
      expect(ratio, `${label}: ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(
        4.5,
      )
    }
  })

  it.each([
    ['light', LIGHT],
    ['dark', DARK_BY_SYSTEM],
  ])(
    'meets WCAG AA for every syntax-highlighting token in %s mode',
    (_name, palette) => {
      const code = colour(palette, '--code-background')

      for (const token of TOKENS) {
        const ratio = contrast(colour(palette, token, code), code)

        expect(ratio, `${token}: ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(
          4.5,
        )
      }
    },
  )

  it('keeps the two schemes actually different', () => {
    // A copy-paste that left the light values in the dark block would pass every check above.
    expect(DARK_BY_SYSTEM.get('--background')).not.toBe(
      LIGHT.get('--background'),
    )
    expect(DARK_BY_SYSTEM.get('--text-primary')).not.toBe(
      LIGHT.get('--text-primary'),
    )
  })
})

describe('the colours the phone reported', () => {
  it('draws the table cell borders with the theme variable, at a hairline width', () => {
    const rule = /\.markdown-body :is\(th, td\)\s*\{([\s\S]*?)\n\}/.exec(
      read('src/styles/markdown.css'),
    )

    expect(rule?.[1]).toContain('border: 1px solid var(--border-color)')
  })

  it('gives the dark theme a light border rather than a dark one', () => {
    expect(DARK_BY_SYSTEM.get('--border-color')).toMatch(/^rgb\(255 255 255/)
    expect(LIGHT.get('--border-color')).toMatch(/^rgb\(0 0 0/)
  })
})

describe('the maths and the diagrams', () => {
  it('lets KaTeX inherit our text colour instead of painting its own', () => {
    // Measured: KaTeX's stylesheet paints nothing. It declares no `color` or `background-color` at
    // all — the one colour keyword it uses is `border-color: currentColor` — which is exactly what
    // makes formulas readable in both themes without any per-theme work. If a future version
    // hardcodes a colour, this fails and forces the decision instead of letting dark mode break.
    const katex = read('node_modules/katex/dist/katex.min.css')
    const painted = [
      ...katex.matchAll(
        /(?:^|[;{])(color|background-color|background)\s*:\s*([^;}]+)/g,
      ),
    ].map((match) => `${match[1]}: ${match[2]}`)

    expect(painted).toEqual([])
    expect(katex).toContain('currentColor')
  })

  it('gives Mermaid a theme of its own for each of ours', () => {
    // Mermaid paints its own SVG, so it cannot inherit the variables above: the loader has to be
    // given the resolved theme, which is asserted in `MermaidDiagram.test.tsx`.
    const loader = read('src/core/mermaid/loader.ts')

    expect(loader).toMatch(/theme:\s*theme === 'dark' \? 'dark' : 'default'/)
  })
})
