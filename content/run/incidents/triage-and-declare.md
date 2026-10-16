---
title: Triage and declare an incident
type: playbook
workstream: run
phase: incident
activity: triage-and-declare
roles: [scrum-master, program-manager, product-manager]
summary: How to check a problem's impact, set its severity, declare the incident and get the right people working on it within minutes.
headline: ["Triage and", "declare"]
inputs: [alert or problem report, severity table, on-call and incident commander rotas]
outputs: [declared incident with severity, incident channel and record, first status update]
time: 5 to 15 minutes from first alert to declaration
related: [post-incident-review, incidents, monthly-health-review]
owner: Product Operations
updated: 2026-10-16
---

## When to use

Use this playbook as soon as an alert fires or someone reports that a service isn't working as it should. Don't wait to be sure. It's always fine to declare an incident and then close it as a false alarm.

## Roles

- **On-call engineer** from the owning Home Team: leads triage and declares the incident.
- **Incident commander:** takes over coordination for Sev 1 and Sev 2.
- **Product Manager:** confirms the customer impact and helps set the severity.
- **Scrum Master:** often steps in as communications lead or scribe.
- **Program Manager:** joins Sev 1 incidents to manage dependencies on other teams and to inform Business Executives.

## Before you start

- Know where to find the [severity table](/run/incidents/), the on-call rota and the incident commander rota.
- Have access to the incident tool and the status page.

## Steps

1. **Acknowledge the alert** within 5 minutes, so others know someone is on it.
2. **Check the impact.** Answer four questions quickly:
   - Who is affected: policyholders, agents, health care providers, injured employees or staff?
   - How many people are affected?
   - What can't they do?
   - Is data or security at risk?
3. **Set the severity** from the severity table. When in doubt, go higher.
4. **Declare the incident** in the incident tool. This opens an incident channel and an incident record with an ID.
5. **Call in an incident commander** for Sev 1 or Sev 2. Page the IC on rota, and the Product Manager for the platform. For Sev 1, also page the Program Manager on call.
6. **Hand over.** Give the IC a two-minute summary: what's broken, the impact, what you've tried. The IC assigns a communications lead and a scribe.
7. **Post the first update** within 15 minutes of declaring. Say what is affected, what we're doing, and when the next update will be.
8. **Work the problem.** The IC keeps the response focused on restoring service first. Root causes come later, in the review.
9. **Resolve and close.** When service is restored and stable for 30 minutes, the IC declares the incident resolved, posts a final update and, for Sev 1 or Sev 2, schedules the post-incident review.

## Outputs

- A declared incident, with a severity and an ID.
- An incident channel, and a record with a timeline.
- Status updates on the schedule the severity requires.
- For Sev 1 and Sev 2, a scheduled [post-incident review](/run/incidents/post-incident-review/).

## Pitfalls

- **Debugging before declaring.** Ten minutes of quiet investigation is ten minutes nobody else knows about.
- **The incident commander fixing things.** Once the IC starts debugging, nobody is coordinating.
- **Silence.** Even "no news yet, next update at 14:30" helps the people waiting.
