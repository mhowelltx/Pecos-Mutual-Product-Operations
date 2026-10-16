// Build check. Runs after Eleventy in `npm run build` and exits non-zero on any error.
//  1. Every page in content/ has the required front-matter, with values from data/taxonomy.json.
//  2. Every internal link and asset reference in _site/ resolves to a built file.
// Warnings (not failures): `related` slugs and `activity` ids that don't exist yet.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderChart } from "./charts.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");
const SITE = path.join(ROOT, "_site");
const taxonomy = JSON.parse(fs.readFileSync(path.join(ROOT, "data/taxonomy.json"), "utf8"));

const REQUIRED = ["title", "type", "workstream", "phase", "roles", "summary"];
const ids = (list) => new Set(list.map((x) => x.id));
const TYPES = ids(taxonomy.types);
const WORKSTREAMS = ids(taxonomy.workstreams);
const PHASES = ids(taxonomy.phases);
const ROLES = ids(taxonomy.roles);
const ACTIVITIES = ids(taxonomy.activities);
const PHASE_WORKSTREAM = new Map(taxonomy.phases.map((p) => [p.id, p.workstream]));

const errors = [];
const warnings = [];
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

function walk(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full, ext);
    return e.name.endsWith(ext) ? [full] : [];
  });
}

// Reports: the dataset exists, is marked demo data, has an as-of date, a table whose rows match
// its columns, and charts the chart helper can draw; the page has its required sections.
function checkReport(where, data, body) {
  const file = path.join(ROOT, "data/reports", `${data.dataset}.json`);
  if (!fs.existsSync(file)) return errors.push(`${where}: report dataset data/reports/${data.dataset}.json not found`);
  const d = JSON.parse(fs.readFileSync(file, "utf8"));
  const ds = rel(file);
  if (d.demo !== true) errors.push(`${ds}: must set "demo": true (all report data is fictional)`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.asOf ?? "")) errors.push(`${ds}: "asOf" must be a yyyy-mm-dd date`);
  for (const k of ["source", "headline"]) if (!d[k]) errors.push(`${ds}: missing "${k}"`);
  if (!d.stat?.big || !d.stat?.accent) errors.push(`${ds}: "stat" needs big and accent`);
  const cols = d.table?.columns?.length;
  if (!cols || !d.table.rows?.length) errors.push(`${ds}: needs a table with columns and rows`);
  else d.table.rows.forEach((r, i) => r.length !== cols && errors.push(`${ds}: table row ${i + 1} has ${r.length} cells, expected ${cols}`));
  if (!d.charts?.length) errors.push(`${ds}: needs at least one chart`);
  for (const c of d.charts ?? []) {
    try {
      renderChart(c);
    } catch (e) {
      errors.push(`${ds}: ${e.message}`);
    }
  }
  for (const h of ["Summary", "Findings", "Actions"]) {
    if (!new RegExp(`^## ${h}\\s*$`, "m").test(body)) errors.push(`${where}: report body needs a "## ${h}" section`);
  }
}

// ---------- 1. Front-matter ----------
const pages = walk(CONTENT, ".md");
// Same as Eleventy's fileSlug: an index.md takes its folder's name.
const slugOf = (f) => (path.basename(f) === "index.md" ? path.basename(path.dirname(f)) : path.basename(f, ".md"));
const slugs = new Set(pages.map(slugOf));

