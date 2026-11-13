# Crónicas de Sera · Chronicles of Sera

Infografía interactiva y bilingüe (**español / inglés**) sobre el lore de *Gears of War*: cronología completa, cómo se entrelazan los juegos, fichas de personajes, red de relaciones y árboles genealógicos.

🔗 **En producción:** https://cronicas-de-sera.pages.dev

> Proyecto de fans sin ánimo de lucro. *Gears of War* y todos sus personajes son propiedad de Microsoft / Xbox Game Studios / The Coalition.

---

## Contenido

| Sección | Qué muestra |
|---|---|
| **El mundo** | Las seis claves de Sera: Imulsión, COG vs. UIR, el Hollow, Locust, Lambent y Enjambre. |
| **Cronología** | 26 hechos desde New Hope (c. 79 a.E.) hasta la Invasión del Enjambre (42 d.E.), filtrables por juego. |
| **Hilos** | Gráfico de carriles con seis tramas (ciencia, Fenix, Santiago, Diaz-Torres, Horda, política) a lo largo de las eras. |
| **Orden** | Orden de lanzamiento frente a orden cronológico, unidos con líneas. |
| **Juegos** | Ficha por juego (E-Day, Judgment, Tactics, Gears 1–5, Hivebusters): trama, momentos clave, personajes y conexiones. Al pulsarla se abre la historia completa: 45 actos en total, lugares, antagonistas, quién muere, qué aporta al lore, desarrollo y plataformas, con navegación al juego anterior y siguiente. |
| **Personajes** | 44 fichas con retrato, buscador, filtro por bando y ficha detallada con historia por etapas. |
| **Relaciones** | Grafo de fuerzas (D3) con 83 vínculos de cinco tipos; se puede arrastrar, hacer zoom y filtrar. |
| **Familias** | Árboles de las casas Fenix-Stroud, Santiago, Myrrah → Diaz, Carmine y de la especie Locust. |
| **Caídos** | Las 20 muertes que cambiaron la historia. |
| **Glosario** | Términos clave y dos rutas de juego (por lanzamiento y cronológica). |

## Estructura

```
.
├── public/                  ← lo que se publica (sitio estático, sin build)
│   ├── index.html           ← esqueleto; los textos se rellenan desde JS
│   ├── css/styles.css       ← estilos, animaciones y responsive
│   ├── js/
│   │   ├── main.js          ← arranque, selector de idioma, efectos
│   │   ├── i18n.js          ← idioma activo, tr(), era(), ui()
│   │   ├── l.js             ← L(es, en): constructor de textos bilingües
│   │   ├── util.js          ← helpers de DOM y retratos
│   │   ├── modal.js         ← ventana compartida (fichas de personaje y de juego)
│   │   ├── data/            ← TODO el contenido (sin lógica)
│   │   │   ├── ui.js          textos de interfaz
│   │   │   ├── characters.js  personajes, bandos, URLs de retratos
│   │   │   ├── timeline.js    eras, eventos y carriles del gráfico de hilos
│   │   │   ├── games.js       fichas de juegos y orden de lanzamiento
│   │   │   ├── game-details.js historia por actos, lugares, antagonistas y muertes de cada juego
│   │   │   ├── relations.js   vínculos del grafo y caídos
│   │   │   ├── trees.js       árboles genealógicos
│   │   │   └── world.js       claves del mundo, glosario y rutas
│   │   └── render/          ← un módulo por sección
│   ├── _headers             ← cabeceras de Cloudflare Pages
│   └── favicon.svg
├── scripts/check-data.mjs   ← valida traducciones y referencias
├── .github/workflows/       ← CI: validación de datos
├── wrangler.jsonc           ← configuración de Cloudflare Pages
├── pnpm-workspace.yaml      ← dependencias con scripts permitidos (esbuild, workerd)
└── package.json
```

La separación **datos / render** permite ampliar el contenido sin tocar la lógica: casi todos los cambios se hacen solo en `public/js/data/`.

## Desarrollo local

