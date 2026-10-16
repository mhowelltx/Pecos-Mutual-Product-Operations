# Release 2: "Everyone else" — Build Plan

As of 2026-10-16 · Owner: Mike (mhowelltx) · Status: **approved 2026-10-16 with all defaults**

## Goal

Release 1 serves the five Product roles. But the operating model only works if many other people take part: Business Executives sponsor ideas and sign off plans, engineers build and go on call, subject-matter experts answer refinement questions and test the result, and security, finance and service-desk staff all have touchpoints. Today the site mentions these people (Business Executives alone are mentioned more than 30 times) but has nowhere written *for* them.

Release 2 adds an **"Everyone else"** entry point: a guide for each of these audiences that answers three questions in their terms.

1. **Where do I show up?** The moments in Run and Change that involve me.
2. **What do you need from me, and what can I expect back?**
3. **How do I…?** Short, task-first how-tos for the things they actually do: ask for a change, report a problem, give feedback at a sprint review.

The demo should show that the model is legible to the whole company, not just to Product Operations, and the Claude project should answer "I work in claims, how do I get something built?" as well as it answers Product Owner questions.

## Design principles

- **The five roles stay five.** CLAUDE.md fixes the role vocabulary. Everyone else is a separate list, **audiences**, never added to `roles`.
- **Audience-first, model-light.** Guides speak to people who don't care about Discovery vs Planning. Lead with the task ("Ask for a change"), and name the stage only as context.
- **Link, don't duplicate.** Guides point to existing playbooks for detail. How-tos cover only the audience's part of an activity.
- **Same machinery.** Front-matter, taxonomy-driven navigation, the validator, the knowledge export and the test set all extend to audiences, with no special cases.

## Proposed audiences (default list — see open question 1)

| Audience | Who they are | Main touchpoints |
| --- | --- | --- |
| **Business Executive** | Senior leaders who sponsor and fund change | Sponsor an idea at Gate 1, confirm value at portfolio prioritization, sign off at Quarterly Planning, read portfolio and capacity reports, informed of Sev 1 |
| **Business stakeholder** | Claims, underwriting, billing and service staff who need changes and use the platforms (subject-matter experts) | Ask for a change, answer refinement questions, give feedback at sprint reviews, test new work, report problems |
| **Engineer** | Developers on Home Teams and project teams: build, test, release | Scrum events, estimation, Definition of Done, on-call rota, post-incident reviews |
| **Architect** | Senior engineers and architects who shape designs | Draft the high-level design, estimation, dependency calls, post-incident reviews |
| **Incident commander** | The trained rota that coordinates Sev 1–2 responses | Take command, run communications, hand over, schedule the review |
| **Security, risk and compliance** | Information security, risk, legal and compliance partners | Design review input, Sev 1 data or security incidents, critical vulnerabilities in Platform Health |
| **People and finance partners** | People managers, resource and finance partners | Leave and headcount for capacity planning, budget questions at Gate 1, staffing project teams |
| **Customer-facing teams** | Service desk, agent support and provider support | Report problems, relay status updates to customers during incidents, hear about releases |

## Information architecture

```
Home
├─ … (unchanged)
└─ Everyone else   /everyone-else/          ← new hub, linked from "Just for:" row, footer and home page
   ├─ Working with Product Operations       ← concept: the model in 2 minutes, for non-Product readers
   ├─ Guides: one per audience (8)          /everyone-else/<audience>/
   └─ How-tos (6)                           /everyone-else/how-to/<task>/
```

- **Header:** the "Just for:" row gains **Everyone else** after the five roles. On mobile it joins the roles list in the menu.
- **Home page:** a new card row, "Not in a Product role?", with the audience icons; one quick link changes to **Ask for a Change**.
- **Footer:** "Just for:" column gains Everyone else.
- **Role pages:** gain a short "Who you work with" list linking to the relevant audience guides (driven by the same front-matter).

### Page list (15 new pages, ~8 edited)

| Section | Pages |
| --- | --- |
| Hub and overview (2) | Everyone else (hub) · Working with Product Operations (concept) |
| Audience guides (8) | Business Executive · Business stakeholder · Engineer · Architect · Incident commander · Security, risk and compliance · People and finance partners · Customer-facing teams |
| How-tos (6) | Ask for a change (idea or Discretionary request) · Report a problem with a platform · Sponsor an idea through Discovery · Give feedback at a sprint review · Test new work before release · Share capacity and leave for planning |
| Edited | ~8 existing playbooks gain `audiences` front-matter and a one-line "Others involved" section; glossary gains ~6 terms (audience, sponsor, subject-matter expert, service desk, acceptance testing, on-call rota) |

