---
title: Plan resources and capacity for the quarter
type: playbook
workstream: change
phase: planning
activity: capacity-planning
roles: [program-manager, project-manager, product-owner]
summary: How to work out each Home Team's capacity for the quarter, protect the Run allowance and staff the projects that passed Gate 2.
headline: ["Resource and", "capacity planning"]
inputs: [ranked portfolio list with Gate 2 projects, Home Team rosters, known leave and on-call rotas]
outputs: [capacity plan in team-sprints, project team rosters, list of unstaffed projects]
time: About one week, starting 4 weeks before the quarter
related: [portfolio-prioritization, goals-and-milestones, quarterly-planning, run-change-and-discretionary-work]
owner: Product Operations
updated: 2026-10-16
---

## When to use

Run this once a quarter, starting four weeks before the quarter begins, straight after the final portfolio prioritization. Rerun steps 3 to 6 mid-quarter if a project is added, stopped or loses people.

## Roles

- **Program Manager:** leads. You build the capacity plan and make the staffing proposal.
- **Product Owners** of each Home Team: confirm team capacity, the Run allowance and the Discretionary share.
- **Project Managers:** review the proposed project team for their project and flag missing skills.

## Before you start

- Get the ranked portfolio list with the projects that passed Gate 2, their T-shirt sizes and their affected Home Teams.
- Collect each Home Team's roster, planned leave and on-call rota for the quarter.
- Check Platform Health findings. A platform with open reliability problems may need a larger Run allowance.

## Steps

1. **Count each Home Team's capacity.** A quarter is 6 sprints, so a full team has 6 team-sprints. Reduce that for planned leave, holidays and new starters.
2. **Take out the Run allowance.** Our default is 20% of each Home Team's capacity for Incident Management and Platform Health. Raise it for any platform with open reliability findings. Don't lower it below 10% without the Product Owner's agreement.
3. **Reserve the Discretionary share.** Agree with each Home Team's Product Owner how much of the rest goes to their own backlog. Keep at least 1 team-sprint per Home Team, so small improvements don't stop.
4. **Offer the rest to projects.** Go down the ranked list and assign capacity to each Gate 2 project, using the middle of its T-shirt range. Note which Home Teams each project draws on.
5. **Form project teams.** For each project, propose named people from the affected Home Teams. Each project team needs a Product Owner and a Scrum Master, plus the skills the design calls for. Check each proposal with the Project Manager.
6. **Mark what doesn't fit.** If a project can't be staffed, flag it as unstaffed. Don't spread people across more projects to make it fit.
7. **Publish the capacity plan** to Project Managers, Product Owners and Product Managers so milestone planning can start.

## Outputs

- A capacity plan per Home Team: total team-sprints, the Run allowance, the Discretionary share and the project allocation.
- A proposed roster for each project team.
- A list of unstaffed projects to raise at Quarterly Planning.

## Pitfalls

- **Planning to 100%.** People also do support, training and hiring. The Run allowance covers Run work only.
- **Splitting people across too many projects.** Someone on three projects makes progress on none. Aim for one project per person, two at most.
- **Quietly dropping the Run allowance.** When incidents arrive, they take the time anyway, and the project plan slips without anyone deciding it should.
