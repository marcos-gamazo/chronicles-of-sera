// Fichas de cada juego en orden cronológico.
import { GAMES } from "../data/games.js";
import { tr, era, ui } from "../i18n.js";
import { $, esc, charName, portrait } from "../util.js";

export function renderGames() {
  $("#games").innerHTML = GAMES.map((g, i) => `
    <article class="game" style="--c:${g.c};--i:${i}" id="game-${g.k}">
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
      </div>
    </article>`).join("");
}
