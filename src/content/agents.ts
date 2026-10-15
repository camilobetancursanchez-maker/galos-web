/**
 * The Galos Collection: every agent, its constellation and its wall label.
 * ─────────────────────────────────────────────
 * Source of truth for the text: the vault, Projects/Galos/Website/03_collection/
 * (one note per agent). When a field has `pending`, the site shows a PENDING tag
 * with that note. Replace the text when Camilo confirms it and delete `pending`.
 *
 * The constellation is the agent's process: each star is a step of the work,
 * each line is the work moving from one step to the next ("Watch it work").
 * Star coordinates live in a 0–100 box.
 */

export type JobArea = "Get leads" | "Answer" | "Follow up" | "Organize" | "Grow" | "Run the day" | "Build";

export const jobAreas: JobArea[] = ["Get leads", "Answer", "Follow up", "Organize", "Grow", "Run the day", "Build"];

export type Star = [x: number, y: number, magnitude?: number];
export type Edge = [from: number, to: number];

export type Agent = {
  slug: string;
  catalog: string; // GLS-001…
  figure: string; // Hermes
  role: string; // the Receptionist
  meaning: string; // why this figure
  area: JobArea;
  does: string; // one line for the wall label
  measuredOn: string;
  channels: string;
  liveIn: { text: string; pending?: string };
  price: { hire: string; buy: string; pending?: string };
  intro: { text: string; pending?: string };
  steps: { list: string[]; pending?: string };
  coordinates: string; // decorative sky coordinates for the label
  stars: Star[];
  edges: Edge[];
};

const PRICE = { hire: "$___/mo", buy: "$___", pending: "Prices come from 05_offer (after $100M Offers)." };
const LIVE = { text: "Live in __ days", pending: "Days to go live: fill in the agent note in 03_collection." };
const STEPS_PENDING = "Example steps written by Claude: confirm them in the agent note (Watch it work).";

