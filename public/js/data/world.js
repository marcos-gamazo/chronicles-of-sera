// Claves del mundo, glosario y rutas de juego.
import { L } from "../l.js";

export const PRIMER = [
  { icon: "I", color: "#d6a74a", t: L("Imulsión", "Imulsion"),
    d: L("Un líquido fosforescente que alimenta toda la civilización de Sera. Por controlarlo se libraron 79 años de Guerras del Péndulo. En realidad es un organismo vivo y parasitario.",
         "A phosphorescent liquid that powers all of Sera's civilisation. Seventy-nine years of Pendulum Wars were fought to control it. It is actually a living, parasitic organism.") },
  { icon: "⚔", color: "#c4161c", t: L("COG vs. UIR", "COG vs. UIR"),
    d: L("La Coalición de Gobiernos Ordenados (COG) contra la Unión de Repúblicas Independientes (UIR). La COG gana robando el Martillo del Alba. Seis semanas después llega el Día-E.",
         "The Coalition of Ordered Governments (COG) against the Union of Independent Republics (UIR). The COG wins by stealing the Hammer of Dawn. Six weeks later comes E-Day.") },
  { icon: "H", color: "#8f8f99", t: L("El Hollow", "The Hollow"),
    d: L("La inmensa red de cavernas bajo la corteza de Sera. Allí viven los Locust y se esconden criaturas mutadas por la Imulsión.",
         "The vast cave network beneath Sera's crust. It is home to the Locust and to creatures mutated by Imulsion.") },
  { icon: "L", color: "#d6a74a", t: L("Los Locust", "The Locust"),
    d: L("Una especie que la humanidad tomó por nativa del subsuelo. En realidad son descendientes de niños humanos mutados en el laboratorio de New Hope y gobernados por la reina Myrrah.",
         "A species humanity took to be native to the underground. They are actually descendants of human children mutated at the New Hope laboratory, ruled by Queen Myrrah.") },
  { icon: "λ", color: "#e0672a", t: L("Los Lambent", "The Lambent"),
    d: L("Seres infectados por la Imulsión, que mutan y explotan. Los Locust salen a la superficie para huir de ellos, y ese es el verdadero motivo del Día-E.",
         "Beings infected by Imulsion, which mutate and explode. The Locust surface to escape them, and that is the real reason for E-Day.") },
  { icon: "S", color: "#b0563b", t: L("El Enjambre", "The Swarm"),
    d: L("Los Locust que sobrevivieron en capullos al arma de Adam Fenix y despertaron evolucionados. Capturan humanos y los convierten en Drones. Una mente colmena los une.",
         "Locust who survived Adam Fenix's weapon inside cocoons and awoke evolved. They capture humans and turn them into Drones. A hivemind binds them together.") },
];

