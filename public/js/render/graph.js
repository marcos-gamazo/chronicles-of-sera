// Grafo de relaciones con fuerzas de D3.
/* global d3 */
import { CHARACTERS, FACTIONS, IMG } from "../data/characters.js";
import { LINK_TYPES, LINKS, LINK_NOTES } from "../data/relations.js";
import { tr } from "../i18n.js";
import { $, initials, charName } from "../util.js";
import { openCharacter } from "./characters.js";

const active = new Set(Object.keys(LINK_TYPES));
const BIG = ["marcus", "dom"];
const MID = ["kait", "jd", "myrrah"];
let compact = false; // pantallas estrechas: nodos más pequeños
const radius = (id) => (BIG.includes(id) ? 30 : MID.includes(id) ? 28 : 20) * (compact ? .72 : 1);

// Centro de cada bando en coordenadas relativas (-1..1) de la caja: reparte los
// grupos por todo el rectángulo sea cual sea su tamaño.
const ANCHORS = {
  bravo: [-.75, -.62], delta: [-.12, -.25], kilo: [.55, -.66], politica: [.78, -.12],
  familia: [-.6, .02], locust: [.4, .22], nueva: [-.5, .62], outsider: [-.08, .5],
  tactics: [.18, .78], ciencia: [.72, .66],
};

let sim = null;
let positions = new Map(); // conserva posiciones al cambiar de idioma

function renderLegend() {
  $("#glegend").innerHTML = Object.entries(LINK_TYPES).map(([k, v]) =>
    `<button class="chip ${active.has(k) ? "on" : ""}" data-t="${k}" aria-pressed="${active.has(k)}"><i style="background:${v.c}"></i>${tr(v.l)}</button>`).join("");
}

