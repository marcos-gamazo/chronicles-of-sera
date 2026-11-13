// Gestión de idioma: estado actual, traducción de textos y cambio en caliente.
import { UI } from "./data/ui.js";

const STORAGE_KEY = "sera-lang";
const SUPPORTED = ["es", "en"];
const listeners = new Set();

function detectInitial() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (SUPPORTED.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) return saved;
  } catch { /* almacenamiento no disponible */ }
  return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
}

export let lang = detectInitial();

/** Devuelve el texto en el idioma activo. Acepta {es,en} o un string plano. */
export function tr(value) {
  if (value == null) return "";
  if (typeof value === "object" && "es" in value) return value[lang] ?? value.es;
  return value;
}

/** Fechas del universo: los datos usan BE/AE; en español se muestran como a.E./d.E. */
export function era(value) {
  const s = tr(value);
  return lang === "es" ? s.replace(/\bBE\b/g, "a.E.").replace(/\bAE\b/g, "d.E.") : s;
}

/** Texto de interfaz por clave. */
export function ui(key) {
  return UI[key] ? tr(UI[key]) : key;
}

export function onLangChange(fn) {
  listeners.add(fn);
}

/** Aplica los textos estáticos marcados en el HTML. */
export function applyStaticText(root = document) {
  document.documentElement.lang = lang;
  document.title = ui("meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", ui("meta.description"));
  root.querySelectorAll("[data-i18n]").forEach((el) => { el.innerHTML = ui(el.dataset.i18n); });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = ui(el.dataset.i18nPlaceholder); });
  root.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", ui(el.dataset.i18nAria)); });
  root.querySelectorAll("[data-lang-btn]").forEach((b) => {
    const on = b.dataset.langBtn === lang;
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", String(on));
  });
}

export function setLang(next) {
  if (!SUPPORTED.includes(next) || next === lang) return;
  lang = next;
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignorar */ }
  const url = new URL(location.href);
  url.searchParams.set("lang", next);
  history.replaceState(null, "", url);
  applyStaticText();
  listeners.forEach((fn) => fn(next));
}

export { L } from "./l.js";
