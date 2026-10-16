Pecos Mutual is a fictional, policyholder-owned workers' compensation insurer used for demo sites. The look is plain-spoken and proud of the state: deep midnight blue, a single gold star, serif headlines with real working people in the photos, and orange task icons that get employers where they need to go.

## Content fundamentals

- **Voice:** neighborly and steady, "we" for the company, "you" for the reader. Talk about people and businesses, not policies: *"Here in the state, we believe in taking care of our own."*
- **Audiences are named outright.** Navigation and pages say who they're for: "Just for Employers", "Just for: Agents · Health Care Providers · Injured Employees".
- **Headlines:** masthead `h1` is ALL CAPS, 2–4 short lines, last line gold (*"BUILDING A SAFER / STATE FOR ALL"*). Section `h2`s are sentence case with no period (*"Coverage that works"*, *"Why Pecos Mutual is right for you"*).
- **Tasks are verbs:** "Report an Injury", "Find a Doctor or Pharmacy", "Make a Payment", "Report Your Payroll", "Download Forms", "Read FAQs".
- **Buttons:** 2–3 words, all caps — GET STARTED, LOGIN, FIND AN AGENT, COMMUNITY FUNDING.
- **Proof points** are concrete (dividends returned, businesses covered, years of service), each in its own white card. In a demo, mark figures as illustrative.
- Bilingual: every page offers a Spanish path ("Explore more | Aprenda más", "En Español" in the footer).
- No emoji, no exclamation points, no insurance jargon without a plain explanation next to it.

## Visual foundations

**Colour.** Three grounds: `white`, `surface-alt` (pale blue-grey) and `midnight`. Footer is `navy`. Sections alternate white → `surface-alt` → `midnight` down the page.
- On `midnight`: headlines `white`, highlight line and card titles `gold`, copy `body-light`, stat accent `sky`.
- On light grounds: headlines `midnight`, strong text `ink`, copy `body` (source value; use `body-accessible` when WCAG AA matters), links `orange` (or `orange-text` for AA).
- `blue` is reserved for header/nav links, the footer Subscribe button and the blue icon variant.
- `gold` never appears as text on white.

**Type.** Three families:
- `headline` (serif, 700) — `h1`, `h2`, `stat`. The live site uses Adobe's IvyPresto; this system substitutes **Playfair Display** (Google Fonts). Swap the family stack if you license IvyPresto.
- `body` (**Montserrat**) — `eyebrow`, `card-heading`, `body` 14/155% with 0.02em tracking, `quicklink`, `button` (600, caps, 0.08em).
- `ui` (**Open Sans**) — header nav (`nav`, `nav-utility`) and footer (`footer-heading`, `footer-link`, `legal`).

**Layout.** Container 94% wide, max `container-max` (1200px). Sections pad `space-section` (60px on mobile). Two-column text + image rows with a `space-70` gutter, image alternating left/right. Card grids are three-up with `space-small` gutters.

**Shape.** Everything is square (`radius-none`): buttons, cards, photos, inputs. The one exception is the quick-link bar (`radius-pill`), which goes square on mobile.

**Depth & motion.** Flat. The only shadow is `shadow-card-hover`; linked cards lift icon and title 8px on hover (0.2s ease). Button hovers swap fills (gold → filled gold; dark/white → `sky`). Quick links grow an orange underline from the centre.

**Imagery.** Documentary photos of real workers on the job — forklifts, welding, barbershops, bakeries, clinics, construction — warm and natural light. Masthead photos fade into `midnight` from the left. Photo collages use tight 4px gaps. No illustration, no stock-handshake clichés. (No photos ship with this system; supply your own licensed images.)

**Signature details.** The five-point `gold` star between two `rule` hairlines under centred headings; the gold last line of the masthead; big serif stat callouts between hairlines on midnight.

**Focus.** 2px solid `focus` (blue) ring, 2px offset on light grounds; `gold` on midnight.

**Accessibility notes.** Source pairs kept exact but failing AA for small text: `body` on `white` (3.6:1) and on `surface-alt` (3.3:1); `orange` link text on `white` (3.2:1). The intentional additions `body-accessible` and `orange-text` pass.

## Iconography

- **Style:** solid, single-colour filled glyphs on a 48px grid, with negative-space details (an exclamation in a diamond, a $ on a receipt). No outlines, no duotone.
- **Colour:** `orange` in quick links and value cards; `blue` in menus and on white utility panels. Each icon ships in both (`*-blue.svg`). Inks are fixed in the files (`#e36f1e`, `#0063b8`) — `<img>` cannot recolour them.
- **Sizes:** 36×34 in quick links, up to 100×80 in cards.
- The set (`assets/Icons/`) is an original drawing in the site's style, not copied from it: report-injury, find-a-doctor, make-a-payment, report-payroll, download-forms, read-faqs, dividends, responsive-service, safety-cone, safety-hard-hat, coverage-shield, building.
- For anything missing, use Font Awesome 6 Solid (the live site loads FA 6.5.2) tinted `orange` or `blue`.

## Logo

`assets/Logos/` holds the fictional Pecos Mutual mark: a `midnight` square with a `gold` star over a gold horizon rule, the "Pecos" serif wordmark and spaced MUTUAL caps, with the WORKERS' COMPENSATION INSURANCE descriptor. Use `pecos-mutual-logo.svg` on white (header), `pecos-mutual-logo-reverse.svg` on `navy`/`midnight` (footer), `pecos-mutual-mark.svg` for favicons and tight spaces. Keep clear space equal to the star's height. Never place a real insurer's logo or name in its place.
