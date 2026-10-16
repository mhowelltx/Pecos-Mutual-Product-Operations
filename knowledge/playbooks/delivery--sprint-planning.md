---
title: Run a sprint planning session
type: playbook
workstream: change
phase: delivery
activity: sprint-planning
roles: [scrum-master, product-owner, project-manager]
summary: How to turn a refined backlog into a committed sprint goal and a sprint backlog sized to the team's real capacity.
inputs: [refined backlog, team capacity for the sprint, milestone plan]
outputs: [sprint goal, sprint backlog]
time: Up to 2 hours for a two-week sprint
related: [playbooks/delivery--backlog-refinement.md, playbooks/delivery--daily-scrum.md, playbooks/delivery--sprint-review-retro.md, playbooks/planning--goals-and-milestones.md]
owner: Product Operations
updated: 2026-10-16
role_names: [Scrum Master, Product Owner, Project Manager]
phase_name: Delivery
url: "https://pecos-mutual-product-ops.pages.dev/change/delivery/sprint-planning/"
source: content/change/delivery/sprint-planning.md
---

# Run a sprint planning session

## When to use

Hold sprint planning on the morning of day 1 of every sprint, once the top of the backlog has been refined.

## Roles

- **Product Owner:** brings the ordered backlog and proposes the sprint goal.
- **Scrum Master:** facilitates and keeps the session to its timebox.
- **Developers:** decide how much work fits, plan how to do it and commit to the sprint backlog.
- **Project Manager** (on strategic projects): joins the first half hour to confirm how the sprint goal moves the next milestone, and to flag dependency dates.

## Before you start

- Make sure about two sprints of ready items sit at the top of the backlog.
- Work out the team's capacity for this sprint. Account for leave, holidays and on-call duty. Take the team's average velocity over the last three sprints as a guide.
- Check the milestone plan, so you know what this sprint must contribute.

## Steps

1. **Set the context.** In 5 minutes, the Product Owner restates the next milestone and says what was learned at the last sprint review.
2. **Propose a sprint goal.** The Product Owner proposes one goal for the sprint, in a single sentence that states an outcome, such as "Agents can see a quote's status without calling us".
3. **Choose the items.** Take ready items from the top of the backlog that serve the goal, until the team's capacity is reached. Leave about 10% free for refinement and surprises.
4. **Plan the work.** Developers break each item into tasks of a day or less. If an item turns out larger than it looked, say so now and drop or split it.
5. **Check dependencies.** Confirm that every dependency this sprint relies on is agreed. The Project Manager follows up on any that aren't.
6. **Agree the goal.** Re-read the sprint goal against the chosen items. Adjust the wording until the whole team agrees it is achievable.
7. **Commit and publish.** Publish the sprint goal and the sprint backlog where stakeholders can see them, such as the team board or channel.

## Outputs

- A sprint goal everyone can say in one sentence.
- A sprint backlog sized to the team's real capacity, with tasks for the first few days.

## Pitfalls

- **Planning to 100% capacity.** That leaves no room for Run work, incidents or anything learned during the sprint.
- **A goal that is just a list of items.** "Finish items 101 to 108" isn't a goal. Say what will be different for a user or the business.
- **Pulling in unready items.** If an item doesn't meet the Definition of Ready, it goes back to refinement, not into the sprint.
