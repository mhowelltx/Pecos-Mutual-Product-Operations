---
title: Scrum at Pecos Mutual
type: concept
workstream: change
phase: delivery
roles: [scrum-master, product-owner, project-manager]
summary: How project teams and Home Teams deliver with Scrum, from the sprint calendar to our Definition of Ready and Definition of Done.
headline: ["Change:", "Delivery"]
inputs: [signed-off milestone plan, backlog items for the first milestone]
outputs: [working increments every sprint, updated milestone forecast]
related: [planning, value-delivery-system, roles-at-a-glance]
owner: Product Operations
updated: 2026-10-16
---

Delivery is the third stage of the Change lifecycle. The project team practices Scrum to deliver the milestones agreed at Quarterly Planning. Home Teams use the same practices for their Discretionary work.

## What it is

We follow the Scrum Guide, with a few house rules so that teams across Pecos Mutual work the same way.

- **Two-week sprints**, six per quarter. Every team starts and ends its sprints on the same days, so sprint reviews line up with milestones.
- **Three accountabilities.** The **Product Owner** orders the backlog and owns the value of each sprint. The **Scrum Master** coaches the team and clears impediments. The **Developers** are everyone who builds, tests and releases the work.
- **The Project Manager** works alongside the team on a strategic project. You track milestones, dependencies and risks across sprints. You don't assign tasks inside a sprint.

## The sprint calendar

| When | Event | Timebox | Playbook |
| --- | --- | --- | --- |
| Day 1 morning | Sprint planning | 2 hours | [Sprint planning](/change/delivery/sprint-planning/) |
| Every working day | Daily scrum | 15 minutes | [Daily scrum and impediments](/change/delivery/daily-scrum/) |
| Mid-sprint, about day 5 | Backlog refinement | 1 to 2 hours | [Backlog refinement](/change/delivery/backlog-refinement/) |
| Day 10 afternoon | Sprint review, then retrospective | 1 hour, then 90 minutes | [Sprint review and retrospective](/change/delivery/sprint-review-retro/) |

Refinement is ongoing work, not just a meeting. Plan to spend up to 10% of the team's capacity on it.

## Definition of Ready

A backlog item is ready for sprint planning when:

- it has a clear title and a "so that" stating its value;
- its acceptance criteria are written and the Product Owner agrees with them;
- the team has sized it, and it fits in one sprint;
- any dependency on another team is agreed, with a date;
- the team knows how to test it.

## Definition of Done

An item is done when:

- it meets its acceptance criteria;
- the code is reviewed, merged and covered by automated tests;
- it is deployed to production, or ready to deploy behind a feature flag;
- monitoring and alerts are in place for anything that changes how a platform runs;
- the user-facing help and the team's runbook are updated.

Work that doesn't meet the Definition of Done goes back on the backlog. It isn't shown at the sprint review.

## Run work during a sprint

Project team members stay on their Home Team's on-call rota unless capacity planning says otherwise. When an incident pulls someone away, the Scrum Master raises it at the next daily scrum, and the Product Owner decides whether to change the sprint scope. The Run allowance set in Planning is there so this doesn't break the milestone plan.

## How it connects

Delivery starts with the milestone plan from [Planning](/change/planning/). At each sprint review, the Project Manager updates the milestone forecast. That forecast feeds the program milestone status and sprint metrics reports.
