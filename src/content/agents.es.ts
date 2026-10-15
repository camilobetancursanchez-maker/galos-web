/**
 * The Collection in Spanish (/es). Only the words change: stars, edges, slugs and
 * catalog numbers come from agents.ts. Vault: 07_content/Español — the Spanish site.
 * PENDING notes stay in English (they are notes for Camilo, not for visitors).
 */

import { agents, teams, wings, type Agent } from "./agents";

const WINGS: Record<string, { label: string; plain: string; problem: string }> = {
  Attract: { label: "Atraer", plain: "Conseguir clientes potenciales", problem: "Muy poca gente me conoce." },
  Answer: { label: "Responder", plain: "Atención al cliente", problem: "Se me pasan mensajes y la gente se enfría." },
  Convert: { label: "Convertir", plain: "Que los que preguntan se vuelvan clientes que pagan", problem: "Preguntan pero no compran." },
  Deliver: { label: "Entregar", plain: "Entregar un gran resultado", problem: "Mis clientes no reciben la mejor experiencia." },
  Keep: { label: "Fidelizar", plain: "Lealtad: vuelven a comprar y se quedan", problem: "Compran una vez y no vuelven." },
};

type Words = Pick<Agent, "role" | "meaning" | "does" | "measuredOn" | "channels"> & { intro: string; steps: string[] };

