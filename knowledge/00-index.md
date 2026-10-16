# Pecos Mutual Product Operations: knowledge index

Read this file first. It describes the operating model on one page, then lists every file in this knowledge base with what it covers, so you can pick the right files to answer a question. Pecos Mutual is a fictional workers' compensation insurer; every name and figure here is illustrative, and all report data is demo data.

Live site: https://pecos-mutual-product-ops.pages.dev

## The operating model on one page

Every piece of work belongs to one of two workstreams.

**Run.** Run-the-business work done by teams through Incident Management and Platform Health.
- **Incident Management:** Triage, declare and learn from incidents.
- **Platform Health:** Keep platforms reliable and review their health every month.

**Change.** Strategic projects delivered by cross-functional project teams, plus Discretionary work delivered by static Home Teams. Strategic projects move through three stages:
- **Discovery:** Ideation, estimation and prioritization. Business Executives work with Product Managers.
- **Planning:** Resource management, then goals and milestones for delivery within about 3 months.
- **Delivery:** The project team practices Scrum to deliver the project.

Discretionary work takes a light intake straight into a Home Team's backlog and is delivered with Scrum; only strategic projects go through full Discovery and Planning.

**Five roles** (always use these exact names):
- **Scrum Master:** Coaches the team in Scrum and clears impediments.
- **Product Owner:** Owns the backlog and the value each sprint delivers.
- **Program Manager:** Connects projects into a portfolio and manages capacity across teams.
- **Project Manager:** Plans goals and milestones and keeps a project on its path.
- **Product Manager:** Shapes ideas with Business Executives and decides what is worth building.

## How files are named

- `concepts/`, `playbooks/`, `roles/`, `templates/`: one file per page. Names start with the phase, for example `delivery--sprint-planning.md`; a stage overview is `<phase>--overview.md`.
- `reports/`: one Markdown file per report with its narrative, every chart's data and the full data table, plus a `.csv` of the table. Quote figures with the report's as-of date.
- `01-glossary.md`: every term and its definition.
- Each file's front-matter gives its type, workstream, phase, roles, summary and live `url`.

## Every file

### Operating model

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Roles at a glance | Concept | Run and Change | – | Scrum Master, Product Owner, Program Manager, Project Manager, Product Manager | What each of the five Product Operations roles owns, and where each one leads or joins in Run and Change. | concepts/roles-at-a-glance.md | https://pecos-mutual-product-ops.pages.dev/operating-model/roles-at-a-glance/ |
| Run, Change and Discretionary work | Concept | Run and Change | – | Scrum Master, Product Owner, Program Manager, Project Manager, Product Manager | How to tell Run work, strategic projects and Discretionary work apart, who does each, and which path each one takes. | concepts/run-change-and-discretionary-work.md | https://pecos-mutual-product-ops.pages.dev/operating-model/run-change-and-discretionary-work/ |
| The value delivery system | Concept | Run and Change | – | Scrum Master, Product Owner, Program Manager, Project Manager, Product Manager | How Pecos Mutual splits work into Run and Change, and how Change moves from Discovery through Planning to Delivery. | concepts/value-delivery-system.md | https://pecos-mutual-product-ops.pages.dev/operating-model/value-delivery-system/ |

### Change: Discovery

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Discovery | Concept | Change | Discovery | Product Manager, Program Manager | How a strategic idea becomes a sized, prioritized project that is ready for planning, and who does each step. | concepts/discovery--overview.md | https://pecos-mutual-product-ops.pages.dev/change/discovery/ |
| Take in an idea with a one-page business case | Playbook | Change | Discovery | Product Manager, Program Manager | How to turn a request from the business into a one-page business case and take it to Gate 1, Idea accepted. | playbooks/discovery--idea-intake.md | https://pecos-mutual-product-ops.pages.dev/change/discovery/idea-intake/ |
| Run a high-level design review | Playbook | Change | Discovery | Product Manager, Program Manager, Product Owner | How to agree a high-level design for an accepted idea, so it can be estimated and prioritized with confidence. | playbooks/discovery--high-level-design-review.md | https://pecos-mutual-product-ops.pages.dev/change/discovery/high-level-design-review/ |
| Estimate a project with T-shirt sizes | Playbook | Change | Discovery | Program Manager, Product Manager, Product Owner | How to give a reviewed design a T-shirt size from XS to XL that Planning can turn into team capacity. | playbooks/discovery--t-shirt-estimation.md | https://pecos-mutual-product-ops.pages.dev/change/discovery/t-shirt-estimation/ |
| Prioritize the portfolio | Playbook | Change | Discovery | Product Manager, Program Manager | How to rank sized ideas against each other each month and decide which are ready for planning at Gate 2. | playbooks/discovery--portfolio-prioritization.md | https://pecos-mutual-product-ops.pages.dev/change/discovery/portfolio-prioritization/ |

