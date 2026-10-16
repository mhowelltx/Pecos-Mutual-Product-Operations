---
title: Prioritize the portfolio
type: playbook
workstream: change
phase: discovery
activity: portfolio-prioritization
roles: [product-manager, program-manager]
summary: How to rank sized ideas against each other each month and decide which are ready for planning at Gate 2.
inputs: [sized ideas with business cases, capacity forecast for next quarter, in-flight project status]
outputs: [ranked portfolio list, cut line, Gate 2 decisions]
time: "90-minute monthly portfolio review, plus 2 hours of preparation"
related: [playbooks/discovery--t-shirt-estimation.md, playbooks/planning--capacity-planning.md, playbooks/planning--quarterly-planning.md]
owner: Product Operations
updated: 2026-10-16
role_names: [Product Manager, Program Manager]
phase_name: Discovery
url: "https://pecos-mutual-product-ops.pages.dev/change/discovery/portfolio-prioritization/"
source: content/change/discovery/portfolio-prioritization.md
---

# Prioritize the portfolio

## When to use

Run this every month, and once more about four weeks before each quarter starts. That last review sets the list of projects going to Quarterly Planning.

## Roles

- **Product Manager:** leads. Each Product Manager presents their ideas and argues for their value.
- **Program Manager:** brings the capacity forecast, prepares the scoring sheet and draws the cut line.
- **Business Executives:** confirm the business value scores and agree the final ranking.

## How we score

Each idea gets three scores from 1 (low) to 5 (high):

- **Business value:** how much the outcome in the business case is worth.
- **Time criticality:** how much value we lose by waiting a quarter, for example because of a regulatory date.
- **Risk reduction:** how much it lowers operational, security or compliance risk.

Add the three scores, then divide by the size points: XS = 1, S = 2, M = 3, L = 5. The higher the result, the higher the rank. XL ideas must be split before they are scored.

The score informs the ranking but doesn't decide it. Business Executives can move an idea up or down, but they say why, and the reason is recorded.

## Before you start

- Make sure every idea on the list has a business case, a reviewed design and a T-shirt size.
- Get the next quarter's capacity forecast in team-sprints from the Program Manager. Subtract the Run allowance first.
- Update the status of in-flight projects. Work already in progress keeps its capacity unless the review decides to stop it.

## Steps

1. **Pre-score.** Product Managers propose scores for their own ideas. The Program Manager puts every idea on one sheet.
2. **Review the scores together.** Challenge any score that looks out of line with similar ideas. Business Executives have the final say on business value.
3. **Rank.** Sort by score, then adjust for dependencies. An idea can't rank above something it needs.
4. **Draw the cut line.** Walk down the ranked list, adding up the team-sprints at the middle of each idea's range. Draw the line where the total reaches the capacity forecast.
5. **Make the Gate 2 decisions.** Ideas above the cut line pass **Gate 2: Ready for planning**. Ideas below it stay ranked and are reviewed next month.
6. **Publish the ranked list** to all Product Managers, Program Managers and Business Executives the same day, with the reason for any manual moves.

## Outputs

- A ranked portfolio list, with scores and the cut line.
- Gate 2 decisions for every idea above the line.
- A record of manual moves and their reasons.

## Pitfalls

- **Ranking more than you can staff.** Everything above the cut line has to fit the capacity forecast, after the Run allowance.
- **Hidden priorities.** If an executive overrides the score, write down why, or the next review will have the same argument.
- **Stale scores.** Re-check scores every month. Time criticality especially changes quickly.
