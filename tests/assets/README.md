# Test assets

Assets referenced by [`tests/fixtures/Golden-Test-Document.md`](../fixtures/Golden-Test-Document.md).

The fixture lives in `tests/fixtures/`, so every `../assets/...` path inside it resolves **relative to the
Markdown document**, which means it points here: `tests/assets/`.

## Inventory

| File                 | Tracked in git          | Purpose                                                                                         |
| -------------------- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| `example.png`        | ✅ yes                  | Relative-image regression case (`![Relative image](../assets/example.png)`). Must always exist. |
| `does-not-exist.png` | ❌ **must never exist** | Missing-image regression case. See below.                                                       |

### Why `does-not-exist.png` must NOT be created

Section 4 of the Golden Test Document contains:

```markdown
![This image intentionally does not exist](../assets/does-not-exist.png)
```

That is not an unfinished task — it is a **deliberate negative test**. It exists so that the renderer proves it
degrades gracefully when an image cannot be resolved:

- the image fails without throwing;
- the article keeps rendering below the failure;
- the `alt` text remains available to screen readers and as a visible fallback;
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
  -pointsize 15 -fill '#93c5fd' -annotate +0+44 'tests/assets/example.png' \
  -depth 8 -strip tests/assets/example.png
```

With GIMP instead:

1. **File → New**, width `640`, height `240`.
2. Pick the Gradient tool (`G`), choose _Dark Blue_ → _Light Blue_, drag vertically over the canvas.
3. Text tool (`T`): `MDHoriZon`, sans-serif, ~46 px, white, centered.
4. Add a smaller second line: `tests/assets/example.png`.
5. **File → Export As…** → `tests/assets/example.png`, keep the `.png` extension, export.

Any editor that can save a PNG (Krita, Inkscape, Pinta, Photoshop, or an online placeholder generator) is fine.
If you replace the file, keep the same filename and a similar aspect ratio, and re-check it visually with
`npm run dev` once the renderer exists.

## Remote images in the fixture

Section 4 also uses two images hosted on [`placehold.co`](https://placehold.co). They are intentionally remote:

- they exercise real network image loading and `src` handling;
- they must not be cached by the renderer at build time;
- with no network (offline mode, Android WebView without connectivity) they are expected to fail — exactly like
  the missing-image case, and the article must still render.

> `via.placeholder.com`, which this fixture originally used, is **dead** (the host no longer resolves). That is
> why the URLs were migrated to `placehold.co`. Alternative hosts: `dummyimage.com`, `picsum.photos`, or any
> image committed to this repository when a remote dependency is not desired.

For hermetic/offline test runs, do not delete the remote examples: keep them and assert graceful failure instead,
or freeze copies under `public/assets/` and point a _separate_ fixture at them.
