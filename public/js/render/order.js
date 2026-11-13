// Comparativa orden de lanzamiento vs. orden cronológico.
import { GAMES, RELEASE_ORDER } from "../data/games.js";
import { era } from "../i18n.js";
import { $, $$, nextFrame } from "../util.js";

const byKey = Object.fromEntries(GAMES.map((g) => [g.k, g]));
const shortTitle = (g) => g.n.replace("Gears of War: ", "");
let active = null;

function drawLines() {
  const svg = $("#orderlines");
  const order = $("#order");
  if (!svg || !order) return;
  const h = Math.max($("#olRel").parentElement.offsetHeight, $("#olChr").parentElement.offsetHeight);
  svg.style.height = `${h}px`;
  const box = svg.getBoundingClientRect();
  const W = box.width;
  svg.setAttribute("viewBox", `0 0 ${W} ${h}`);
  svg.innerHTML = RELEASE_ORDER.map(([k]) => {
    const a = $(`#olRel [data-k="${k}"]`).getBoundingClientRect();
    const b = $(`#olChr [data-k="${k}"]`).getBoundingClientRect();
    const y1 = a.top + a.height / 2 - box.top;
    const y2 = b.top + b.height / 2 - box.top;
    const on = !active || active === k;
    return `<path d="M0 ${y1} C ${W * .5} ${y1}, ${W * .5} ${y2}, ${W} ${y2}" pathLength="1"
      fill="none" stroke="${byKey[k].c}" stroke-width="${active === k ? 3.5 : 2}" opacity="${on ? .95 : .12}"/>`;
  }).join("");
}

function highlight(k) {
  active = k;
  $$("#order .oitem").forEach((el) => el.classList.toggle("hl", el.dataset.k === k));
  drawLines();
}

export function renderOrder() {
  $("#olRel").innerHTML = RELEASE_ORDER.map(([k, y], i) =>
    `<li class="oitem" data-k="${k}" tabindex="0"><span class="n">${i + 1}</span><div><b>${shortTitle(byKey[k])}</b><small>${y}</small></div></li>`).join("");
  $("#olChr").innerHTML = GAMES.map((g, i) =>
    `<li class="oitem" data-k="${g.k}" tabindex="0"><span class="n">${i + 1}</span><div><b>${shortTitle(g)}</b><small>${era(g.set)}</small></div></li>`).join("");
  nextFrame(drawLines);
}

export function initOrder() {
  const order = $("#order");
  order.addEventListener("mouseover", (e) => { const it = e.target.closest(".oitem"); if (it) highlight(it.dataset.k); });
  order.addEventListener("click", (e) => { const it = e.target.closest(".oitem"); if (it) highlight(it.dataset.k); });
  order.addEventListener("focusin", (e) => { const it = e.target.closest(".oitem"); if (it) highlight(it.dataset.k); });
  order.addEventListener("mouseleave", () => highlight(null));
  window.addEventListener("resize", drawLines);
  document.fonts?.ready.then(drawLines);
}