export function renderGraph() {
  renderLegend();
  if (sim) {
    sim.nodes().forEach((n) => positions.set(n.id, { x: n.x, y: n.y }));
    sim.stop();
  }

  const svgEl = $("#graph");
  const box = svgEl.parentElement;
  const W = () => box.clientWidth;
  const H = () => box.clientHeight;
  const svg = d3.select(svgEl);
  svg.selectAll("*").remove();
  compact = W() < 600;
  svg.classed("compact", compact);

  const defs = svg.append("defs");
  CHARACTERS.forEach((c) => defs.append("clipPath").attr("id", `cp-${c.id}`).append("circle").attr("r", radius(c.id)));

  const root = svg.append("g");
  svg.call(d3.zoom().scaleExtent([.3, 3]).on("zoom", (e) => root.attr("transform", e.transform)));

  const nodes = CHARACTERS.map((c) => ({ id: c.id, c, ...(positions.get(c.id) || {}) }));
  const links = LINKS.map(([source, target, ty]) => ({ source, target, ty }));
  // Escala según el área disponible para que la densidad sea parecida en cualquier caja.
  const k = Math.sqrt(W() * H()) / 760;
  const ax = (d) => W() / 2 + ANCHORS[d.c.f][0] * W() * .38;
  const ay = (d) => H() / 2 + ANCHORS[d.c.f][1] * H() * .36;

  sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d) => d.id)
      .distance((l) => (l.ty === "sangre" || l.ty === "pareja" ? 60 : 95) * Math.min(Math.max(k, .55), 1.2))
      .strength((l) => (l.ty === "armas" ? .08 : .4)))
    .force("charge", d3.forceManyBody().strength(-260 * Math.min(Math.max(k, .45), 1.2)))
    .force("collide", d3.forceCollide().radius((d) => radius(d.id) + (compact ? 9 : 14)))
    .force("x", d3.forceX(ax).strength(.14))
    .force("y", d3.forceY(ay).strength(.14));
  if (positions.size) sim.alpha(.25);

  const link = root.append("g").selectAll("line").data(links).join("line")
    .attr("stroke", (d) => LINK_TYPES[d.ty].c)
    .attr("stroke-width", (d) => (d.ty === "sangre" || d.ty === "pareja" ? 2.6 : 1.5))
    .attr("stroke-dasharray", (d) => LINK_TYPES[d.ty].dash || null);

  const node = root.append("g").selectAll("g").data(nodes).join("g").attr("class", "gnode")
    .call(d3.drag()
      .on("start", (e, d) => { if (!e.active) sim.alphaTarget(.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

  node.append("circle").attr("r", (d) => radius(d.id) + 3).attr("fill", "#111").attr("stroke", (d) => FACTIONS[d.c.f].color).attr("stroke-width", 2.5);
  node.append("circle").attr("r", (d) => radius(d.id)).attr("fill", (d) => FACTIONS[d.c.f].color).attr("opacity", .35);
  node.append("text").text((d) => initials(charName(d.id))).attr("class", "ginitials").attr("dy", "0.35em").attr("font-size", (d) => radius(d.id) * .6);
  node.append("image")
    .attr("href", (d) => IMG[d.id] || null)
    .attr("x", (d) => -radius(d.id)).attr("y", (d) => -radius(d.id))
    .attr("width", (d) => radius(d.id) * 2).attr("height", (d) => radius(d.id) * 2)
    .attr("preserveAspectRatio", "xMidYMin slice")
    .attr("clip-path", (d) => `url(#cp-${d.id})`)
    .attr("referrerpolicy", "strict-origin-when-cross-origin")
    .on("error", function onErr() { this.remove(); });
  node.filter((d) => d.c.dead).append("text").text("✝").attr("x", (d) => radius(d.id) * .72).attr("y", (d) => -radius(d.id) * .6).attr("class", "gcross");
  node.append("text").text((d) => charName(d.id).replace(/^(Reina|Queen|General) /, ""))
    .attr("y", (d) => radius(d.id) + (compact ? 12 : 16)).attr("class", "glabel");

  const tip = $("#gtip");
  const moveTip = (e) => {
    const b = box.getBoundingClientRect();
    tip.style.left = `${e.clientX - b.left + 14}px`;
    tip.style.top = `${e.clientY - b.top + 14}px`;
  };
  const applyFilter = () => link
    .attr("stroke-opacity", (l) => (active.has(l.ty) ? .7 : 0))
    .style("pointer-events", (l) => (active.has(l.ty) ? null : "none"));

  node.on("mouseenter", (e, d) => {
    const near = new Set([d.id]);
    links.forEach((l) => {
      if (!active.has(l.ty)) return;
      if (l.source.id === d.id) near.add(l.target.id);
      if (l.target.id === d.id) near.add(l.source.id);
    });
    node.classed("dim", (n) => !near.has(n.id));
    link.attr("stroke-opacity", (l) => (active.has(l.ty) && (l.source.id === d.id || l.target.id === d.id) ? 1 : .04));
    tip.style.opacity = 1;
    tip.innerHTML = `<b>${charName(d.id)}</b><br><span class="muted">${tr(d.c.role)}</span>`;
  }).on("mousemove", moveTip)
    .on("mouseleave", () => { node.classed("dim", false); applyFilter(); tip.style.opacity = 0; })
    .on("click", (e, d) => openCharacter(d.id));

  link.on("mouseenter", (e, l) => {
    const note = LINK_NOTES[`${l.source.id}|${l.target.id}`];
    tip.style.opacity = 1;
    tip.innerHTML = `${charName(l.source.id)} ↔ ${charName(l.target.id)}<br><span style="color:${LINK_TYPES[l.ty].c}">${tr(note || LINK_TYPES[l.ty].l)}</span>`;
  }).on("mousemove", moveTip).on("mouseleave", () => { tip.style.opacity = 0; });

  applyFilter();
  renderGraph.applyFilter = applyFilter;

  sim.on("tick", () => {
    // Mantener cada nodo (y su etiqueta) dentro de la caja.
    const w = W(), h = H();
    nodes.forEach((d) => {
      const r = radius(d.id) + 4;
      const halfLabel = (d.label ??= charName(d.id).length * (compact ? 2.6 : 3.1) + 4);
      const mx = Math.max(r, halfLabel);
      d.x = Math.max(mx, Math.min(w - mx, d.x));
      d.y = Math.max(r, Math.min(h - r - (compact ? 14 : 18), d.y));
    });
    link.attr("x1", (d) => d.source.x).attr("y1", (d) => d.source.y).attr("x2", (d) => d.target.x).attr("y2", (d) => d.target.y);
    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
  });
}

export function initGraph() {
  $("#glegend").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    const t = b.dataset.t;
    if (active.has(t)) active.delete(t); else active.add(t);
    b.classList.toggle("on", active.has(t));
    b.setAttribute("aria-pressed", String(active.has(t)));
    renderGraph.applyFilter?.();
  });
  // Al redimensionar se vuelve a montar (conserva posiciones y reajusta escala y límites).
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (sim) renderGraph(); }, 200);
  });
}
