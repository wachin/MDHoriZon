# 0009. The content model: identity from the folder tree

- **Status:** accepted
- **Date:** 2026-09-17
- **Context:** Phase 9; feeds the loader (Phase 10) and the navigation UI (Phase 17)

## Context

Phase 9 was written as "content model and frontmatter", with a proposed YAML block at the top of every
document. Then the real library arrived, and it is not shaped that way:

| Measured on `content/` (2026-09-17) |                  |
| ----------------------------------- | ---------------- |
| documents                           | 122              |
| languages                           | `ES` 120, `EN` 2 |
| program folders                     | 46               |
| with a date folder                  | 99               |
| with a cover of their own           | 66               |
| **with frontmatter**                | **0**            |

Every document is `content/<LANG>/<Program>[/<SubProgram>]/<YYYYMMDD…>/<file>.md`, with the images beside
the document in an `images/` folder. **Not one document declares any metadata.** A model that required
frontmatter would fit none of the content it exists for.

Two ways the content is written also turned out to break rendering, and both were measured rather than
imagined: Blogger's embedded players (`<iframe src="…/embed/ID">`, 3 documents) and Blogger's image size
hint (`![alt](url =650x)`, 26 references), where the space makes the destination unparsable, so the reader
sees the Markdown source instead of the image.

## Decision

1. **Identity comes from the path.** `id` is the path without its extension, normalised (`\` → `/`, no `.`
   segments, no leading slash), so the same file always yields the same id on any platform. A URL or a
   route is deliberately _not_ part of the model: that belongs to the layer that knows how the library is
   served.
2. **Language, program and date come from the folders.** The first segment is the language (`es`, `en`),
   the second is the program, and the first folder whose name begins with eight digits is the date —
   `20260414.2-Instalar-…` is 2026-04-14, and whatever follows the eight digits is free, because that is
   how the folders are named. Eight digits that are not a real calendar date are reported, not guessed at.
3. **Frontmatter is optional and wins when present**, over anything derived, because an explicit statement
   should beat an inference. A disagreement between a declared date and the folder date is reported.
4. **`section` and `collection` are different things.** `section` is the folder the file is in; `collection`
   is that path with the entry's own date folder removed. The entry folder is where an article is _stored_,
   not what it is _about_: without this distinction every article would be a category of its own and an
   index would be a list of folders. Grouping (`buildSectionTree`) uses `collection`.
5. **The title resolves in a fixed order**: frontmatter, then the first level-one heading (skipping fenced
   code, so an example is not a title), then the file name with separators turned into spaces.
6. **The cover is the Blogger rule**: the first image or video in the document, in whichever order they
   appear, and the `alt` text is irrelevant — `![](images/Portada.jpg)` is how the real content writes
   covers. A video's cover is YouTube's own thumbnail, so a video needs no embed to be a cover. An entry
   with no media gets `public/images/default-cover.webp` (56 of 122 today), which lives in `defaults.ts` so
   an index and an article cannot disagree.
7. **Legacy markup is rescued in the text, before rendering.** The embedded players become the Markdown
   links an author would write today, and the size hints are dropped. This is what keeps layer 1 of
   [ADR 0003](0003-sanitization-policy.md) — raw HTML never reaches the tree — while still showing the
   video and the image. The alternative, allowing raw HTML through for the sake of three old entries,
   would trade the whole content policy for a handful of files.
8. **Nothing is required.** A document with no frontmatter and no media is a valid article; every field has
   a defined fallback. The engine has to read the library that exists.
9. **Order is deterministic**: `order` ascending, then `date` newest first, then title, then id. Previous /
   next navigation is derived from that order rather than declared, so reordering an index cannot leave a
   dozen stale `next:` fields behind.
10. **Search is data and a query here; its interface is Phase 17's.** Every query word must match, accents
    and case are ignored, and fields are weighted title > tag > summary > body.

## Alternatives considered

- **Require frontmatter** (the model the phase was planned around). Rejected by measurement: it would fit
  none of the 122 documents, and would mean asking the author to restate what the folder tree already says.
- **Derive the date from the file's modification time or from git.** Rejected: not deterministic, not
  present in a downloaded copy, and it would change under the reader's feet.
- **Treat the entry folder as a section.** Rejected: measured, it produces one category per article.
- **Use the folder name as the title** when a document has no heading. Rejected in favour of the heading
  first, then a readable file name; 16 documents have no heading, and their folder names carry dates.
- **Allow raw HTML so the old embeds and any stray markup render.** Rejected: it is the one policy the
  project is built around, and the rescue above solves the actual problem without it.
- **Build a headless CMS.** Explicitly out of scope, per the roadmap.

## Consequences

- Phase 10 owes the loader: it reads the tree, builds the manifest, and supplies the `documentUrl` each
  document needs ([ADR 0008](0008-assets-and-the-content-package.md)).
- Phase 17 owes the interface: index, search screen, tags, previous/next, bookmarks.
- The 35 local image references that do not resolve stay the content's own problem. 16 of them are a
  `image/` → `images/` typo and 19 point at folders that do not exist (`vx_images/`, bare file names).
  The engine reports nothing about them today; a content-health report would be a useful addition, and it
  belongs with whoever owns the content pipeline.
- Playing a video in place is a separate decision, and a separate record:
  [ADR 0010](0010-media-and-embeds.md).