for (const file of pages) {
  const where = rel(file);
  let data, body;
  try {
    ({ data, content: body } = matter(fs.readFileSync(file, "utf8")));
  } catch (e) {
    errors.push(`${where}: front-matter is not valid YAML (${e.message.split("\n")[0]})`);
    continue;
  }

  for (const key of REQUIRED) {
    if (!(key in data)) errors.push(`${where}: missing required front-matter "${key}"`);
  }
  for (const key of ["title", "summary"]) {
    if (key in data && (typeof data[key] !== "string" || !data[key].trim())) {
      errors.push(`${where}: "${key}" must be a non-empty string`);
    }
  }
  if ("type" in data && !TYPES.has(data.type)) {
    errors.push(`${where}: type "${data.type}" is not one of ${[...TYPES].join(", ")}`);
  }
  if ("workstream" in data && !WORKSTREAMS.has(data.workstream)) {
    errors.push(`${where}: workstream "${data.workstream}" is not one of ${[...WORKSTREAMS].join(", ")}`);
  }
  if ("phase" in data && data.phase !== null && !PHASES.has(data.phase)) {
    errors.push(`${where}: phase "${data.phase}" is not null or one of ${[...PHASES].join(", ")}`);
  }
  const phaseWorkstream = PHASE_WORKSTREAM.get(data.phase);
  if (phaseWorkstream && WORKSTREAMS.has(data.workstream) && data.workstream !== phaseWorkstream) {
    errors.push(`${where}: phase "${data.phase}" belongs to workstream "${phaseWorkstream}", not "${data.workstream}"`);
  }
  if ("roles" in data) {
    if (!Array.isArray(data.roles) || data.roles.length === 0) {
      errors.push(`${where}: "roles" must be a non-empty list`);
    } else {
      for (const r of data.roles) {
        if (!ROLES.has(r)) errors.push(`${where}: role "${r}" is not one of ${[...ROLES].join(", ")}`);
      }
    }
  }
  if (data.activity && !ACTIVITIES.has(data.activity)) {
    warnings.push(`${where}: activity "${data.activity}" is not in data/taxonomy.json`);
  }
  for (const slug of data.related ?? []) {
    if (!slugs.has(slug)) warnings.push(`${where}: related page "${slug}" doesn't exist yet`);
  }
  if (data.type === "report") checkReport(where, data, body);
}

// ---------- 2. Internal links ----------
if (!fs.existsSync(SITE)) {
  errors.push("_site/ not found: run Eleventy before validating");
} else {
  const ATTR = /\s(?:href|src)="([^"]*)"/g;
  for (const file of walk(SITE, ".html")) {
    const html = fs.readFileSync(file, "utf8");
    for (const [, raw] of html.matchAll(ATTR)) {
      if (!raw || /^(?:[a-z]+:|\/\/|#)/i.test(raw)) continue; // external, mailto, protocol-relative, fragment
      const clean = decodeURI(raw.split(/[?#]/)[0]);
      const target = clean.startsWith("/")
        ? path.join(SITE, clean)
        : path.join(path.dirname(file), clean);
      const ok =
        (fs.existsSync(target) && fs.statSync(target).isFile()) ||
        fs.existsSync(path.join(target, "index.html"));
      if (!ok) errors.push(`${rel(file)}: broken internal link "${raw}"`);
    }
  }
}

// ---------- 3. Knowledge corpus ----------
// export-knowledge.js runs before this. Check the corpus exists and that every
// test question points at files that are really there.
const KNOWLEDGE = path.join(ROOT, "knowledge");
for (const f of ["00-index.md", "01-glossary.md", "PROJECT_INSTRUCTIONS.md"]) {
  if (!fs.existsSync(path.join(KNOWLEDGE, f))) errors.push(`knowledge/${f} missing: run npm run build`);
}
const tests = JSON.parse(fs.readFileSync(path.join(ROOT, "data/knowledge/test-questions.json"), "utf8"));
for (const q of tests.questions) {
  for (const f of q.expect_files) {
    if (!fs.existsSync(path.join(KNOWLEDGE, f))) errors.push(`data/knowledge/test-questions.json: question ${q.id} expects knowledge/${f}, which doesn't exist`);
  }
}

// ---------- Report ----------
for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
if (errors.length) {
  console.error(`\nValidation failed: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`Validation passed: ${pages.length} pages, ${warnings.length} warning(s).`);
