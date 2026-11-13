// Árboles genealógicos: convierte los datos de data/trees.js en listas anidadas.
import { TREES } from "../data/trees.js";
import { CM, FACTIONS } from "../data/characters.js";
import { tr } from "../i18n.js";
import { $, charName, portrait, initialsBox } from "../util.js";

function person(pr) {
  const id = typeof pr === "string" ? pr : pr.id;
  if (id && CM[id]) {
    const c = CM[id];
    const sub = typeof pr === "string" ? tr(c.alias) : tr(pr.sub);
    return `<button class="person click ${c.dead ? "dead" : ""}" data-open="${id}" style="--fc:${FACTIONS[c.f].color}">
      <span class="av">${portrait(id)}</span><b>${charName(id).replace(/^(Reina|Queen) /, "")}</b><small>${sub}</small></button>`;
  }
  return `<div class="person ${pr.dead ? "dead" : ""}">
    <span class="av">${initialsBox(tr(pr.name))}</span><b>${tr(pr.name)}</b><small>${tr(pr.sub)}</small></div>`;
}

function unit(n) {
  const [a, b] = n.u;
  const ring = b ? `<span class="ring">⚭</span>${person(b)}` : "";
  return `<div class="unit">${person(a)}${ring}</div>`;
}

function node(n) {
  const label = n.label ? `<span class="edge-label">${tr(n.label)}</span>` : "";
  const kids = n.kids?.length ? `<ul>${n.kids.map(node).join("")}</ul>` : "";
  return `<li>${label}${unit(n)}${kids}</li>`;
}

export function renderTrees() {
  $("#trees").innerHTML = TREES.map((t, i) => `
    <article class="tree-card" style="--i:${i}">
      <header><h3>${tr(t.t)}</h3><p>${tr(t.d)}</p></header>
      <div class="tree-scroll"><div class="tree"><ul>${node(t.root)}</ul></div></div>
      ${t.note ? `<p class="tnote">${tr(t.note)}</p>` : ""}
    </article>`).join("");
}
