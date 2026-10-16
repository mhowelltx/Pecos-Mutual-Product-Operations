---
title: Incident Management
type: concept
workstream: run
phase: incident
roles: [scrum-master, program-manager, product-manager]
summary: How we spot, declare, resolve and learn from incidents, with our severity levels and who does what.
headline: ["Run:", "Incident Management"]
inputs: [alerts, reports from policyholders, agents, providers or staff]
outputs: [restored service, incident record, post-incident review and actions]
related: [platform-health, run-change-and-discretionary-work, value-delivery-system]
owner: Product Operations
updated: 2026-10-16
---

Incident Management is how we respond when a platform stops working the way policyholders, agents, health care providers, injured employees or our own staff need it to. The goal is to restore service quickly, keep people informed, and learn enough to stop it happening again.

## What it is

An **incident** is any unplanned interruption to a service, or a drop in its quality. A platform that is down is an incident. So is one that is slow enough to stop people finishing a task, and so is a suspected security breach.

Every incident goes through the same path:

1. **Detect:** an alert fires, or someone reports a problem.
2. **Triage and declare:** the on-call engineer checks the impact, sets a severity and declares the incident. See [Triage and declare an incident](/run/incidents/triage-and-declare/).
3. **Respond:** the incident commander coordinates the fix and the communications until service is restored.
4. **Review:** for Sev 1 and Sev 2, the team holds a blameless [post-incident review](/run/incidents/post-incident-review/) and tracks the actions to done.

## Severity levels

| Severity | What it means | Examples | Response | Updates |
| --- | --- | --- | --- | --- |
| **Sev 1: Critical** | A core service is down for many users, or data or security is at risk | Employers can't report an injury online; a suspected data breach | Immediately, 24/7 | Every 30 minutes |
| **Sev 2: Major** | A core service is badly degraded, or down for a group of users | Premium payments fail for one payment method; claim status pages time out | Within 30 minutes, 24/7 | Every hour |
| **Sev 3: Minor** | A non-core feature is impaired, or a workaround exists | Document downloads are slow; one report runs late | Within 4 business hours | Daily |
| **Sev 4: Low** | No real effect on users yet | A cosmetic error; a warning that needs a look | Next sprint, via the backlog | None |

When in doubt, choose the higher severity. You can lower it once you know more, but a slow start can't be undone.

## Who does what

- **On-call engineer** from the Home Team that owns the platform: triages, declares, and often fixes.
- **Incident commander (IC):** coordinates the response for Sev 1 and Sev 2. The IC doesn't fix things; they keep everyone working on the right problem. ICs come from a trained rota.
- **Communications lead:** posts status updates on schedule, internally and, for Sev 1, to affected customers. Often a Scrum Master.
- **Scribe:** keeps the timeline of what happened and what was decided.
- **Product Manager:** judges the customer impact and approves customer-facing messages.
- **Program Manager:** tracks review actions across teams and spots patterns across incidents.
- **Scrum Master:** often acts as communications lead or scribe, runs the post-incident review, and helps the team re-plan its sprint after an incident.

## Why it matters

Policyholders, injured employees and health care providers rely on us at difficult moments. A clear, practised response shortens outages and keeps trust. A blameless review turns each incident into an improvement instead of a repeat.

## How it connects

- Time spent on incidents comes from the **Run allowance** set in [capacity planning](/change/planning/capacity-planning/).
- Review actions go into the owning Home Team's backlog, and patterns feed the monthly [Platform Health review](/run/platform-health/monthly-health-review/).
- The incident trends report shows incidents per week by severity and the trend in time to restore.
