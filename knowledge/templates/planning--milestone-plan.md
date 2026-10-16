---
title: Milestone plan
type: template
workstream: change
phase: planning
activity: goals-and-milestones
roles: [project-manager, program-manager]
summary: "A one-page plan of goals and milestones for delivering a project within about 3 months, with a filled example."
related: [playbooks/planning--goals-and-milestones.md, playbooks/planning--quarterly-planning.md, playbooks/planning--capacity-planning.md]
owner: Product Operations
updated: 2026-10-16
role_names: [Project Manager, Program Manager]
phase_name: Planning
url: "https://pecos-mutual-product-ops.pages.dev/templates/milestone-plan/"
source: content/templates/milestone-plan.md
---

# Milestone plan

## Purpose

Use this plan in Planning to break a prioritized, staffed project into goals and milestones the team can deliver within one quarter of six sprints. The Project Manager writes it using the [goals and milestones](https://pecos-mutual-product-ops.pages.dev/change/planning/goals-and-milestones/) playbook, presents it at [Quarterly Planning](https://pecos-mutual-product-ops.pages.dev/change/planning/quarterly-planning/), and updates the forecast at every sprint review.

## The template

Copy the block below into your project space.

```markdown
# Milestone plan: <project name>, <quarter>

**Project Manager:** <name>  ·  **Product Owner:** <name>  ·  **Product Manager:** <name>
**Business case:** <idea ID / link>  ·  **T-shirt size:** <size>  ·  **Capacity:** <team-sprints>

## Goals
1. <An outcome the business will notice>
2. <...>

## Milestones
| # | Milestone | Done when | Target sprint | Goal | Forecast |
| - | --------- | --------- | ------------- | ---- | -------- |
| 1 | <working, demonstrable step> | <testable condition> | S2 | 1 | On track |

## Capacity check
Milestone team-sprints: <total>  ·  Capacity: <total>  ·  Last sprint at least half free: <yes/no>

## Dependencies
| Needs | From team | By sprint | Agreed by |
| ----- | --------- | --------- | --------- |
| <what> | <team> | S3 | <name, date> |

## Risks
| Risk | Owner | Mitigation |
| ---- | ----- | ---------- |
| <risk> | <name> | <what we'll do> |
```

## A filled example

```markdown
# Milestone plan: Online first report of injury, Q1 2027

**Project Manager:** Claims Intake PjM (fictional)  ·  **Product Owner:** Employer Experience PO (fictional)
**Product Manager:** Claims Experience PM (fictional)
**Business case:** IDEA-0142  ·  **T-shirt size:** L  ·  **Capacity:** 11 team-sprints (2 teams)

## Goals
1. Small employers report an injury online in under 10 minutes.
2. Claims staff receive complete reports with no re-keying.

## Milestones
| # | Milestone | Done when | Target sprint | Goal | Forecast |
| - | --------- | --------- | ------------- | ---- | -------- |
| 1 | Pilot employers can sign in and start a report | 5 pilot employers start a report in production | S2 | 1 | On track |
| 2 | Reports flow into Claims Intake | A submitted report creates a claim with no re-keying | S3 | 2 | On track |
| 3 | Missing-detail checks | Reports can't be submitted with required fields blank | S4 | 2 | At risk |
| 4 | Open to all small employers | Online share above 40% for two weeks | S5 | 1 | On track |

## Capacity check
Milestone team-sprints: 9.5  ·  Capacity: 11  ·  Last sprint at least half free: yes

## Dependencies
| Needs | From team | By sprint | Agreed by |
| ----- | --------- | --------- | --------- |
| Employer identity check API | Identity Platform | S2 | Identity PO, at Quarterly Planning |

## Risks
| Risk | Owner | Mitigation |
| ---- | ----- | ---------- |
| Validation rules differ by state | PjM | Spike in S1; start with the two largest states |
```

All names and figures in this example are fictional.
