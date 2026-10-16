// Report charts: a JSON chart spec (from data/reports/*.json) → inline SVG, drawn at build time.
// No client-side JavaScript. Hover text comes from SVG <title> elements, and every chart has
// a text summary (aria) plus the report's data table, so no value is hover-only.
//
// Colours are CSS classes (see src/assets/css/site.css → "Charts"), mapped to design tokens:
//   ch-s1 blue (main series) · ch-s2 orange (series to watch) · ch-s3 teal · ch-muted grey
//   ch-o1…ch-o4 ordinal blue ramp, dark → light (severity)
// Palettes checked with the dataviz validator: categorical blue/orange/teal passes all checks;
// the ordinal ramp passes monotone lightness, step gaps and light-end contrast.
//
// Spec types: hbar · grouped-hbar · stacked-column · line · scatter · timeline.

const W = 720;
const BAR = 20; // bar thickness (≤ 24px)
const R = 4; // rounded data-end radius

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const fmt = (v, unit = "") =>
  v == null ? "–" : `${Number(v).toLocaleString("en-US", { maximumFractionDigits: 1 })}${unit}`;
const r1 = (n) => Math.round(n * 10) / 10;

function fail(spec, msg) {
  throw new Error(`Chart "${spec.id ?? spec.title}": ${msg}`);
}

function niceTicks(min, max, count = 5, integer = false) {
  const span = max - min || 1;
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = (integer ? [1, 2, 5, 10] : [1, 2, 2.5, 5, 10]).map((m) => Math.max(integer ? 1 : 0, m * mag)).find((s) => s >= raw);
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let t = lo; t <= hi + step / 1e6; t += step) ticks.push(Math.round(t * 1e6) / 1e6);
  return ticks;
}

// Bar growing right from x0, rounded on the data end only.
function hbarPath(x0, y, len, h) {
  if (len <= 0) return "";
  const r = Math.min(R, len, h / 2);
  return `M${r1(x0)},${r1(y)}h${r1(len - r)}a${r},${r} 0 0 1 ${r},${r}v${r1(h - 2 * r)}a${r},${r} 0 0 1 ${-r},${r}h${r1(-(len - r))}z`;
}

// Column growing up from yBase, rounded on top only.
function colPath(x, yBase, len, w, rounded = true) {
  if (len <= 0) return "";
  const r = rounded ? Math.min(R, len, w / 2) : 0;
  return `M${r1(x)},${r1(yBase)}v${r1(-(len - r))}a${r},${r} 0 0 1 ${r},${-r}h${r1(w - 2 * r)}a${r},${r} 0 0 1 ${r},${r}v${r1(len - r)}z`;
}

function frame(spec, height, body) {
  const id = `chart-${spec.id}`;
  return (
    `<div class="site-chart__scroll" tabindex="0" role="group" aria-labelledby="${id}-t"><svg class="site-chart__svg" viewBox="0 0 ${W} ${Math.round(height)}" role="img" aria-labelledby="${id}-t ${id}-d" focusable="false">` +
    `<title id="${id}-t">${esc(spec.title)}</title><desc id="${id}-d">${esc(spec.summary)}</desc>${body}</svg></div>`
  );
}

function legend(items) {
  if (!items.length) return "";
  const li = items
    .map(({ label, cls, shape = "box" }) => `<li><span class="site-chart__key site-chart__key--${shape} ${cls}" aria-hidden="true"></span>${esc(label)}</li>`)
    .join("");
  return `<ul class="site-chart__legend">${li}</ul>`;
}

const tip = (text) => `<title>${esc(text)}</title>`;

