/**
 * Every editable text on the site, outside the agents (those are in agents.ts).
 * ─────────────────────────────────────────────
 * Copy source: the vault, Projects/Galos/Website/07_content/ (one note per page).
 * Section folders: Projects/Galos/Website/13_sections/ (one folder per section).
 * When a text has `pending`, the site shows a PENDING tag with that note.
 */

export type Text = { text: string; pending?: string };

const COPY = "Draft copy by Claude: Camilo approves it in 07_content.";

export const site = {
  name: "Galos",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "/custom#book",
  seo: {
    title: "Galos — a gallery of AI agents",
    description:
      "The Galos Collection: AI agents that answer, follow up and close for your business. Ask Galos which ones you need.",
  },
  nav: [
    { href: "/agents", label: "Agents" },
    { href: "/ask", label: "Ask Galos" },
    { href: "/custom", label: "Custom" },
    { href: "/results", label: "Results" },
    { href: "/about", label: "About" },
  ],
  disclosure: "AI agents, run by Galos.",
  contact: {
    whatsapp: { text: "+57 ___ ___ ____", pending: "WhatsApp number: Camilo (13_sections/00_every-page/03_footer)." },
    email: { text: "hello@galos.___", pending: "Contact email + domain: Camilo." },
  },
};

/** 13_sections/01_home */
export const home = {
  hero: {
    eyebrow: "The Galos Collection",
    title: { text: "Every business needs a few stars.", pending: COPY },
    sub: {
      text: "AI agents that answer, follow up and close for you. Each one a star in the Galos Collection, live in days and run by Galos.",
      pending: COPY,
    },
  },
  ask: {
    question: "What's slowing your business down?",
    answers: [
      { id: "leads", label: "I don't get enough leads" },
      { id: "lose", label: "I lose leads" },
      { id: "messages", label: "Too many messages" },
      { id: "website", label: "No website" },
      { id: "other", label: "Something else" },
    ],
  },
  collection: {
    eyebrow: "The Collection",
    title: { text: "Ten agents. One sky.", pending: COPY },
    line: { text: "Each agent is a constellation. Its lines are the work it does for you.", pending: COPY },
  },
  how: {
    eyebrow: "How it works",
    title: { text: "Three stars to follow.", pending: COPY },
    steps: [
      { n: "01", title: "Ask", text: "Tell Galos what's slowing you down. Two minutes, a few taps." },
      { n: "02", title: "Hire", text: "Pick the agents Galos recommends. They go live in days." },
      { n: "03", title: "See the numbers", text: "Every agent is measured. You get the numbers every month." },
    ],
  },
  proof: {
    eyebrow: "Observed",
    title: { text: "Results, measured.", pending: COPY },
    rows: [
      { client: "Finaro", what: "Website + lead capture", metric: "Leads / month", value: "—" },
      { client: "Crambol", what: "WhatsApp agent", metric: "Messages answered", value: "—" },
      { client: "Nitrux", what: "CRM pilot", metric: "Leads tracked", value: "—" },
    ],
    pending: "Real numbers + permission from each client (08_proof). Never invent them.",
  },
  custom: {
    eyebrow: "Custom",
    title: { text: "Commission your own star.", pending: COPY },
    text: {
      text: "Websites like Finaro, apps, brands and automations built for one business only.",
      pending: COPY,
    },
  },
  final: {
    title: { text: "Find your star.", pending: COPY },
    sub: { text: "Ask Galos what your business needs. It takes two minutes.", pending: COPY },
  },
};

/** 13_sections/04_ask-galos/03_questions — rules and playbooks in 06_ask-galos */
export const askQuestions = [
  {
    id: "type",
    q: "What kind of business is it?",
    options: ["Clinic", "Dealership", "Gym", "Salon", "Restaurant", "Other"],
  },
  {
    id: "source",
    q: "Where do your customers come from today?",
    options: ["WhatsApp", "Instagram", "Google", "Referrals", "Walk-ins", "Ads"],
    multi: true,
  },
  {
    id: "volume",
    q: "Roughly how many messages or leads a month?",
    options: ["Under 50", "50–200", "200–1,000", "Over 1,000"],
  },
  {
    id: "speed",
    q: "Who answers them, and how fast?",
    options: ["Me, in minutes", "Me, in hours", "My team, in minutes", "My team, next day"],
  },
  {
    id: "pain",
    q: "What hurts the most right now?",
    options: ["I don't get enough leads", "I lose leads", "Too many messages", "No website", "Something else"],
    multi: true,
  },
  {
    id: "tools",
    q: "What tools do you already use?",
    options: ["None", "WhatsApp Business", "A CRM", "A website", "Other"],
    multi: true,
  },
];
