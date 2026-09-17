# Fixture images

Images referenced by [`Golden-Test-Document.md`](../Golden-Test-Document.md) and
[`tests/articles/example.md`](../../articles/example.md).

They live **beside the document that uses them**, in an `images/` folder:

```text
tests/fixtures/
├── Golden-Test-Document.md      ← references `images/…`
└── images/
    ├── example.png
    ├── wide.png
    ├── tall.png
    └── (does-not-exist.png must never be created)
```

That is deliberate, and it is the layout real content has: an article and the images it needs sit together in one
folder, so a document's paths are relative to itself and survive being copied or downloaded as a unit
([ADR 0008](../../../docs/architecture/0008-assets-and-the-content-package.md)). A document that reaches *out* of its
own folder is still covered — by `../articles/example.md` in section 3, and by the article's own reference back into
this folder.

Until this folder existed, the images lived in a shared `tests/assets/` directory reached with `../assets/…`. That
shape is no longer used by the fixture, because it is not the shape the content will have.

## Inventory

| File                 | Tracked in git          | Purpose                                                                                       |
| -------------------- | ----------------------- | --------------------------------------------------------------------------------------------- |
| `example.png`        | ✅ yes                  | Relative-image regression case (`![Relative image](images/example.png)`). Must always exist.   |
| `wide.png`           | ✅ yes                  | Very wide image case (1200×120): must keep its aspect ratio without stretching the layout.     |
| `tall.png`           | ✅ yes                  | Very tall image case (240×900): must not make the page unusable without scrolling.             |
| `does-not-exist.png` | ❌ **must never exist** | Missing-image regression case. See below.                                                      |

`tests/fixtures.test.ts` reads the fixture, extracts every relative destination it uses and fails unless the file
exists — so a renamed image, or a path that no longer resolves, breaks the build instead of breaking the page.

### Why `does-not-exist.png` must NOT be created

Section 4 of the Golden Test Document contains:

```markdown
![This image intentionally does not exist](images/does-not-exist.png)
```

That is not an unfinished task — it is a **deliberate negative test**. It exists so that the renderer proves it
degrades gracefully when an image cannot be resolved:

- the image fails without throwing;
- the article keeps rendering below the failure;
- the `alt` text remains available to screen readers **and** visible in a placeholder box;
- the broken asset does not break offline mode or the WebView.

Creating this file would silently delete that test case. **Do not add it.**

## How `example.png` was generated

Any 640×240 PNG works. The committed file is the gradient placeholder below, reproducible with ImageMagick:

```bash
magick -size 640x240 gradient:'#0b3d91-#2196f3' \
  -gravity center \
  -font DejaVu-Sans -fill '#ffffff' \
  -pointsize 46 -annotate +0-44 'MDHoriZon' \
  -pointsize 20 -fill '#dbeafe' -annotate +0+8 'Golden Test Document - relative image fixture' \
  -pointsize 15 -fill '#93c5fd' -annotate +0+44 'tests/fixtures/images/example.png' \
  -depth 8 -strip tests/fixtures/images/example.png
```

With GIMP instead:

1. **File → New**, width `640`, height `240`.
2. Pick the Gradient tool (`G`), choose _Dark Blue_ → _Light Blue_, drag vertically over the canvas.
3. Text tool (`T`): `MDHoriZon`, sans-serif, ~46 px, white, centered.
4. Add a smaller second line: `tests/fixtures/images/example.png`.
5. **File → Export As…** → `tests/fixtures/images/example.png`, keep the `.png` extension, export.

Any editor that can save a PNG (Krita, Inkscape, Pinta, Photoshop, or an online placeholder generator) is fine.
If you replace the file, keep the same filename and a similar aspect ratio, and re-check it visually with
`npm run dev`.

## How `wide.png` and `tall.png` were generated

Same gradient, in the two extreme aspect ratios the fixture needs:

```bash
magick -size 1200x120 gradient:'#0b3d91-#2196f3' -gravity center \
  -font DejaVu-Sans -fill '#ffffff' -pointsize 34 \
  -annotate +0+0 'MDHoriZon - wide fixture 1200x120' \
  -depth 8 -strip tests/fixtures/images/wide.png

magick -size 240x900 gradient:'#0b3d91-#2196f3' -gravity center \
  -font DejaVu-Sans -fill '#ffffff' -pointsize 24 \
  -annotate +0+0 'tall 240x900' \
  -depth 8 -strip tests/fixtures/images/tall.png
```

The exact pixels do not matter; the aspect ratios do. Keep them extreme enough that a layout bug is visible.

## Remote images in the fixture

Section 4 also uses two images hosted on [`placehold.co`](https://placehold.co). They are intentionally remote:

- they exercise real network image loading and `src` handling;
- they must not be cached by the renderer at build time;
- with no network (offline mode, Android WebView without connectivity) they are expected to fail — exactly like
  the missing-image case, and the article must still render.

> `via.placeholder.com`, which this fixture originally used, is **dead** (the host no longer resolves). That is
> why the URLs were migrated to `placehold.co`. Alternative hosts: `dummyimage.com`, `picsum.photos`, or any
> image committed to this repository when a remote dependency is not desired.

## Where these files end up in a build

`npm run build` copies this folder to `dist/tests/fixtures/images/`, so the deployed preview serves exactly the
paths the document asks for — the same shape the dev server serves. That copy is a **preview convenience**, not a
content pipeline: Phase 10 owns loading real content, and this folder goes with the preview when it does.