// ---------- Horizontal bars (one series, optional target line) ----------
function hbar(spec) {
  const { categories, values, unit = "", target, watchAbove } = spec;
  if (!Array.isArray(categories) || categories.length !== values?.length) fail(spec, "categories and values must be the same length");
  const labelW = spec.labelWidth ?? 190;
  const x0 = labelW, x1 = W - 70, top = target ? 30 : 10, band = 34;
  const max = Math.max(...values, target?.value ?? 0, spec.max ?? 0);
  const ticks = niceTicks(0, max);
  const xs = (v) => x0 + (v / ticks.at(-1)) * (x1 - x0);
  const plotBottom = top + categories.length * band;
  let g = "";
  for (const t of ticks) g += `<line class="ch-grid" x1="${r1(xs(t))}" x2="${r1(xs(t))}" y1="${top}" y2="${plotBottom}"/><text class="ch-tick" x="${r1(xs(t))}" y="${plotBottom + 18}" text-anchor="middle">${fmt(t, unit)}</text>`;
  categories.forEach((c, i) => {
    const y = top + i * band + (band - BAR) / 2;
    const v = values[i];
    const cls = watchAbove != null && v > watchAbove ? "ch-s2" : "ch-s1";
    g += `<text class="ch-label" x="${x0 - 10}" y="${r1(y + BAR / 2 + 4)}" text-anchor="end">${esc(c)}</text>`;
    g += `<path class="${cls}" d="${hbarPath(x0, y, xs(v) - x0, BAR)}">${tip(`${c}: ${fmt(v, unit)}`)}</path>`;
    g += `<text class="ch-value" x="${r1(xs(v) + 6)}" y="${r1(y + BAR / 2 + 4)}">${fmt(v, unit)}</text>`;
  });
  if (target) {
    const tx = r1(xs(target.value));
    g += `<line class="ch-target" x1="${tx}" x2="${tx}" y1="${top - 8}" y2="${plotBottom}"/><text class="ch-target-label" x="${tx}" y="${top - 13}" text-anchor="middle">${esc(target.label)}</text>`;
  }
  g += `<line class="ch-axis" x1="${x0}" x2="${x0}" y1="${top}" y2="${plotBottom}"/>`;
  const keys = watchAbove != null ? [{ label: spec.seriesLabel ?? "Within target", cls: "ch-s1" }, { label: spec.watchLabel ?? "Over target", cls: "ch-s2" }] : [];
  return legend(keys) + frame(spec, plotBottom + 28, g);
}

// ---------- Grouped horizontal bars (2–3 series per category) ----------
function groupedHbar(spec) {
  const { categories, series, unit = "" } = spec;
  if (!series?.length || series.some((s) => s.values.length !== categories.length)) fail(spec, "every series needs one value per category");
  const labelW = spec.labelWidth ?? 170;
  const x0 = labelW, x1 = W - 60, top = 10, thick = 14, gap = 2;
  const band = series.length * (thick + gap) + 18;
  const ticks = niceTicks(0, Math.max(...series.flatMap((s) => s.values)));
  const xs = (v) => x0 + (v / ticks.at(-1)) * (x1 - x0);
  const plotBottom = top + categories.length * band;
  let g = "";
  for (const t of ticks) g += `<line class="ch-grid" x1="${r1(xs(t))}" x2="${r1(xs(t))}" y1="${top}" y2="${plotBottom}"/><text class="ch-tick" x="${r1(xs(t))}" y="${plotBottom + 18}" text-anchor="middle">${fmt(t, unit)}</text>`;
  categories.forEach((c, i) => {
    const yb = top + i * band + 9;
    g += `<text class="ch-label" x="${x0 - 10}" y="${r1(yb + (series.length * (thick + gap)) / 2 + 2)}" text-anchor="end">${esc(c)}</text>`;
    series.forEach((s, j) => {
      const y = yb + j * (thick + gap);
      const v = s.values[i];
      g += `<path class="ch-s${j + 1}" d="${hbarPath(x0, y, xs(v) - x0, thick)}">${tip(`${c}, ${s.name}: ${fmt(v, unit)}`)}</path>`;
      g += `<text class="ch-value ch-value--small" x="${r1(xs(v) + 5)}" y="${r1(y + thick / 2 + 4)}">${fmt(v)}</text>`;
    });
  });
  g += `<line class="ch-axis" x1="${x0}" x2="${x0}" y1="${top}" y2="${plotBottom}"/>`;
  return legend(series.map((s, j) => ({ label: s.name, cls: `ch-s${j + 1}` }))) + frame(spec, plotBottom + 28, g);
}

