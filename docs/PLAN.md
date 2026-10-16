# Pecos Mutual Product Ops Site — Build Plan

As of 2026-10-16 · Owner: Mike (mhowelltx)

## Goals and decisions

Build a static knowledge-base site for the fictional **Pecos Mutual** Product Operations team. It hosts playbooks and reports for five roles across the Run and Change workstreams, and the same content is laid out so a Claude project can answer questions from it quickly.

The demo must show:

- **Run vs Change:** how the two workstreams split work and who does each.
  - **Run** = run-the-business work done by teams through **Incident Management** and **Platform Health**.
  - **Change** = strategic project work delivered by **cross-functional project teams**, plus **Discretionary** work delivered by **static Home Teams**.
- **The Change lifecycle:** Discovery → Planning → Delivery, with a working playbook for each key activity.
  - **Discovery:** high-level ideation, estimation and prioritization. Business Executives work with Product Managers.
  - **Planning:** once projects are scoped with high-level designs and prioritized, Resource Management and planning practices break them into goals and milestones for delivery within roughly 3 months.
  - **Delivery:** the project team practices Scrum to deliver the project.
- **Role-based entry:** a Scrum Master, Product Owner, Program Manager, Project Manager or Product Manager can each find their tasks fast.
- **Reports:** realistic sample reports with charts and fictional data.
- **Claude-readiness:** a clean, indexed Markdown corpus synced into a Claude project. Claude reads the content from a Claude project, **not** from a chat widget embedded in the site.

| Decision | Choice (confirmed by Mike) |
| --- | --- |
| Authoring | Markdown with front-matter, built to static HTML by Eleventy, hosted on Cloudflare Pages (changed from GitHub Pages, 2026-10-16) |
| Claude feed | GitHub sync of a `/knowledge` folder plus an index file into a Claude project |
| Content scope | Representative set, about 36 pages, all fictional |
| Reports | Static inline SVG charts plus narrative; data also kept as JSON/CSV |
| Look | The Pecos Mutual design system in `docs/design-system/` |

## Architecture

One Markdown source feeds two outputs: the HTML site for people and the `knowledge/` corpus for Claude. Neither output is edited by hand.

1. **Source:** `content/` holds one `.md` file per page with YAML front-matter. Report data lives in `data/reports/*.json`.
2. **Build:** Eleventy 3 renders Nunjucks layouts and partials (header, masthead, quick links, cards, footer) into `_site/`. A build helper draws report charts as inline SVG from the JSON, so charts need no JavaScript.
3. **Knowledge export:** the same build writes `knowledge/`. That's a cleaned copy of each page (front-matter kept, site chrome stripped), one Markdown file per report with its data table, and an index file.
4. **Publish:** Cloudflare Pages builds every push to `main` (and a preview per branch) and serves `_site/`. A GitHub Actions workflow runs the build check, and in Phase 5 also commits `knowledge/` back when it changes, so the Claude project's GitHub sync sees current files.

Styling uses the design system's `tokens.css` and `components/bundle.css`, copied into `src/assets/css/`, with the logo and icon SVGs in `src/assets/img/`. Client-side JavaScript is limited to a Pagefind static search index and a mobile menu toggle.

## Information architecture

The top-level navigation follows the delivery system: **Operating model, Run, Change**. **Roles** and **Reports** are cross-cutting entry points. Change is the demo's focus.

```
Home
├─ Operating model: value delivery system · Run vs Change · roles at a glance
├─ Run
│  ├─ Incidents: triage & declare · post-incident review
│  └─ Platform health: monthly review · scorecard
└─ Change (strategic projects with cross-functional teams; discretionary work with static Home Teams)
   ├─ Discovery: idea intake · estimation · prioritizing
   ├─ Planning: capacity · milestones · quarter plan
   └─ Delivery: refinement · sprint cycle · review/retro
Cross-cutting: five roles · reports · templates · glossary
```

### Page list (36 pages)

