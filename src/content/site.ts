/**
 * Every editable text on the site, outside the workers (those are in agents.ts).
 * ─────────────────────────────────────────────
 * The record is the vault: Projects/Galos/Website/
 *   07_content/   one note per page (the copy)
 *   13_sections/  one folder per section (what's on the site + which file builds it)
 * Change the copy there first; this file follows it.
 * When a text has `pending`, the site shows a PENDING tag with that note.
 */

import { wings } from "./agents";

export type Text = { text: string; pending?: string };

const COPY = "Draft copy: Camilo approves it in 07_content.";

export const site = {
  name: "Galos",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "/custom#book",
  seo: {
    title: "Galos — a team of AI workers for your business",
    description:
      "Tell Galos what's slowing you down. Hire the AI workers you need. Watch them work in your Studio.",
  },
  // Menu from 00 Galos — Explained Simply, section 7 (Ask Galos is the beating button)
  nav: [
    { href: "/workers", label: "Workers" },
    { href: "/#how", label: "How it works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/results", label: "Results" },
  ],
  footerLinks: [
    { href: "/workers", label: "Workers" },
    { href: "/#how", label: "How it works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/results", label: "Results" },
    { href: "/about", label: "About" },
    { href: "/custom", label: "Custom projects" },
    { href: "/teams", label: "Teams" },
    { href: "/legal", label: "Legal" },
  ],
  disclosure: "AI workers, run by Galos.",
  contact: {
    whatsapp: { text: "+57 ___ ___ ____", pending: "WhatsApp number: Camilo (13_sections/00_every-page/03_footer)." },
    email: { text: "hello@galos.___", pending: "Contact email + domain: Camilo." },
  },
};

