// Árboles genealógicos descritos como datos.
//
// Nodo:    { u: [persona, persona?], label?: L(), kids?: [nodo, ...] }
//          - u: una persona o una pareja; label: texto sobre el nodo (relación con el padre)
// Persona: "id"                         -> personaje con ficha (retrato + clic)
//          { id, sub: L() }             -> personaje con subtítulo personalizado
//          { name, sub, dead? }         -> persona sin ficha (iniciales)
import { L } from "../l.js";

const p = (id, es, en) => ({ id, sub: L(es, en ?? es) });
const x = (nameEs, nameEn, subEs, subEn, dead = false) => ({ name: L(nameEs, nameEn), sub: L(subEs, subEn), dead });

export const TREES = [
  {
    t: L("Casa Fenix · Stroud", "House Fenix · Stroud"),
    d: L("Tres generaciones de soldados y científicos. El árbol que une el pasado (Adam y Elain) con el futuro (JD).",
         "Three generations of soldiers and scientists. The tree that links the past (Adam and Elain) with the future (JD)."),
    root: { u: [p("adam", "Padre · científico", "Father · scientist"), p("elain", "Madre · bióloga", "Mother · biologist")], kids: [
      { u: [p("marcus", "Hijo", "Son"), p("anya", "Hija de Helena Stroud", "Helena Stroud's daughter")], kids: [
        { u: [p("jd", "James Dominic Fenix")] },
      ] },
    ] },
    note: L(
      `<b>Rama Stroud:</b> la mayor <a href="#" data-open="helena">Helena Stroud</a> (✝ 2 a.E.) es la madre de Anya, así que es abuela materna de JD. JD lleva el nombre de <b>Dominic</b> Santiago. Antepasado lejano: Roland Fenix, tatarabuelo de JD.`,
      `<b>Stroud branch:</b> Major <a href="#" data-open="helena">Helena Stroud</a> (✝ 2 BE) is Anya's mother, which makes her JD's maternal grandmother. JD is named after <b>Dominic</b> Santiago. A distant ancestor: Roland Fenix, JD's great-great-grandfather.`),
  },
  {
    t: L("Casa Santiago", "House Santiago"),
    d: L("La familia que más ha perdido. Ninguno de sus miembros sobrevive a la Guerra Locust.",
         "The family that lost the most. None of its members survives the Locust War."),
    root: { u: [x("Eduardo Santiago", "Eduardo Santiago", "Padre", "Father", true), x("Eva Santiago", "Eva Santiago", "Madre", "Mother", true)], kids: [
      { u: [p("carlos", "Hermano mayor · ✝ Aspho Fields", "Older brother · ✝ Aspho Fields")] },
      { u: [p("dom", "Hijo menor", "Younger son"), p("maria", "née Flores")], kids: [
        { u: [x("Benedicto", "Benedicto", "✝ Día-E", "✝ E-Day", true)] },
        { u: [x("Sylvia", "Sylvia", "✝ Día-E", "✝ E-Day", true)] },
      ] },
    ] },
    note: L("Dom y María se casaron a los 16. Benedicto nació poco después y Sylvia dos años más tarde. Los dos niños y los padres de María murieron en el Día-E.",
            "Dom and Maria married at 16. Benedicto was born soon after and Sylvia two years later. Both children and Maria's parents died on E-Day."),
  },
  {
    t: L("Linaje de la Reina · Myrrah → Diaz", "The Queen's bloodline · Myrrah → Diaz"),
    d: L("El árbol más importante de la saga moderna: une el laboratorio de New Hope con Kait Diaz. La etiqueta con ✦ marca una unión de laboratorio, no una pareja.",
         "The most important tree in the modern saga: it links the New Hope laboratory to Kait Diaz. The label marked ✦ is a laboratory union, not a couple."),
    root: { u: [p("samson", "Padre adoptivo · creador", "Adoptive father · creator")], kids: [
      { label: L("Adopción", "Adoption"), u: [p("myrrah", "Sujeto EV-184-9", "Subject EV-184-9"), p("torres", "Examante · genetista", "Former lover · geneticist")], kids: [
        { label: L("Hija de Myrrah y Torres", "Daughter of Myrrah and Torres"), u: [p("reyna", "Hija · Sujeto TE-872-3", "Daughter · Subject TE-872-3"), p("gabe", "Esposo · Gears Tactics", "Husband · Gears Tactics")], kids: [
          { u: [p("kait", "Nieta de Myrrah", "Myrrah's granddaughter")] },
        ] },
        { label: L("Óvulo de Myrrah + ADN de Sire ✦", "Myrrah's egg + Sire DNA ✦"), u: [p("matriarch", "Primera Berserker", "First Berserker")], kids: [
          { u: [x("Horda Locust", "Locust Horde", "Todos descienden de ella", "All descend from her")] },
        ] },
      ] },
    ] },
    note: L(
      `<b>Familia Diaz:</b> Gabe se crió en un orfanato con su hermano <a href="#" data-open="oscar">Oscar</a> (tío de Kait) y con su hermano adoptivo Wyatt Callahan (✝ Gatka Ridge). <b>Dato clave:</b> la Matriarca es media hermana de Reyna, y por eso los Locust y el Enjambre son, literalmente, «familia» de Kait.`,
      `<b>Diaz family:</b> Gabe grew up in an orphanage with his brother <a href="#" data-open="oscar">Oscar</a> (Kait's uncle) and his adoptive brother Wyatt Callahan (✝ Gatka Ridge). <b>Key fact:</b> the Matriarch is Reyna's half-sister, which makes the Locust and the Swarm literally Kait's “family”.`),
  },
  {
    t: L("Hermanos Carmine", "The Carmine brothers"),
    d: L("El chiste recurrente más trágico de la saga: cada juego tiene un Carmine y casi todos mueren.",
         "The saga's most tragic running joke: every game has a Carmine, and nearly all of them die."),
    root: { u: [x("Zander Carmine", "Zander Carmine", "Padre", "Father"), x("Madison Carmine", "Madison Carmine", "Madre", "Mother")], kids: [
      { u: [p("clay", "El mayor · sobrevive", "Eldest · survives")] },
      { u: [p("anthony", "✝ Gears 1")] },
      { u: [p("ben", "✝ Gears 2")] },
      { u: [x("4.º hermano", "4th brother", "Sin nombre", "Unnamed")] },
    ] },
    note: L("Otros familiares: Will Carmine (tío paterno, ✝), Fredo y Gary Carmine.",
            "Other relatives: Will Carmine (paternal uncle, ✝), Fredo and Gary Carmine."),
  },
  {
    t: L("Árbol de la especie Locust", "Locust species tree"),
    d: L("No es una familia: es la genealogía de una especie creada por el ser humano.",
         "Not a family: the genealogy of a species created by human beings."),
    root: { u: [x("Imulsión", "Imulsion", "Organismo parasitario", "Parasitic organism")], kids: [
      { label: L("Proyecto New Hope", "Project New Hope"), u: [p("samson", "Director"), p("torres", "Genetista", "Geneticist")], kids: [
        { label: L("Primer Sire", "First Sire"), u: [p("ukkon", "Paciente cero", "Patient Zero")], kids: [
          { u: [x("Bestias de Ukkon", "Ukkon's beasts", "Brumak, Corpser…", "Brumak, Corpser…")] },
        ] },
        { label: L("Niña inmune", "Immune child"), u: [p("myrrah", "Inmune · reina", "Immune · queen")], kids: [
          { u: [p("matriarch", "Madre de la especie", "Mother of the species")], kids: [
            { u: [x("Horda Locust", "Locust Horde", "Drones, Theron, Kantus…", "Drones, Theron, Kantus…")], kids: [
              { label: L("Mutación", "Mutation"), u: [x("Lambent", "Lambent", "Infectados por Imulsión", "Infected by Imulsion")] },
              { label: L("Evolución", "Evolution"), u: [x("El Enjambre", "The Swarm", "Capullos supervivientes", "Surviving cocoons")], kids: [
                { u: [p("reyna", "Reina del Enjambre", "Queen of the Swarm")] },
              ] },
            ] },
          ] },
        ] },
      ] },
    ] },
    note: L("Los Locust huyen a la superficie (Día-E) por miedo a los Lambent. El arma de Adam los extermina a ambos. El Enjambre son los Locust que sobrevivieron en capullos.",
            "The Locust flee to the surface (E-Day) for fear of the Lambent. Adam's weapon wipes out both. The Swarm are the Locust who survived in cocoons."),
  },
];
