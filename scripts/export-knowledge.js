// Writes knowledge/: the Markdown corpus a Claude project syncs from GitHub.
// Generated from content/, data/reports/ and data/knowledge/ — never edit knowledge/ by hand.
// Output is deterministic (no timestamps), so CI can fail when the committed copy is stale.
//
//   knowledge/00-index.md            map Claude reads first: operating model + one line per page
//   knowledge/01-glossary.md         every term
//   knowledge/PROJECT_INSTRUCTIONS.md text to paste into the Claude project
//   knowledge/{concepts,playbooks,roles,templates}/<phase>--<slug>.md
//   knowledge/reports/<slug>.md + <slug>.csv

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");
const OUT = path.join(ROOT, "knowledge");
// Normalise line endings so Windows and Linux checkouts produce identical output.
const lf = (s) => s.replace(/\r\n/g, "\n");
const read = (p) => lf(fs.readFileSync(path.join(ROOT, p), "utf8"));
const taxonomy = JSON.parse(read("data/taxonomy.json"));
const site = JSON.parse(read("data/site.json"));

const byId = (list) => Object.fromEntries(list.map((x) => [x.id, x]));
const ROLES = byId(taxonomy.roles);
const PHASES = byId(taxonomy.phases);
const WORKSTREAMS = byId(taxonomy.workstreams);
const TYPES = byId(taxonomy.types);
const FOLDER = { concept: "concepts", playbook: "playbooks", "role-guide": "roles", template: "templates", report: "reports" };
const SKIP = new Set(["home", "hub"]);
// Front-matter that only shapes the web page.
const DROP_KEYS = new Set(["headline", "placeholder", "layout", "permalink", "groupBy", "dataset"]);

const toPosix = (p) => p.split(path.sep).join("/");
const date = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v);

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith(".md") ? [path.join(dir, e.name)] : []));
}

// content/change/delivery/index.md → /change/delivery/ ; content/glossary.md → /glossary/
function urlOf(file) {
  const rel = toPosix(path.relative(CONTENT, file)).replace(/\.md$/, "");
  if (rel === "index") return "/";
  return "/" + rel.replace(/(^|\/)index$/, "") + "/";
}

// Site-relative Markdown links become absolute, so Claude can cite real URLs.
const absolutize = (md) => md.replace(/\]\((\/[^)\s]*)\)/g, (_, p) => `](${site.url}${p})`);