Requisitos: Node.js 20+ y [pnpm](https://pnpm.io) (la versión exacta está en `packageManager` de `package.json`).

```bash
pnpm install         # instala wrangler
pnpm run dev         # http://localhost:8788 (servidor de Cloudflare Pages en local)
```

Al usar módulos ES, la página **no funciona abriendo `index.html` con doble clic** (`file://`): necesita un servidor. Alternativa sin Node: `python3 -m http.server -d public 8000`.

## Despliegue

### Automático (integración Git de Cloudflare Pages)

El proyecto `cronicas-de-sera` está conectado a este repositorio. Cloudflare despliega solo:

| Evento | Resultado |
|---|---|
| push a `main` | producción → https://cronicas-de-sera.pages.dev |
| push a otra rama / pull request | vista previa con URL propia y comentario en el PR |

Configuración del proyecto en Cloudflare (*Settings → Build*):

| Campo | Valor |
|---|---|
| Build command | `pnpm run check` (si los datos fallan, no se publica) |
| Build output directory | *(vacío)*: se toma `pages_build_output_dir: ./public` de `wrangler.jsonc` |
| Root directory | *(vacío)* |

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) solo valida los datos en cada push y pull request; no despliega ni necesita secretos.

### Manual (Wrangler)

Para publicar sin pasar por GitHub (por ejemplo, para probar algo):

```bash
pnpm exec wrangler login   # una sola vez
pnpm run deploy            # valida los datos y publica public/ en Cloudflare Pages
```

`pnpm run deploy` ejecuta antes `pnpm run check` y no publica si los datos tienen errores. El siguiente push a `main` sustituirá ese despliegue.

## Idiomas

- Detección automática: `?lang=es|en` en la URL → preferencia guardada → idioma del navegador.
- El selector **ES / EN** de la barra superior cambia todo el contenido al momento, sin recargar.
- Cada texto se escribe con `L("español", "english")`. Las fechas se guardan con el formato inglés `BE` / `AE` y se muestran como `a.E.` / `d.E.` en español.

## Cómo ampliar el contenido

**Añadir un personaje** — en `public/js/data/characters.js`:

```js
{
  id: "sofia", name: "Sofia Hendrik", alias: L("Capitana Hendrik", "Captain Hendrik"),
  f: "kilo", dead: false, games: ["judg"],
  role: L("Capitana de Kilo", "Kilo Squad captain"),
  short: L("…", "…"),
  born: "c. 30 BE",
  story: [S("Judgment", "Judgment", "…", "…")],
  rel: [R("baird", "Escuadrón", "Squadmate")],
},
```

Añade su retrato en `IMG` (opcional: sin imagen se muestran sus iniciales) y, si quieres, vínculos en `relations.js`.

**Ampliar la historia de un juego** — en `game-details.js`, cada juego tiene `acts` (`A(títuloES, títuloEN, textoES, textoEN)`), `places`, `villains`, `fallen` y `lore`. En `villains` y `fallen` se puede usar el id de un personaje (sale con retrato y enlace a su ficha) o un nombre con `L(…)`.

**Añadir un evento** — en `timeline.js`, con `E(era, año, títuloES, títuloEN, textoES, textoEN, [juegos], [personajes], destacado)`.

**Añadir un texto de interfaz** — clave nueva en `ui.js` y `data-i18n="clave"` en el HTML.

Después de cualquier cambio:

```bash
pnpm run check
```

Comprueba que **todos los textos tienen versión en español y en inglés**, y que cada id de personaje, juego, era o vínculo referenciado existe.

## Notas técnicas

- **Sin build ni frameworks**: HTML + CSS + módulos ES nativos. Única dependencia en el navegador: [D3 v7](https://d3js.org) (cdnjs), para el grafo y el gráfico de hilos.
- **Retratos**: se cargan directamente desde la wiki de la comunidad ([gearsofwar.fandom.com](https://gearsofwar.fandom.com)). Su CDN **rechaza las peticiones sin cabecera `Referer`** y no permite descargas automatizadas, así que las imágenes usan `referrerpolicy="strict-origin-when-cross-origin"`; no lo cambies a `no-referrer`. Si un retrato falla, se sustituye automáticamente por las iniciales.
- **Animaciones**: aparición al hacer scroll, brasas en el hero, trazado de los hilos, transición al cambiar de idioma, efectos hover. Todas se desactivan con `prefers-reduced-motion`. Si el JavaScript no arranca, el contenido no se queda oculto.
- **Datos**: contrastados con la wiki de la comunidad. El final de Gears 5 (salvar a JD o a Del) se presenta como abierto porque no hay canon confirmado.
