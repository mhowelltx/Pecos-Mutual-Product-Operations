import markdownItDeflist from "markdown-it-deflist";
import taxonomy from "./data/taxonomy.json" with { type: "json" };

// Front-matter `type` → layout file in src/_includes/layouts/.
const LAYOUT_FOR_TYPE = {
  home: "home",
  hub: "hub",
  concept: "concept",
  playbook: "playbook",
  "role-guide": "role",
  report: "report",
  template: "template",
  glossary: "concept",
};

const byId = (list) => Object.fromEntries(list.map((item) => [item.id, item]));
const ROLES = byId(taxonomy.roles);
const PHASES = byId(taxonomy.phases);
const WORKSTREAMS = byId(taxonomy.workstreams);
const TYPES = byId(taxonomy.types);
const ACTIVITY_ORDER = new Map(taxonomy.activities.map((a, i) => [a.id, i]));
const pageOrder = (p) =>
  p.inputPath.endsWith("index.md") ? -1 : ACTIVITY_ORDER.get(p.data.activity) ?? ACTIVITY_ORDER.size;

// Labels for URL segments, used by breadcrumbs.
const SEGMENT_LABELS = {
  "operating-model": "Operating model",
  run: "Run",
  change: "Change",
  incidents: "Incident Management",
  "platform-health": "Platform Health",
  discovery: "Discovery",
  planning: "Planning",
  delivery: "Delivery",
  roles: "Roles",
  reports: "Reports",
  templates: "Templates",
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets/");

  // Glossary terms use Markdown definition lists (Term / : definition).
  eleventyConfig.amendLibrary("md", (md) => md.use(markdownItDeflist));

  // Wrap Markdown tables so wide ones scroll on their own instead of widening the page.
  eleventyConfig.amendLibrary("md", (md) => {
    md.renderer.rules.table_open = () => '<div class="site-table-wrap" tabindex="0">\n<table>\n';
    md.renderer.rules.table_close = () => "</table>\n</div>\n";
  });

  eleventyConfig.addGlobalData("eleventyComputed.layout", () => (data) => {
    if (data.layout) return data.layout;
    const name = LAYOUT_FOR_TYPE[data.type];
    return name ? `layouts/${name}.njk` : undefined;
  });

  // Taxonomy lookups
  eleventyConfig.addFilter("roleLabel", (id) => ROLES[id]?.label ?? id);
  eleventyConfig.addFilter("role", (id) => ROLES[id]);
  eleventyConfig.addFilter("phase", (id) => PHASES[id]);
  eleventyConfig.addFilter("phaseLabel", (id) => PHASES[id]?.label ?? "");
  eleventyConfig.addFilter("workstreamLabel", (id) => WORKSTREAMS[id]?.label ?? "");
  eleventyConfig.addFilter("typeLabel", (id) => TYPES[id]?.label ?? id);

  // Collection helpers. Pass `collections.all`.
  eleventyConfig.addFilter("urlExists", (url, all) => all.some((p) => p.url === url));
  eleventyConfig.addFilter("pageBySlug", (slug, all) =>
    all.find((p) => p.fileSlug === slug && p.data.type !== "hub"),
  );
  // Overviews first, then playbooks in taxonomy activity order (the order the work happens), then by URL.
  eleventyConfig.addFilter("childrenOf", (all, url) =>
    all
      .filter((p) => p.url !== url && p.url.startsWith(url) && p.data.type !== "hub")
      .sort((a, b) => pageOrder(a) - pageOrder(b) || a.url.localeCompare(b.url)),
  );
  eleventyConfig.addFilter("withPhase", (pages, phase) => pages.filter((p) => p.data.phase === phase));
  eleventyConfig.addFilter("withType", (pages, type) => pages.filter((p) => p.data.type === type));
  eleventyConfig.addFilter("forRole", (all, role) =>
    all.filter((p) => p.data.type === "playbook" && (p.data.roles || []).includes(role)),
  );

  eleventyConfig.addFilter("breadcrumbs", (url, title) => {
    const parts = url.split("/").filter(Boolean);
    const crumbs = [{ label: "Home", url: "/" }];
    parts.forEach((seg, i) => {
      const href = "/" + parts.slice(0, i + 1).join("/") + "/";
      const last = i === parts.length - 1;
      crumbs.push({ label: last ? title : SEGMENT_LABELS[seg] ?? seg, url: last ? null : href });
    });
    return crumbs;
  });

  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  });
  eleventyConfig.addFilter("isoDate", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));
}

export const config = {
  dir: {
    input: "content",
    includes: "../src/_includes",
    data: "../data",
    output: "_site",
  },
  // Markdown is plain Markdown: no template tags, so `{{ }}` in templates is safe.
  markdownTemplateEngine: false,
  htmlTemplateEngine: "njk",
  templateFormats: ["md", "njk"],
};
