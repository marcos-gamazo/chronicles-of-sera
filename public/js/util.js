// Utilidades compartidas: selección del DOM, escape de HTML y retratos.
import { CM, IMG, FACTIONS } from "./data/characters.js";
import { tr } from "./i18n.js";

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

export const charName = (id) => tr(CM[id].name);

/** Nombre corto para etiquetas (sin títulos). */
export const shortName = (id) => charName(id).replace(/^(Reina|Queen|General|Dr\.|La|The)\s+/, "");

export function initials(name) {
  return name.replace(/^(Dr\.|La|The|Reina|Queen|General)\s+/, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export const factionColor = (id) => (CM[id] ? FACTIONS[CM[id].f].color : "#5a5560");

/** Placeholder con iniciales (se usa también si falla la imagen). */
export function initialsBox(name, color = "#5a5560") {
  return `<div class="ini" style="--fc:${color}">${esc(initials(name))}</div>`;
}

/**
 * Retrato de un personaje. Si la imagen no carga, main.js la sustituye por las
 * iniciales (ver listener global de errores de imagen).
 */
export function portrait(id) {
  const name = CM[id] ? charName(id) : id;
  if (!IMG[id]) return initialsBox(name, factionColor(id));
  return `<img class="ph" loading="lazy" decoding="async" referrerpolicy="strict-origin-when-cross-origin" alt="${esc(name)}" src="${IMG[id]}" data-fallback="${esc(name)}" data-color="${factionColor(id)}">`;
}

/** Ejecuta fn tras el siguiente frame (útil para medir después de pintar). */
export const nextFrame = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));
