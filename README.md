# Pecos Mutual Product Operations

A static knowledge base of playbooks and reports for the Product Operations team at **Pecos Mutual**, a fictional workers' compensation insurer. It serves Scrum Masters, Product Owners, Program Managers, Project Managers and Product Managers across the **Run** and **Change** workstreams.

Pecos Mutual is fictional. Every name, figure and page on this site is illustrative, and report data is labelled demo data.

- Build plan: [`docs/PLAN.md`](docs/PLAN.md)
- Brand and components: [`docs/design-system/`](docs/design-system/)
- Rules for Claude Code: [`CLAUDE.md`](CLAUDE.md)

## How it fits together

| Folder | What it holds | Who edits it |
| --- | --- | --- |
| `content/` | One Markdown page per file, with front-matter | People |
| `data/taxonomy.json` | Roles, workstreams, phases, activities and the navigation | People |
| `data/reports/*.json` | Fictional report data and chart specs | People |
| `data/knowledge/` | Claude project instructions and the test question set | People |
| `src/_includes/` | Nunjucks layouts and partials | Developers |
| `src/assets/` | Design-system CSS (`tokens.css`, `bundle.css`), `site.css`, logos, icons, `menu.js` | Developers |
| `scripts/charts.js` | Report chart specs → inline SVG at build time | Developers |
| `scripts/export-knowledge.js` | Writes the `knowledge/` corpus for the Claude project | Developers |
| `scripts/validate.js` | Front-matter, report, knowledge and broken-link checks | Developers |
| `_site/` | The built site | **Generated, never edit** |
| `knowledge/` | The Markdown corpus a Claude project syncs from GitHub | **Generated, never edit, but committed** |

## Build locally

You need Node.js 22 or later.

```bash
npm install
```

Start a local preview at http://localhost:8080 that rebuilds on every save:

```bash
npm start
```

Run a full production build, then the validator:

```bash
npm run build
```

`npm run build` cleans `_site/`, runs Eleventy, regenerates `knowledge/`, then runs `scripts/validate.js`. The build fails if any page is missing required front-matter, uses a role, phase, type or workstream that isn't in `data/taxonomy.json`, or links to a page that doesn't exist. Links in `related` to pages that aren't written yet only print a warning.

## Add a page

1. Create a `.md` file in the right folder of `content/`. The folder sets the URL: `content/change/planning/capacity-planning.md` becomes `/change/planning/capacity-planning/`.
2. Start it with front-matter. Six fields are required:

   ```yaml
   ---
   title: Run a sprint planning session
   type: playbook            # concept | playbook | role-guide | report | template | glossary | hub | home
   workstream: change        # run | change | both
   phase: delivery           # discovery | planning | delivery | incident | platform-health | null
   roles: [scrum-master, product-owner]
   summary: How to turn a refined backlog into a committed sprint goal.
   ---
   ```

   Optional fields:
   - `activity`: an activity id from `data/taxonomy.json`.
   - `inputs` and `outputs`: lists shown in the playbook sidebar.
   - `time`: how long the activity takes.
   - `related`: file names of other pages, without `.md`.
   - `headline`: masthead lines; the last line renders gold.
   - `owner` and `updated`: who owns the page and when it last changed.
   - `dataset`: reports only. The name of a file in `data/reports/`.

3. Write the body in plain Markdown. Use the sections the page type needs (see `docs/PLAN.md` → Content model). Markdown isn't run through a template engine, so `{{ }}` in templates is safe.
4. Run `npm run build` and fix anything the validator reports.
5. Commit your page **and** the `knowledge/` changes the build made. CI fails a pull request whose `knowledge/` is out of date.

`type` picks the layout automatically. You don't set `layout` yourself. Section pages (`type: hub`, the `index.md` in each folder) list the pages under them automatically. Navigation, the "Just for" role links and the home-page quick links come from `data/taxonomy.json`. Any link to a page that doesn't exist yet shows as greyed-out text instead of a broken link.

## Deploy (Cloudflare Pages)

Cloudflare Pages builds and hosts the site straight from GitHub. Every push to `main` goes live. Every other branch, including each pull request, gets its own preview URL. The GitHub Action in `.github/workflows/ci.yml` runs the same build and validator on every push and pull request, so a broken page shows up as a failed check.

One-time setup:

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com). A free account is enough.
2. Go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorize the Cloudflare GitHub app for `mhowelltx/Pecos-Mutual-Product-Operations`, then select the repo.
4. Set up the build:
   - **Project name:** `pecos-mutual-product-ops`. This sets the `*.pages.dev` address.
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `_site`
   - Node version comes from `.node-version`, which says 22.
5. Choose **Save and Deploy**. The site is then live at `https://pecos-mutual-product-ops.pages.dev`.
6. If you chose a different project name, update `url` in `data/site.json` to match.

To use your own domain, open the Pages project and go to **Custom domains**.

## Claude project (knowledge layer)

`knowledge/` is a clean copy of the site for Claude: every page as Markdown with its front-matter, every report with its data tables and a `.csv`, an index (`00-index.md`) that Claude reads first, the glossary, and `PROJECT_INSTRUCTIONS.md`. It is regenerated by every build and committed with each pull request, so `main` always holds a current copy.

### Connect it once

1. In [claude.ai](https://claude.ai), create a project, for example "Pecos Mutual Product Ops".
2. Open the project's **Project knowledge** panel, choose **Add content → GitHub**, and connect your GitHub account if asked.
3. Pick the `mhowelltx/Pecos-Mutual-Product-Operations` repository on `main`, and select **only the `knowledge/` folder**. Leaving out the site code keeps the project small and focused.
4. Open **Set project instructions** and paste everything below the line in `knowledge/PROJECT_INSTRUCTIONS.md`.

### Keep it current

After a pull request that changes `knowledge/` is merged, open the project knowledge panel and **sync** the GitHub source. Claude only sees the files as of the last sync.

### Test it

`data/knowledge/test-questions.json` holds 18 sample questions. For each one, it lists the files a good answer should come from and what the answer must include. After each sync, ask a few of them in a new chat in the project, and check that:

- the answer uses the expected files and cites the page URL;
- report answers quote the figure with its as-of date and say it is demo data;
- question 18 (SAFe PI Planning) is answered by saying the knowledge base doesn't cover it, not by inventing a practice.

The validator fails the build if a test question points at a file that no longer exists.