export const GLOSSARY = [
  [L("Martillo del Alba", "Hammer of Dawn"), L("Red de satélites con láser orbital. La COG la robó en la Operación Leveler, la usó para ganar el Péndulo y para quemar sus propias ciudades en 1 d.E. Gears 5 la reactiva.", "A network of orbital laser satellites. The COG stole it in Operation Leveler, used it to win the Pendulum Wars and to burn its own cities in 1 AE. Gears 5 brings it back online.")],
  [L("Masa Ligera", "Lightmass"), L("Tecnología explosiva basada en Imulsión. La bomba de Gears 1, el misil de Judgment y el proyecto secreto de E-Day.", "Imulsion-based explosive technology. The bomb in Gears 1, the missile in Judgment and the secret project in E-Day.")],
  [L("Neumoimulsión (Rustlung)", "Rustlung"), L("Enfermedad pulmonar causada por la Imulsión que sufrían los hijos de los mineros. Tratarla fue el pretexto de New Hope.", "A lung disease caused by Imulsion that afflicted miners' children. Treating it was the pretext for New Hope.")],
  [L("Sires", "Sires"), L("Los primeros niños mutados en New Hope. De ellos y de la Matriarca descienden todos los Locust.", "The first children mutated at New Hope. Every Locust descends from them and the Matriarch.")],
  [L("Varados (Stranded)", "Stranded"), L("Civiles que se quedaron fuera de la protección de la COG tras los ataques del Martillo.", "Civilians left outside COG protection after the Hammer strikes.")],
  [L("Outsiders", "Outsiders"), L("Los herederos de los Varados en la posguerra. Rechazan vivir en las ciudades amuralladas de la COG.", "The post-war heirs of the Stranded. They refuse to live in the COG's walled cities.")],
  [L("Gear", "Gear"), L("Soldado de infantería de la COG. Su símbolo es la calavera dentro de un engranaje.", "A COG infantry soldier. The emblem is a skull inside a cog.")],
  [L("Estrella Embry", "Embry Star"), L("La mayor condecoración militar de la COG. La tienen Marcus, Dom, Carlos, Helena y Oscar, entre otros.", "The COG's highest military decoration. Holders include Marcus, Dom, Carlos, Helena and Oscar.")],
  [L("DeeBee", "DeeBee"), L("Robots diseñados por Baird que la COG de Jinn usa como soldados y policía.", "Robots designed by Baird that Jinn's COG uses as soldiers and police.")],
  [L("Gusano de Rift", "Riftworm"), L("Criatura colosal del Hollow que los Locust usan para hundir ciudades en Gears 2.", "A colossal Hollow creature the Locust use to sink cities in Gears 2.")],
  [L("Azura", "Azura"), L("Isla oculta de la COG protegida por un escudo meteorológico. Allí Adam desarrolló el arma que acabó con la Imulsión.", "A hidden COG island protected by a weather shield. There Adam developed the weapon that wiped out Imulsion.")],
  [L("Mente colmena", "Hivemind"), L("El vínculo psíquico que une al Enjambre. Por él la consciencia de Myrrah sobrevive y Kait tiene visiones.", "The psychic link that binds the Swarm. Through it Myrrah's consciousness survives and Kait has visions.")],
  [L("Lancer", "Lancer"), L("El fusil de asalto con bayoneta-motosierra. E-Day muestra el origen de la motosierra.", "The assault rifle with a chainsaw bayonet. E-Day shows where the chainsaw came from.")],
  [L("Sera / Tyrus", "Sera / Tyrus"), L("Sera es el planeta. Tyrus es la nación central de la COG, con capital en Ephyra.", "Sera is the planet. Tyrus is the COG's core nation, with Ephyra as its capital.")],
];

export const ROUTES = [
  {
    icon: "▶", color: "#c4161c",
    t: L("Ruta recomendada (primera vez)", "Recommended order (first time)"),
    p: L("Por lanzamiento: los giros están pensados para descubrirse en este orden.", "By release: the twists are meant to be discovered in this order."),
    items: [L("Gears of War (o Reloaded)", "Gears of War (or Reloaded)"), "Gears of War 2", "Gears of War 3", "Gears of War: Judgment", "Gears of War 4", L("Gears 5 + Hivebusters", "Gears 5 + Hivebusters"), "Gears Tactics", "Gears of War: E-Day"],
  },
  {
    icon: "⧗", color: "#d6a74a",
    t: L("Ruta cronológica (relectura)", "Story order (replay)"),
    p: L("Para volver a la saga sabiendo ya lo que pasa. Las novelas encajan entre juegos.", "For revisiting the saga once you know what happens. The novels slot in between games."),
    items: [L("Aspho Fields (novela) · flashbacks a.E.", "Aspho Fields (novel) · BE flashbacks"), L("Gears of War: E-Day · 0 d.E.", "Gears of War: E-Day · 0 AE"), L("Gears of War: Judgment · 0 d.E.", "Gears of War: Judgment · 0 AE"), L("Gears Tactics · 1 d.E.", "Gears Tactics · 1 AE"), L("Gears of War → Gears 2 · 14 d.E.", "Gears of War → Gears 2 · 14 AE"), L("Jacinto's Remnant, Anvil Gate, Coalition's End · 15–17 d.E.", "Jacinto's Remnant, Anvil Gate, Coalition's End · 15–17 AE"), L("Gears of War 3 · 17 d.E.", "Gears of War 3 · 17 AE"), L("Ascendance (novela) · posguerra", "Ascendance (novel) · post-war"), L("Gears 4 → Gears 5 + Hivebusters · 42 d.E.", "Gears 4 → Gears 5 + Hivebusters · 42 AE")],
  },
];
