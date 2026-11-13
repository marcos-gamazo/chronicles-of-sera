// Dossier de personajes (rejilla + filtros) y ficha modal.
import { CHARACTERS, CM, FACTIONS } from "../data/characters.js";
import { GAME_LABELS } from "../data/games.js";
import { tr, era, ui } from "../i18n.js";
import { $, $$, esc, charName, portrait } from "../util.js";

let faction = "all";
let currentId = null;

function renderChips() {
  const chips = [["all", ui("allChars")], ...Object.entries(FACTIONS).map(([k, v]) => [k, tr(v.label)])];
  $("#cchips").innerHTML = chips.map(([k, label]) =>
    `<button class="chip ${k === faction ? "on" : ""}" data-f="${k}" aria-pressed="${k === faction}">${label}</button>`).join("");
}

function renderCards() {
  const q = $("#search").value.trim().toLowerCase();
  const list = CHARACTERS.filter((c) => (faction === "all" || c.f === faction) &&
    (!q || `${tr(c.name)} ${tr(c.alias)} ${tr(c.role)}`.toLowerCase().includes(q)));
  $("#cgrid").innerHTML = list.map((c, i) => `
    <button class="card" data-open="${c.id}" style="--fc:${FACTIONS[c.f].color};--i:${i}">
      <div class="pic">${portrait(c.id)}<span class="badge">${tr(FACTIONS[c.f].label)}</span>${c.dead ? `<span class="dead">${ui("deceased")}</span>` : ""}</div>
      <div class="info"><h4>${tr(c.name)}</h4><div class="alias">${tr(c.alias)}</div><p>${tr(c.short)}</p></div>
    </button>`).join("") || `<p class="muted">${ui("ch.none")}</p>`;
}

export function renderCharacters() {
  renderChips();
  renderCards();
  if (currentId && $("#dlg").open) openCharacter(currentId);
}

export function openCharacter(id) {
  const c = CM[id];
  if (!c) return;
  currentId = id;
  const color = FACTIONS[c.f].color;
  const fact = (label, value, full = false) => value ? `<div class="fact${full ? " full" : ""}"><small>${label}</small><span>${value}</span></div>` : "";
  const status = c.dead ? `${ui("statusDead")}${c.death ? ` · ${era(c.death)}` : ""}` : ui("statusAlive");

  $("#dlgbody").innerHTML = `
    <div class="modal" style="--fc:${color}">
      <div class="mpic">${portrait(id)}</div>
      <div class="mbody">
        <h2 id="dlgtitle">${tr(c.name)}</h2>
        <div class="alias">${tr(c.alias)} · ${tr(FACTIONS[c.f].label)}</div>
        <p class="mshort">${tr(c.short)}</p>
        <div class="facts">
          ${fact(ui("role"), tr(c.role))}
          ${fact(ui("status"), status)}
          ${fact(ui("born"), c.born && era(c.born))}
          ${fact(ui("origin"), tr(c.home))}
          ${fact(ui("appears"), c.games.map((g) => tr(GAME_LABELS[g])).join(" · "), true)}
        </div>
        ${c.quote ? `<blockquote class="quote">${tr(c.quote)}</blockquote>` : ""}
        <h5 class="mh">${ui("story")}</h5>
        <ul class="story">${c.story.map((s, i) => `<li style="--i:${i}"><b>${tr(s.h)}</b>${tr(s.t)}</li>`).join("")}</ul>
        <h5 class="mh">${ui("connections")}</h5>
        <div class="rels">${c.rel.filter(([r]) => CM[r]).map(([r, label]) =>
          `<button class="rel" data-open="${r}"><span class="face">${portrait(r)}</span>${esc(charName(r))}<em>${tr(label)}</em></button>`).join("")}</div>
      </div>
    </div>`;

  const dlg = $("#dlg");
  if (!dlg.open) dlg.showModal();
  $$(".modal, .mbody", dlg).forEach((el) => { el.scrollTop = 0; });
}

export function initCharacters() {
  $("#cchips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    faction = b.dataset.f;
    renderChips();
    renderCards();
  });
  $("#search").addEventListener("input", renderCards);

  const dlg = $("#dlg");
  $("#dlgclose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { currentId = null; });

  // Cualquier elemento con data-open abre la ficha del personaje.
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (t && CM[t.dataset.open]) {
      e.preventDefault();
      openCharacter(t.dataset.open);
    }
  });
}
