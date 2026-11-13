// Gráfico de hilos narrativos (swimlanes) con D3.
/* global d3 */
import { THREAD_LANES, THREAD_ERAS, THREAD_GAMES, THREAD_CROSSINGS, THREAD_TICKS } from "../data/timeline.js";
import { tr, era } from "../i18n.js";
import { $ } from "../util.js";

let tip;

const yearLabel = (y) => (y < 0 ? `${Math.round(-y)} BE` : y === 0 ? "0" : `${Math.round(y)} AE`);

export function renderThreads() {
  const host = $("#threads");
  host.innerHTML = "";
  if (!tip) tip = d3.select("body").append("div").attr("class", "gtip floating");

  const W = 1180, padL = 180, padR = 40, laneH = 64, top = 50;
  const H = top + THREAD_LANES.length * laneH + 24;
  // Escala por tramos: comprime el pasado lejano para dar aire a las eras recientes.
  const domain = [-80, -30, -10, 0, 20, 45];
  const range = [0, .14, .28, .42, .72, 1].map((r) => padL + r * (W - padL - padR));
  const x = d3.scaleLinear().domain(domain).range(range);

  const svg = d3.select(host).append("svg")
    .attr("width", W).attr("height", H + 4).attr("viewBox", `0 0 ${W} ${H + 4}`)
    .attr("role", "img").attr("aria-label", "Story threads");

  THREAD_ERAS.forEach(([a, b, name, c]) => {
    svg.append("rect").attr("class", "era-band").attr("x", x(a)).attr("y", top - 26)
      .attr("width", x(b) - x(a)).attr("height", H - top + 14).attr("fill", c).attr("opacity", .06);
    svg.append("text").attr("x", x(a) + 6).attr("y", top - 12).text(tr(name).toUpperCase())
      .attr("fill", c).attr("class", "era-label");
  });

  THREAD_GAMES.forEach(([name, y]) => {
    svg.append("line").attr("x1", x(y)).attr("x2", x(y)).attr("y1", top - 4).attr("y2", H - 14).attr("class", "game-marker");
    svg.append("text").attr("x", x(y)).attr("y", H - 2).attr("text-anchor", "middle").text(name).attr("class", "game-label");
  });

  THREAD_TICKS.forEach((t) => {
    svg.append("text").attr("x", x(t)).attr("y", top - 30).attr("text-anchor", "middle").text(era(yearLabel(t))).attr("class", "tick");
  });

  THREAD_CROSSINGS.forEach(([yr, a, b]) => {
    svg.append("line").attr("class", "crossing")
      .attr("x1", x(yr)).attr("x2", x(yr))
      .attr("y1", top + a * laneH + laneH / 2 + 8).attr("y2", top + b * laneH + laneH / 2 - 8);
  });

  THREAD_LANES.forEach((lane, i) => {
    const y = top + i * laneH + laneH / 2;
    const g = svg.append("g").attr("class", "lane").style("--d", `${i * 120}ms`);
    g.append("text").attr("x", 14).attr("y", y + 4).text(tr(lane.n)).attr("fill", lane.c).attr("class", "lane-label");
    const xs = lane.pts.map((p) => x(p[0]));
    g.append("line").attr("class", "lane-line").attr("x1", d3.min(xs)).attr("x2", d3.max(xs)).attr("y1", y).attr("y2", y)
      .attr("stroke", lane.c).attr("pathLength", 1);
    lane.pts.forEach(([yr, label, sub], j) => {
      const dot = g.append("g").attr("class", "dot").style("--j", j);
      dot.append("circle").attr("cx", x(yr)).attr("cy", y).attr("r", 7).attr("fill", "var(--bg2)").attr("stroke", lane.c).attr("stroke-width", 2.5);
      dot.append("circle").attr("cx", x(yr)).attr("cy", y).attr("r", 3).attr("fill", lane.c);
      dot.on("mousemove", (ev) => {
        const s = tr(sub);
        tip.style("opacity", 1).style("left", `${ev.clientX + 12}px`).style("top", `${ev.clientY + 12}px`)
          .html(`<b>${tr(label)}</b><br><span class="muted">${era(yearLabel(yr))}${s ? ` · ${s}` : ""}</span>`);
      }).on("mouseleave", () => tip.style("opacity", 0));
    });
  });
}
