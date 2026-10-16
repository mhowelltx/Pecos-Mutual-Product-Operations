---
title: Incident trends
type: report
workstream: run
phase: incident
roles: [scrum-master, program-manager]
summary: Incidents per week by severity and the trend in mean time to restore, July to September 2026. Demo data.
dataset: incident-trends
related: [triage-and-declare, post-incident-review, platform-health-scorecard]
owner: Product Operations
updated: 2026-10-04
---

## Summary

Incidents fell steadily through the quarter. Weekly incidents averaged 16 in the first four weeks and 9.5 in the last four. We had one Sev 1, in the week of Jul 20, and none in the 10 weeks since. When Sev 1 and Sev 2 incidents do happen, we now restore service much faster.

## Findings

- **Fewer low-severity incidents.** Sev 3 and Sev 4 incidents account for most of the fall. Several of them came from alerts that post-incident reviews have since retuned.
- **Faster recovery.** Mean time to restore for Sev 1–2 incidents fell from 4.5 hours in the week of Jul 6 to under 1.5 hours in every week of September.
- **The Sep 21 week was the exception.** A 150-minute Underwriting Workbench outage pulled that week's mean up to 1.4 hours. Its post-incident review found a missed certificate renewal.
- **Six Sev 2 incidents in September,** across Claims Intake, Payments, Agent Portal and Underwriting Workbench. They match the downtime in the Platform Health scorecard.

## Actions

- **Scrum Masters:** keep running post-incident reviews within 5 working days. Their alert changes are behind most of the drop in Sev 3 and Sev 4 incidents.
- **Underwriting Workbench Home Team:** automate certificate renewal and alert 30 days before expiry. Owner: Policy Platform Product Owner.
- **Program Manager:** report open review actions monthly at the Platform Health review until they are closed.
