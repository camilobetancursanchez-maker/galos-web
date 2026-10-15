/**
 * Every editable text of the Spanish site (/es). Same shape as site.ts (English).
 * ─────────────────────────────────────────────
 * The record is the vault: Projects/Galos/Website/07_content/Español — the Spanish site.
 * Draft translation by Claude (WED 14): Camilo approves it there; this file follows.
 * PENDING notes stay in English (they are notes for Camilo, not for visitors).
 */

import * as en from "./site";
import { wingsEs } from "./agents.es";

const COPY = "Draft Spanish copy: Camilo approves it in 07_content/Español — the Spanish site.";

export const site: typeof en.site = {
  ...en.site,
  seo: {
    title: "Galos — un equipo de trabajadores de IA para tu negocio",
    description: "Cuéntale a Galos qué te está frenando. Contrata los trabajadores de IA que necesitas. Míralos trabajar en tu Studio.",
  },
  nav: [
    { href: "/workers", label: "Trabajadores" },
    { href: "/#how", label: "Cómo funciona" },
    { href: "/pricing", label: "Precios" },
    { href: "/results", label: "Resultados" },
  ],
  footerLinks: [
    { href: "/workers", label: "Trabajadores" },
    { href: "/#how", label: "Cómo funciona" },
    { href: "/pricing", label: "Precios" },
    { href: "/results", label: "Resultados" },
    { href: "/about", label: "Nosotros" },
    { href: "/custom", label: "Proyectos a la medida" },
    { href: "/teams", label: "Equipos" },
    { href: "/legal", label: "Legal" },
  ],
  disclosure: "Trabajadores de IA, operados por Galos.",
};

export const home: typeof en.home = {
  hero: {
    eyebrow: "La Colección Galos",
    title: { text: "Un equipo de trabajadores de IA para tu negocio.", pending: COPY },
    sub: { text: "Cuéntale a Galos qué te está frenando. Contrata los trabajadores que necesitas. Míralos trabajar en tu Studio.", pending: COPY },
  },
  how: {
    eyebrow: "Cómo funciona",
    title: { text: "Pregunta. Contrata. Crece.", pending: COPY },
    steps: [
      { n: "01", title: "Pregunta", text: "Cuéntale a Galos sobre tu negocio. 2 minutos, casi todo con toques." },
      { n: "02", title: "Contrata", text: "Elige un trabajador o un equipo. Trabajando en unos 7 días." },
      { n: "03", title: "Crece", text: "Mira en tu Studio lo que hizo cada trabajador este mes. Suma más cuando estés listo." },
    ],
  },
  journey: {
    eyebrow: "El recorrido del cliente",
    title: { text: "Todo negocio tiene cinco etapas con sus clientes.", pending: COPY },
    line: "Toca una para conocer a sus trabajadores.",
  },
  ask: {
    question: "¿Qué está frenando tu negocio?",
    other: "Otra cosa",
  },
  workers: {
    eyebrow: "La Colección",
    title: { text: "Conoce a los trabajadores.", pending: COPY },
    line: { text: "Cada uno hace un solo trabajo y se mide con un solo número.", pending: COPY },
  },
  studio: {
    eyebrow: "Tu Studio",
    title: { text: "Aquí es donde trabaja tu equipo.", pending: COPY },
    line: { text: "Mira cada parte de tu negocio con claridad, y recibe ayuda en cada etapa.", pending: COPY },
  },
  pricing: {
    eyebrow: "Precios",
    title: { text: "Tu Studio es gratis. Solo pagas por los trabajadores que contratas.", pending: COPY },
    facts: [
      { t: "Cada trabajador", d: "tiene su propio precio mensual." },
      { t: "Los equipos", d: "cuestan menos que contratar uno por uno." },
      { t: "Los proyectos a la medida", d: "desde $X, definidos en una llamada." },
    ],
    pending: en.home.pricing.pending,
  },
  proof: {
    eyebrow: "Observado",
    title: { text: "Resultados, medidos.", pending: COPY },
    rows: [
      { client: "Finaro", what: "Sitio web + captura de leads", metric: "Leads / mes", value: "—" },
      { client: "Crambol", what: "Trabajador de WhatsApp", metric: "Mensajes respondidos", value: "—" },
      { client: "Nitrux", what: "Piloto de CRM", metric: "Leads registrados", value: "—" },
    ],
    pending: en.home.proof.pending,
  },
  custom: {
    eyebrow: "Proyectos a la medida",
    title: { text: "¿No ves tu problema? Lo construimos.", pending: COPY },
    text: { text: "Sitios web como Finaro, apps, marcas y automatizaciones hechas para un solo negocio.", pending: COPY },
  },
  final: {
    title: { text: "Encuentra tu estrella.", pending: COPY },
    sub: { text: "Pregúntale a Galos qué necesita tu negocio. Toma dos minutos.", pending: COPY },
  },
};

