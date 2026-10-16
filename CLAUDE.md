# Pecos Mutual Product Operations — demo site

A static knowledge-base site of playbooks and reports for a **fictional** insurer's Product Operations team. It serves Scrum Masters, Product Owners, Program Managers, Project Managers and Product Managers. The content is also exported as a clean Markdown corpus that a Claude project reads through GitHub sync.

## Read first

- `docs/PLAN.md`: the approved build plan. Architecture, information architecture and page list, content model, reports, Claude knowledge layer, phases and open questions. Follow it; raise changes instead of silently departing from it.
- `docs/design-system/BRAND.md`: the brand book (voice, colour, type, layout, iconography, logo). Read it before writing any layout, CSS or copy.
- `docs/design-system/tokens.json` / `tokens.css`: design tokens. Use the CSS custom properties (`var(--midnight)`, `var(--font-headline)` …), never raw hex in new CSS.
- `docs/design-system/components/<Name>/README.md` + `preview.html`: component guidelines and reference markup. `components/bundle.css` holds the `pm-*` component classes.
- `docs/design-system/assets/`: the Pecos Mutual logo set and 12 icons (orange + blue variants).

## Hard rules

- **Fictional brand only.** The look is modeled on a real workers' comp insurer's public site, but every name, logo, figure and sentence must be Pecos Mutual's own. Never use the real company's name, logo, photos, icons or copy. Mark report data as "demo data" and keep the footer line saying the company is fictional.
- **One source of truth.** People write only in `content/` (Markdown + front-matter) and `data/`. `_site/` and `knowledge/` are generated and never hand-edited.
- **Front-matter is required** on every page: `title`, `type`, `workstream`, `phase`, `roles`, `summary` (see `docs/PLAN.md` → Content model). The validator must fail the build if any is missing.
- **Static HTML first.** Charts are inline SVG generated at build time; no client-side chart libraries. JS only for search (Pagefind) and the mobile menu.
- **Accessibility:** text meets WCAG AA. Use `body-accessible` and `orange-text` tokens where the source greys/oranges fail on white (noted in BRAND.md). 2px focus rings (`focus` on light, `gold` on midnight).
- **Fonts:** Montserrat (body), Open Sans (nav/footer), Playfair Display (headlines, a stand-in for the licensed IvyPresto). All from Google Fonts.
- **Photos:** none are bundled. Use clearly marked placeholders until Mike supplies licensed images.

## Domain vocabulary (use these exact terms)

- **Run:** run-the-business work by teams through **Incident Management** and **Platform Health**.
- **Change:** **strategic projects** by cross-functional project teams, plus **Discretionary** work by static **Home Teams**.
- Change stages: **Discovery** (ideation, estimation, prioritization; Business Executives with Product Managers) → **Planning** (resource management; goals and milestones for delivery within ~3 months) → **Delivery** (Scrum).
- Roles: Scrum Master · Product Owner · Program Manager · Project Manager · Product Manager.

## Working style

- Work phase by phase as `docs/PLAN.md` lists them, one branch and pull request per phase, and stop for Mike's review at the end of each phase.
- Keep commits small and descriptive. Run the build and validator before every commit.
- When an open question in the plan blocks you, ask Mike instead of guessing; otherwise pick the plan's stated default and note it in the PR.
