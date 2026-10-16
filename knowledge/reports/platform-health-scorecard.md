---
title: Platform Health scorecard
type: report
workstream: run
phase: platform-health
roles: [product-manager, program-manager]
summary: Availability against target and error budget burn for six platforms in September 2026. Demo data.
related: [playbooks/platform-health--monthly-health-review.md, concepts/platform-health--overview.md, reports/incident-trends.md]
owner: Product Operations
updated: 2026-10-05
role_names: [Product Manager, Program Manager]
phase_name: Platform Health
url: "https://pecos-mutual-product-ops.pages.dev/reports/platform-health-scorecard/"
source: content/reports/platform-health-scorecard.md
demo_data: true
as_of: 2026-10-05
period: September 2026
data_source: Pecos Mutual monitoring and SLO exports (fictional)
---

# Platform Health scorecard

> All figures in this report are fictional demo data. As of 2026-10-05. Period: September 2026. Source: Pecos Mutual monitoring and SLO exports (fictional).

**Headline:** Claims Intake used 141% of its error budget. **Key figure:** 5 of 6 Within their error budget.

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

## Charts and their data

### Availability against target: error budget used by platform, September

Share of each platform's monthly error budget used. Employer Portal 28%, Claims Intake 141%, Agent Portal 69%, Payments 90%, Provider Billing 12%, Underwriting Workbench 69%. Only Claims Intake went over 100%.

| Category | Value |
| --- | --- |
| Employer Portal | 28% |
| Claims Intake | 141% |
| Agent Portal | 69% |
| Payments | 90% |
| Provider Billing | 12% |
| Underwriting Workbench | 69% |

### Error budget burn through September

Cumulative share of the monthly error budget used. Claims Intake reached 93% after its Sep 9 incident and 141% after Sep 23. Payments reached 90%.

| Category | Claims Intake | Payments |
| --- | --- | --- |
| Sep 1 | 0% | 0% |
| Sep 7 | 0% | 35% |
| Sep 14 | 93% | 35% |
| Sep 21 | 93% | 90% |
| Sep 28 | 141% | 90% |
| Sep 30 | 141% | 90% |

## Data table

Platform scorecard, September 2026 (demo data, as of 2026-10-05).

| Platform | Type | SLO | Availability | Downtime (min) | Error budget used | Sev 1–2 incidents | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Employer Portal | Customer-facing | 99.9% | 99.972% | 12 | 28% | 0 | Green |
| Claims Intake | Customer-facing | 99.9% | 99.859% | 61 | 141% | 2 | Red |
| Agent Portal | Customer-facing | 99.9% | 99.931% | 30 | 69% | 1 | Green |
| Payments | Customer-facing | 99.9% | 99.910% | 39 | 90% | 2 | Amber |
| Provider Billing | Customer-facing | 99.9% | 99.988% | 5 | 12% | 0 | Green |
| Underwriting Workbench | Internal | 99.5% | 99.653% | 150 | 69% | 1 | Green |
