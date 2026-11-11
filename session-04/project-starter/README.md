# TODO: name of your website

**What it is:** TODO, one sentence: what the site offers and for whom.
**Audience:** TODO: who uses it, on which devices, what do they want to do?
**Pages:** TODO: list your (at least) 4 pages with one line each.
**Live:** TODO: GitHub Pages link

## HTML baseline (Session 4 · prerequisite for EPA 3)

Fill in **where** each feature is used (file and element or line). Must items (M) are required; pick optional items (O) that fit your content.

| # | Feature | Where (file · element / line) |
|:--:|------------------------------------------------------------|------------------------------|
| M1 | `lang`, `charset`, `viewport`, unique `title` ("Page · Site"), `meta description`, favicon | |
| M2 | landmarks `header` `nav` `main` `footer`; skip link as first element | |
| M3 | navigation as a list, identical on all pages, `aria-current="page"` | |
| M4 | one `h1` per page, no skipped heading levels | |
| M5 | images: `alt` (or `alt=""`), `width`/`height`, `loading="lazy"` below the fold; one `figure` + `figcaption` | |
| M6 | lists for lists; `article`/`section` with headings where they fit | |
| M7 | meaningful link texts; `<address>` with `tel:` / `mailto:` links | |
| M8 | `<time datetime="…">` for at least one date or time | |
| M9 | one form: visible labels, right `type`, `autocomplete`, "(required)" + `required`, real `<button>`; `fieldset`/`legend` for groups | |
| M10 | W3C validator 0 errors · axe 0 violations · keyboard: everything reachable, focus visible | |
| O1 | responsive image: `srcset` + `sizes` or `<picture>` | |
| O2 | data table with `<caption>` and `<th scope>` | |
| O3 | `<details>` / `<summary>` (e.g. FAQ) | |
| O4 | `<dl>` for name–value pairs (e.g. opening hours, facts) | |
| O5 | `<blockquote>` with source, `<abbr>` with the expansion written out once | |
| O6 | icon-only link or button with `aria-label` and `aria-hidden="true"` on the icon | |
| O7 | `<iframe>` with `title` (map, video), privacy considered | |
| O8 | `lang` on a passage in another language (e.g. `<span lang="de">`) | |

**Tests:** validator: TODO date + result · axe: TODO · keyboard: TODO · screen reader: TODO (which one, what you checked)

**AI use:** TODO, one sentence (or "none").
