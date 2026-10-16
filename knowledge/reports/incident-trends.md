---
title: Incident trends
type: report
workstream: run
phase: incident
roles: [scrum-master, program-manager]
summary: "Incidents per week by severity and the trend in mean time to restore, July to September 2026. Demo data."
related: [playbooks/incident--triage-and-declare.md, playbooks/incident--post-incident-review.md, reports/platform-health-scorecard.md]
owner: Product Operations
updated: 2026-10-04
role_names: [Scrum Master, Program Manager]
phase_name: Incident Management
url: "https://pecos-mutual-product-ops.pages.dev/reports/incident-trends/"
source: content/reports/incident-trends.md
demo_data: true
as_of: 2026-10-04
period: "Weeks of Jul 6 to Sep 28, 2026"
data_source: Pecos Mutual incident tool export (fictional)
---

# Incident trends

> All figures in this report are fictional demo data. As of 2026-10-04. Period: Weeks of Jul 6 to Sep 28, 2026. Source: Pecos Mutual incident tool export (fictional).

**Headline:** Fewer incidents, and faster recovery. **Key figure:** 10 weeks Without a Sev 1 incident.

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

## Charts and their data

### Incidents per week by severity

Weekly incidents fell from an average of 16 in the first four weeks to 9.5 in the last four. The only Sev 1 was in the week of Jul 20.

| Category | Sev 1 | Sev 2 | Sev 3 | Sev 4 |
| --- | --- | --- | --- | --- |
| Jul 6 | 0 | 2 | 6 | 9 |
| Jul 13 | 0 | 1 | 5 | 8 |
| Jul 20 | 1 | 2 | 7 | 10 |
| Jul 27 | 0 | 1 | 5 | 7 |
| Aug 3 | 0 | 1 | 6 | 8 |
| Aug 10 | 0 | 2 | 4 | 7 |
| Aug 17 | 0 | 1 | 5 | 6 |
| Aug 24 | 0 | 0 | 4 | 7 |
| Aug 31 | 0 | 1 | 4 | 6 |
| Sep 7 | 0 | 1 | 3 | 6 |
| Sep 14 | 0 | 2 | 4 | 5 |
| Sep 21 | 0 | 2 | 3 | 5 |
| Sep 28 | 0 | 0 | 3 | 4 |

### Mean time to restore, Sev 1–2 incidents (hours)

Mean hours to restore service for Sev 1 and Sev 2 incidents fell from 4.5 in the week of Jul 6 to 1.4 in the week of Sep 21. Weeks with no Sev 1–2 incidents have no value.

| Category | MTTR |
| --- | --- |
| Jul 6 | 4.5h |
| Jul 13 | 3.8h |
| Jul 20 | 5.2h |
| Jul 27 | 3.1h |
| Aug 3 | 2.9h |
| Aug 10 | 2.4h |
| Aug 17 | 2h |
| Aug 24 | – |
| Aug 31 | 0.3h |
| Sep 7 | 0.7h |
| Sep 14 | 0.5h |
| Sep 21 | 1.4h |
| Sep 28 | – |

## Data table

Incidents per week by severity, and mean time to restore (demo data, as of 2026-10-04).

| Week of | Sev 1 | Sev 2 | Sev 3 | Sev 4 | Total | MTTR Sev 1–2 (hours) |
| --- | --- | --- | --- | --- | --- | --- |
| Jul 6 | 0 | 2 | 6 | 9 | 17 | 4.5 |
| Jul 13 | 0 | 1 | 5 | 8 | 14 | 3.8 |
| Jul 20 | 1 | 2 | 7 | 10 | 20 | 5.2 |
| Jul 27 | 0 | 1 | 5 | 7 | 13 | 3.1 |
| Aug 3 | 0 | 1 | 6 | 8 | 15 | 2.9 |
| Aug 10 | 0 | 2 | 4 | 7 | 13 | 2.4 |
| Aug 17 | 0 | 1 | 5 | 6 | 12 | 2 |
| Aug 24 | 0 | 0 | 4 | 7 | 11 | – |
| Aug 31 | 0 | 1 | 4 | 6 | 11 | 0.3 |
| Sep 7 | 0 | 1 | 3 | 6 | 10 | 0.7 |
| Sep 14 | 0 | 2 | 4 | 5 | 11 | 0.5 |
| Sep 21 | 0 | 2 | 3 | 5 | 10 | 1.4 |
| Sep 28 | 0 | 0 | 3 | 4 | 7 | – |
