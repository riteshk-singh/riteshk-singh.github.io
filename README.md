# riteshk-singh.github.io

Static portfolio. No framework, no build step, no dependencies, no tracker.
Edit HTML, commit, push. GitHub Pages serves it.

## Structure

```
index.html                              home (hero, work, timeline, approach, about, contact)
case-studies/organic-growth-rebuild/    01 · SEO   — full narrative template
case-studies/crawl-and-indexation/      02 · SEO   — diagnostic arc
case-studies/checkout-drop-off/         03 · PM    — discovery → ship → measure
case-studies/new-category-launch/       04 · PM    — 0→1, kill criteria
assets/css/site.css                     28kb, all tokens at the top
assets/js/site.js                       8kb, zero dependencies
404.html  robots.txt  sitemap.xml  .nojekyll
```

## Before you publish

1. `grep -rn '\[\[EDIT' --include=*.html .` must return nothing. See `CONTENT-INTAKE.md`.
2. Add the OG images, or strip the `og:image` tags — right now they 404.
3. Add `resume.pdf` or delete that row from the contact list.
4. Submit `sitemap.xml` in Search Console and Bing Webmaster Tools.

## Adding a fifth case study

Copy the closest existing folder, rename it, then update **five** things:
`<title>`, meta description, `<link rel="canonical">`, both `og:url`/`og:title`, and the
three URLs inside the JSON-LD. Add the URL to `sitemap.xml`. Add a `.serp__item` block on
the homepage. Repoint the `.next-case` link on the previous case study so the chain stays
closed — every case study should link to the next one and the last should link back to the first.

## Design system

Change a colour once, at the top of `site.css`. Both themes are token-driven; nothing
downstream hardcodes a hex value.

- Light: `#FAF9F6` parchment / `#0F172A` slate / `#10B981` emerald
- Dark: `#0B1220` / `#F1F5F9` / `#34D399`
- Type: Instrument Sans for prose, JetBrains Mono for every number, year, label and URL
- Theme persists in `localStorage`, respects `prefers-color-scheme`, set before first paint
  so there is no flash

## Motion

CSS transforms plus one `IntersectionObserver`. No GSAP, no scroll library.

- Scroll reveals, count-up metrics, animated delta bars
- Sticky section rail (≥1620px), scroll progress bar, sticky case-study TOC with active state
- Custom cursor on fine-pointer devices only
- `prefers-reduced-motion` disables all of it

**Reveal animations are gated behind `html.js`.** If JavaScript fails, everything is visible
at full opacity — verified with JS disabled: 0 hidden elements. Never move those rules out
from under the `.js` selector; that's what stops a script error from blanking your content.

## Local preview

```bash
python3 -m http.server 8000
```

Use a server, not `file://` — the absolute asset paths won't resolve otherwise.