// ---------- Stacked columns (ordinal series, e.g. severity) ----------
function stackedColumn(spec) {
  const { categories, series, unit = "" } = spec;
  if (!series?.length || series.some((s) => s.values.length !== categories.length)) fail(spec, "every series needs one value per category");
  const x0 = 44, x1 = W - 10, top = 12, plotBottom = 260;
  const totals = categories.map((_, i) => series.reduce((sum, s) => sum + s.values[i], 0));
  const ticks = niceTicks(0, Math.max(...totals));
  const ys = (v) => plotBottom - (v / ticks.at(-1)) * (plotBottom - top);
  const band = (x1 - x0) / categories.length;
  const w = Math.min(24, band * 0.6);
  let g = "";
  for (const t of ticks) g += `<line class="ch-grid" x1="${x0}" x2="${x1}" y1="${r1(ys(t))}" y2="${r1(ys(t))}"/><text class="ch-tick" x="${x0 - 8}" y="${r1(ys(t) + 4)}" text-anchor="end">${fmt(t, unit)}</text>`;
  categories.forEach((c, i) => {
    const x = x0 + i * band + (band - w) / 2;
    let acc = 0;
    const topIdx = series.map((s) => s.values[i]).findLastIndex((v) => v > 0);
    series.forEach((s, j) => {
      const v = s.values[i];
      if (!v) return;
      const yBase = ys(acc) - (acc > 0 ? 2 : 0); // 2px surface gap between segments
      const len = ys(acc) - ys(acc + v) - (acc > 0 ? 2 : 0);
      g += `<path class="ch-o${j + 1}" d="${colPath(x, yBase, len, w, j === topIdx)}">${tip(`${c}, ${s.name}: ${fmt(v, unit)}`)}</path>`;
      acc += v;
    });
    g += `<text class="ch-tick" x="${r1(x + w / 2)}" y="${plotBottom + 18}" text-anchor="middle">${esc(c)}</text>`;
  });
  g += `<line class="ch-axis" x1="${x0}" x2="${x1}" y1="${plotBottom}" y2="${plotBottom}"/>`;
  return legend(series.map((s, j) => ({ label: s.name, cls: `ch-o${j + 1}` }))) + frame(spec, plotBottom + 28, g);
}

// ---------- Lines (1–3 series over ordered x; nulls leave gaps) ----------
function line(spec) {
  const { categories, series, unit = "", target } = spec;
  if (!series?.length || series.some((s) => s.values.length !== categories.length)) fail(spec, "every series needs one value per category");
  const x0 = 50, x1 = W - 165, top = 16, plotBottom = 250;
  const all = series.flatMap((s) => s.values).filter((v) => v != null);
  const ticks = niceTicks(spec.yMin ?? 0, Math.max(...all, target?.value ?? 0));
  const lo = ticks[0], hi = ticks.at(-1);
  const ys = (v) => plotBottom - ((v - lo) / (hi - lo)) * (plotBottom - top);
  const xs = (i) => x0 + (categories.length === 1 ? 0 : (i / (categories.length - 1)) * (x1 - x0));
  let g = "";
  for (const t of ticks) g += `<line class="ch-grid" x1="${x0}" x2="${x1}" y1="${r1(ys(t))}" y2="${r1(ys(t))}"/><text class="ch-tick" x="${x0 - 8}" y="${r1(ys(t) + 4)}" text-anchor="end">${fmt(t, unit)}</text>`;
  // Thin crowded x labels (every 2nd or 3rd), always keeping the last one.
  const step = Math.max(1, Math.ceil(52 / ((x1 - x0) / Math.max(1, categories.length - 1))));
  categories.forEach((c, i) => {
    if (i % step === 0 || i === categories.length - 1) g += `<text class="ch-tick" x="${r1(xs(i))}" y="${plotBottom + 18}" text-anchor="middle">${esc(c)}</text>`;
  });
  if (target) {
    const ty = r1(ys(target.value));
    g += `<line class="ch-target" x1="${x0}" x2="${x1}" y1="${ty}" y2="${ty}"/><text class="ch-target-label" x="${x0 + 6}" y="${ty - 6}">${esc(target.label)}</text>`;
  }
  const ends = [];
  series.forEach((s, j) => {
    const cls = s.class ?? `ch-s${j + 1}`;
    let d = "", pen = false;
    s.values.forEach((v, i) => {
      if (v == null) return (pen = false);
      d += `${pen ? "L" : "M"}${r1(xs(i))},${r1(ys(v))}`;
      pen = true;
    });
    g += `<path class="ch-line ${cls}" d="${d}"/>`;
    s.values.forEach((v, i) => {
      if (v != null) g += `<circle class="ch-hit" cx="${r1(xs(i))}" cy="${r1(ys(v))}" r="10">${tip(`${s.name}, ${categories[i]}: ${fmt(v, unit)}`)}</circle>`;
    });
    const last = s.values.findLastIndex((v) => v != null);
    g += `<circle class="ch-dot ${cls}" cx="${r1(xs(last))}" cy="${r1(ys(s.values[last]))}" r="4.5"/>`;
    ends.push({ y: ys(s.values[last]), x: xs(last), text: `${s.name} ${fmt(s.values[last], unit)}` });
  });
  // Direct end labels only when they don't collide; otherwise the legend carries identity.
  const sorted = [...ends].sort((a, b) => a.y - b.y);
  const clear = sorted.every((e, i) => i === 0 || e.y - sorted[i - 1].y >= 16);
  if (clear && series.length <= 4) for (const e of ends) g += `<text class="ch-value" x="${r1(e.x + 10)}" y="${r1(e.y + 4)}">${esc(e.text)}</text>`;
  g += `<line class="ch-axis" x1="${x0}" x2="${x1}" y1="${plotBottom}" y2="${plotBottom}"/>`;
  const keys = series.length > 1 ? series.map((s, j) => ({ label: s.name, cls: s.class ?? `ch-s${j + 1}`, shape: "line" })) : [];
  if (target) keys.push({ label: target.label, cls: "ch-target-key", shape: "line" });
  return legend(keys) + frame(spec, plotBottom + 28, g);
}