| Section | Pages | Roles served |
| --- | --- | --- |
| Operating model (3) | Value delivery system overview · Run, Change and Discretionary work · Roles at a glance | All |
| Run · Incident management (3) | Overview · Playbook: triage and declare an incident · Playbook: post-incident review | Scrum Master, Program Manager, Product Manager |
| Run · Platform health (2) | Overview · Playbook: monthly platform health review | Product Manager, Program Manager |
| Change · Discovery (5) | Overview · Playbook: idea intake and one-page business case · Playbook: high-level design review · Playbook: T-shirt estimation · Playbook: portfolio prioritization | Product Manager, Program Manager |
| Change · Planning (4) | Overview · Playbook: resource and capacity planning · Playbook: goals and milestones for a ~3-month plan · Playbook: quarterly planning session | Program Manager, Project Manager, Product Owner |
| Change · Delivery (5) | Overview: Scrum at Pecos Mutual · Playbook: backlog refinement · Playbook: sprint planning · Playbook: daily scrum and impediments · Playbook: sprint review and retrospective | Scrum Master, Product Owner, Project Manager |
| Roles (5) | Scrum Master · Product Owner · Program Manager · Project Manager · Product Manager | Each |
| Reports (6) | See Reports below | Per report |
| Templates (2) | One-page business case · milestone plan | Product Manager, Project Manager |
| Reference (1) | Glossary | All |

## Content model

Every page declares what it is, where it sits and who it serves in front-matter. The site builds navigation from these fields, and Claude uses them to filter answers by role or phase.

```yaml
---
title: Run a sprint planning session
type: playbook            # concept | playbook | role-guide | report | template | glossary
workstream: change        # run | change | both
phase: delivery           # discovery | planning | delivery | incident | platform-health | null
activity: sprint-planning
roles: [scrum-master, product-owner]
summary: How to turn a refined backlog into a committed sprint goal.
inputs: [refined backlog, team capacity]
outputs: [sprint goal, sprint backlog]
related: [backlog-refinement, sprint-review]
owner: Product Operations
updated: 2026-10-16
---
```

| Page type | Layout | Required sections |
| --- | --- | --- |
| Concept | Masthead + long-form article | What it is, why it matters, how it connects to the rest of the system |
| Playbook | Article with step list and sidebar facts (roles, inputs, outputs, time) | When to use, roles, before you start, steps, outputs, pitfalls, related |
| Role guide | Card grid of that role's playbooks by phase | Responsibilities, where you show up in Run and Change, your top tasks |
| Report | Stat callout, inline SVG charts, narrative | Summary, charts, findings, actions, data table, source and as-of date |
| Template | Article with a copyable Markdown block | Purpose, the template, a filled example |
| Glossary | Alphabetical definition list | Term, definition, related pages |

Writing rules: lead with the point, keep steps numbered and imperative, and name roles exactly as the role list does. Every playbook ends with explicit outputs so Claude can answer "what do I produce?" questions.

## Claude project knowledge layer

The Claude project syncs only the generated `knowledge/` folder from GitHub. That keeps it small and free of HTML, CSS and build files.

**What `knowledge/` contains**

- `00-index.md`: the map Claude reads first. It gives the operating model on one page (Run, Change, three phases, five roles), then one line per page: title, type, workstream, phase, roles, one-sentence summary, file name, live site URL.
- `01-glossary.md`: every term with its definition.
- `concepts/`, `playbooks/`, `roles/`, `templates/`: one cleaned Markdown file per page, front-matter kept, file names prefixed by phase (`delivery--sprint-planning.md`).
- `reports/`: one file per report with its narrative, findings and full data as Markdown tables, plus the matching `.csv`.
- `PROJECT_INSTRUCTIONS.md`: the text to paste into the Claude project's instructions:
  - Read `00-index.md` first to pick which files answer the question.
  - Answer in the role and phase the person names; cite the playbook title and its site URL.
  - If the knowledge base doesn't cover it, say so instead of inventing a practice.
  - For report questions, quote figures from the report's data table with its as-of date.

**Keeping it current:** the GitHub Action regenerates `knowledge/` after each content change, and someone re-syncs the repo in the Claude project. A build check fails if any page is missing `title`, `type`, `summary` or `roles`.

**Test set:** 15–20 sample questions with expected source files, for example "As a Product Owner, what do I bring to sprint planning?" or "Which report shows incident MTTR trend?". Run them against the Claude project after the first sync.

## Reports

There are six reports, each built from one JSON data file. The build turns that file into inline SVG charts on the page and a Markdown data table in `knowledge/`. All data is fictional and labelled "demo data".

