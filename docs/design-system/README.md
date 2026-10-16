# Pecos Mutual design system

A copy of the design system built for this demo. Pecos Mutual is a fictional brand. It's modeled on the colours, type and component patterns of a real workers' comp insurer's public site, with an original logo and icons.

| Path | What |
| --- | --- |
| `BRAND.md` | Brand book: voice, colour use, type, layout, imagery, iconography, logo rules |
| `tokens.json` | Source tokens: colours (with usage notes), type styles, spacing, radius, shadow |
| `tokens.css` | The same tokens as CSS custom properties (`--midnight`, `--font-body`, `--space-section` …) and type-style classes |
| `components/bundle.css` | Component classes (`pm-btn`, `pm-masthead`, `pm-quicklinks`, `pm-card`, `pm-section-heading`, `pm-stat`, `pm-header`, `pm-footer` …); loads Google Fonts |
| `components/<Name>/README.md` | When and how to use each component, what content it needs |
| `components/<Name>/preview.html` | Reference markup; open in a browser to see it |
| `assets/Logos/` | Logo (light), reverse logo (dark grounds), square mark |
| `assets/Icons/` | 12 solid icons, orange by default, `*-blue.svg` variants |

Load order on a page: `tokens.css`, then `components/bundle.css`, then any site-specific CSS.
