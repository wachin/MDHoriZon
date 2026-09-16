// @vitest-environment node
//
// The bundle budget is a promise to the reader, and the cheapest way to break it is a one-word edit:
// turning `await import('mermaid')` into a static import puts a megabyte of layout engine into the
// initial download, and nothing else in the suite would notice. This guard fails instead.
//
// It checks source, not build output, because it must work without a build and must name the file
// that broke the rule.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const repoRoot = resolve(import.meta.dirname, '..')
const sourceRoot = join(repoRoot, 'src')

/** Libraries large enough that loading them eagerly would be a bug rather than a preference. */
const LAZY_ONLY = ['mermaid', 'dompurify'] as const

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)

    if (statSync(path).isDirectory()) return sourceFiles(path)

    return /\.tsx?$/.test(entry) ? [path] : []
  })
}

const files = sourceFiles(sourceRoot)

/**
 * Removes statement-level `import type …`, which TypeScript erases: it produces no runtime import,
 * and it is how a module uses a library's types without loading the library.
 *
 * An *inline* `import { type X } from 'lib'` is still reported below. That is the safe direction for
 * a guard — and the fix it asks for is to write `import type` instead.
 */
function stripTypeImports(source: string): string {
  return source.replace(/^\s*import\s+type\s[^;]*?from\s+['"][^'"]+['"]/gm, '')
}

/** `import … from 'name'` and `import 'name'`, which both load the module eagerly. */
function staticImportPattern(name: string): RegExp {
  return new RegExp(`^\\s*import\\s+(?:[^'"]*?from\\s+)?['"]${name}['"]`, 'm')
}

function dynamicImportPattern(name: string): RegExp {
  return new RegExp(`import\\(\\s*['"]${name}['"]\\s*\\)`)
}

/** Source of every file under `src/`, with statement-level type imports removed. */
const runtimeSources = files.map((file) => ({
  path: relative(repoRoot, file),
  source: stripTypeImports(readFileSync(file, 'utf8')),
}))

describe('heavy libraries stay lazy', () => {
  it('finds the source it is meant to be guarding', () => {
    // A guard on the guard: if the layout changes, this fails instead of passing over an empty list.
    expect(runtimeSources.length).toBeGreaterThan(10)
    expect(
      runtimeSources.some((file) => file.path.endsWith('MermaidDiagram.tsx')),
    ).toBe(true)
  })

  it.each(LAZY_ONLY)('never imports %s statically anywhere in src/', (name) => {
    const offenders = runtimeSources
      .filter((file) => staticImportPattern(name).test(file.source))
      .map((file) => file.path)

    expect(
      offenders,
      `${name} must be reached with a dynamic import() so it lands in its own chunk`,
    ).toEqual([])
  })

  it.each(LAZY_ONLY)('does reach %s dynamically', (name) => {
    // The other half of the rule: forbidding the static import would also pass if the library were
    // never used at all.
    const users = runtimeSources
      .filter((file) => dynamicImportPattern(name).test(file.source))
      .map((file) => file.path)

    expect(
      users,
      `${name} is expected to be loaded on demand by exactly one module`,
    ).toHaveLength(1)
  })

  it('keeps each lazy boundary in the module that owns it', () => {
    const loader = runtimeSources.find((file) =>
      file.path.endsWith('core/mermaid/loader.ts'),
    )
    const sanitizer = runtimeSources.find((file) =>
      file.path.endsWith('core/mermaid/sanitize-svg.ts'),
    )

    // Mermaid is loaded by the loader, DOMPurify by the sanitiser: one place each, so the rule above
    // keeps holding as the renderer grows.
    expect(loader?.path).toBe('src/core/mermaid/loader.ts')
    expect(sanitizer?.path).toBe('src/core/mermaid/sanitize-svg.ts')
    expect(dynamicImportPattern('mermaid').test(loader?.source ?? '')).toBe(
      true,
    )
    expect(
      dynamicImportPattern('dompurify').test(sanitizer?.source ?? ''),
    ).toBe(true)
  })
})