export const faq: typeof en.faq = [
  { q: "¿Los trabajadores son personas?", a: "No. Cada trabajador es una IA, operada por Galos. Siempre lo dice, y una persona de Galos lo configura y lo supervisa." },
  { q: "¿Cuánto tarda en estar listo?", a: "Unos 7 días desde el día en que pagas. La página de cada trabajador muestra sus propios días." },
  { q: "¿Qué tengo que darles?", a: "Unas respuestas sobre tu negocio, tus precios y horarios, y acceso a las cuentas donde trabaja. Nunca contraseñas por chat." },
  { q: "¿Contratar o comprar?", a: "Contratar: Galos lo opera y te envía los números cada mes. Comprar: lo dejamos listo y tú lo operas." },
  { q: "¿Puedo cancelar?", a: "Los trabajadores contratados: cualquier mes." },
];
export const faqPending = en.faqPending;

export const pricing: typeof en.pricing = {
  title: "Tu Studio es gratis. Solo pagas por los trabajadores que contratas.",
  lead: "Cada trabajador tiene un precio mensual. Los equipos cuestan menos. El Oráculo y los líderes son extras.",
  extras: [
    { t: "Líderes", d: "Coordinan a los trabajadores de un ala: Apollo, Hestia, Odysseus, Hephaestus, Hera." },
    { t: "El Oráculo", d: "Pythia revisa cada trabajo antes de que salga. Nunca viene incluido: tiene su propio precio." },
  ],
};

export const askQuestions: typeof en.askQuestions = [
  {
    id: "type",
    q: "¿Qué tipo de negocio es?",
    options: ["Clínica", "Concesionario", "Gimnasio", "Salón de belleza", "Restaurante", "Otro"],
  },
  {
    id: "source",
    q: "¿De dónde llegan tus clientes hoy?",
    options: ["WhatsApp", "Instagram", "Google", "Referidos", "Pasan por el local", "Anuncios"],
    multi: true,
  },
  {
    id: "volume",
    q: "Más o menos, ¿cuántos mensajes o leads al mes?",
    options: ["Menos de 50", "50–200", "200–1.000", "Más de 1.000"],
  },
  {
    id: "speed",
    q: "¿Quién los responde, y qué tan rápido?",
    options: ["Yo, en minutos", "Yo, en horas", "Mi equipo, en minutos", "Mi equipo, al día siguiente"],
    slow: ["Yo, en horas", "Mi equipo, al día siguiente"],
  },
  {
    id: "pain",
    q: "¿Qué es lo que más te duele ahora?",
    options: [...wingsEs.map((w) => w.problem), "Otra cosa"],
    multi: true,
  },
  {
    id: "tools",
    q: "¿Qué herramientas usas ya?",
    options: ["Ninguna", "WhatsApp Business", "Un CRM", "Un sitio web", "Otra"],
    multi: true,
  },
];