### Change: Planning

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Planning | Concept | Change | Planning | Program Manager, Project Manager, Product Owner | How prioritized projects become staffed plans with goals and milestones for the next quarter, signed off at Quarterly Planning. | concepts/planning--overview.md | https://pecos-mutual-product-ops.pages.dev/change/planning/ |
| Plan resources and capacity for the quarter | Playbook | Change | Planning | Program Manager, Project Manager, Product Owner | How to work out each Home Team's capacity for the quarter, protect the Run allowance and staff the projects that passed Gate 2. | playbooks/planning--capacity-planning.md | https://pecos-mutual-product-ops.pages.dev/change/planning/capacity-planning/ |
| Set goals and milestones for a ~3-month plan | Playbook | Change | Planning | Project Manager, Product Owner, Program Manager, Product Manager | How to break a staffed project into 2 to 4 goals and a milestone plan the team can deliver within one quarter. | playbooks/planning--goals-and-milestones.md | https://pecos-mutual-product-ops.pages.dev/change/planning/goals-and-milestones/ |
| Run the Quarterly Planning session | Playbook | Change | Planning | Program Manager, Project Manager, Product Owner, Product Manager | How to run the one-day Quarterly Planning session where teams confirm their plans, resolve dependencies and Business Executives sign off the quarter. | playbooks/planning--quarterly-planning.md | https://pecos-mutual-product-ops.pages.dev/change/planning/quarterly-planning/ |

### Change: Delivery

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Scrum at Pecos Mutual | Concept | Change | Delivery | Scrum Master, Product Owner, Project Manager | How project teams and Home Teams deliver with Scrum, from the sprint calendar to our Definition of Ready and Definition of Done. | concepts/delivery--overview.md | https://pecos-mutual-product-ops.pages.dev/change/delivery/ |
| Refine the backlog | Playbook | Change | Delivery | Product Owner, Scrum Master, Product Manager | How to get the next two sprints' worth of backlog items ready, so sprint planning is about commitment, not discovery. | playbooks/delivery--backlog-refinement.md | https://pecos-mutual-product-ops.pages.dev/change/delivery/backlog-refinement/ |
| Run a sprint planning session | Playbook | Change | Delivery | Scrum Master, Product Owner, Project Manager | How to turn a refined backlog into a committed sprint goal and a sprint backlog sized to the team's real capacity. | playbooks/delivery--sprint-planning.md | https://pecos-mutual-product-ops.pages.dev/change/delivery/sprint-planning/ |
| Run the daily scrum and clear impediments | Playbook | Change | Delivery | Scrum Master, Product Owner | How to keep the daily scrum to 15 focused minutes on the sprint goal, and how to track and clear the impediments it surfaces. | playbooks/delivery--daily-scrum.md | https://pecos-mutual-product-ops.pages.dev/change/delivery/daily-scrum/ |
| Run the sprint review and retrospective | Playbook | Change | Delivery | Scrum Master, Product Owner, Project Manager, Product Manager | How to show stakeholders what the sprint delivered, update the milestone forecast, and agree one improvement for the next sprint. | playbooks/delivery--sprint-review-retro.md | https://pecos-mutual-product-ops.pages.dev/change/delivery/sprint-review-retro/ |

### Run: Incident Management

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Incident Management | Concept | Run | Incident Management | Scrum Master, Program Manager, Product Manager | How we spot, declare, resolve and learn from incidents, with our severity levels and who does what. | concepts/incident--overview.md | https://pecos-mutual-product-ops.pages.dev/run/incidents/ |
| Triage and declare an incident | Playbook | Run | Incident Management | Scrum Master, Program Manager, Product Manager | How to check a problem's impact, set its severity, declare the incident and get the right people working on it within minutes. | playbooks/incident--triage-and-declare.md | https://pecos-mutual-product-ops.pages.dev/run/incidents/triage-and-declare/ |
| Run a post-incident review | Playbook | Run | Incident Management | Scrum Master, Program Manager, Product Manager | How to hold a blameless review after a Sev 1 or Sev 2 incident and turn what we learned into tracked actions. | playbooks/incident--post-incident-review.md | https://pecos-mutual-product-ops.pages.dev/run/incidents/post-incident-review/ |

