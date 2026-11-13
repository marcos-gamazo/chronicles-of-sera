// Fichas de cada juego (orden cronológico) y su ventana de historia detallada.
import { GAMES } from "../data/games.js";
import { GAME_DETAILS } from "../data/game-details.js";
import { CM, FACTIONS } from "../data/characters.js";
import { tr, era, ui } from "../i18n.js";
import { $, esc, charName, portrait } from "../util.js";
import { registerModal, openModal } from "../modal.js";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function renderGames() {
  $("#games").innerHTML = GAMES.map((g, i) => `
    <article class="game" style="--c:${g.c};--i:${i}" id="game-${g.k}" data-game="${g.k}">
      <div class="side">
        <div class="num">${g.num}</div>
        <div><div class="meta">${ui("released")} ${g.rel} · ${ui("setIn")} ${era(g.set)}</div><h3>${g.n}</h3></div>
      </div>
      <div class="body">
        <p>${tr(g.plot)}</p>
        <div class="cols">
          <div><h5>${ui("keyMoments")}</h5><ul>${g.key.map((k) => `<li>${tr(k)}</li>`).join("")}</ul></div>
          <div><h5>${ui("characters")}</h5><div class="faces">${g.who.map((w) =>
            `<button class="face" data-open="${w}" title="${esc(charName(w))}" aria-label="${esc(charName(w))}">${portrait(w)}</button>`).join("")}</div></div>
        </div>
        <div class="links"><b>${ui("howConnects")}</b> ${tr(g.links)}</div>
        <button class="btn-story" type="button" data-game="${g.k}">${ui("game.more")} <span aria-hidden="true">→</span></button>
      </div>
    </article>`).join("");
}

/** Persona en las listas de la ficha: con retrato si tiene ficha propia. */
function who(x, dead = false) {
  if (typeof x === "string" && CM[x]) {
    return `<button class="who-chip" data-open="${x}" style="--fc:${FACTIONS[CM[x].f].color}">
      <span class="face">${portrait(x)}</span>${esc(charName(x))}${dead ? ' <i aria-hidden="true">✝</i>' : ""}</button>`;
  }
  return `<span class="who-chip plain">${esc(tr(x))}${dead ? ' <i aria-hidden="true">✝</i>' : ""}</span>`;
}

function buildGame(k) {
  const idx = GAMES.findIndex((g) => g.k === k);
  const g = GAMES[idx];
  const d = GAME_DETAILS[k];
  if (!g || !d) return "";
  const prev = GAMES[idx - 1];
  const next = GAMES[idx + 1];
  const nav = (x, dir) => x
    ? `<button class="gm-nav ${dir}" data-game="${x.k}" style="--nc:${x.c}"><small>${ui(dir === "prev" ? "game.prev" : "game.next")}</small><b>${x.n}</b><span>${era(x.set)}</span></button>`
    : "<span></span>";
  const block = (title, body) => body ? `<section class="gm-block"><h5 class="mh">${title}</h5>${body}</section>` : "";

  return `
    <div class="gmodal" style="--c:${g.c}">
      <header class="gm-head">
        <div class="gm-num" aria-hidden="true">${g.num}</div>
        <div class="gm-title">
          <div class="gm-kicker">${ui("setIn")} ${era(g.set)} · ${ui("released")} ${g.rel}</div>
          <h2 id="dlgtitle">${g.n}</h2>
          <div class="gm-meta"><span><small>${ui("game.dev")}</small>${esc(tr(d.dev))}</span><span><small>${ui("game.platforms")}</small>${esc(tr(d.platforms))}</span></div>
        </div>
      </header>
      <div class="gm-scroll">
        <p class="gm-intro">${tr(g.plot)}</p>
        <h5 class="mh">${ui("game.acts")}</h5>
        <ol class="acts">${d.acts.map((a, i) => `
          <li style="--i:${i}"><span class="act-n">${ROMAN[i] ?? i + 1}</span>
            <div><h4>${tr(a.t)}</h4><p>${tr(a.d)}</p></div></li>`).join("")}</ol>
        <div class="gm-grid">
          ${block(ui("characters"), `<div class="who-list">${g.who.map((w) => who(w)).join("")}</div>`)}
          ${block(ui("game.villains"), d.villains.length ? `<div class="who-list">${d.villains.map((v) => who(v)).join("")}</div>` : "")}
          ${block(ui("game.fallen"), d.fallen.length ? `<div class="who-list">${d.fallen.map((f) => who(f, true)).join("")}</div>` : `<p class="muted">${ui("game.noFallen")}</p>`)}
          ${block(ui("game.places"), `<div class="place-list">${d.places.map((p) => `<span class="place">${esc(tr(p))}</span>`).join("")}</div>`)}
        </div>
        ${block(ui("game.lore"), `<ul class="gm-lore">${d.lore.map((l) => `<li>${tr(l)}</li>`).join("")}</ul>`)}
        <div class="links"><b>${ui("howConnects")}</b> ${tr(g.links)}</div>
        <nav class="gm-navs" aria-label="${esc(ui("game.navLabel"))}">${nav(prev, "prev")}${nav(next, "next")}</nav>
      </div>
    </div>`;
}

export const openGame = (k) => openModal("game", k);

export function initGames() {
  registerModal("game", buildGame);
  // Pulsar cualquier parte de una ficha de juego (salvo un retrato) abre su historia.
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open]")) return;
    const t = e.target.closest("[data-game]");
    if (t) openGame(t.dataset.game);
  });
}
