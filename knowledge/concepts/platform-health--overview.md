---
title: Platform Health
type: concept
workstream: run
phase: platform-health
roles: [product-manager, program-manager]
summary: "How we measure and look after the reliability, performance, cost and risk of each platform, and act on what we find."
inputs: [monitoring and SLO data, incident records, cost and security reports]
outputs: [monthly platform scorecard, reliability actions, Run allowance changes]
related: [concepts/incident--overview.md, playbooks/planning--capacity-planning.md, concepts/run-change-and-discretionary-work.md]
owner: Product Operations
updated: 2026-10-16
role_names: [Product Manager, Program Manager]
phase_name: Platform Health
url: "https://pecos-mutual-product-ops.pages.dev/run/platform-health/"
source: content/run/platform-health/index.md
---

# Platform Health

Platform Health is the steady, planned side of Run work. Incident Management reacts when something breaks. Platform Health looks ahead, so fewer things break.

## What it is

Every platform has a Home Team that owns it and a Product Manager who is accountable for its health. Each month, we review each platform against the same six measures.

| Measure | What we look at | Target |
| --- | --- | --- |
| **Availability** | Share of time the service works for users, against its service level objective (SLO) | 99.9% for customer-facing platforms, 99.5% for internal ones |
| **Error budget** | How much of the allowed unreliability (100% minus the SLO) the month used | Under 100% of budget |
| **Incidents** | Count by severity, and mean time to restore (MTTR) | No repeat Sev 1 or Sev 2 from the same cause |
| **Performance** | Response time for the main user journeys | Within each platform's agreed limits |
| **Security and currency** | Open vulnerabilities, and how far behind supported versions we are | No critical vulnerability older than 14 days |
| **Cost** | Monthly running cost against budget | Within 5% of budget |

## The error budget rule

An SLO of 99.9% allows about 43 minutes of downtime a month. That allowance is the **error budget**.

- **Budget left:** the Home Team spends its time as planned.
- **Budget used up:** reliability work goes ahead of Discretionary work in the Home Team's backlog until the platform is back within its SLO.

This rule settles the trade-off between new features and reliability before anyone has to argue about it.

## Who's involved

- **Product Manager:** leads the monthly review for their platforms and is accountable for the scorecard.
- **Program Manager:** looks across all platforms, tracks review actions and incident actions, and proposes changes to the Run allowance for the next quarter.
- **Home Team Product Owners and engineers:** bring the data and own the actions.

## Why it matters

The platforms we run are how employers report injuries, how injured employees get care and how policyholders pay. Small, regular attention keeps them reliable and keeps costs and risks from building up out of sight.

## How it connects

- Actions from the review go into the Home Team's backlog and draw on the **Run allowance**.
- A platform that keeps missing its targets gets a bigger Run allowance at the next [capacity planning](https://pecos-mutual-product-ops.pages.dev/change/planning/capacity-planning/).
- Results roll up into the platform health scorecard report.
