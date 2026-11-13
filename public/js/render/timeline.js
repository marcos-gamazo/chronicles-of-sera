// Cronología maestra con filtro por juego.
import { ERAS, EVENTS } from "../data/timeline.js";
import { GAME_LABELS } from "../data/games.js";
import { tr, era, ui } from "../i18n.js";
import { $, shortName } from "../util.js";

let filter = "all";

function renderChips() {
  const chips = [["all", ui("all")], ...Object.entries(GAME_LABELS).map(([k, v]) => [k, tr(v)])];
  $("#tlchips").innerHTML = chips.map(([k, label]) =>
    `<button class="chip ${k === filter ? "on" : ""}" data-g="${k}" aria-pressed="${k === filter}">${label}</button>`).join("");
}

function renderEvents() {
  $("#timeline").innerHTML = ERAS.map((e) => {
    const items = EVENTS.filter((ev) => ev.era === e.id).map((ev) => {
      const hidden = filter !== "all" && !ev.g.includes(filter);
      const gameTags = ev.g.map((g) => `<span class="tag game">${tr(GAME_LABELS[g])}</span>`).join("");
      const whoTags = ev.who.slice(0, 7).map((w) => `<button class="tag who" data-open="${w}">${shortName(w)}</button>`).join("");
      return `<li class="ev ${ev.big ? "big" : ""} ${hidden ? "hidden" : ""}">
        <div class="yr">${era(ev.y)}</div>
        <div><h4>${tr(ev.t)}</h4><p>${tr(ev.d)}</p><div class="tags">${gameTags}${whoTags}</div></div>
      </li>`;
    }).join("");
    return `<div class="era" style="--c:${e.c}">
      <div class="era-head"><h3>${tr(e.name)}</h3><span>${era(e.span)}</span></div>
      <ul class="events">${items}</ul></div>`;
  }).join("");
}

export function renderTimeline() {
  renderChips();
  renderEvents();
}

export function initTimeline() {
  $("#tlchips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    filter = b.dataset.g;
    renderTimeline();
  });
}
