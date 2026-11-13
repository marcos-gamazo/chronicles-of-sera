// Muro de caídos.
import { FALLEN } from "../data/relations.js";
import { tr, era } from "../i18n.js";
import { $, charName, portrait } from "../util.js";

export function renderMemorial() {
  $("#memorial").innerHTML = FALLEN.map(([id, date, cause], i) => `
    <button class="tomb" data-open="${id}" style="--i:${i}">
      <div class="av">${portrait(id)}</div>
      <b>${charName(id).replace(/^(Reina|Queen|General) /, "")}</b>
      <small>✝ ${era(date)}</small>
      <p>${tr(cause)}</p>
    </button>`).join("");
}
