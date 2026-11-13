// Textos de interfaz (navegación, cabeceras de sección, etiquetas). Clave -> {es, en}.
import { L } from "../l.js";

export const UI = {
  "meta.title": L("Crónicas de Sera", "Chronicles of Sera"),
  "meta.description": L(
    "Infografía del lore de Gears of War: cronología, juegos, personajes, relaciones y árboles genealógicos.",
    "Gears of War lore infographic: timeline, games, characters, relationships and family trees."),
  "lang.switch": L("Idioma", "Language"),
  "close": L("Cerrar", "Close"),

  "nav.world": L("Mundo", "World"),
  "nav.timeline": L("Cronología", "Timeline"),
  "nav.threads": L("Hilos", "Threads"),
  "nav.order": L("Orden", "Order"),
  "nav.games": L("Juegos", "Games"),
  "nav.chars": L("Personajes", "Characters"),
  "nav.graph": L("Relaciones", "Relationships"),
  "nav.families": L("Familias", "Families"),
  "nav.fallen": L("Caídos", "Fallen"),
  "nav.glossary": L("Glosario", "Glossary"),

  "hero.kicker": L("Infografía del universo Gears of War", "A Gears of War universe infographic"),
  "hero.title": L("Crónicas<span>de Sera</span>", "Chronicles<span>of Sera</span>"),
  "hero.text": L(
    "Ochenta años de guerra entre humanos, una especie nacida en un laboratorio y tres generaciones de soldados que no dejan de pagar el precio. La historia completa, de la Emergencia al Enjambre: personajes, linajes y cómo encaja cada juego.",
    "Eighty years of human war, a species born in a laboratory and three generations of soldiers who keep paying the price. The whole story, from Emergence to the Swarm: characters, bloodlines and how every game fits together."),
  "hero.cta1": L("Ver la cronología", "Explore the timeline"),
  "hero.cta2": L("Árboles genealógicos", "Family trees"),

  "stat1": L("<b>79 <em>años</em></b><span>de Guerras del Péndulo antes del Día de la Emergencia</span>",
             "<b>79 <em>years</em></b><span>of Pendulum Wars before Emergence Day</span>"),
  "stat2": L("<b>14 <em>años</em></b><span>separan el Día-E (0 d.E.) de Gears of War (14 d.E.)</span>",
             "<b>14 <em>years</em></b><span>between E-Day (0 AE) and Gears of War (14 AE)</span>"),
  "stat3": L("<b>25 <em>años</em></b><span>de paz entre la caída de Myrrah y la llegada del Enjambre</span>",
             "<b>25 <em>years</em></b><span>of peace between Myrrah's fall and the Swarm</span>"),
  "stat4": L("<b>3 <em>gen.</em></b><span>de Fenix en combate: Adam, Marcus y JD</span>",
             "<b>3 <em>gen.</em></b><span>of Fenix soldiers: Adam, Marcus and JD</span>"),

  "world.k": L("01 · El mundo", "01 · The world"),
  "world.t": L("Sera en seis claves", "Sera in six keys"),
  "world.lead": L(
    "Antes de entrar en la historia: los seis elementos que lo mueven todo. Casi todos los conflictos de la saga nacen de uno de ellos, la Imulsión.",
    "Before the story: the six elements that drive everything. Almost every conflict in the saga grows out of one of them, Imulsion."),
  "world.hint": L(
    "Calendario: <b>a.E.</b> = antes de la Emergencia · <b>d.E.</b> = después de la Emergencia (en inglés B.E. / A.E.). El año 0 es el Día de la Emergencia.",
    "Calendar: <b>BE</b> = Before Emergence · <b>AE</b> = After Emergence. Year 0 is Emergence Day."),

  "tl.k": L("02 · Cronología maestra", "02 · Master timeline"),
  "tl.t": L("De New Hope al Enjambre", "From New Hope to the Swarm"),
  "tl.lead": L(
    "Todos los acontecimientos clave en orden cronológico interno, juegos, novelas y cómics incluidos. Filtra por juego para ver solo lo que ocurre en cada uno.",
    "Every key event in in-universe order, including games, novels and comics. Filter by game to see only what happens in each one."),
  "all": L("Todo", "All"),

  "th.k": L("03 · Cómo se entrelaza todo", "03 · How it all connects"),
  "th.t": L("Los hilos de la saga", "The threads of the saga"),
  "th.lead": L(
    "Seis hilos narrativos recorren las tres eras. Cada punto es un hecho; las líneas verticales marcan dónde transcurre cada juego. Así se ve, por ejemplo, que el experimento de New Hope (hace casi un siglo) es lo que acaba poniendo a Kait en el centro del conflicto en 42 d.E.",
    "Six story threads run through all three eras. Each dot is an event; the vertical lines mark where each game takes place. It shows, for example, how the New Hope experiment, almost a century earlier, is what puts Kait at the centre of the conflict in 42 AE."),
  "th.hint": L("Pasa el ratón por un punto para ver el detalle. En móvil, desliza en horizontal.",
               "Hover a dot for details. On mobile, swipe sideways."),

  "ord.k": L("04 · Lanzamiento vs. historia", "04 · Release vs. story"),
  "ord.t": L("¿En qué orden pasa todo?", "In what order does it happen?"),
  "ord.lead": L(
    "Los juegos no salieron en orden cronológico. Pasa el ratón o toca un título para ver dónde cae en la línea temporal de Sera.",
    "The games were not released in story order. Hover or tap a title to see where it falls on Sera's timeline."),
  "ord.rel": L("Orden de lanzamiento", "Release order"),
  "ord.chr": L("Orden cronológico", "Story order"),

  "gm.k": L("05 · Resumen por juego", "05 · Game by game"),
  "gm.t": L("La historia, juego a juego", "The story, game by game"),
  "gm.lead": L(
    "En orden cronológico. Cada ficha resume la trama, sus momentos clave, quién aparece y cómo conecta con el resto. <b class=\"spoiler\">Contiene spoilers de toda la saga.</b>",
    "In story order. Each entry covers the plot, key moments, who appears and how it connects to the rest. <b class=\"spoiler\">Spoilers for the whole saga.</b>"),
  "released": L("Lanzado", "Released"),
  "setIn": L("Ocurre en", "Set in"),
  "keyMoments": L("Momentos clave", "Key moments"),
  "characters": L("Personajes", "Characters"),
  "howConnects": L("Cómo conecta →", "How it connects →"),

  "ch.k": L("06 · Dossier", "06 · Dossier"),
  "ch.t": L("Personajes", "Characters"),
  "ch.lead": L("Haz clic en cualquier ficha para ver su historia completa, sus datos y con quién está conectado.",
               "Click any card to see the character's full story, key facts and who they are connected to."),
  "ch.search": L("Buscar personaje…", "Search characters…"),
  "ch.none": L("Ningún personaje coincide.", "No characters match."),
  "allChars": L("Todos", "All"),
  "deceased": L("✝ Fallecido", "✝ Deceased"),
  "role": L("Papel", "Role"),
  "status": L("Estado", "Status"),
  "statusDead": L("Fallecido", "Deceased"),
  "statusAlive": L("Vivo (último dato)", "Alive (latest info)"),
  "born": L("Nacimiento", "Born"),
  "origin": L("Origen", "Origin"),
  "appears": L("Aparece en", "Appears in"),
  "story": L("Historia", "Story"),
  "connections": L("Conexiones", "Connections"),

  "gr.k": L("07 · Red de relaciones", "07 · Relationship web"),
  "gr.t": L("Quién es quién para quién", "Who is who to whom"),
  "gr.lead": L(
    "Cada línea es un vínculo: sangre, pareja, hermanos de armas, enemistad o creación científica. Arrastra los nodos y haz clic en un retrato para abrir su ficha; pasa el ratón por un nodo para ver solo sus conexiones. Zoom: botones, Ctrl/⌘ + rueda o pellizco.",
    "Each line is a bond: blood, partners, brothers in arms, enmity or scientific creation. Drag the nodes and click a portrait to open the character's card; hover a node to see only its connections. Zoom: buttons, Ctrl/⌘ + wheel or pinch."),
  "zoom.in": L("Acercar", "Zoom in"),
  "zoom.out": L("Alejar", "Zoom out"),
  "zoom.reset": L("Restablecer zoom", "Reset zoom"),

  "fam.k": L("08 · Linajes", "08 · Bloodlines"),
  "fam.t": L("Árboles genealógicos", "Family trees"),
  "fam.lead": L(
    "Las cuatro familias que sostienen la saga, y un quinto árbol: el linaje de la especie Locust, de un pabellón infantil a una reina inmortal. Los retratos en gris son personajes fallecidos.",
    "The four families that carry the saga, plus a fifth tree: the lineage of the Locust species, from a children's ward to an immortal queen. Greyed-out portraits are deceased characters."),

  "fal.k": L("09 · In memoriam", "09 · In memoriam"),
  "fal.t": L("Los caídos", "The fallen"),
  "fal.lead": L("Las muertes que cambiaron el rumbo de la historia, en orden cronológico.",
                "The deaths that changed the course of the story, in chronological order."),

  "gl.k": L("10 · Referencia", "10 · Reference"),
  "gl.t": L("Glosario y rutas", "Glossary and play orders"),
  "gl.lead": L("Términos que aparecen una y otra vez, y dos formas de recorrer la saga.",
               "Terms that come up again and again, and two ways to play through the saga."),

  "footer": L(
    "Infografía hecha por fans, sin fines comerciales. Gears of War y todos sus personajes son propiedad de Microsoft / Xbox Game Studios / The Coalition. Datos contrastados con la wiki de la comunidad (gearsofwar.fandom.com); los retratos se cargan directamente desde ella. Fechas según el calendario del universo (a.E. / d.E.).",
    "Non-commercial fan infographic. Gears of War and all its characters are property of Microsoft / Xbox Game Studios / The Coalition. Facts checked against the community wiki (gearsofwar.fandom.com); portraits are loaded directly from it. Dates follow the in-universe calendar (BE / AE)."),
};