export const ui: typeof en.ui = {
  langName: "Español",
  switchTo: "English",
  switchLabel: "View in English",
  home: "Galos, inicio",
  menu: { main: "Principal", open: "Abrir menú", close: "Cerrar menú" },
  theme: { label: "Cambiar entre modo claro y oscuro", title: "Claro / oscuro" },
  askGalos: "Pregúntale a Galos",
  about: "Nosotros",
  customProjects: "Proyectos a la medida",
  bookCall: "Agenda una llamada",
  askButton: {
    title: "Pregúntale a Galos qué necesita tu negocio",
    chat: { t: "Chat", d: "Escribe o toca, dos minutos" },
    speak: { t: "Hablar", d: "Habla con Galos en voz alta" },
  },
  footer: {
    tagline: "Un equipo de trabajadores de IA para tu negocio. El arte se encuentra con los sistemas.",
    collection: "La Colección · Vol. I",
    pages: "Páginas",
    contact: "Contacto",
    catalogue: "Catálogo de la Colección Galos · 10 obras",
  },
  hero: { move: "Mueve el cursor para encontrar el orden", ask: "Pregúntale a Galos qué necesito", see: "Ver los trabajadores" },
  journey: {
    workers: (n: number) => `${n} ${n === 1 ? "trabajador" : "trabajadores"}`,
    loop: "Fidelizar trae referidos de vuelta a Atraer",
  },
  askPrompt: { sr: "Cuéntale a Galos qué está frenando tu negocio", placeholder: "Escríbelo con tus palabras…", send: "Preguntar", or: "o elige una" },
  seeAllWorkers: "Ver los diez trabajadores",
  studio: {
    points: [
      "Galos en el centro: pregúntale lo que sea sobre tu negocio.",
      "Tu equipo en el mapa: los cuartos encendidos trabajan, los grises están esperando.",
      "Un siguiente paso a la vez, nunca un muro de opciones.",
    ],
    map: "Galos Studio · mapa",
    example: "Ejemplo",
    aria: "El mapa del Studio: Galos en el centro y cinco cuartos, uno por ala",
    hire: "Contratar",
  },
  seePricing: "Ver precios",
  proof: { obs: "Obs.", client: "Cliente", what: "Qué hizo Galos", metric: "Se mide en", result: "Resultado" },
  custom: { past: "Ver trabajos anteriores" },
  questions: "Preguntas",
  beforeYouAsk: "Antes de preguntarle a Galos.",
  meet: (figure: string) => `Conoce a ${figure}`,
  wall: {
    all: "Todos",
    filter: "Filtrar por ala",
    wing: "Ala",
    measuredOn: "Se mide en",
    channels: "Canales",
    liveIn: "En vivo en",
    price: "Precio",
    hire: "Contratar",
    buy: "Comprar",
  },
  watch: {
    title: "Míralo trabajar",
    motion: "en movimiento",
    aria: (figure: string) => `La constelación de ${figure}, dibujada paso a paso`,
  },
  sky: { aria: "La Colección Galos como una carta estelar", drag: "← Arrastra el cielo →" },
  statue: { alt: (name: string) => `${name}: una estatua clásica`, label: "Estatua" },
};