## Content model changes

```yaml
---
title: Ask for a change
type: how-to              # NEW type
workstream: change
phase: discovery
roles: [product-manager, product-owner]       # the Product roles who receive / own it (still required)
audiences: [business-stakeholder, business-executive]   # NEW, optional on all pages
summary: How to ask Product Operations for something new or better, and what happens next.
---
```

| Change | Detail |
| --- | --- |
| `data/taxonomy.json` | New `audiences` list (id, label, plural, url, icon, summary). New types `audience-guide` and `how-to`. Nav entry for Everyone else. |
| `audiences` front-matter | Optional on every page; values must come from the taxonomy (validator). Required and non-empty on `audience-guide` and `how-to`. |
| `audience-guide` type | Layout like the role guide. Required sections: who this is for, where you show up, what we need from you, what you can expect, your how-tos. Auto-lists how-tos and playbooks tagged with that audience, grouped by stage. |
| `how-to` type | Short, task-first: what it's for, before you start, steps (≤ 7), what happens next, who to contact. Sidebar shows the Product role you'll work with. |
| Validator | Checks audience ids, required sections for the two new types, and that every audience has a guide. |

## Claude knowledge layer

- Export adds `knowledge/audiences/<audience>.md` and `knowledge/how-to/<phase>--<task>.md`; front-matter gains `audience_names`.
- `00-index.md` gains an **Everyone else** section and a line in the one-page model: "If the person isn't in one of the five Product roles, start from the Everyone else guides."
- `PROJECT_INSTRUCTIONS.md` gains: answer non-Product people in plain language, lead with the how-to, and name the Product role they'll work with.
- Test set grows by ~8 questions, e.g. "I work in claims. How do I get a new report built?", "I'm a Business Executive. What do I sign off, and when?", "The agent portal is slow for my customers. Who do I tell?", and one out-of-scope question ("How do I file an expense?") that should be declined.

## Phased plan

Each phase is one branch and pull request, and stops for Mike's review, as in Release 1.

1. **Scaffold.** Taxonomy `audiences`, the two new types and their layouts, the hub, header/footer/home entry points, validator and export support, one placeholder guide and one placeholder how-to.
   - *Review:* navigation and layouts on the Cloudflare preview; the audience list is final before writing.
2. **Guides and tagging.** The overview concept and 8 audience guides; `audiences` tags and "Others involved" lines on existing playbooks; role pages link to audience guides.
   - *Review:* each audience guide lists the right touchpoints and playbooks.
3. **How-tos, glossary and knowledge.** The 6 how-tos, glossary terms, index and instructions updates, ~8 new test questions; re-sync the Claude project and run the tests.
   - *Review:* Claude answers the new questions from the right files and declines the out-of-scope one.

## Open questions (decided 2026-10-16: all defaults)

- [x] **Audience list.** Keep, merge or rename any of the 8 defaults? (Candidates to merge: Architect into Engineer; Incident commander into Engineer.) Does Pecos Mutual use a different name for business stakeholders, such as "business partner"?
- [x] **Label.** "Everyone else" in the navigation, or something warmer like "Working with us"? Default: "Everyone else", matching the "Just for:" pattern.
- [x] **Formal involvement.** Should existing playbooks gain explicit accountabilities for these audiences (a RACI-style line), or only an "Others involved" mention? Default: the mention.
- [x] **Same Claude project.** Add audiences to the existing project, or a separate "Ask Product Ops" project for the wider company? Default: same project, same corpus.
- [x] **Reports.** Any audience-specific reports (for example an executive one-page portfolio summary)? Default: none new; guides link to existing reports.
- [x] **Home page quick link.** Swap "Submit an Idea" for "Ask for a Change", which covers ideas and Discretionary requests? Default: yes.

## Risks

- **Role creep.** Audiences could blur into the five roles. Mitigation: separate taxonomy list and field; the validator rejects audience ids in `roles`.
- **Duplication.** How-tos could restate playbooks and drift. Mitigation: how-tos cover only the audience's steps and link to the playbook for the rest.
- **Tone.** Pages for executives and frontline staff need plainer language than the playbooks. Mitigation: a short voice note in each how-to template and a read-aloud check at review.
