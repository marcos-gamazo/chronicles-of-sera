// Valida los datos de la infografía: traducciones completas y referencias entre personajes.
// Uso: npm run check
import { UI } from "../public/js/data/ui.js";
import { CHARACTERS, CM, FACTIONS, IMG } from "../public/js/data/characters.js";
import { EVENTS, ERAS, THREAD_LANES } from "../public/js/data/timeline.js";
import { GAMES, GAME_LABELS, RELEASE_ORDER } from "../public/js/data/games.js";
import { LINKS, LINK_TYPES, LINK_NOTES, FALLEN } from "../public/js/data/relations.js";
import { PRIMER, GLOSSARY, ROUTES } from "../public/js/data/world.js";
import { TREES } from "../public/js/data/trees.js";
import { GAME_DETAILS } from "../public/js/data/game-details.js";

const errors = [];
const err = (msg) => errors.push(msg);

/** Recorre cualquier estructura y comprueba que cada {es, en} tenga ambos textos. */
function checkBilingual(value, path) {
  if (Array.isArray(value)) return value.forEach((v, i) => checkBilingual(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    if ("es" in value || "en" in value) {
      if (!value.es?.trim()) err(`${path}: falta texto en español`);
      if (!value.en?.trim()) err(`${path}: missing English text`);
      return;
    }
    Object.entries(value).forEach(([k, v]) => checkBilingual(v, `${path}.${k}`));
  }
}

const hasChar = (id, where) => { if (!CM[id]) err(`${where}: personaje desconocido "${id}"`); };

checkBilingual(UI, "UI");
checkBilingual(CHARACTERS, "CHARACTERS");
checkBilingual(FACTIONS, "FACTIONS");
checkBilingual({ EVENTS, ERAS, THREAD_LANES }, "timeline");
checkBilingual({ GAMES, GAME_LABELS }, "games");
checkBilingual({ LINK_TYPES, LINK_NOTES, FALLEN }, "relations");
checkBilingual({ PRIMER, GLOSSARY, ROUTES }, "world");
checkBilingual(TREES, "TREES");
checkBilingual(GAME_DETAILS, "GAME_DETAILS");

const ids = new Set();
CHARACTERS.forEach((c) => {
  if (ids.has(c.id)) err(`id duplicado: ${c.id}`);
  ids.add(c.id);
  if (!FACTIONS[c.f]) err(`${c.id}: bando desconocido "${c.f}"`);
  c.games.forEach((g) => { if (!GAME_LABELS[g]) err(`${c.id}: juego desconocido "${g}"`); });
  c.rel.forEach(([r]) => hasChar(r, `${c.id}.rel`));
});
Object.keys(IMG).forEach((id) => hasChar(id, "IMG"));
EVENTS.forEach((e, i) => {
  if (!ERAS.some((x) => x.id === e.era)) err(`EVENTS[${i}]: era desconocida "${e.era}"`);
  e.g.forEach((g) => { if (!GAME_LABELS[g]) err(`EVENTS[${i}]: juego desconocido "${g}"`); });
  e.who.forEach((w) => hasChar(w, `EVENTS[${i}]`));
});
GAMES.forEach((g) => g.who.forEach((w) => hasChar(w, `GAMES.${g.k}`)));
GAMES.forEach((g) => {
  const d = GAME_DETAILS[g.k];
  if (!d) return err(`GAME_DETAILS: falta la ficha ampliada de "${g.k}"`);
  if (!d.acts?.length) err(`GAME_DETAILS.${g.k}: sin actos`);
  [...d.villains, ...d.fallen].forEach((x) => { if (typeof x === "string") hasChar(x, `GAME_DETAILS.${g.k}`); });
});
Object.keys(GAME_DETAILS).forEach((k) => { if (!GAMES.some((g) => g.k === k)) err(`GAME_DETAILS: "${k}" no es un juego`); });
RELEASE_ORDER.forEach(([k]) => { if (!GAMES.some((g) => g.k === k)) err(`RELEASE_ORDER: juego sin ficha "${k}"`); });
LINKS.forEach(([a, b, t], i) => { hasChar(a, `LINKS[${i}]`); hasChar(b, `LINKS[${i}]`); if (!LINK_TYPES[t]) err(`LINKS[${i}]: tipo "${t}"`); });
Object.keys(LINK_NOTES).forEach((k) => {
  if (!LINKS.some(([a, b]) => `${a}|${b}` === k)) err(`LINK_NOTES: "${k}" no coincide con ningún vínculo (orden origen|destino)`);
});
FALLEN.forEach(([id]) => hasChar(id, "FALLEN"));

function walkTree(n, where) {
  n.u.forEach((p) => {
    const id = typeof p === "string" ? p : p.id;
    if (id) hasChar(id, where);
  });
  (n.kids || []).forEach((k) => walkTree(k, where));
}
TREES.forEach((t, i) => walkTree(t.root, `TREES[${i}]`));

if (errors.length) {
  console.error(`✘ ${errors.length} problema(s):\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}
console.log(`✔ Datos correctos: ${CHARACTERS.length} personajes, ${EVENTS.length} eventos, ${GAMES.length} juegos (${Object.values(GAME_DETAILS).reduce((n, d) => n + d.acts.length, 0)} actos), ${LINKS.length} vínculos, ${TREES.length} árboles, ${Object.keys(UI).length} textos de interfaz (ES/EN).`);