/** 07_content/Page — Home · 13_sections/01_home */
export const home = {
  hero: {
    eyebrow: "The Galos Collection",
    title: { text: "A team of AI workers for your business.", pending: COPY },
    sub: {
      text: "Tell Galos what's slowing you down. Hire the workers you need. Watch them work in your Studio.",
      pending: COPY,
    },
  },
  how: {
    eyebrow: "How it works",
    title: { text: "Ask. Hire. Grow.", pending: COPY },
    steps: [
      { n: "01", title: "Ask", text: "Tell Galos about your business. 2 minutes, mostly taps." },
      { n: "02", title: "Hire", text: "Pick a worker or a team. Working in about 7 days." },
      { n: "03", title: "Grow", text: "See what every worker did this month in your Studio. Add more when you're ready." },
    ],
  },
  journey: {
    eyebrow: "The client journey",
    title: { text: "Every business has five stages with its customers.", pending: COPY },
    line: "Tap one to meet its workers.",
  },
  ask: {
    question: "What's slowing your business down?",
    other: "Something else",
  },
  workers: {
    eyebrow: "The Collection",
    title: { text: "Meet the workers.", pending: COPY },
    line: { text: "Each one does one job and is measured by one number.", pending: COPY },
  },
  studio: {
    eyebrow: "Your Studio",
    title: { text: "This is where your team works.", pending: COPY },
    line: { text: "See every part of your business clearly, and get help at every stage.", pending: COPY },
  },
  pricing: {
    eyebrow: "Pricing",
    title: { text: "Your Studio is free. You pay only for the workers you hire.", pending: COPY },
    facts: [
      { t: "Every worker", d: "has its own monthly price." },
      { t: "Teams", d: "cost less than hiring one by one." },
      { t: "Custom projects", d: "from $X, scoped on a call." },
    ],
    pending: "Prices: 05_offer (after $100M Offers).",
  },
  proof: {
    eyebrow: "Observed",
    title: { text: "Results, measured.", pending: COPY },
    rows: [
      { client: "Finaro", what: "Website + lead capture", metric: "Leads / month", value: "—" },
      { client: "Crambol", what: "WhatsApp worker", metric: "Messages answered", value: "—" },
      { client: "Nitrux", what: "CRM pilot", metric: "Leads tracked", value: "—" },
    ],
    pending: "Real numbers + permission from each client (08_proof). Never invent them.",
  },
  custom: {
    eyebrow: "Custom projects",
    title: { text: "Don't see your problem? We build it.", pending: COPY },
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

/** 07_content/Page — FAQ (shown at the end of the home page) */
export const faq = [
  { q: "Are the workers people?", a: "No. Every worker is an AI, run by Galos. It always says so, and a person at Galos sets it up and watches it." },
  { q: "How long until it's live?", a: "About 7 days from the day you pay. Each worker's page shows its own days." },
  { q: "What do I need to give you?", a: "A few answers about your business, your prices and hours, and access to the accounts it works in. Never passwords in a chat." },
  { q: "Hire or Buy?", a: "Hire: Galos runs it and sends you the numbers every month. Buy: we set it up and it's yours to run." },
  { q: "Can I cancel?", a: "Hired workers: any month." },
];
export const faqPending = "FAQ answers are drafts: confirm them in 07_content/Page — FAQ and 05_offer.";

/** 07_content/Page — Pricing · 13_sections/11_pricing */
export const pricing = {
  title: "Your Studio is free. You pay only for the workers you hire.",
  lead: "Every worker has a monthly price. Teams cost less. The Oracle and the leaders are extras.",
  extras: [
    { t: "Leaders", d: "Coordinate the workers of one wing: Apollo, Hestia, Odysseus, Hephaestus, Hera." },
    { t: "The Oracle", d: "Pythia checks every piece of work before it goes out. Never included: its own price." },
  ],
};

/** 13_sections/04_ask-galos/03_questions — rules and playbooks in 06_ask-galos */
export const askQuestions: { id: string; q: string; options: string[]; multi?: boolean; slow?: string[] }[] = [
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
    // These answers mark Answer as a leak and recommend Hermes
    slow: ["Me, in hours", "My team, next day"],
  },
  {
    id: "pain",
    q: "What hurts the most right now?",
    // The 5 wing problems (agents.ts → wings) + Something else
    options: [...wings.map((w) => w.problem), "Something else"],
    multi: true,
  },
  {
    id: "tools",
    q: "What tools do you already use?",
    options: ["None", "WhatsApp Business", "A CRM", "A website", "Other"],
    multi: true,
  },
];

/**
 * The small words of every page: buttons, labels, table headers.
 * Spanish: site.es.ts (same shape). Section notes in 13_sections name where each one shows.
 */
export const ui = {
  langName: "English",
  switchTo: "Español",
  switchLabel: "Ver en español",
  home: "Galos, home",
  menu: { main: "Main", open: "Open menu", close: "Close menu" },
  theme: { label: "Switch between light and dark mode", title: "Light / dark" },
  askGalos: "Ask Galos",
  about: "About",
  customProjects: "Custom projects",
  bookCall: "Book a call",
  askButton: {
    title: "Ask Galos what your business needs",
    chat: { t: "Chat", d: "Type or tap, two minutes" },
    speak: { t: "Speak", d: "Talk to Galos out loud" },
  },
  footer: {
    tagline: "A team of AI workers for your business. Art meets systems.",
    collection: "The Collection · Vol. I",
    pages: "Pages",
    contact: "Contact",
    catalogue: "Catalogue of the Galos Collection · 10 works",
  },
  hero: { move: "Move to find the order", ask: "Ask Galos what I need", see: "See the workers" },
  journey: {
    workers: (n: number) => `${n} ${n === 1 ? "worker" : "workers"}`,
    loop: "Keep brings referrals back to Attract",
  },
  askPrompt: { sr: "Tell Galos what's slowing your business down", placeholder: "Type it in your own words…", send: "Ask", or: "or pick one" },
  seeAllWorkers: "See all ten workers",
  studio: {
    points: [
      "Galos in the middle: ask it anything about your business.",
      "Your team on the map: lit rooms work, grey rooms are waiting.",
      "One next step at a time, never a wall of options.",
    ],
    map: "Galos Studio · map",
    example: "Example",
    aria: "The Studio map: Galos in the middle and five rooms, one per wing",
    hire: "Hire",
  },
  seePricing: "See pricing",
  proof: { obs: "Obs.", client: "Client", what: "What Galos did", metric: "Measured on", result: "Result" },
  custom: { past: "See past work" },
  questions: "Questions",
  beforeYouAsk: "Before you ask Galos.",
  meet: (figure: string) => `Meet ${figure}`,
  wall: {
    all: "All",
    filter: "Filter by wing",
    wing: "Wing",
    measuredOn: "Measured on",
    channels: "Channels",
    liveIn: "Live in",
    price: "Price",
    hire: "Hire",
    buy: "Buy",
  },
  watch: {
    title: "Watch it work",
    motion: "in motion",
    aria: (figure: string) => `${figure}'s constellation, drawn step by step`,
  },
  sky: { aria: "The Galos Collection as a star chart", drag: "← Drag the sky →" },
  statue: { alt: (name: string) => `${name}: a classical statue`, label: "Statue" },
};

/** Words that only one page uses. Copy notes: 07_content/Page — <page>. */
export const pages = {
  workers: {
    title: "Workers",
    eyebrow: "The Collection",
    heading: "Meet the workers.",
    lead: "Each one does one job and is measured by one number. Pick one, or ask Galos to pick for you.",
  },
  worker: {
    breadcrumb: "Workers",
    hire: (f: string) => `Hire ${f}`,
    buy: "Buy",
    tryMe: "Try me",
    tryTitle: (f: string) => `Try ${f} on your own business.`,
    soon: "Coming soon",
    hireOrBuy: "Hire or buy",
    twoWays: (f: string) => `Two ways to have ${f}.`,
    options: [
      { t: "Hire", rows: ["Galos sets it up", "Galos runs it", "Monthly report", "Cancel any month"] },
      { t: "Buy", rows: ["Galos sets it up", "You run it", "Hand-over session", "Yours to keep"] },
    ],
    fromYes: "From yes to live",
    timeline: (f: string) => [
      ["Day 1", `You pay. ${f} writes to you.`],
      ["Day 2", "You answer a few questions and connect your accounts."],
      ["Day 3–4", "Galos builds and tests it on your business."],
      ["Day __", `${f} goes live. The numbers start.`],
    ],
    measuredOn: "Measured on",
    proofFor: (f: string) => `Proof for ${f}`,
    questions: "Questions",
    faq: ["Is it a real person?", "What do I need to have ready?", "Can I change what it says?", "What if it doesn't work for my business?"],
    notAPerson: (f: string) => `No. ${f} is an AI worker, run by Galos. It always says so.`,
    answerPending: "Answer pending.",
    prev: "Previous",
    next: "Next",
    more: "More workers",
  },
  pricing: {
    title: "Pricing",
    index: "Price list",
    cols: ["Wing", "Worker", "What it does", "Hire / month"],
    empty: "Workers for this wing are coming.",
    teams: "Teams cost less",
    seeTeams: "See the teams",
    extras: "Extras",
    customTitle: "Don't see your problem? We build it.",
    customFrom: "From $X, scoped on a call.",
  },
  teams: {
    title: "Teams",
    index: "Exhibitions",
    heading: "Stars work better together.",
    lead: "A team is a few workers joined into one constellation. Hiring the team costs less than hiring them one by one.",
    room: "Room",
    workers: (n: number) => `${n} workers`,
    hire: "Hire the team",
  },
  results: {
    title: "Results",
    index: "Observation log",
    heading: "What the stars did.",
    lead: "Every worker is measured. These are the numbers, with each client's permission.",
    cases: [
      { client: "Finaro", what: "Website in code + lead capture into GoHighLevel", metric: "Leads / month" },
      { client: "Crambol", what: "WhatsApp worker for the club", metric: "Messages answered" },
    ],
    case: "Case",
    beforeAfter: "Before → after",
    ask: "Ask Galos what you need",
  },
  custom: {
    title: "Custom projects",
    heading: "Don't see your problem? We build it.",
    lead: "Some businesses need a piece that isn't in the Collection. We make it for you, from the first sketch to the day it goes live.",
    build: [
      ["Websites", "Built in code, connected to your CRM. Like Finaro."],
      ["Apps", "Tools made for one business: portals, trackers, internal apps."],
      ["Brands", "Logo, brand kit and the visual system around it."],
      ["Automations", "The complex flows that don't fit one worker."],
    ],
    past: "Past work",
    work: "Work",
    bookTitle: "Tell us what you want to build.",
    bookLine: "A 25-minute call. You leave with a plan, whether you build it with us or not.",
  },
  about: {
    title: "About",
    heading: "Art meets systems.",
    portrait: "Portrait",
    who: "Who builds Galos",
    whoTitle: "One designer and a team of AI workers.",
    whoText: "An industrial designer who builds software. The machine is complicated; what you touch is simple.",
    manifesto: "Every star in the sky is a system. We just learned to see the figure in it.",
    channel: "The channel",
    channelTitle: "How Galos builds, on YouTube.",
    watch: "Watch",
  },
  legal: {
    title: "Legal",
    heading: "Privacy, terms and AI.",
    items: [
      ["AI disclosure", `${site.disclosure} Every agent says it is an AI. A person at Galos sets it up, watches it and answers for it.`],
      ["Privacy policy", "How Galos collects, uses and protects personal data (Ley 1581 de 2012)."],
      ["Terms", "The terms for hiring or buying a worker."],
    ],
  },
  ask: {
    title: "Ask Galos",
    description: "Tell Galos about your business. Get the workers it needs.",
    progress: (i: number, n: number) => `Question ${i} of ${n}`,
    asks: "Galos asks",
    pickAll: "Pick all that apply.",
    own: "Or say it in your own words…",
    back: "← Back",
    next: "Next",
    see: "See my diagnosis",
    diagnosis: "Your diagnosis",
    restart: "Start again",
    yourBusiness: "your business",
    your: (type: string) => `your ${type.toLowerCase()}`,
    loses: (who: string) => `Here's where ${who} loses clients.`,
    map: "The map of your business",
    leak: "Leak",
    youSaid: "You said:",
    recommends: "Galos recommends",
    why: "Why:",
    whySlow: "you answer messages slowly",
    piece: "Your business needs a piece made just for it. Let's talk.",
    estimate: "Estimate, not a promise",
    estimateLine: "About __ more appointments a month at your close rate.",
    hireTeam: "Hire this team",
    hire: (f: string) => `Hire ${f}`,
    send: "Send me this diagnosis",
    fields: ["Name", "WhatsApp", "Email"],
    sendBtn: "Send",
    isAI: "Galos is an AI.",
    speakTitle: "Speak to Galos.",
    speakLine: "Tell it about your business, out loud, like you would to a friend.",
    useChat: "Use chat instead",
  },
  notFound: { title: "This star isn't in the Collection yet.", back: "Back to the gallery" },
};
