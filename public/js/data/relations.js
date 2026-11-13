// Vínculos del grafo de relaciones y lista de caídos.
import { L } from "../l.js";

export const LINK_TYPES = {
  sangre:  { l: L("Familia", "Family"), c: "#c4161c" },
  pareja:  { l: L("Pareja", "Partners"), c: "#c9708e" },
  armas:   { l: L("Hermanos de armas / aliados", "Brothers in arms / allies"), c: "#6f8fa8" },
  enemigo: { l: L("Enemistad / muerte", "Enmity / killed"), c: "#d6a74a", dash: "5 4" },
  ciencia: { l: L("Creación / ciencia", "Creation / science"), c: "#8aa84f", dash: "2 3" },
};

/** [origen, destino, tipo] */
export const LINKS = [
  ["adam", "marcus", "sangre"], ["elain", "marcus", "sangre"], ["adam", "elain", "pareja"], ["marcus", "anya", "pareja"], ["marcus", "jd", "sangre"], ["anya", "jd", "sangre"], ["helena", "anya", "sangre"],
  ["carlos", "dom", "sangre"], ["dom", "maria", "pareja"],
  ["myrrah", "reyna", "sangre"], ["torres", "reyna", "sangre"], ["myrrah", "torres", "pareja"], ["myrrah", "matriarch", "sangre"], ["reyna", "matriarch", "sangre"], ["gabe", "reyna", "pareja"], ["gabe", "kait", "sangre"], ["reyna", "kait", "sangre"], ["gabe", "oscar", "sangre"], ["oscar", "kait", "sangre"], ["kait", "myrrah", "sangre"],
  ["clay", "ben", "sangre"], ["clay", "anthony", "sangre"], ["ben", "anthony", "sangre"], ["lahni", "tai", "sangre"],
  ["hoffman", "bernie", "pareja"], ["baird", "sam", "pareja"],
  ["marcus", "dom", "armas"], ["marcus", "carlos", "armas"], ["marcus", "baird", "armas"], ["marcus", "cole", "armas"], ["baird", "cole", "armas"], ["marcus", "hoffman", "armas"], ["jd", "del", "armas"], ["del", "kait", "armas"], ["jd", "kait", "armas"], ["jd", "fahz", "armas"], ["marcus", "mags", "armas"], ["marcus", "lucas", "armas"], ["dom", "mags", "armas"], ["mags", "lucas", "armas"], ["baird", "paduk", "armas"], ["cole", "paduk", "armas"], ["gabe", "sid", "armas"], ["lahni", "keegan", "armas"], ["lahni", "mac", "armas"], ["keegan", "mac", "armas"], ["hoffman", "lahni", "armas"], ["kim", "marcus", "armas"], ["clay", "dom", "armas"], ["sam", "marcus", "armas"], ["jace", "marcus", "armas"], ["dizzy", "marcus", "armas"], ["tai", "dom", "armas"], ["anya", "jinn", "armas"], ["anya", "dom", "armas"], ["marcus", "kait", "armas"], ["bernie", "cole", "armas"], ["anthony", "marcus", "armas"], ["ben", "dom", "armas"], ["prescott", "hoffman", "armas"],
  ["raam", "myrrah", "armas"], ["skorge", "myrrah", "armas"], ["karn", "raam", "armas"], ["raam", "skorge", "armas"],
  ["marcus", "raam", "enemigo"], ["marcus", "skorge", "enemigo"], ["marcus", "myrrah", "enemigo"], ["myrrah", "prescott", "enemigo"], ["baird", "karn", "enemigo"], ["gabe", "ukkon", "enemigo"], ["reyna", "ukkon", "enemigo"], ["ukkon", "torres", "enemigo"], ["raam", "kim", "enemigo"], ["jd", "jinn", "enemigo"], ["adam", "myrrah", "enemigo"], ["sid", "samson", "enemigo"], ["del", "fahz", "enemigo"],
  ["samson", "myrrah", "ciencia"], ["samson", "ukkon", "ciencia"], ["samson", "matriarch", "ciencia"], ["samson", "torres", "ciencia"], ["prescott", "adam", "ciencia"], ["elain", "myrrah", "ciencia"],
];

/** Notas específicas de algunos vínculos (clave "origen|destino"). */
export const LINK_NOTES = {
  "raam|myrrah": L("Sirve a la reina", "Serves the queen"),
  "skorge|myrrah": L("Sirve a la reina", "Serves the queen"),
  "karn|raam": L("Generales aliados", "Allied generals"),
  "raam|skorge": L("Generales aliados", "Allied generals"),
  "adam|myrrah": L("Pacto secreto", "Secret pact"),
  "marcus|myrrah": L("Marcus la mata", "Marcus kills her"),
  "myrrah|prescott": L("Myrrah lo mata", "Myrrah kills him"),
  "reyna|ukkon": L("Reyna lo mata", "Reyna kills him"),
  "raam|kim": L("RAAM lo mata", "RAAM kills him"),
  "jd|jinn": L("Ordenó la masacre del Asentamiento 2", "Ordered the Settlement 2 massacre"),
  "kait|myrrah": L("Abuela y nieta", "Grandmother and granddaughter"),
  "del|fahz": L("Rivalidad", "Rivalry"),
};

/** Caídos en orden cronológico: [id, fecha, causa]. */
export const FALLEN = [
  ["elain", "9 BE", L("Ejecutada al contactar con los Locust.", "Executed when she made contact with the Locust.")],
  ["carlos", "2 BE", L("Aspho Fields.", "Aspho Fields.")],
  ["helena", "2 BE", L("Cae en combate en el Péndulo.", "Killed in action in the Pendulum Wars.")],
  ["torres", "1 AE", L("Asesinado por Ukkon.", "Killed by Ukkon.")],
  ["ukkon", "1 AE", L("Reyna lo mata.", "Killed by Reyna.")],
  ["kim", "14 AE", L("RAAM, al inicio de Gears 1.", "RAAM, at the start of Gears 1.")],
  ["anthony", "14 AE", L("Francotirador Locust.", "A Locust sniper.")],
  ["raam", "14 AE", L("Marcus, en el tren.", "Marcus, on the train.")],
  ["ben", "14 AE", L("Dentro del Gusano de Rift.", "Inside the Riftworm.")],
  ["tai", "14 AE", L("Tras la tortura Locust.", "After Locust torture.")],
  ["maria", "14 AE", L("Muerte piadosa a manos de Dom.", "A mercy killing by Dom.")],
  ["skorge", "14 AE", L("Marcus y Dom, en Nexus.", "Marcus and Dom, in Nexus.")],
  ["dom", "17 AE", L("Se sacrifica en Mercy.", "Sacrifices himself at Mercy.")],
  ["prescott", "17 AE", L("Asesinado por Myrrah.", "Killed by Myrrah.")],
  ["adam", "17 AE", L("Su propia arma, en Azura.", "His own weapon, on Azura.")],
  ["myrrah", "17 AE", L("El cuchillo de Dom, en manos de Marcus.", "Dom's knife, in Marcus's hand.")],
  ["anya", "27 AE", L("Programa de fertilidad.", "The fertility programme.")],
  ["gabe", "30 AE", L("Entreguerras.", "The interwar years.")],
  ["oscar", "42 AE", L("Un Guardián del Enjambre.", "A Swarm Warden.")],
  ["reyna", "42 AE", L("Muerte piadosa a manos de Kait.", "A mercy killing by Kait.")],
];