export const pages: typeof en.pages = {
  workers: {
    title: "Trabajadores",
    eyebrow: "La Colección",
    heading: "Conoce a los trabajadores.",
    lead: "Cada uno hace un solo trabajo y se mide con un solo número. Elige uno, o pídele a Galos que elija por ti.",
  },
  worker: {
    breadcrumb: "Trabajadores",
    hire: (f: string) => `Contratar a ${f}`,
    buy: "Comprar",
    buyCta: (f: string) => `Comprar a ${f}`,
    tryMe: "Pruébame",
    tryTitle: (f: string) => `Prueba a ${f} en tu propio negocio.`,
    soon: "Muy pronto",
    hireOrBuy: "Contratar o comprar",
    twoWays: (f: string) => `Dos formas de tener a ${f}.`,
    options: [
      { t: "Contratar", rows: ["Galos lo configura", "Galos lo opera", "Reporte mensual", "Cancela cualquier mes"] },
      { t: "Comprar", rows: ["Galos lo configura", "Tú lo operas", "Sesión de entrega", "Es tuyo para siempre"] },
    ],
    fromYes: "Del sí al en vivo",
    timeline: (f: string) => [
      ["Día 1", `Pagas. ${f} te escribe.`],
      ["Día 2", "Respondes unas preguntas y conectas tus cuentas."],
      ["Día 3–4", "Galos lo construye y lo prueba en tu negocio."],
      ["Día __", `${f} sale en vivo. Empiezan los números.`],
    ],
    measuredOn: "Se mide en",
    proofFor: (f: string) => `Pruebas de ${f}`,
    questions: "Preguntas",
    faq: ["¿Es una persona real?", "¿Qué necesito tener listo?", "¿Puedo cambiar lo que dice?", "¿Y si no funciona para mi negocio?"],
    notAPerson: (f: string) => `No. ${f} es un trabajador de IA, operado por Galos. Siempre lo dice.`,
    answerPending: "Respuesta pendiente.",
    prev: "Anterior",
    next: "Siguiente",
    more: "Más trabajadores",
  },
  pricing: {
    title: "Precios",
    index: "Lista de precios",
    cols: ["Ala", "Trabajador", "Qué hace", "Contratar / mes"],
    empty: "Los trabajadores de esta ala vienen en camino.",
    teams: "Los equipos cuestan menos",
    seeTeams: "Ver los equipos",
    extras: "Extras",
    customTitle: "¿No ves tu problema? Lo construimos.",
    customFrom: "Desde $X, definido en una llamada.",
  },
  teams: {
    title: "Equipos",
    index: "Exposiciones",
    heading: "Las estrellas trabajan mejor juntas.",
    lead: "Un equipo es un grupo de trabajadores unidos en una sola constelación. Contratar el equipo cuesta menos que contratarlos uno por uno.",
    room: "Sala",
    workers: (n: number) => `${n} trabajadores`,
    hire: "Contratar el equipo",
  },
  results: {
    title: "Resultados",
    index: "Bitácora de observación",
    heading: "Lo que hicieron las estrellas.",
    lead: "Cada trabajador se mide. Estos son los números, con el permiso de cada cliente.",
    cases: [
      { client: "Finaro", what: "Sitio web en código + captura de leads en GoHighLevel", metric: "Leads / mes" },
      { client: "Crambol", what: "Trabajador de WhatsApp para el club", metric: "Mensajes respondidos" },
    ],
    case: "Caso",
    beforeAfter: "Antes → después",
    ask: "Pregúntale a Galos qué necesitas",
  },
  custom: {
    title: "Proyectos a la medida",
    heading: "¿No ves tu problema? Lo construimos.",
    lead: "Algunos negocios necesitan una pieza que no está en la Colección. La hacemos para ti, desde el primer boceto hasta el día en que sale en vivo.",
    build: [
      ["Sitios web", "Hechos en código, conectados a tu CRM. Como Finaro."],
      ["Apps", "Herramientas hechas para un solo negocio: portales, trackers, apps internas."],
      ["Marcas", "Logo, kit de marca y el sistema visual que lo rodea."],
      ["Automatizaciones", "Los flujos complejos que no caben en un solo trabajador."],
    ],
    past: "Trabajos anteriores",
    work: "Trabajo",
    bookTitle: "Cuéntanos qué quieres construir.",
    bookLine: "Una llamada de 25 minutos. Sales con un plan, lo construyas con nosotros o no.",
  },
  about: {
    title: "Nosotros",
    heading: "El arte se encuentra con los sistemas.",
    portrait: "Retrato",
    who: "Quién construye Galos",
    whoTitle: "Un diseñador y un equipo de trabajadores de IA.",
    whoText: "Un diseñador industrial que construye software. La máquina es complicada; lo que tocas es simple.",
    manifesto: "Cada estrella del cielo es un sistema. Solo aprendimos a ver la figura en él.",
    channel: "El canal",
    channelTitle: "Cómo construye Galos, en YouTube.",
    watch: "Ver",
  },
  legal: {
    title: "Legal",
    heading: "Privacidad, términos e IA.",
    items: [
      ["Aviso de IA", `${site.disclosure} Cada agente dice que es una IA. Una persona de Galos lo configura, lo supervisa y responde por él.`],
      ["Política de privacidad", "Cómo Galos recoge, usa y protege los datos personales (Ley 1581 de 2012)."],
      ["Términos", "Los términos para contratar o comprar un trabajador."],
    ],
  },
  ask: {
    title: "Pregúntale a Galos",
    description: "Cuéntale a Galos sobre tu negocio. Recibe los trabajadores que necesita.",
    progress: (i: number, n: number) => `Pregunta ${i} de ${n}`,
    asks: "Galos pregunta",
    pickAll: "Elige todas las que apliquen.",
    own: "O dilo con tus palabras…",
    back: "← Atrás",
    next: "Siguiente",
    see: "Ver mi diagnóstico",
    diagnosis: "Tu diagnóstico",
    restart: "Empezar de nuevo",
    yourBusiness: "tu negocio",
    your: (type: string) => `tu ${type.toLowerCase()}`,
    loses: (who: string) => `Aquí es donde ${who} pierde clientes.`,
    map: "El mapa de tu negocio",
    leak: "Fuga",
    youSaid: "Dijiste:",
    recommends: "Galos recomienda",
    why: "Por qué:",
    whySlow: "respondes los mensajes lento",
    piece: "Tu negocio necesita una pieza hecha solo para él. Hablemos.",
    estimate: "Un estimado, no una promesa",
    estimateLine: "Unas __ citas más al mes con tu tasa de cierre.",
    hireTeam: "Contratar este equipo",
    hire: (f: string) => `Contratar a ${f}`,
    send: "Envíame este diagnóstico",
    fields: ["Nombre", "WhatsApp", "Email"],
    sendBtn: "Enviar",
    isAI: "Galos es una IA.",
    speakTitle: "Habla con Galos.",
    speakLine: "Cuéntale sobre tu negocio, en voz alta, como se lo contarías a un amigo.",
    useChat: "Mejor usar el chat",
  },
  notFound: { title: "Esta estrella todavía no está en la Colección.", back: "Volver a la galería" },
};
