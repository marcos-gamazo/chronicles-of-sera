// Eras, acontecimientos de la cronología y carriles del gráfico de hilos.
// Años: usar BE / AE (se muestran como a.E. / d.E. en español).
import { L } from "../l.js";

export const ERAS = [
  { id: "origen",   name: L("Orígenes y New Hope", "Origins and New Hope"), span: "c. 79 – 30 BE", c: "#8aa84f" },
  { id: "pendulo",  name: L("Guerras del Péndulo", "Pendulum Wars"),         span: "30 – 0 BE",     c: "#8f8f99" },
  { id: "locust",   name: L("Guerra Locust", "Locust War"),                  span: "0 – 17 AE",     c: "#c4161c" },
  { id: "paz",      name: L("Entreguerras", "Interwar years"),               span: "17 – 42 AE",    c: "#6f8fa8" },
  { id: "enjambre", name: L("Invasión del Enjambre", "Swarm Invasion"),      span: "42 AE",         c: "#b0563b" },
];

const E = (era, y, tEs, tEn, dEs, dEn, g, who = [], big = false) => ({ era, y, t: L(tEs, tEn), d: L(dEs, dEn), g, who, big });

export const EVENTS = [
  E("origen", "c. 79 BE", "Comienzan las Guerras del Péndulo", "The Pendulum Wars begin",
    "La COG y la UIR entran en guerra por la Imulsión. El conflicto dura 79 años.", "The COG and the UIR go to war over Imulsion. The conflict lasts 79 years.", []),
  E("origen", "c. 55 BE", "Nace Myrrah", "Myrrah is born",
    "Hija de un minero de Imulsión de Tyrus. La internan en New Hope por neumoimulsión (rustlung).", "Daughter of a Tyran Imulsion miner. She is admitted to New Hope with Rustlung.", ["g5"], ["myrrah"]),
  E("origen", "BE", "Proyecto New Hope", "Project New Hope",
    "Niles Samson y Torres descubren la inmunidad de Myrrah. Al no poder replicarla, mutan a los demás niños con ADN del Hollow. Ukkon es el paciente cero. Nacen los Sires.",
    "Niles Samson and Torres discover Myrrah's immunity. Unable to replicate it, they mutate the other children with Hollow DNA. Ukkon is Patient Zero. The Sires are born.", ["g5", "tact"], ["samson", "torres", "ukkon", "myrrah"], true),
  E("origen", "BE", "Cierre de New Hope", "New Hope is shut down",
    "Sid Redburn y otros denuncian los experimentos. La COG cierra el centro y juzga a los responsables. Samson sigue trabajando en secreto en el monte Kadar.",
    "Sid Redburn and others expose the experiments. The COG closes the facility and puts those responsible on trial. Samson carries on in secret at Mount Kadar.", ["tact", "g5"], ["sid", "samson"]),
  E("origen", "c. 40 BE", "Nace la Matriarca", "The Matriarch is created",
    "Una híbrida creada con un óvulo de Myrrah y ADN de un Sire. Es la primera Berserker y la ancestro de todos los Locust.",
    "A hybrid created from one of Myrrah's eggs and Sire DNA. She is the first Berserker and the ancestor of every Locust.", ["g5"], ["matriarch"]),
  E("pendulo", "c. 30 BE", "Myrrah se convierte en reina", "Myrrah becomes queen",
    "Desciende al subsuelo y gobierna a la Horda Locust gracias a su vínculo mental. Nace su hija Reyna, de Torres, que huye con la niña.",
    "She descends underground and rules the Locust Horde through her mental link. Her daughter Reyna is born to Torres, who flees with the child.", ["g5"], ["myrrah", "reyna", "torres"], true),
  E("pendulo", "9 BE", "Elain Fenix descubre a los Locust", "Elain Fenix discovers the Locust",
    "Encuentra una especie inteligente en los túneles y la ejecutan al intentar hablar con ella. Adam sigue su rastro y contacta con Myrrah.",
    "She finds an intelligent species in the tunnels and is executed when she tries to talk to them. Adam follows her trail and makes contact with Myrrah.", ["nov"], ["elain", "adam"], true),
  E("pendulo", "2 BE", "Operación Leveler y Aspho Fields", "Operation Leveler and Aspho Fields",
    "La COG roba la tecnología del Martillo del Alba. Mueren Carlos Santiago y Helena Stroud. Marcus recibe la Estrella Embry.",
    "The COG steals the Hammer of Dawn technology. Carlos Santiago and Helena Stroud are killed. Marcus receives the Embry Star.", ["nov", "eday"], ["carlos", "marcus", "dom", "helena"], true),
  E("pendulo", "0", "Fin de las Guerras del Péndulo", "End of the Pendulum Wars",
    "La UIR se rinde ante el Martillo del Alba. Sera vive seis semanas de paz.", "The UIR surrenders to the Hammer of Dawn. Sera enjoys six weeks of peace.", []),
  E("locust", "0 AE", "DÍA DE LA EMERGENCIA", "EMERGENCE DAY",
    "Los Locust emergen a la vez en todas las ciudades de Sera. En Kalona, Marcus, Dom, Mags y Lucas forman Bravo y se enfrentan a Vraahk y su Legión Abrasada. Los hijos de Dom mueren en Ephyra.",
    "The Locust emerge in every city on Sera at once. In Kalona, Marcus, Dom, Mags and Lucas form Bravo and face Vraahk and his Scorched Legion. Dom's children die in Ephyra.", ["eday"], ["marcus", "dom", "mags", "lucas", "raam"], true),
  E("locust", "0 AE", "Halvo Bay", "Halvo Bay",
    "Seis semanas después del Día-E, la Escuadra Kilo (Baird, Cole, Sofia Hendrik, Paduk) detiene al general Karn. Baird usa el misil de Masa Ligera sin autorización y lo juzgan por ello.",
    "Six weeks after E-Day, Kilo Squad (Baird, Cole, Sofia Hendrik, Paduk) stops General Karn. Baird fires the Lightmass missile without authorisation and is tried for it.", ["judg"], ["baird", "cole", "paduk", "karn"]),
  E("locust", "1 AE", "Contraataque del Martillo del Alba", "The Hammer of Dawn counterattack",
    "El presidente Prescott ordena quemar la superficie de Sera con el Martillo para frenar a los Locust. Millones de personas mueren o quedan Varadas.",
    "Chairman Prescott orders Sera's surface burned with the Hammer to slow the Locust. Millions die or are left Stranded.", ["tact"], ["prescott"], true),
  E("locust", "1 AE", "Caza de Ukkon", "The hunt for Ukkon",
    "Gabe Diaz persigue a Ukkon, descubre el pasado de New Hope y rescata a Reyna, que mata a Ukkon. Torres muere.",
    "Gabe Diaz hunts Ukkon, uncovers the history of New Hope and rescues Reyna, who kills Ukkon. Torres dies.", ["tact"], ["gabe", "sid", "reyna", "ukkon", "torres"]),
  E("locust", "c. 10 AE", "Marcus abandona su puesto", "Marcus abandons his post",
    "Durante la caída de Ephyra intenta salvar a su padre. Lo condenan a 40 años en Jacinto.", "During the fall of Ephyra he tries to save his father. He is sentenced to 40 years in Jacinto.", ["g1"], ["marcus", "adam", "hoffman"]),
  E("locust", "14 AE", "Ofensiva de la Masa Ligera", "The Lightmass Offensive",
    "Dom saca a Marcus de la cárcel. Delta mapea los túneles con el Resonador y detona la bomba de Masa Ligera en el Hollow. Marcus mata a RAAM.",
    "Dom breaks Marcus out of prison. Delta maps the tunnels with the Resonator and detonates the Lightmass Bomb in the Hollow. Marcus kills RAAM.", ["g1"], ["marcus", "dom", "baird", "cole", "kim", "anthony", "raam", "anya"], true),
  E("locust", "14 AE", "Operación Hollow Storm", "Operation Hollow Storm",
    "El Gusano de Rift hunde ciudades enteras. Delta baja al Hollow. Dom encuentra a María. Mueren Ben Carmine y Tai. Marcus y Dom matan a Skorge y hunden Jacinto para inundar el Hollow.",
    "The Riftworm sinks entire cities. Delta goes down into the Hollow. Dom finds Maria. Ben Carmine and Tai die. Marcus and Dom kill Skorge and sink Jacinto to flood the Hollow.", ["g2"], ["marcus", "dom", "maria", "ben", "tai", "skorge", "dizzy"], true),
  E("locust", "15–17 AE", "Exilio en Vectes", "Exile on Vectes",
    "Los supervivientes de la COG se instalan en la isla de Vectes. Avanza la infección Lambent. Prescott huye con los secretos de Azura.",
    "The COG survivors settle on the island of Vectes. The Lambent infection spreads. Prescott flees with Azura's secrets.", ["nov"], ["prescott", "hoffman", "bernie"]),
  E("locust", "17 AE", "Fin de la Guerra Locust", "End of the Locust War",
    "Prescott revela que Adam vive. Dom se sacrifica en Mercy. Delta asalta Azura, Adam activa su arma y mueren todos los seres de Imulsión. Marcus mata a Myrrah.",
    "Prescott reveals that Adam is alive. Dom sacrifices himself at Mercy. Delta storms Azura, Adam fires his weapon and every Imulsion-based being dies. Marcus kills Myrrah.", ["g3"], ["marcus", "dom", "adam", "myrrah", "prescott", "anya", "baird", "cole", "clay", "sam", "jace"], true),
  E("paz", "18 AE", "Nace la nueva COG", "The new COG is founded",
    "Anya es la primera Primera Ministra. Se construyen ciudades amuralladas y los Outsiders rechazan vivir bajo su control.",
    "Anya becomes the first First Minister. Walled cities are built and the Outsiders refuse to live under COG control.", ["nov"], ["anya", "gabe", "reyna", "oscar"]),
  E("paz", "20 AE", "Nace JD Fenix", "JD Fenix is born",
    "Uno de los primeros niños del programa de fertilidad de Mina Jinn. Ese mismo año nacen Del y Fahz.", "One of the first children of Mina Jinn's fertility programme. Del and Fahz are born the same year.", ["g4"], ["jd", "marcus", "anya", "jinn"]),
  E("paz", "27 AE", "Muere Anya", "Anya dies",
    "Fallece al intentar tener un segundo hijo. Marcus se aísla en la granja Fenix.", "She dies trying to have a second child. Marcus shuts himself away on the Fenix farm.", ["g4"], ["anya", "marcus"]),
  E("paz", "30 AE", "Muere Gabe Diaz", "Gabe Diaz dies",
    "Reyna y Oscar quedan al frente de Fort Umson.", "Reyna and Oscar take charge of Fort Umson.", ["g4"], ["gabe", "reyna", "oscar"]),
  E("paz", "c. 41 AE", "Masacre del Asentamiento 2", "The Settlement 2 massacre",
    "Enviados a sofocar una protesta, JD da la orden de abrir fuego y mueren civiles. JD y Del desertan y se unen a los Outsiders de Kait.",
    "Sent to put down a protest, JD gives the order to open fire and civilians die. JD and Del desert and join Kait's Outsiders.", ["g5"], ["jd", "del", "fahz", "jinn", "kait"], true),
  E("enjambre", "42 AE", "Emerge el Enjambre", "The Swarm emerges",
    "Los Locust evolucionados atacan Fort Umson y se llevan a sus habitantes. Reyna aparece fusionada con una colmena y Kait la libera de su sufrimiento.",
    "The evolved Locust raid Fort Umson and take its people. Reyna is found fused to a hive and Kait releases her from her suffering.", ["g4"], ["jd", "kait", "del", "marcus", "reyna", "baird", "cole"], true),
  E("enjambre", "42 AE", "El secreto de Kait", "Kait's secret",
    "Muere Oscar. En el monte Kadar Kait descubre que es nieta de Myrrah y que la COG creó a los Locust; Reyna resucita como reina del Enjambre. La COG reactiva el Martillo del Alba y, en Nueva Ephyra, Kait tiene que elegir entre JD y Del.",
    "Oscar dies. At Mount Kadar Kait learns she is Myrrah's granddaughter and that the COG created the Locust; Reyna is resurrected as Queen of the Swarm. The COG brings the Hammer of Dawn back online and, in New Ephyra, Kait must choose between JD and Del.", ["g5"], ["kait", "jd", "del", "fahz", "oscar", "samson", "matriarch", "reyna", "marcus", "baird"], true),
  E("enjambre", "42 AE", "Hivebusters", "Hivebusters",
    "En una operación secreta a espaldas de Jinn, Hoffman envía al Equipo Scorpio (Lahni, Keegan y Mac) a la isla de Pahanu a destruir una colmena desde dentro.",
    "In a secret operation behind Jinn's back, Hoffman sends Team Scorpio (Lahni, Keegan and Mac) to the island of Pahanu to destroy a hive from the inside.", ["hive"], ["lahni", "keegan", "mac", "hoffman"]),
];

