# Kickoff prompt for Claude Code

Paste the text below as the first message of a Claude Code session on this repo.

---

You're picking up a project that was planned in an earlier Claude session. Everything from that session is in this repo:

- `CLAUDE.md`: project rules and vocabulary (loaded automatically).
- `docs/PLAN.md`: the approved build plan.
- `docs/design-system/`: the Pecos Mutual design system (brand book, tokens, component CSS and reference markup, logo and icon SVGs).

Please:

1. Read `CLAUDE.md`, `docs/PLAN.md` and `docs/design-system/BRAND.md` in full, and skim the component READMEs.
2. Give me a short summary of your understanding and list any of the plan's open questions you need answered before Phase 1. Wait for my reply.
3. Then do **Phase 1: Scaffold** on a new branch `phase-1-scaffold`:
   - Set up Eleventy 3 with Nunjucks layouts (base, concept, playbook, role, report, template) and partials (header, masthead, quick links, card, section heading, footer) that follow the design-system components.
   - Copy `tokens.css`, `components/bundle.css`, the logos and the icons into `src/assets/`.
   - Create `data/taxonomy.json` (roles, workstreams, phases, activities) and drive navigation from it.
   - Add `scripts/validate.js` for required front-matter and broken internal links; wire it into `npm run build`.
   - Add `.github/workflows/deploy.yml` to build and deploy `_site/` to GitHub Pages on pushes to `main`.
   - Create a home page plus one placeholder page of each type, all with correct front-matter.
   - Add a README covering: how to add a page, build locally, and deploy.
4. Build it, fix any errors, commit, push the branch and open a pull request. Tell me how to preview the site.

Stop after Phase 1 for my review.