export const agents: Agent[] = [
  {
    slug: "hermes",
    catalog: "GLS-001",
    figure: "Hermes",
    role: "the Receptionist",
    meaning: "The messenger. Carries every message, fast.",
    area: "Answer",
    does: "Answers every message 24/7, answers FAQs and books the appointment in the chat.",
    measuredOn: "Response time · % answered · appointments booked",
    channels: "WhatsApp · Instagram · web chat",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Hermes, the Receptionist. I answer every message in under a minute, day and night.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["A message arrives on any channel", "Hermes answers in under a minute", "Questions answered from your FAQs", "The appointment is booked in the chat", "The lead is saved in your CRM"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 02h 14m · Dec +18° 22′",
    // Many messages come in, leave as one booking
    stars: [[6, 14, 2], [4, 50, 2], [8, 86, 2], [46, 50, 3], [74, 50, 2], [95, 26, 3]],
    edges: [[0, 3], [1, 3], [2, 3], [3, 4], [4, 5]],
  },
  {
    slug: "artemis",
    catalog: "GLS-002",
    figure: "Artemis",
    role: "the Hunter",
    meaning: "The huntress. Finds and tracks the right prospects.",
    area: "Get leads",
    does: "Finds businesses or people that fit, scores them and writes a personal first message.",
    measuredOn: "Qualified leads/week · replies · meetings booked",
    channels: "Email · WhatsApp · LinkedIn",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Artemis, the Hunter. I find the people who should be your clients.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["Define who your ideal client is", "Artemis searches and finds them", "Each one gets a score", "A personal first message goes out", "Replies land in your inbox"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 05h 41m · Dec −02° 08′",
    // A bow and its arrow
    stars: [[30, 6, 2], [14, 28, 1], [8, 50, 2], [14, 72, 1], [30, 94, 2], [42, 50, 3], [96, 50, 3]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 4], [5, 6]],
  },
  {
    slug: "nike",
    catalog: "GLS-003",
    figure: "Nike",
    role: "the Closer",
    meaning: "Victory. Closes, and wins back the lead.",
    area: "Follow up",
    does: "Follows up with every lead that didn't buy and wakes up the old customer list.",
    measuredOn: "Leads reactivated · sales recovered",
    channels: "WhatsApp · email",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Nike, the Closer. No lead goes cold while I'm here.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["A lead goes quiet", "Nike follows up at the right moment", "Old customers get a reason to come back", "The sale closes"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 09h 03m · Dec +31° 47′",
    // Two wings rising from one point
    stars: [[6, 18, 2], [22, 32, 1], [36, 52, 2], [50, 78, 3], [64, 52, 2], [78, 32, 1], [94, 18, 2], [50, 40, 1]],
    edges: [[0, 1], [1, 2], [2, 3], [6, 5], [5, 4], [4, 3], [3, 7]],
  },
  {
    slug: "mnemosyne",
    catalog: "GLS-004",
    figure: "Mnemosyne",
    role: "the CRM Manager",
    meaning: "Memory. Remembers every lead and every detail.",
    area: "Organize",
    does: "Puts every lead in one pipeline, cleans the data, tags it and sends the weekly numbers.",
    measuredOn: "% of leads tracked · weekly report delivered",
    channels: "CRM · WhatsApp · forms",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Mnemosyne, the CRM Manager. I never forget a lead.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["Leads arrive from every channel", "All of them land in one pipeline", "Data cleaned and tagged", "Every Monday, the weekly numbers"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 13h 25m · Dec −11° 09′",
    // A closed ring with a memory at its center
    stars: ring(7, 50, 50, 42).concat([[50, 50, 3]]),
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [0, 7]],
  },
  {
    slug: "pheme",
    catalog: "GLS-005",
    figure: "Pheme",
    role: "the Reputation Manager",
    meaning: "Fame. Spreads the good word.",
    area: "Grow",
    does: "Asks for Google reviews and referrals after every service.",
    measuredOn: "New reviews/month · rating · referrals",
    channels: "WhatsApp · email · Google",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Pheme, the Reputation Manager. I make sure people hear about you.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["A service is finished", "Pheme asks for a review", "Happy clients leave it on Google", "They refer a friend"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 16h 29m · Dec −26° 25′",
    // One voice, carried out in every direction
    stars: [[8, 50, 3], [44, 50, 2], [82, 8, 1], [94, 34, 2], [94, 66, 2], [82, 92, 1]],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4], [1, 5]],
  },
  {
    slug: "argus",
    catalog: "GLS-006",
    figure: "Argus",
    role: "the Ads Manager",
    meaning: "The giant with a hundred eyes. Watches every campaign and number.",
    area: "Get leads",
    does: "Builds and runs Meta campaigns and tests the creatives.",
    measuredOn: "Cost per lead · leads/month",
    channels: "Facebook · Instagram",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Argus, the Ads Manager. I watch every number so you don't have to.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["The campaign is built", "Creatives are tested side by side", "Argus watches every number", "Money moves to what works"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 18h 36m · Dec +38° 47′",
    // Eyes all around one center
    stars: ring(6, 50, 50, 40).concat([[50, 50, 3]]),
    edges: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [0, 1], [2, 3], [4, 5]],
  },
  {
    slug: "calliope",
    catalog: "GLS-007",
    figure: "Calliope",
    role: "the Content Creator",
    meaning: "The muse of eloquence. Turns the work into stories.",
    area: "Get leads",
    does: "Turns the business's work into posts and short videos.",
    measuredOn: "Posts/week · reach · DMs from content",
    channels: "Instagram · TikTok · Facebook",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Calliope, the Content Creator. I turn your work into stories people share.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["Your work is captured", "Calliope writes the story", "Posts and short videos are made", "Published every week", "DMs come in from the content"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 20h 41m · Dec +45° 16′",
    // A voice rising and falling
    stars: [[4, 62, 2], [20, 30, 1], [35, 66, 2], [50, 24, 3], [65, 62, 2], [80, 20, 1], [96, 48, 2]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
  },
  {
    slug: "athena",
    catalog: "GLS-008",
    figure: "Athena",
    role: "the Assistant",
    meaning: "Wisdom and craft. Keeps the owner's day organized and smart.",
    area: "Run the day",
    does: "Handles the owner's inbox, calendar, quotes and reminders.",
    measuredOn: "Hours saved/week",
    channels: "Email · calendar · WhatsApp",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Athena, the Assistant. I give you your hours back.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["Your inbox is sorted", "The calendar is kept", "Quotes are written", "Reminders go out on time"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 22h 57m · Dec −29° 37′",
    // A shield
    stars: [[50, 4, 3], [92, 30, 2], [80, 82, 1], [50, 96, 2], [20, 82, 1], [8, 30, 2], [50, 48, 2]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [6, 3]],
  },
  {
    slug: "pygmalion",
    catalog: "GLS-009",
    figure: "Pygmalion",
    role: "the Designer",
    meaning: "The sculptor. Gives form to the brand.",
    area: "Build",
    does: "Logo, brand kit and ad creatives.",
    measuredOn: "Delivered on time · approval rounds",
    channels: "Brand files · ads",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Pygmalion, the Designer. I give your business its form.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["We learn your business", "The first forms are sketched", "Logo and brand kit are carved", "Ad creatives are delivered"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 01h 08m · Dec +07° 53′",
    // A carved figure
    stars: [[40, 4, 2], [60, 4, 2], [72, 34, 1], [56, 58, 3], [66, 96, 2], [34, 96, 2], [44, 58, 1], [28, 34, 1]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]],
  },
  {
    slug: "daedalus",
    catalog: "GLS-010",
    figure: "Daedalus",
    role: "the Web Specialist",
    meaning: "The architect. Builds the place where clients arrive.",
    area: "Build",
    does: "A landing page or website connected to the CRM.",
    measuredOn: "Page conversion rate · leads from the page",
    channels: "Web",
    liveIn: LIVE,
    price: PRICE,
    intro: { text: "I'm Daedalus, the Web Specialist. I build the place where your clients arrive.", pending: "Intro line: Camilo writes it." },
    steps: {
      list: ["The plan of the page", "Daedalus builds it", "Connected to your CRM", "Visitors become leads"],
      pending: STEPS_PENDING,
    },
    coordinates: "RA 11h 47m · Dec +55° 41′",
    // A labyrinth, walked inward
    stars: [[6, 6, 2], [94, 6, 1], [94, 94, 1], [22, 94, 1], [22, 22, 1], [78, 22, 1], [78, 78, 1], [38, 78, 1], [38, 38, 1], [60, 38, 3]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
  },
];

export const teams = [
  {
    slug: "lead-machine",
    name: "The Lead Machine",
    agents: ["artemis", "hermes", "nike", "mnemosyne"],
    forWho: "Businesses that need more leads and lose the ones they get.",
    price: { text: "$___/mo", pending: "Team price: 05_offer." },
  },
  {
    slug: "launch-team",
    name: "The Launch Team",
    agents: ["pygmalion", "daedalus", "argus"],
    forWho: "New businesses, or a new offer.",
    price: { text: "$___/mo", pending: "Team price: 05_offer." },
  },
];

export function getAgent(slug: string) {
  return agents.find((a) => a.slug === slug);
}

function ring(n: number, cx: number, cy: number, r: number): Star[] {
  return Array.from({ length: n }, (_, i) => {
    const jitter = [0, 0.18, -0.12, 0.1, -0.2, 0.14, -0.06][i % 7];
    const a = ((i + jitter) / n) * Math.PI * 2 - Math.PI / 2;
    const rr = r * (1 + [0, -0.12, 0.06, -0.08, 0.1, -0.04, 0.08][i % 7]);
    return [Math.round(cx + Math.cos(a) * rr), Math.round(cy + Math.sin(a) * rr), i % 2 ? 1 : 2] as Star;
  });
}