### Run: Platform Health

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Platform Health | Concept | Run | Platform Health | Product Manager, Program Manager | How we measure and look after the reliability, performance, cost and risk of each platform, and act on what we find. | concepts/platform-health--overview.md | https://pecos-mutual-product-ops.pages.dev/run/platform-health/ |
| Run the monthly platform health review | Playbook | Run | Platform Health | Product Manager, Program Manager | How to review each platform's scorecard every month, decide what needs action and feed the results into backlogs and capacity planning. | playbooks/platform-health--monthly-health-review.md | https://pecos-mutual-product-ops.pages.dev/run/platform-health/monthly-health-review/ |

### Roles

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Product Manager | Role guide | Run and Change | – | Product Manager | What a Product Manager does at Pecos Mutual, where you show up in Run and Change, and your top tasks. | roles/product-manager.md | https://pecos-mutual-product-ops.pages.dev/roles/product-manager/ |
| Product Owner | Role guide | Run and Change | – | Product Owner | What a Product Owner does at Pecos Mutual, where you show up in Run and Change, and your top tasks. | roles/product-owner.md | https://pecos-mutual-product-ops.pages.dev/roles/product-owner/ |
| Program Manager | Role guide | Run and Change | – | Program Manager | What a Program Manager does at Pecos Mutual, where you show up in Run and Change, and your top tasks. | roles/program-manager.md | https://pecos-mutual-product-ops.pages.dev/roles/program-manager/ |
| Project Manager | Role guide | Run and Change | – | Project Manager | What a Project Manager does at Pecos Mutual, where you show up in Run and Change, and your top tasks. | roles/project-manager.md | https://pecos-mutual-product-ops.pages.dev/roles/project-manager/ |
| Scrum Master | Role guide | Run and Change | – | Scrum Master | What a Scrum Master does at Pecos Mutual, where you show up in Run and Change, and your top tasks. | roles/scrum-master.md | https://pecos-mutual-product-ops.pages.dev/roles/scrum-master/ |

### Templates

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| One-page business case | Template | Change | Discovery | Product Manager | A one-page Markdown template for taking a strategic idea to Gate 1, with a filled example. | templates/discovery--one-page-business-case.md | https://pecos-mutual-product-ops.pages.dev/templates/one-page-business-case/ |
| Milestone plan | Template | Change | Planning | Project Manager, Program Manager | A one-page plan of goals and milestones for delivering a project within about 3 months, with a filled example. | templates/planning--milestone-plan.md | https://pecos-mutual-product-ops.pages.dev/templates/milestone-plan/ |

### Reports (fictional demo data)

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Incident trends (as of 2026-10-04) | Report | Run | Incident Management | Scrum Master, Program Manager | Incidents per week by severity and the trend in mean time to restore, July to September 2026. Demo data. | reports/incident-trends.md | https://pecos-mutual-product-ops.pages.dev/reports/incident-trends/ |
| Platform Health scorecard (as of 2026-10-05) | Report | Run | Platform Health | Product Manager, Program Manager | Availability against target and error budget burn for six platforms in September 2026. Demo data. | reports/platform-health-scorecard.md | https://pecos-mutual-product-ops.pages.dev/reports/platform-health-scorecard/ |
| Portfolio intake and prioritization (as of 2026-09-04) | Report | Change | Discovery | Product Manager, Program Manager | How ideas moved through Discovery from April to August 2026, and how the Q4 ranked list compares on value and effort. Demo data. | reports/portfolio-intake.md | https://pecos-mutual-product-ops.pages.dev/reports/portfolio-intake/ |
| Program milestone status (as of 2026-09-11) | Report | Change | Delivery | Project Manager, Program Manager | Planned against done or forecast sprint for every Q3 2026 milestone, after sprint 5 of 6. Demo data. | reports/milestone-status.md | https://pecos-mutual-product-ops.pages.dev/reports/milestone-status/ |
| Quarterly capacity plan (as of 2026-09-11) | Report | Change | Planning | Program Manager, Project Manager | Change demand against capacity for each Home Team in the Q4 2026 draft plan, after the Run allowance. Demo data. | reports/capacity-plan.md | https://pecos-mutual-product-ops.pages.dev/reports/capacity-plan/ |
| Sprint metrics roll-up (as of 2026-09-25) | Report | Change | Delivery | Scrum Master, Product Owner | Velocity by team and sprint-goal hit rate for three teams across Q3 2026. Demo data. | reports/sprint-metrics.md | https://pecos-mutual-product-ops.pages.dev/reports/sprint-metrics/ |

### Reference

| Title | Type | Workstream | Phase | Roles | Summary | File | URL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Glossary | Glossary | Run and Change | – | Scrum Master, Product Owner, Program Manager, Project Manager, Product Manager | Plain definitions of the terms used across Product Operations playbooks and reports, with links to where each is used. | 01-glossary.md | https://pecos-mutual-product-ops.pages.dev/glossary/ |
