---
title: One-page business case
type: template
workstream: change
phase: discovery
activity: idea-intake
roles: [product-manager]
summary: A one-page Markdown template for taking a strategic idea to Gate 1, with a filled example.
related: [idea-intake, high-level-design-review, portfolio-prioritization]
owner: Product Operations
updated: 2026-10-16
---

## Purpose

Use this business case at [idea intake](/change/discovery/idea-intake/) to explain a strategic idea on one page, so the intake review can make a Gate 1 decision. It describes the problem and the outcome, not the solution. The design comes later, at the [high-level design review](/change/discovery/high-level-design-review/).

Keep it to one page. If it won't fit, the idea probably needs splitting.

## The template

Copy the block below into the idea log entry.

```markdown
# Business case: <working title>

**Idea ID:** <from the idea log>  ·  **Date:** <yyyy-mm-dd>
**Business Executive sponsor:** <name>  ·  **Product Manager:** <name>

## The problem
<Who is affected, what they can't do or what it costs them today. Use numbers where you have them.>

## The outcome we want
<What will be different for them when this is done. One or two sentences.>

## How we'll know it worked
| Measure | Today | Target | Checked by |
| ------- | ----- | ------ | ---------- |
| <measure> | <baseline> | <target> | <date, within 6 months of delivery> |

## Why now
<What happens if we wait a quarter: a regulatory date, a contract, rising cost, risk.>

## What it touches
- Platforms: <list>
- Home Teams: <list>
- Known dependencies or risks: <list>

## Rough value
<A plain estimate of value, such as hours saved per month, cost avoided or revenue protected. A range is fine.>

## Gate 1 decision
<Accepted / Redirected to Discretionary / Declined>, <date>, <reason>
```

## A filled example

```markdown
# Business case: Online first report of injury for small employers

**Idea ID:** IDEA-0142  ·  **Date:** 2026-09-02
**Business Executive sponsor:** VP, Claims (fictional)  ·  **Product Manager:** Claims Experience PM (fictional)

## The problem
Employers with fewer than 20 employees report most injuries by phone or fax. Our claims
staff re-key each report, which takes about 25 minutes, and 1 in 8 reports comes back
for missing details. First contact with the injured employee takes 3 working days on average.

## The outcome we want
Small employers report an injury online in under 10 minutes, and we contact the injured
employee the next working day.

## How we'll know it worked
| Measure | Today | Target | Checked by |
| ------- | ----- | ------ | ---------- |
| Share of small-employer reports made online | 22% | 70% | 2027-06-30 |
| Days from report to first contact | 3.0 | 1.0 | 2027-06-30 |

## Why now
The phone line's contract ends next spring, and report volumes rise every summer.

## What it touches
- Platforms: Employer Portal, Claims Intake
- Home Teams: Employer Experience, Claims Platform
- Known dependencies or risks: identity checks for employer users; fax intake is retired afterwards

## Rough value
About 900 staff hours a month saved on re-keying and follow-up, plus faster care for
injured employees.

## Gate 1 decision
Accepted, 2026-09-09. Strong sponsor; moves to high-level design review.
```

All names and figures in this example are fictional.
