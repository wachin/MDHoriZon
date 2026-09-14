# Example article

This document is the link target for the relative link in section 3 of the
[Golden Test Document](../fixtures/Golden-Test-Document.md), which points here with:

`[Another article](../articles/example.md)`

It exists so that relative link resolution is a real test instead of a link to nowhere. The path crosses a
directory boundary (`tests/fixtures/` → `tests/articles/`), so a correct resolver must normalize `..`, and the same
resolution has to keep working after the document has been downloaded for offline reading.

Because this file sits in a different directory than the fixture, the image below also proves that assets are
resolved relative to **the document that references them**, not relative to the application URL:

![Shared example asset](../assets/example.png)

A relative link back to the fixture closes the round trip:

[Back to the Golden Test Document](../fixtures/Golden-Test-Document.md)

---

This file is a test target, not a second rendering fixture: rendering regressions belong in the Golden Test
Document. Keep it short and keep both relative paths working.
