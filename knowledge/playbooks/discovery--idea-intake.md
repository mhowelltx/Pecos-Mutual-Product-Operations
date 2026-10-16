---
title: Take in an idea with a one-page business case
type: playbook
workstream: change
phase: discovery
activity: idea-intake
roles: [product-manager, program-manager]
summary: "How to turn a request from the business into a one-page business case and take it to Gate 1, Idea accepted."
inputs: [idea or request from the business, named Business Executive sponsor]
outputs: [one-page business case, Gate 1 decision, entry in the idea log]
time: "1 to 2 weeks, including one 30-minute intake review"
related: [playbooks/discovery--high-level-design-review.md, concepts/run-change-and-discretionary-work.md, templates/discovery--one-page-business-case.md]
owner: Product Operations
updated: 2026-10-16
role_names: [Product Manager, Program Manager]
phase_name: Discovery
url: "https://pecos-mutual-product-ops.pages.dev/change/discovery/idea-intake/"
source: content/change/discovery/idea-intake.md
---

# Take in an idea with a one-page business case

## When to use

Use this playbook when someone in the business asks for a change that might be a strategic project. If the change fits inside one Home Team and is size S or smaller, it is probably Discretionary work. Add it to that Home Team's backlog instead.

## Roles

- **Product Manager:** leads. You write the business case with the sponsor and present it at the intake review.
- **Business Executive sponsor:** owns the business outcome and agrees the case is worth more work.
- **Program Manager:** runs the intake review, keeps the idea log and checks for overlap with work already in flight.

## Before you start

- Find a Business Executive sponsor. An idea without a sponsor doesn't go to intake.
- Search the idea log for anything similar, so you don't duplicate an idea that is already in progress.
- Check that the idea isn't Run work or Discretionary work. Use the questions in [Run, Change and Discretionary work](https://pecos-mutual-product-ops.pages.dev/operating-model/run-change-and-discretionary-work/).

## Steps

1. **Log the idea.** Add a line to the idea log with a working title, the sponsor and the date. The Program Manager assigns an ID.
2. **Meet the sponsor.** Spend 45 minutes on the problem, not the solution: who is affected, what it costs them today and what would change if we fixed it.
3. **Draft the business case.** Fill in the [one-page business case](https://pecos-mutual-product-ops.pages.dev/templates/one-page-business-case/) template. Keep it to one page. If you can't, the idea probably needs splitting.
4. **Name the measure of success.** Pick one or two measures you could check within 6 months of delivery, such as "cut first-report-of-injury handling time from 3 days to 1".
5. **Note the obvious risks and dependencies.** List the platforms and Home Teams the idea touches. You don't need a design yet.
6. **Send the case ahead.** Share the business case with the intake review attendees at least two working days before the review.
7. **Present at the intake review.** Take 10 minutes: problem, outcome, measure, sponsor. Leave the rest for questions.
8. **Record the Gate 1 decision.** The Product Manager and the sponsor decide one of:
   - **Accepted:** the idea moves to [high-level design review](https://pecos-mutual-product-ops.pages.dev/change/discovery/high-level-design-review/).
   - **Redirected:** it's Discretionary work, so it goes to the Home Team's backlog.
   - **Declined:** it stops here. Record the reason in the idea log.

## Outputs

- A one-page business case, stored with the idea log entry.
- A recorded Gate 1 decision with its date and reason.
- For accepted ideas, a named Product Manager who carries the idea through Discovery.

## Pitfalls

- **Bringing a solution instead of a problem.** The business case should still make sense if the eventual design is completely different.
- **Measures you can't check.** "Improve agent experience" can't be measured. "Halve quote turnaround for agents" can.
- **Skipping the sponsor.** Ideas without a Business Executive sponsor stall at prioritization, so it's better to find out at intake.
