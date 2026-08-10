# Content intake

Every placeholder in the site is marked `[[EDIT: ...]]`. Find them all with:

```bash
grep -rn '\[\[EDIT' --include=*.html .
```

There are **225** of them. Don't publish until that count is zero. That's the whole point —
your current site went live with `+000%` in the hero, and a placeholder that ships is worse
than a plain page that doesn't.

Work top to bottom. Sections are ordered by how much they matter.

---

## 1 · Identity (10 minutes, unblocks everything)

| Field | Where it appears | Your answer |
|---|---|---|
| Email | hero, contact, footer, schema | |
| LinkedIn URL | contact, schema `sameAs` | |
| Exact job title | schema `jobTitle` | |
| Current employer | schema `worksFor` | |
| City | schema `address` | |
| Availability line | hero pill | |
| Custom domain? | canonical, OG, sitemap, robots | |

**On the email:** `design@getstan.app` is an employer address on a personal portfolio. It ties
your independent identity to a company you may not always be at, and it looks like a shared
inbox. Use a personal address.

---

## 2 · The four case studies (the actual work)

For **each** of the four, I need these. Bullet points are fine — I'll write the prose.

**Framing**
- Real name of the project. If it's confidential, tell me and I'll anonymise it
  ("a digital gift-card marketplace operating in India and the US"). Anonymised is fine.
  Vague is not.
- Your role, the timeline, team size, tools.

**The numbers** — this is the part most portfolios fake, so it's the part that gets checked.
- Baseline: the number **before** you started.
- Result: the number **after**.
- The comparison window: "12 months vs the preceding 12, same seasonality."
- What else was running at the same time (paid, PR, a pricing change). Naming a confound
  makes the rest of your number credible instead of suspicious.

**The three sections that do the real work**
- **The constraint.** What made this harder than the same task at a normal company. No dev
  resource, a migration mid-project, a JS-rendered category page, two markets and one writer.
  This is the paragraph a hiring manager will build their whole interview around.
- **What didn't work.** One bet that lost. What you expected, what happened, how long it
  took you to notice, what it cost. Non-negotiable — a case study with no failures reads as
  a brochure, and everyone senior knows it.
- **What you'd do differently.** One thing you'd sequence earlier, one thing you'd have
  instrumented on day one.

For the two product case studies, also:
- **What you decided not to build**, and why. Two or three things.
- **Primary metric, secondary metric, guardrail metric.** Naming a guardrail signals
  seniority faster than any result does.
- **Kill criteria** for the 0→1 launch, if you set them before shipping. Almost nobody
  publishes these. It's the single strongest differentiator available to you.

---

## 3 · The timeline

Five entries, year by year. This is the section people actually remember on the reference
sites — not because of the animation, because of the specificity.

Per entry: the year, a short headline, two or three sentences, and where you were.

Write it like you'd tell it to someone at a bar, not like a CV. "I bothered my brother with
questions for three months straight" beats "developed foundational skills in web development"
every single time. Name the client that scared you. Name the thing you got wrong.

---

## 4 · About and experience

- Three sentences: what you do now, how you got here, and — the important one — what the
  SEO **and** product combination lets you do that a specialist in either can't. Don't bury
  this. It's the entire reason someone hires you over two cheaper people.
- Role / company / years for the experience table.
- Prune the skill chips. Cut anything you couldn't answer three follow-up questions about.
  A short honest list beats a long one that collapses in an interview.

---

## 5 · Assets

- **Headshot** (optional but it lifts conversion) — 800×800 minimum, `assets/portrait.jpg`
- **OG images** — 1200×630 each, at `assets/og.png` and one per case study.
  Until these exist the OG tags point at 404s and links will preview blank.
- **`resume.pdf`** at the repo root, or delete that row from the contact list.
- **Screenshots** — GSC graphs, dashboards, before/after. Blur what you must. A real
  screenshot of a real Search Console chart does more than any paragraph.