/* ---------- Gráfico de hilos (swimlanes) ---------- */
// Punto del hilo: [año, título, subtítulo opcional (null si no hay)].
const P = (year, es, en, subEs, subEn = subEs) => [year, L(es, en), subEs ? L(subEs, subEn) : null];

export const THREAD_ERAS = [
  [-80, -30, L("Orígenes", "Origins"), "#8aa84f"],
  [-30, 0, L("Péndulo", "Pendulum"), "#8f8f99"],
  [0, 17, L("Guerra Locust", "Locust War"), "#c4161c"],
  [17, 42, L("Entreguerras", "Interwar"), "#6f8fa8"],
  [42, 45, L("Enjambre", "Swarm"), "#b0563b"],
];

export const THREAD_GAMES = [["E-Day / Judgment", 0], ["Tactics", 1], ["G1 · G2", 14], ["G3", 17], ["G4 · G5", 42]];

export const THREAD_LANES = [
  { n: L("Imulsión y ciencia", "Imulsion and science"), c: "#8aa84f", pts: [
    P(-55, "Myrrah llega a New Hope", "Myrrah arrives at New Hope", "Inmune a la Imulsión", "Immune to Imulsion"),
    P(-45, "Sires y paciente cero", "Sires and Patient Zero", "Ukkon, el primer mutado", "Ukkon, the first mutant"),
    P(-40, "Matriarca", "The Matriarch", "Óvulo de Myrrah + Sire", "Myrrah's egg + Sire DNA"),
    P(-9, "Elain descubre a los Locust", "Elain discovers the Locust", "Ejecutada en el túnel", "Executed in the tunnel"),
    P(17, "Arma de Adam", "Adam's weapon", "Destruye toda la Imulsión", "Destroys all Imulsion"),
    P(42, "IA de Samson", "Samson's AI", "Kait conoce la verdad", "Kait learns the truth")] },
  { n: L("Familia Fenix", "Fenix family"), c: "#c4161c", pts: [
    P(-21, "Nace Marcus", "Marcus is born"), P(-9, "Muere Elain", "Elain dies"),
    P(-2, "Aspho Fields", "Aspho Fields", "Estrella Embry", "Embry Star"),
    P(0, "Día-E en Kalona", "E-Day in Kalona", "Bravo Squad", "Bravo Squad"),
    P(10, "Prisión de Jacinto", "Jacinto prison", "Abandona su puesto", "Abandons his post"),
    P(14, "Sale de prisión", "Released from prison", "Gears 1", "Gears 1"),
    P(17, "Muere Adam", "Adam dies", "Azura", "Azura"),
    P(20, "Nace JD", "JD is born"), P(27, "Muere Anya", "Anya dies"),
    P(42, "JD y Marcus contra el Enjambre", "JD and Marcus against the Swarm", "Gears 4/5", "Gears 4/5")] },
  { n: L("Familia Santiago", "Santiago family"), c: "#9a7fb8", pts: [
    P(-21, "Nace Dom", "Dom is born"),
    P(-2, "Muere Carlos", "Carlos dies", "Aspho Fields", "Aspho Fields"),
    P(0, "Mueren Benedicto y Sylvia", "Benedicto and Sylvia die", "Día-E", "E-Day"),
    P(14, "Dom encuentra a María", "Dom finds Maria", "Gears 2", "Gears 2"),
    P(17, "Sacrificio de Dom", "Dom's sacrifice", "Mercy", "Mercy"),
    P(20, "JD lleva su nombre", "JD is named after him", "James Dominic", "James Dominic")] },
  { n: L("Linaje Diaz-Torres", "Diaz-Torres bloodline"), c: "#6fa86f", pts: [
    P(-30, "Nace Reyna", "Reyna is born", "Hija de Myrrah y Torres", "Daughter of Myrrah and Torres"),
    P(-27, "Nace Gabe", "Gabe is born"),
    P(1, "Gabe rescata a Reyna", "Gabe rescues Reyna", "Tactics", "Tactics"),
    P(18, "Fort Umson", "Fort Umson", "Primeros Outsiders", "The first Outsiders"),
    P(30, "Muere Gabe", "Gabe dies"),
    P(42, "Reyna, reina del Enjambre", "Reyna, Queen of the Swarm", "Gears 4 y 5", "Gears 4 and 5"),
    P(42.6, "Kait: nieta de Myrrah", "Kait: Myrrah's granddaughter", "Gears 5", "Gears 5")] },
  { n: L("Horda Locust", "Locust Horde"), c: "#d6a74a", pts: [
    P(-30, "Myrrah, reina", "Myrrah becomes queen", "Desciende al Hollow", "Descends into the Hollow"),
    P(0, "Emergencia", "Emergence", "RAAM, Karn, Vraahk", "RAAM, Karn, Vraahk"),
    P(1, "Muere Ukkon", "Ukkon dies", "Tactics", "Tactics"),
    P(14, "Mueren RAAM y Skorge", "RAAM and Skorge die", "G1 / G2", "G1 / G2"),
    P(17, "Muere Myrrah", "Myrrah dies", "Fin de la Horda", "End of the Horde"),
    P(42, "Despierta el Enjambre", "The Swarm awakens", "Capullos supervivientes", "Surviving cocoons")] },
  { n: L("Política COG", "COG politics"), c: "#8f8f99", pts: [
    P(-79, "Empieza el Péndulo", "The Pendulum Wars begin", "COG vs. UIR", "COG vs. UIR"),
    P(-2, "Operación Leveler", "Operation Leveler", "Robo del Martillo", "The Hammer is stolen"),
    P(1, "Ataques del Martillo", "Hammer strikes", "Prescott quema Sera", "Prescott burns Sera"),
    P(15, "Exilio en Vectes", "Exile on Vectes"),
    P(18, "Anya, Primera Ministra", "Anya, First Minister", "Nueva COG", "New COG"),
    P(41, "Asentamiento 2", "Settlement 2", "Masacre de civiles", "Civilians massacred"),
    P(42, "Martillo reactivado", "Hammer back online", "Gears 5", "Gears 5")] },
];

/** Conectores verticales entre carriles: [año, carril A, carril B]. */
export const THREAD_CROSSINGS = [[-30, 3, 4], [0, 1, 2], [17, 1, 4], [42, 1, 3]];
export const THREAD_TICKS = [-79, -55, -30, -9, -2, 0, 10, 14, 17, 20, 27, 30, 42];
