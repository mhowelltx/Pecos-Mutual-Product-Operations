---
title: Run the monthly platform health review
type: playbook
workstream: run
phase: platform-health
activity: monthly-health-review
roles: [product-manager, program-manager]
summary: How to review each platform's scorecard every month, decide what needs action and feed the results into backlogs and capacity planning.
headline: ["Monthly platform", "health review"]
inputs: [scorecard data for the month, open incident and review actions, last month's actions]
outputs: [published scorecard, reliability actions in Home Team backlogs, Run allowance recommendations]
time: 60 minutes in the first week of each month, plus 2 hours of preparation
related: [platform-health, post-incident-review, capacity-planning]
owner: Product Operations
updated: 2026-10-16
---

## When to use

Hold this review in the first week of every month, covering the month before. Plan one session for each group of platforms that shares a Product Manager.

## Roles

- **Product Manager:** leads. You present each platform's scorecard and decide what needs action.
- **Program Manager:** brings the cross-platform view and the open action list, and records decisions.
- **Home Team Product Owners and lead engineers:** explain the data and agree the actions their teams will take.

## Before you start

- Pull the month's data for the six measures: availability, error budget, incidents and MTTR, performance, security and currency, and cost.
- Fill in the scorecard for each platform, and mark each measure **green** (on target), **amber** (close to target) or **red** (missed).
- List the open actions from earlier reviews and from post-incident reviews.

## Steps

1. **Review last month's actions.** Go through each open action. Close the ones that are done, re-date the ones still moving, and escalate the ones that are stuck.
2. **Walk each scorecard.** For each platform, spend most of the time on red and amber measures. Skip the greens unless something surprising happened.
3. **Apply the error budget rule.** If a platform used up its error budget, confirm that reliability work goes ahead of Discretionary work in its Home Team backlog until it recovers.
4. **Look for patterns.** The Program Manager highlights repeats across platforms, such as the same contributing factor in several incidents or the same dependency failing.
5. **Agree actions.** For each red measure, agree one action with an owner and a due date. Keep them small enough to finish within a sprint or two.
6. **Check the Run allowance.** If a platform is red for two months running, the Program Manager records a recommendation to raise its Run allowance at the next capacity planning.
7. **Publish the scorecard** and the actions within 2 working days.

## Outputs

- A published scorecard for each platform, with green, amber and red ratings.
- Actions with owners and due dates, in the Home Team backlogs.
- Run allowance recommendations for the next capacity planning.

## Pitfalls

- **Reading the whole scorecard aloud.** Focus on red and amber. Everyone can read the greens themselves.
- **Actions without capacity.** Reliability actions come out of the Run allowance. If that allowance is always used up, raise it rather than letting actions slip.
- **Ignoring cost and security** because nothing is broken yet. Those are the risks that build up out of sight.
