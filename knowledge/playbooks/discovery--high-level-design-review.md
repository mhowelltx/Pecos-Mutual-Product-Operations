---
title: Run a high-level design review
type: playbook
workstream: change
phase: discovery
activity: high-level-design-review
roles: [product-manager, program-manager, product-owner]
summary: "How to agree a high-level design for an accepted idea, so it can be estimated and prioritized with confidence."
inputs: [one-page business case at Gate 1, architecture notes for the affected platforms]
outputs: [reviewed high-level design, list of affected Home Teams, open risks]
time: "1 to 2 weeks of preparation, plus one 60-minute review"
related: [playbooks/discovery--idea-intake.md, playbooks/discovery--t-shirt-estimation.md]
owner: Product Operations
updated: 2026-10-16
role_names: [Product Manager, Program Manager, Product Owner]
phase_name: Discovery
url: "https://pecos-mutual-product-ops.pages.dev/change/discovery/high-level-design-review/"
source: content/change/discovery/high-level-design-review.md
---

# Run a high-level design review

## When to use

Use this playbook after an idea passes Gate 1. The aim is a design just detailed enough to size the work and see its risks. It isn't a full technical specification.

## Roles

- **Product Manager:** leads. You own the problem statement and the outcome the design has to reach.
- **Senior engineer or architect** from the main affected platform: drafts the design.
- **Program Manager:** checks dependencies on other projects and on shared platforms.
- **Product Owners** of the affected Home Teams: check the design against what their backlogs and platforms already do.

## Before you start

- Make sure the business case passed Gate 1, and have it to hand.
- Ask each affected Home Team for 1 to 2 hours of a senior engineer's time.
- Collect recent Platform Health findings for the platforms involved, because known reliability problems change the design.

## Steps

1. **Restate the outcome.** Open the design document with the problem and the measure of success from the business case.
2. **Sketch the options.** Describe two or three ways to reach the outcome, each in a short paragraph and a simple diagram. Include doing less, such as a manual or process change.
3. **Pick a recommended option.** Say why, in terms of the outcome, cost and risk.
4. **Name what changes.** List each platform, integration and Home Team the recommended option touches, and anything that must be retired.
5. **List risks and unknowns.** Mark each as *design*, *delivery* or *business*. Suggest a spike for any unknown big enough to change the size.
6. **Hold the review.** In 60 minutes, walk through the outcome, the options and the recommendation, then spend most of the time on risks.
7. **Record the decision.** Choose one:
   - **Approved:** move on to [T-shirt estimation](https://pecos-mutual-product-ops.pages.dev/change/discovery/t-shirt-estimation/).
   - **Approved with spikes:** time-box the spikes to one sprint, then estimate.
   - **Rework:** fix the gaps the review named and review again.

## Outputs

- A high-level design of 3 to 5 pages: the outcome, the options, the recommendation, what changes, and risks.
- A list of affected Home Teams. Planning uses it to form the project team.
- Open risks with an owner each.

## Pitfalls

- **Designing in full detail.** Detailed design happens in Delivery, inside sprints. Here you need just enough to size the work.
- **One option only.** Without alternatives, nobody can tell whether the recommendation is the right one.
- **Missing a Home Team.** Every team you forget becomes a surprise dependency in Delivery.