function yamlValue(v) {
  if (Array.isArray(v)) return `[${v.map((x) => yamlScalar(x)).join(", ")}]`;
  return yamlScalar(v);
}
function yamlScalar(v) {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  const s = String(date(v));
  return /^[\w ./~()+'–-]+$/.test(s) && !/^(true|false|null|yes|no)$/i.test(s) && !/: /.test(s) ? s : JSON.stringify(s);
}
function frontMatter(obj) {
  return "---\n" + Object.entries(obj).map(([k, v]) => `${k}: ${yamlValue(v)}`).join("\n") + "\n---\n";
}

function mdTable(columns, rows) {
  const cell = (c) => String(c ?? "–").replace(/\|/g, "\\|");
  return [`| ${columns.map(cell).join(" | ")} |`, `| ${columns.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`)].join("\n");
}
function csv(columns, rows) {
  const q = (c) => {
    const s = String(c ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [columns, ...rows].map((r) => r.map(q).join(",")).join("\n") + "\n";
}

// Every chart's underlying data as a Markdown table, so nothing is only in a picture.
function chartTable(c) {
  const u = (v) => (v == null ? "–" : `${v}${c.unit ?? ""}`);
  switch (c.type) {
    case "hbar":
      return mdTable(["Category", "Value"], c.categories.map((k, i) => [k, u(c.values[i])]));
    case "grouped-hbar":
    case "stacked-column":
    case "line":
      return mdTable(["Category", ...c.series.map((s) => s.name)], c.categories.map((k, i) => [k, ...c.series.map((s) => u(s.values[i]))]));
    case "scatter":
      return mdTable(["Item", "X", c.yLabel ?? "Y", "Group"], c.points.map((p) => [p.label, p.x, p.y, c.groups.find((g) => g.id === p.group)?.name ?? p.group]));
    case "timeline":
      return mdTable(["Group", "Item", "Planned", "Done or forecast", "State"], c.rows.map((r) => [r.group, r.label, r.planned, r.actual, r.done ? "Done" : "Forecast"]));
    default:
      throw new Error(`export-knowledge: no table for chart type "${c.type}"`);
  }
}

// ---------- Collect pages ----------
const pages = walk(CONTENT).map((file) => {
  const { data, content } = matter(lf(fs.readFileSync(file, "utf8")));
  const isIndex = path.basename(file) === "index.md";
  const slug = isIndex ? path.basename(path.dirname(file)) : path.basename(file, ".md");
  return { file, data, body: content.trim(), url: urlOf(file), isIndex, slug };
});

function outName(p) {
  if (p.data.type === "glossary") return "01-glossary.md";
  const folder = FOLDER[p.data.type];
  if (!folder) throw new Error(`export-knowledge: no folder for type "${p.data.type}" (${toPosix(path.relative(ROOT, p.file))})`);
  if (p.data.type === "report") return `${folder}/${p.slug}.md`;
  const base = p.isIndex ? "overview" : p.slug;
  return `${folder}/${p.data.phase ? `${p.data.phase}--` : ""}${base}.md`;
}

// related: [slug] → knowledge file names, so Claude can open them directly.
const fileForSlug = new Map(pages.filter((p) => !SKIP.has(p.data.type)).map((p) => [p.slug, outName(p)]));

const files = new Map(); // relative path → contents
const index = [];

for (const p of pages) {
  if (SKIP.has(p.data.type)) continue;
  const name = outName(p);
  const fm = { title: p.data.title };
  for (const [k, v] of Object.entries(p.data)) if (k !== "title" && !DROP_KEYS.has(k)) fm[k] = date(v);
  fm.role_names = (p.data.roles ?? []).map((r) => ROLES[r]?.label ?? r);
  if (p.data.phase) fm.phase_name = PHASES[p.data.phase]?.label;
  if (p.data.related) fm.related = p.data.related.map((slug) => fileForSlug.get(slug) ?? slug);
  fm.url = site.url + p.url;
  fm.source = toPosix(path.relative(ROOT, p.file));

  let body = absolutize(p.body);
  if (p.data.type === "report") {
    const d = JSON.parse(read(`data/reports/${p.data.dataset}.json`));
    Object.assign(fm, { demo_data: true, as_of: d.asOf, period: d.period ?? null, data_source: d.source });
    const charts = d.charts
      .map((c) => `### ${c.title}\n\n${c.summary}\n\n${chartTable(c)}`)
      .join("\n\n");
    body =
      `> All figures in this report are fictional demo data. As of ${d.asOf}.${d.period ? ` Period: ${d.period}.` : ""} Source: ${d.source}.\n\n` +
      `**Headline:** ${d.headline}. **Key figure:** ${[d.stat.big, d.stat.accent, d.stat.small].filter(Boolean).join(" ")}.\n\n` +
      `${body}\n\n## Charts and their data\n\n${charts}\n\n## Data table\n\n${d.table.caption} (demo data, as of ${d.asOf}).\n\n${mdTable(d.table.columns, d.table.rows)}`;
    files.set(name.replace(/\.md$/, ".csv"), csv(d.table.columns, d.table.rows));
  }
  files.set(name, `${frontMatter(fm)}\n# ${p.data.title}\n\n${body}\n`);
  index.push({ ...p, name, asOf: fm.as_of });
}

// ---------- 00-index.md ----------
const roleList = (ids) => (ids ?? []).map((r) => ROLES[r]?.label ?? r).join(", ");
const SECTIONS = [
  ["Operating model", (p) => p.url.startsWith("/operating-model/")],
  ["Change: Discovery", (p) => p.data.phase === "discovery" && p.data.type !== "template" && p.data.type !== "report"],
  ["Change: Planning", (p) => p.data.phase === "planning" && p.data.type !== "template" && p.data.type !== "report"],
  ["Change: Delivery", (p) => p.data.phase === "delivery" && p.data.type !== "template" && p.data.type !== "report"],
  ["Run: Incident Management", (p) => p.data.phase === "incident" && p.data.type !== "report"],
  ["Run: Platform Health", (p) => p.data.phase === "platform-health" && p.data.type !== "report"],
  ["Roles", (p) => p.data.type === "role-guide"],
  ["Templates", (p) => p.data.type === "template"],
  ["Reports (fictional demo data)", (p) => p.data.type === "report"],
  ["Reference", (p) => p.data.type === "glossary"],
];
const ACTIVITY_ORDER = new Map(taxonomy.activities.map((a, i) => [a.id, i]));
const order = (p) => (p.isIndex ? -1 : ACTIVITY_ORDER.get(p.data.activity) ?? ACTIVITY_ORDER.size);
const listed = new Set();
const sectionTables = SECTIONS.map(([heading, test]) => {
  const rows = index.filter((p) => !listed.has(p) && test(p)).sort((a, b) => order(a) - order(b) || a.data.title.localeCompare(b.data.title));
  rows.forEach((p) => listed.add(p));
  if (!rows.length) return "";
  const cols = ["Title", "Type", "Workstream", "Phase", "Roles", "Summary", "File", "URL"];
  const body = rows.map((p) => [
    p.data.title + (p.asOf ? ` (as of ${p.asOf})` : ""),
    TYPES[p.data.type]?.label ?? p.data.type,
    WORKSTREAMS[p.data.workstream]?.label ?? p.data.workstream,
    PHASES[p.data.phase]?.label ?? "–",
    roleList(p.data.roles),
    p.data.summary,
    p.name,
    site.url + p.url,
  ]);
  return `### ${heading}\n\n${mdTable(cols, body)}`;
}).filter(Boolean);
const missed = index.filter((p) => !listed.has(p));
if (missed.length) throw new Error(`export-knowledge: pages missing from the index: ${missed.map((p) => p.name).join(", ")}`);

const change = WORKSTREAMS.change, run = WORKSTREAMS.run;
const phaseLine = (id) => `- **${PHASES[id].label}:** ${PHASES[id].summary}`;
files.set(
  "00-index.md",
  `# ${site.name}: knowledge index

Read this file first. It describes the operating model on one page, then lists every file in this knowledge base with what it covers, so you can pick the right files to answer a question. Pecos Mutual is a fictional workers' compensation insurer; every name and figure here is illustrative, and all report data is demo data.

Live site: ${site.url}

## The operating model on one page

Every piece of work belongs to one of two workstreams.

**Run.** ${run.summary}
${phaseLine("incident")}
${phaseLine("platform-health")}

**Change.** ${change.summary} Strategic projects move through three stages:
${phaseLine("discovery")}
${phaseLine("planning")}
${phaseLine("delivery")}

Discretionary work takes a light intake straight into a Home Team's backlog and is delivered with Scrum; only strategic projects go through full Discovery and Planning.

**Five roles** (always use these exact names):
${taxonomy.roles.map((r) => `- **${r.label}:** ${r.summary}`).join("\n")}

## How files are named

- \`concepts/\`, \`playbooks/\`, \`roles/\`, \`templates/\`: one file per page. Names start with the phase, for example \`delivery--sprint-planning.md\`; a stage overview is \`<phase>--overview.md\`.
- \`reports/\`: one Markdown file per report with its narrative, every chart's data and the full data table, plus a \`.csv\` of the table. Quote figures with the report's as-of date.
- \`01-glossary.md\`: every term and its definition.
- Each file's front-matter gives its type, workstream, phase, roles, summary and live \`url\`.

## Every file

${sectionTables.join("\n\n")}
`,
);

// ---------- Glossary, instructions ----------
// (01-glossary.md is written above from content/glossary.md.)
files.set("PROJECT_INSTRUCTIONS.md", absolutize(read("data/knowledge/project-instructions.md")).trimEnd() + "\n");

// ---------- Write, removing anything stale ----------
// Empty the folder rather than deleting it (Windows refuses to remove a folder a shell is sitting in).
fs.mkdirSync(OUT, { recursive: true });
for (const entry of fs.readdirSync(OUT)) fs.rmSync(path.join(OUT, entry), { recursive: true, force: true });
for (const [rel, text] of [...files].sort(([a], [b]) => a.localeCompare(b))) {
  const target = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text);
}
console.log(`Knowledge export: ${files.size} files in knowledge/ (${index.length} pages).`);