| Report | Workstream · phase | Main charts | Primary readers |
| --- | --- | --- | --- |
| Platform Health scorecard | Run · platform health | Availability vs target by platform (bullet bars); error-budget burn (line) | Product Managers, Program Managers |
| Incident trends | Run · incident | Incidents per week by severity (stacked bars); MTTR trend (line) | Scrum Masters, Program Managers |
| Portfolio intake and prioritization | Change · discovery | Ideas by stage (funnel); value vs effort (scatter) | Product Managers, executives |
| Quarterly capacity plan | Change · planning | Demand vs capacity by team (grouped bars) | Program and Project Managers |
| Program milestone status | Change · planning/delivery | Milestones by project, planned vs forecast (timeline) | Project Managers, Program Managers |
| Sprint metrics roll-up | Change · delivery | Velocity by team (line); sprint-goal hit rate (bars) | Scrum Masters, Product Owners |

Charts use design-system colours: `midnight` and `blue` for main series, `gold` for targets, `orange` for the series to watch. Label lines directly where possible, and give every chart a text summary for screen readers.

## Repo structure

```
Pecos-Mutual-Product-Operations/
├─ CLAUDE.md                 # standing instructions for Claude Code
├─ docs/                     # handoff: this plan + the design system
├─ content/                  # the only place people write
│  ├─ index.md
│  ├─ operating-model/
│  ├─ run/
│  ├─ change/{discovery,planning,delivery}/
│  ├─ roles/
│  ├─ reports/
│  ├─ templates/
│  └─ glossary.md
├─ data/
│  ├─ reports/*.json         # fictional report data
│  └─ taxonomy.json          # roles, phases, activities: single source for nav + index
├─ src/
│  ├─ _includes/layouts/     # base, concept, playbook, role, report, template
│  ├─ _includes/partials/    # header, masthead, quicklinks, card, footer
│  └─ assets/                # tokens.css, bundle.css, site.css, logo + icons
├─ scripts/
│  ├─ charts.js              # JSON → inline SVG
│  ├─ export-knowledge.js    # content → knowledge/ + 00-index.md
│  └─ validate.js            # front-matter + broken-link checks
├─ knowledge/                # GENERATED: synced to the Claude project
├─ .github/workflows/deploy.yml
├─ eleventy.config.js
├─ package.json
└─ README.md
```

## Phased build plan

The work runs in five phases. Each ends with something Mike reviews before the next starts; open one pull request (or branch) per phase.

1. **Scaffold.** Eleventy, layouts and partials, design-system CSS, logo and icons, Cloudflare Pages deploy, CI build check, `taxonomy.json`, validator.
   - *Review:* live site with home page, navigation and one placeholder page of each type.
2. **Operating model and Change.** The 3 operating-model pages and the 14 Discovery, Planning and Delivery pages.
   - *Review:* read-through of the Change journey end to end; correct terms and practices before more content builds on them.
3. **Run, roles, templates and glossary.** The 5 Run pages, the 5 role guides, the 2 templates and the glossary.
   - *Review:* each role page lists the right playbooks.
4. **Reports.** Fictional datasets, chart helper, the 6 report pages.
   - *Review:* charts render with no JavaScript, numbers are internally consistent, each report is labelled demo data.
5. **Claude knowledge layer.** `export-knowledge.js`, `00-index.md`, project instructions, test-question set; connect the repo to a Claude project and run the tests.
   - *Review:* Claude answers the test questions from the right files and cites page URLs.

## Open questions and risks

- [x] **Visibility / hosting:** decided 2026-10-16. Host on Cloudflare Pages through its Git integration, so repo visibility doesn’t matter; `ci.yml` runs the build check.
- [x] **Practice language:** decided 2026-10-16 (defaults). Plain Scrum terms for Delivery; ITIL-style incident terms (Sev 1–4, incident commander, post-incident review); T-shirt sizes XS–XL; a two-gate Discovery intake: **Gate 1 – Idea accepted** and **Gate 2 – Ready for planning**.
- [x] **Home Teams vs project teams:** decided 2026-10-16 (default). Discretionary work takes a light intake straight into the Home Team’s own backlog and is delivered with Scrum. Only strategic projects go through full Discovery and Planning.
- [x] **Planning cadence:** decided 2026-10-16 (default). A fixed quarterly cycle with a one-day **Quarterly Planning** session; Program Managers, Project Managers, Product Owners and Product Managers attend, and Business Executives sign off the plan.

Risks:

- **Fictional-brand bleed:** the look is modeled on a real insurer's public site. All names, figures and copy stay fictional, and the footer marks it as a demo.
- **Stale Claude knowledge:** GitHub sync is manual in the Claude project; the README and the Action summary remind whoever merges to re-sync.
- **Drift between site and corpus:** avoided by generating both from `content/` and never editing `knowledge/` by hand.