// ---------- Scatter over categorical x (e.g. T-shirt size) ----------
function scatter(spec) {
  const { xCategories, points, groups, yLabel = "" } = spec;
  if (!points?.length || !groups?.length) fail(spec, "needs points and groups");
  const x0 = 60, x1 = W - 20, top = 16, plotBottom = 260;
  const ticks = niceTicks(0, Math.max(...points.map((p) => p.y)), 5, true);
  const ys = (v) => plotBottom - (v / ticks.at(-1)) * (plotBottom - top);
  const band = (x1 - x0) / xCategories.length;
  const xc = (cat) => x0 + band * (xCategories.indexOf(cat) + 0.5);
  let g = "";
  for (const t of ticks) g += `<line class="ch-grid" x1="${x0}" x2="${x1}" y1="${r1(ys(t))}" y2="${r1(ys(t))}"/><text class="ch-tick" x="${x0 - 8}" y="${r1(ys(t) + 4)}" text-anchor="end">${fmt(t)}</text>`;
  xCategories.forEach((c) => (g += `<text class="ch-tick" x="${r1(xc(c))}" y="${plotBottom + 18}" text-anchor="middle">${esc(c)}</text>`));
  g += `<text class="ch-tick" transform="translate(14 ${(top + plotBottom) / 2}) rotate(-90)" text-anchor="middle">${esc(yLabel)}</text>`;
  // Points that share a spot spread sideways so none hides another.
  const seen = new Map();
  for (const p of points) {
    if (!xCategories.includes(p.x)) fail(spec, `point "${p.label}" has unknown x "${p.x}"`);
    const key = `${p.x}|${p.y}`;
    const n = seen.get(key) ?? 0;
    seen.set(key, n + 1);
    const dx = n === 0 ? 0 : (n % 2 ? 1 : -1) * Math.ceil(n / 2) * 16;
    const gi = groups.findIndex((gr) => gr.id === p.group);
    const cls = groups[gi]?.class ?? `ch-s${gi + 1}`;
    g += `<circle class="ch-point ${cls}" cx="${r1(xc(p.x) + dx)}" cy="${r1(ys(p.y))}" r="6">${tip(`${p.label}: ${p.x}, ${yLabel.toLowerCase()} ${p.y}`)}</circle>`;
  }
  g += `<line class="ch-axis" x1="${x0}" x2="${x1}" y1="${plotBottom}" y2="${plotBottom}"/>`;
  return legend(groups.map((gr, i) => ({ label: gr.name, cls: gr.class ?? `ch-s${i + 1}`, shape: "dot" }))) + frame(spec, plotBottom + 28, g);
}