const AGENTS: Record<string, Words> = {
  hermes: {
    role: "el Recepcionista",
    meaning: "El mensajero. Lleva cada mensaje, rápido.",
    does: "Responde cada mensaje 24/7, resuelve las preguntas frecuentes y agenda la cita en el mismo chat.",
    measuredOn: "Tiempo de respuesta · % respondidos · citas agendadas",
    channels: "WhatsApp · Instagram · chat web",
    intro: "Soy Hermes, el Recepcionista. Respondo cada mensaje en menos de un minuto, de día y de noche.",
    steps: ["Llega un mensaje por cualquier canal", "Hermes responde en menos de un minuto", "Las preguntas se resuelven con tus FAQ", "La cita se agenda en el chat", "El lead queda guardado en tu CRM"],
  },
  artemis: {
    role: "la Cazadora",
    meaning: "La cazadora. Encuentra y sigue a los prospectos correctos.",
    does: "Encuentra negocios o personas que encajan, les da un puntaje y escribe un primer mensaje personal.",
    measuredOn: "Leads calificados/semana · respuestas · reuniones agendadas",
    channels: "Email · WhatsApp · LinkedIn",
    intro: "Soy Artemis, la Cazadora. Encuentro a las personas que deberían ser tus clientes.",
    steps: ["Definimos quién es tu cliente ideal", "Artemis busca y los encuentra", "Cada uno recibe un puntaje", "Sale un primer mensaje personal", "Las respuestas llegan a tu bandeja"],
  },
  nike: {
    role: "la Closer",
    meaning: "La victoria. Cierra, y recupera al lead.",
    does: "Hace seguimiento a cada lead que no compró y despierta la lista de clientes antiguos.",
    measuredOn: "Leads reactivados · ventas recuperadas",
    channels: "WhatsApp · email",
    intro: "Soy Nike, la Closer. Ningún lead se enfría mientras yo esté aquí.",
    steps: ["Un lead deja de responder", "Nike le escribe en el momento justo", "Los clientes antiguos reciben una razón para volver", "La venta se cierra"],
  },
  mnemosyne: {
    role: "la Gestora del CRM",
    meaning: "La memoria. Recuerda cada lead y cada detalle.",
    does: "Pone cada lead en un solo pipeline, limpia los datos, los etiqueta y envía los números de la semana.",
    measuredOn: "% de leads registrados · reporte semanal entregado",
    channels: "CRM · WhatsApp · formularios",
    intro: "Soy Mnemosyne, la Gestora del CRM. Nunca olvido un lead.",
    steps: ["Llegan leads de todos los canales", "Todos caen en un solo pipeline", "Los datos se limpian y se etiquetan", "Cada lunes, los números de la semana"],
  },
  pheme: {
    role: "la Gestora de Reputación",
    meaning: "La fama. Hace correr la buena voz.",
    does: "Pide reseñas en Google y referidos después de cada servicio.",
    measuredOn: "Reseñas nuevas/mes · calificación · referidos",
    channels: "WhatsApp · email · Google",
    intro: "Soy Pheme, la Gestora de Reputación. Me aseguro de que la gente hable de ti.",
    steps: ["Se termina un servicio", "Pheme pide una reseña", "Los clientes felices la dejan en Google", "Recomiendan a un amigo"],
  },
  argus: {
    role: "el Gestor de Anuncios",
    meaning: "El gigante de los cien ojos. Vigila cada campaña y cada número.",
    does: "Crea y maneja campañas en Meta y prueba las piezas creativas.",
    measuredOn: "Costo por lead · leads/mes",
    channels: "Facebook · Instagram",
    intro: "Soy Argus, el Gestor de Anuncios. Vigilo cada número para que tú no tengas que hacerlo.",
    steps: ["Se arma la campaña", "Las piezas se prueban lado a lado", "Argus vigila cada número", "El dinero se mueve a lo que funciona"],
  },
  calliope: {
    role: "la Creadora de Contenido",
    meaning: "La musa de la elocuencia. Convierte el trabajo en historias.",
    does: "Convierte el trabajo del negocio en publicaciones y videos cortos.",
    measuredOn: "Publicaciones/semana · alcance · DMs desde el contenido",
    channels: "Instagram · TikTok · Facebook",
    intro: "Soy Calliope, la Creadora de Contenido. Convierto tu trabajo en historias que la gente comparte.",
    steps: ["Se captura tu trabajo", "Calliope escribe la historia", "Se hacen publicaciones y videos cortos", "Se publica cada semana", "Llegan DMs desde el contenido"],
  },
  athena: {
    role: "la Asistente",
    meaning: "Sabiduría y oficio. Mantiene el día del dueño ordenado y claro.",
    does: "Maneja el correo, la agenda, las cotizaciones y los recordatorios del dueño.",
    measuredOn: "Horas ahorradas/semana",
    channels: "Email · calendario · WhatsApp",
    intro: "Soy Athena, la Asistente. Te devuelvo tus horas.",
    steps: ["Tu correo queda ordenado", "La agenda se mantiene al día", "Las cotizaciones se escriben", "Los recordatorios salen a tiempo"],
  },
  pygmalion: {
    role: "el Diseñador",
    meaning: "El escultor. Le da forma a la marca.",
    does: "Logo, kit de marca y piezas para anuncios.",
    measuredOn: "Entregas a tiempo · rondas de aprobación",
    channels: "Archivos de marca · anuncios",
    intro: "Soy Pygmalion, el Diseñador. Le doy forma a tu negocio.",
    steps: ["Conocemos tu negocio", "Se bocetan las primeras formas", "Se tallan el logo y el kit de marca", "Se entregan las piezas para anuncios"],
  },
  daedalus: {
    role: "el Especialista Web",
    meaning: "El arquitecto. Construye el lugar al que llegan los clientes.",
    does: "Una landing page o un sitio web conectado al CRM.",
    measuredOn: "Tasa de conversión de la página · leads desde la página",
    channels: "Web",
    intro: "Soy Daedalus, el Especialista Web. Construyo el lugar al que llegan tus clientes.",
    steps: ["El plano de la página", "Daedalus la construye", "Conectada a tu CRM", "Los visitantes se vuelven leads"],
  },
};

const TEAMS: Record<string, { name: string; forWho: string }> = {
  "lead-machine": { name: "La Máquina de Leads", forWho: "Negocios que necesitan más leads y pierden los que ya les llegan." },
  "launch-team": { name: "El Equipo de Lanzamiento", forWho: "Negocios nuevos, o una oferta nueva." },
};

export const wingsEs = wings.map((w) => ({ ...w, ...WINGS[w.name] }));

export const agentsEs: Agent[] = agents.map((a) => {
  const t = AGENTS[a.slug];
  return {
    ...a,
    role: t.role,
    meaning: t.meaning,
    does: t.does,
    measuredOn: t.measuredOn,
    channels: t.channels,
    intro: { ...a.intro, text: t.intro },
    steps: { ...a.steps, list: t.steps },
    liveIn: { ...a.liveIn, text: a.liveIn.text.replace("Live in", "En vivo en").replace("days", "días") },
    price: { ...a.price, hire: a.price.hire.replace("/mo", "/mes") },
  };
});

export const teamsEs = teams.map((t) => ({ ...t, ...TEAMS[t.slug], price: { ...t.price, text: t.price.text.replace("/mo", "/mes") } }));
