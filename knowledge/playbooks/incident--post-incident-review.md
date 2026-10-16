---
title: Run a post-incident review
type: playbook
workstream: run
phase: incident
activity: post-incident-review
roles: [scrum-master, program-manager, product-manager]
summary: How to hold a blameless review after a Sev 1 or Sev 2 incident and turn what we learned into tracked actions.
inputs: [incident record and timeline, monitoring data, notes from responders]
outputs: [published review, contributing factors, actions with owners in team backlogs]
time: "60-minute review within 5 working days, plus 2 hours of preparation"
related: [playbooks/incident--triage-and-declare.md, playbooks/platform-health--monthly-health-review.md, playbooks/delivery--sprint-review-retro.md]
owner: Product Operations
updated: 2026-10-16
role_names: [Scrum Master, Program Manager, Product Manager]
phase_name: Incident Management
url: "https://pecos-mutual-product-ops.pages.dev/run/incidents/post-incident-review/"
source: content/run/incidents/post-incident-review.md
---

# Run a post-incident review

## When to use

Hold a post-incident review for every Sev 1 and Sev 2 incident, within 5 working days of resolving it. For Sev 3 incidents, hold one if the same problem has happened before or if the team asks for one.

## Roles

- **Scrum Master:** leads. You facilitate the review and keep it blameless.
- **Incident commander and responders:** walk through what happened and what they saw.
- **Product Manager:** describes the customer impact and checks that the actions address it.
- **Program Manager:** tracks actions that cross teams, and links this incident to any pattern from earlier ones.

## Before you start

- Draft the timeline from the incident record and the channel: detection, declaration, key decisions, resolution.
- Collect the monitoring data that shows the impact: start, end and how many people were affected.
- Invite everyone who responded, plus the Product Owner of the owning Home Team.

## Steps

1. **Set the tone.** Open by saying the review is blameless. We assume everyone did their best with what they knew at the time. We look for weaknesses in systems and processes, not in people.
2. **Agree the impact.** Who was affected, for how long, and what they couldn't do.
3. **Walk the timeline.** Go through it event by event. At each decision, ask what the person knew at that moment and why that choice made sense.
4. **Find contributing factors.** Ask what made this incident possible, what made it worse and what made it last longer. Most incidents have several factors, not one root cause.
5. **Note what went well.** Name the things that helped, so we keep doing them.
6. **Agree actions.** Each action addresses a contributing factor and has a single owner and a due date. Aim for 3 to 5 actions. Prefer actions that make the failure impossible over actions that make it less likely.
7. **Put the actions in backlogs.** Add each action to the owning team's backlog. The owning Home Team's Product Owner orders them, and they draw on the Run allowance.
8. **Publish the review** within 2 working days, where all teams can read it.
9. **Track to done.** The Program Manager reviews open actions every month at the [Platform Health review](https://pecos-mutual-product-ops.pages.dev/run/platform-health/monthly-health-review/) until they're closed.

## Outputs

- A published review: the impact, the timeline, contributing factors, what went well, and the actions.
- 3 to 5 actions, each with an owner and a due date, in team backlogs.
- A link to any earlier incident with the same factors.

## Pitfalls

- **Looking for someone to blame.** People stop telling you what really happened, and the next incident is harder to learn from.
- **"Be more careful" actions.** They don't change anything. Change the system, the alert or the process instead.
- **Actions nobody tracks.** An untracked action is just a wish. Review open actions every month until they're done.
