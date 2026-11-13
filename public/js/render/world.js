// Secciones "El mundo" y "Glosario y rutas".
import { PRIMER, GLOSSARY, ROUTES } from "../data/world.js";
import { tr } from "../i18n.js";
import { $ } from "../util.js";

export function renderWorld() {
  $("#primer").innerHTML = PRIMER.map((p, i) => `
    <div class="pcard" style="--i:${i}">
      <div class="ic" style="--ic:${p.color}">${p.icon}</div>
      <h3>${tr(p.t)}</h3><p>${tr(p.d)}</p>
    </div>`).join("");

  $("#routes").innerHTML = ROUTES.map((r, i) => `
    <div class="pcard" style="--i:${i}">
      <div class="ic" style="--ic:${r.color}">${r.icon}</div>
      <h3>${tr(r.t)}</h3><p>${tr(r.p)}</p>
      <ol>${r.items.map((it) => `<li>${tr(it)}</li>`).join("")}</ol>
    </div>`).join("");

  $("#gloss").innerHTML = GLOSSARY.map(([t, d], i) => `
    <div class="term" style="--i:${i}"><h4>${tr(t)}</h4><p>${tr(d)}</p></div>`).join("");
}
