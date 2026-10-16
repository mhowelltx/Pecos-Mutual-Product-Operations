---
title: Estimate a project with T-shirt sizes
type: playbook
workstream: change
phase: discovery
activity: t-shirt-estimation
roles: [program-manager, product-manager, product-owner]
summary: How to give a reviewed design a T-shirt size from XS to XL that Planning can turn into team capacity.
headline: ["T-shirt", "estimation"]
inputs: [reviewed high-level design, list of affected Home Teams]
outputs: [T-shirt size with team-sprint range, assumptions, split proposal for XL]
time: One 60-minute estimation session
related: [high-level-design-review, portfolio-prioritization, capacity-planning]
owner: Product Operations
updated: 2026-10-16
---

## When to use

Use this playbook once an idea has an approved high-level design. A T-shirt size is a rough range, not a commitment. It gives portfolio prioritization something to weigh value against, and gives Planning a starting point for capacity.

## Roles

- **Program Manager:** leads. You facilitate the session and keep sizes consistent across the portfolio.
- **Product Manager:** explains the outcome and answers scope questions.
- **Product Owners and senior engineers** from the affected Home Teams: do the estimating.

## The size scale

We count sizes in **team-sprints**: one team for one two-week sprint.

| Size | Team-sprints | What it usually looks like |
| --- | --- | --- |
| **XS** | 1 or fewer | A change one team can finish in a sprint |
| **S** | 2 to 3 | One team, a few sprints, no other teams involved |
| **M** | 4 to 6 | One team for about a quarter |
| **L** | 7 to 18 | Two or three teams for about a quarter |
| **XL** | More than 18 | Several teams or more than a quarter. Split it before Gate 2 |

Work of size **S** or smaller that stays within one Home Team is usually Discretionary, not a strategic project.

## Before you start

- Send the high-level design to the estimators two working days ahead.
- Bring two or three past projects with known actual sizes to use as reference points.

## Steps

1. **Walk through the design.** The Product Manager spends 10 minutes on the outcome and the recommended option.
2. **Estimate silently.** Each estimator picks a size on their own and writes it down.
3. **Reveal together.** If everyone agrees, record the size and skip to step 5.
4. **Discuss the spread.** Ask the highest and lowest estimators to explain their thinking. Re-estimate once. If the group still disagrees, record the larger size and note the disagreement as a risk.
5. **Write down the assumptions.** List what the size depends on, such as "reuses the existing claims API" or "no data migration".
6. **Split XL work.** If the size is XL, propose how to split it into projects of L or smaller, each with its own outcome. Each part goes through prioritization separately.
7. **Record the result** in the idea log: the size, its team-sprint range, the assumptions and the date.

## Outputs

- A T-shirt size and its team-sprint range.
- A list of assumptions behind the size.
- For XL ideas, a proposed split into L or smaller projects.

## Pitfalls

- **Treating a size as a deadline.** Dates come from Planning, after capacity is known.
- **Anchoring.** If someone says a number before the silent estimate, the group tends to follow it.
- **Forgetting Run work.** Team-sprints are for Change work only. Planning sets aside the Run allowance separately.
