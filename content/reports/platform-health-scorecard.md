---
title: Platform Health scorecard
type: report
workstream: run
phase: platform-health
roles: [product-manager, program-manager]
summary: Availability against target and error budget burn for six platforms in September 2026. Demo data.
dataset: platform-health-scorecard
related: [monthly-health-review, platform-health, incident-trends]
owner: Product Operations
updated: 2026-10-05
---

## Summary

Five of our six platforms stayed within their error budget in September. Claims Intake did not. Two Sev 2 incidents, on Sep 9 and Sep 23, used 141% of its budget, so the error budget rule now puts reliability work ahead of Discretionary work on that platform. Payments finished the month at 90%, close to its limit.

## Findings

- **Claims Intake is red.** 61 minutes of downtime against a 43-minute budget. Both incidents involved the same document upload dependency.
- **Payments is amber.** Two short Sev 2 incidents (15 and 24 minutes) used 90% of its budget. A third incident of that size would have taken it over.
- **Four platforms are green**, including Underwriting Workbench. Its 150-minute outage on Sep 25 is within the larger budget of an internal platform with a 99.5% SLO.
- **Provider Billing and Employer Portal** used less than a third of their budgets.

## Actions

- **Claims Platform Home Team:** put the document upload fix and a retry queue at the top of the backlog until Claims Intake is back within its SLO. Owner: Claims Platform Product Owner.
- **Payments Home Team:** add an alert on payment-gateway timeouts before October's month-end peak. Owner: Payments Product Owner.
- **Program Manager:** carry the 30% Run allowance for Claims Platform into Q4, as the capacity plan proposes, and review it again at the November health review.
