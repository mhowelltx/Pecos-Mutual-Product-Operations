// Build check. Runs after Eleventy in `npm run build` and exits non-zero on any error.
//  1. Every page in content/ has the required front-matter, with values from data/taxonomy.json.
//  2. Every internal link and asset reference in _site/ resolves to a built file.
// Warnings (not failures): `related` slugs and `activity` ids that don't exist yet.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

// ---------- 1. Front-matter ----------
const pages = walk(CONTENT, ".md");
const slugs = new Set(pages.map((f) => path.basename(f, ".md")));

for (const file of pages) {
  const where = rel(file);
  let data;
  try {
    data = matter(fs.readFileSync(file, "utf8")).data;
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
  if (data.type === "report" && !fs.existsSync(path.join(ROOT, "data/reports", `${data.dataset}.json`))) {
    errors.push(`${where}: report dataset data/reports/${data.dataset}.json not found`);
  }
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

// ---------- Report ----------
for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
if (errors.length) {
  console.error(`\nValidation failed: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`Validation passed: ${pages.length} pages, ${warnings.length} warning(s).`);
