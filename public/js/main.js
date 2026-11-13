// Punto de entrada: pinta todas las secciones, gestiona idioma, navegación y efectos.
import { applyStaticText, onLangChange, setLang, lang } from "./i18n.js";
import { $, $$, initialsBox } from "./util.js";
import { renderWorld } from "./render/world.js";
import { renderTimeline, initTimeline } from "./render/timeline.js";
import { renderThreads } from "./render/threads.js";
import { renderOrder, initOrder } from "./render/order.js";
import { renderGames } from "./render/games.js";
import { renderCharacters, initCharacters } from "./render/characters.js";
import { renderGraph, initGraph } from "./render/graph.js";
import { renderTrees } from "./render/trees.js";
import { renderMemorial } from "./render/memorial.js";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderAll() {
  renderWorld();
  renderTimeline();
  renderThreads();
  renderOrder();
  renderGames();
  renderCharacters();
  renderGraph();
  renderTrees();
  renderMemorial();
}

/* ---------- Retratos que no cargan -> iniciales ---------- */
document.addEventListener("error", (e) => {
  const img = e.target;
  if (img instanceof HTMLImageElement && img.classList.contains("ph")) {
    img.outerHTML = initialsBox(img.dataset.fallback || "?", img.dataset.color);
  }
}, true);

/* ---------- Selector de idioma con fundido ---------- */
function initLangSwitch() {
  $$("[data-lang-btn]").forEach((btn) => btn.addEventListener("click", () => {
    const next = btn.dataset.langBtn;
    if (next === lang) return;
    if (reduceMotion) { setLang(next); return; }
    document.body.classList.add("lang-fade");
    setTimeout(() => {
      setLang(next);
      requestAnimationFrame(() => document.body.classList.remove("lang-fade"));
    }, 200);
  }));
  onLangChange(renderAll);
}

/* ---------- Aparición al hacer scroll ---------- */
// Comprobación por posición en cada scroll (no IntersectionObserver): así se muestra
// también todo lo que queda por encima del viewport tras un scroll rápido o un salto
// desde el menú, y ningún bloque puede quedarse oculto.
function initReveal() {
  const pending = new Set($$("[data-reveal]"));
  if (reduceMotion) { pending.forEach((el) => el.classList.add("in")); return; }
  let ticking = false;
  const check = () => {
    ticking = false;
    const limit = innerHeight * .92;
    pending.forEach((el) => {
      if (el.getBoundingClientRect().top < limit) { el.classList.add("in"); pending.delete(el); }
    });
    if (!pending.size) { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  check();
}

/* ---------- Enlace activo en la navegación ---------- */
function initNavSpy() {
  const links = $$("#navlinks a");
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((a) => {
      const on = a.getAttribute("href") === `#${en.target.id}`;
      a.classList.toggle("on", on);
      if (on) a.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("section[id]").forEach((s) => io.observe(s));
}

/* ---------- Barra de progreso de lectura ---------- */
function initProgress() {
  const bar = $("#progress");
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ---------- Brasas del hero ---------- */
function initEmbers() {
  if (reduceMotion) return;
  const host = $("#embers");
  const rnd = (a, b) => a + Math.random() * (b - a);
  host.innerHTML = Array.from({ length: 26 }, () =>
    `<span style="--x:${rnd(0, 100).toFixed(1)}%;--s:${rnd(2, 5).toFixed(1)}px;--t:${rnd(7, 15).toFixed(1)}s;--d:-${rnd(0, 15).toFixed(1)}s;--drift:${rnd(-60, 60).toFixed(0)}px"></span>`).join("");
}

/* ---------- Arranque ---------- */
// Solo se ocultan los bloques para animarlos si el JS ha arrancado (ver .js-reveal en CSS).
document.documentElement.classList.add("js-reveal");
applyStaticText();
initTimeline();
initOrder();
initCharacters();
initGraph();
renderAll();
initLangSwitch();
initReveal();
initNavSpy();
initProgress();
initEmbers();
document.documentElement.classList.add("ready");
