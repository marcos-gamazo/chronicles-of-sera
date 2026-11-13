// Ventana modal compartida (fichas de personaje y de juego).
// Cada tipo registra una función que devuelve el HTML; así la ventana puede
// volver a pintarse al cambiar de idioma sin perder qué está abierto.
import { $, $$ } from "./util.js";

const builders = {};
let current = null;

export function registerModal(kind, build) {
  builders[kind] = build;
}

export function openModal(kind, id) {
  const html = builders[kind]?.(id);
  if (!html) return;
  current = { kind, id };
  const dlg = $("#dlg");
  dlg.dataset.kind = kind;
  $("#dlgbody").innerHTML = html;
  if (!dlg.open) dlg.showModal();
  $$(".modal, .mbody, .gm-scroll", dlg).forEach((el) => { el.scrollTop = 0; });
}

/** Vuelve a pintar lo que esté abierto (p. ej. tras cambiar de idioma). */
export function refreshModal() {
  if (current && $("#dlg").open) openModal(current.kind, current.id);
}

export function initModal() {
  const dlg = $("#dlg");
  $("#dlgclose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { current = null; });
}
