# 0010. Video: covers now, and a player that waits to be asked

- **Status:** accepted — implemented in `src/components/VideoEmbed.tsx` and `MarkdownParagraph.tsx`
- **Date:** 2026-09-17 (implemented 2026-09-18)
- **Context:** Phase 9; follows [ADR 0003](0003-sanitization-policy.md) (sanitization) and
  [ADR 0009](0009-content-model.md) (content model)

## Context

Three entries in the real library embed a video with Blogger's player, and three more link to a video with
ordinary Markdown. The author's requirement is explicit: a video URL, as written, should _preview_ on the
published page, and should serve as the entry's cover image when there is no image, or when the video comes
first.

Two constraints shape the answer:

1. **Iframes are forbidden in content.** `iframe` is excluded by the sanitize schema and by layer 1 of the
   sanitization policy, and `skipHtml` removes raw HTML before it reaches the tree
   ([ADR 0005](0005-phase-2-security-policy.md)). An `<iframe>` written in a document is gone, on purpose.
2. **A third-party player is a tracking surface.** Loading YouTube's player means loading its scripts,
   cookies and network requests from the reader's device on every article view, whether or not they watch.

## Decision

1. **The cover needs no player at all.** YouTube publishes a still image for every video at a predictable
   address, so an entry whose first media is a video gets its cover from that address. This is implemented
   (`src/core/content/media.ts`), and it is why 66 entries have covers today.
2. **The legacy embed is rescued as a link** before rendering, so the policy is untouched and the video is
   no longer invisible (see ADR 0009).
3. **Playing in place is a click-to-play facade** (the next step to implement): a video URL that makes up a
   whole paragraph — or a rescued legacy embed — renders as its thumbnail with a play control, and the
   YouTube player is created **only when the reader asks for it**. Nothing is requested from YouTube on
   page load.
4. **A link inside a sentence stays a link.** Embedding every video URL in the middle of a paragraph would
   break the prose it belongs to; the rule is the paragraph, not the URL.

## Alternatives considered

- **Allow `<iframe>` through the sanitizer for known video hosts.** Rejected: it breaks the single most
  important invariant in the project, and it would make "safe" depend on a URL pattern inside a schema that
  exists to be boring and explicit.
- **Render the player immediately.** Rejected: it loads a third party's code on every article view for a
  video most readers will not play, on a phone, on mobile data.
- **Link out to YouTube instead of embedding.** It satisfies privacy and simplicity, but not the author's
  requirement that the video preview on the page.
- **Use `youtube-nocookie.com` only.** A good detail once the player exists — it is the domain that does
  not set advertising cookies — but it does not change the fact that a request happens; the facade is what
  fixes that.

## What the implementation settled

- **Where the decision lives.** `MarkdownParagraph` reads the sanitized `node` it is already given, the same
  way `CodeBlock` reads a fence's language. Nothing was added to the pipeline and the sanitize schema was not
  touched: a video is recognised from what survived sanitization.
- **How strict "stands alone" is.** The link must be the paragraph's own content — not wrapped in emphasis —
  and the only other children may be whitespace. `**[video](url)**` stays a paragraph, because the author wrote
  emphasis and a rule that unwraps it to find a video is a rule that will surprise someone.
- **`youtube-nocookie.com`** for the player: the domain that does not set advertising cookies.
- **The poster is `hqdefault.jpg`, cropped.** It is the still YouTube always publishes; it is 4:3 with the
  letterbox bars baked in, so the box is 16:9 with `object-fit: cover`. On an engine without `aspect-ratio` the
  poster simply shows at its own ratio — a difference, not a broken layout.
- **Focus moves into the player** once it exists. A keyboard reader who presses play must not be dropped back
  at the top of the document.
- **The control is a `<button>`**, so it is operable by keyboard and announced as a control; the poster carries
  no alt text because the button has the name. A link whose text is the URL is named "YouTube video" rather
  than read out as an address.
- **The interface text is English**, like the rest of the application chrome. The content around it may be
  Spanish or English; a language switcher is a separate concern, and this record does not pretend to settle it.

## Consequences

- The facade is a component, not a sanitizer change: it is our own markup, created after an interaction,
  and it never passes through the Markdown pipeline.
- The thumbnail is a request to `i.ytimg.com` when a cover is displayed. That is a third-party request, but
  a single image, and one the content already depends on for its covers — worth recording in Phase 14's
  privacy review alongside remote images.
- Phase 17 (search and navigation) and Phase 19 (accessibility) inherit the facade: a play control needs a
  keyboard path and an accessible name, and a thumbnail that is also a link needs both roles kept distinct. The
  first is done here; the second does not arise, because the poster is not a link.
- Measured on the golden document: the two standalone video paragraphs in section 19 render as a control and a
  still image, the in-sentence one stays a link, and the rendering contains **no iframe at all** until a reader
  presses play. Three tests pin that order: the facade, the paragraph rule, and the fixture's own render.