// ---------- Milestone timeline: planned vs actual/forecast sprint ----------
function timeline(spec) {
  const { columns, rows, today } = spec;
  if (!columns?.length || !rows?.length) fail(spec, "needs columns and rows");
  const x0 = 290, x1 = W - 70, top = 24, rowH = 24, headH = 26;
  const cw = (x1 - x0) / columns.length;
  const xc = (col) => {
    const i = columns.indexOf(col);
    if (i < 0) fail(spec, `unknown column "${col}"`);
    return x0 + cw * (i + 0.5);
  };
  let y = top, g = "", body = "";
  let group = null;
  for (const r of rows) {
    if (r.group !== group) {
      group = r.group;
      body += `<text class="ch-group" x="0" y="${y + 17}">${esc(group)}</text>`;
      y += headH;
    }
    const cy = y + rowH / 2;
    const px = xc(r.planned), ax = xc(r.actual);
    const late = columns.indexOf(r.actual) > columns.indexOf(r.planned);
    const cls = late ? "ch-s2" : "ch-s1";
    body += `<text class="ch-label" x="12" y="${cy + 4}">${esc(r.label)}</text>`;
    if (late) body += `<line class="ch-connector ch-s2" x1="${r1(px)}" x2="${r1(ax)}" y1="${cy}" y2="${cy}"/>`;
    body += `<circle class="ch-planned" cx="${r1(px)}" cy="${cy}" r="6">${tip(`${r.label}: planned ${r.planned}`)}</circle>`;
    body += `<circle class="ch-point ${cls}" cx="${r1(ax)}" cy="${cy}" r="${late ? 6 : 4}">${tip(`${r.label}: ${r.done ? "done" : "forecast"} ${r.actual}${late ? " (late)" : ""}`)}</circle>`;
    const shift = columns.indexOf(r.actual) - columns.indexOf(r.planned);
    if (shift > 0) body += `<text class="ch-value ch-value--small" x="${x1 + 8}" y="${cy + 4}">+${shift} sprint${shift > 1 ? "s" : ""}</text>`;
    y += rowH;
  }
  columns.forEach((c, i) => {
    const x = x0 + cw * i;
    g += `<line class="ch-grid" x1="${r1(x)}" x2="${r1(x)}" y1="${top - 4}" y2="${y}"/><text class="ch-tick" x="${r1(x + cw / 2)}" y="${top - 10}" text-anchor="middle">${esc(c)}</text>`;
  });
  g += `<line class="ch-grid" x1="${x1}" x2="${x1}" y1="${top - 4}" y2="${y}"/>`;
  if (today) {
    const i = columns.indexOf(today.after) + 1;
    const tx = r1(x0 + cw * i);
    g += `<line class="ch-target" x1="${tx}" x2="${tx}" y1="${top - 4}" y2="${y}"/><text class="ch-target-label" x="${tx}" y="${y + 16}" text-anchor="middle">${esc(today.label)}</text>`;
  }
  const keys = [
    { label: "Planned sprint", cls: "ch-planned-key", shape: "ring" },
    { label: "Done or forecast on time", cls: "ch-s1", shape: "dot" },
    { label: "Done or forecast late", cls: "ch-s2", shape: "dot" },
  ];
  return legend(keys) + frame(spec, y + 26, g + body);
}

const RENDERERS = { hbar, "grouped-hbar": groupedHbar, "stacked-column": stackedColumn, line, scatter, timeline };
export const CHART_TYPES = Object.keys(RENDERERS);

export function renderChart(spec) {
  const fn = RENDERERS[spec?.type];
  if (!fn) fail(spec ?? {}, `unknown chart type "${spec?.type}" (use ${CHART_TYPES.join(", ")})`);
  if (!spec.id || !spec.title || !spec.summary) fail(spec, "needs id, title and summary");
  return fn(spec);
}
