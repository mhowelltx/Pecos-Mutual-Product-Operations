---
title: Quarterly capacity plan
type: report
workstream: change
phase: planning
roles: [program-manager, project-manager]
summary: "Change demand against capacity for each Home Team in the Q4 2026 draft plan, after the Run allowance. Demo data."
related: [playbooks/planning--capacity-planning.md, playbooks/planning--quarterly-planning.md, reports/portfolio-intake.md]
owner: Product Operations
updated: 2026-09-11
role_names: [Program Manager, Project Manager]
phase_name: Planning
url: "https://pecos-mutual-product-ops.pages.dev/reports/capacity-plan/"
source: content/reports/capacity-plan.md
demo_data: true
as_of: 2026-09-11
period: "Q4 2026 (six sprints from Oct 5), draft before Quarterly Planning"
data_source: Pecos Mutual capacity planning sheet (fictional)
---

# Quarterly capacity plan

> All figures in this report are fictional demo data. As of 2026-09-11. Period: Q4 2026 (six sprints from Oct 5), draft before Quarterly Planning. Source: Pecos Mutual capacity planning sheet (fictional).

**Headline:** Agent Experience and Payments are over capacity. **Key figure:** 2 teams Over capacity for Q4.

## Summary

The draft Q4 plan has 38.8 team-sprints of capacity for Change, after the Run allowance, against 37 team-sprints of demand. In total it fits, but not team by team. Agent Experience and Payments are each 1.6 team-sprints short. Provider Services has 1.4 to spare, and Employer Experience has 1.8.

## Findings

- **Two teams are over capacity.** Agent Experience is staffing the agent quote status tracker, and Payments is staffing premium payment plans. Both are size M projects on one-team Home Teams, alongside each team's own Discretionary work.
- **Claims Platform carries a 30% Run allowance,** up from the default 20%, because Claims Intake has been close to or over its error budget. That still leaves room for claims document OCR.
- **Provider Services has no project work this quarter.** Its two candidate ideas fell below the cut line.
- **Policy Platform is nearly full,** with 8.5 of 8.8 team-sprints planned and two projects.

## Actions

- **Program Manager:** propose that two Provider Services engineers join the premium payment plans project team for Q4, and bring the proposal to Quarterly Planning.
- **Project Manager, agent quote status tracker:** plan a smaller first milestone set that fits 3.4 team-sprints, and move the rest to Q1 2027.
- **Home Team Product Owners:** confirm leave and on-call numbers by Sep 18, so the final plan reflects real capacity.

## Charts and their data

### Change demand against capacity by Home Team, Q4 (team-sprints)

Capacity for Change after the Run allowance, against project plus Discretionary demand. Employer Experience: capacity 8.8, demand 7; Claims Platform: capacity 8, demand 6.5; Agent Experience: capacity 4.4, demand 6; Payments: capacity 4.4, demand 6; Provider Services: capacity 4.4, demand 3; Policy Platform: capacity 8.8, demand 8.5.

| Category | Capacity for Change | Demand (projects + Discretionary) |
| --- | --- | --- |
| Employer Experience | 8.8 | 7 |
| Claims Platform | 8 | 6.5 |
| Agent Experience | 4.4 | 6 |
| Payments | 4.4 | 6 |
| Provider Services | 4.4 | 3 |
| Policy Platform | 8.8 | 8.5 |

## Data table

Q4 2026 capacity by Home Team (team-sprints) (demo data, as of 2026-09-11).

| Home Team | Capacity after leave | Run allowance | Capacity for Change | Project demand | Discretionary | Total demand | Spare (+) / short (−) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Employer Experience | 11 | 2.2 (20%) | 8.8 | 5 | 2 | 7 | +1.8 |
| Claims Platform | 11.5 | 3.5 (30%) | 8 | 5 | 1.5 | 6.5 | +1.5 |
| Agent Experience | 5.5 | 1.1 (20%) | 4.4 | 5 | 1 | 6 | −1.6 |
| Payments | 5.5 | 1.1 (20%) | 4.4 | 5 | 1 | 6 | −1.6 |
| Provider Services | 5.5 | 1.1 (20%) | 4.4 | 0 | 3 | 3 | +1.4 |
| Policy Platform | 11 | 2.2 (20%) | 8.8 | 7.5 | 1 | 8.5 | +0.3 |
