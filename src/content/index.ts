/**
 * All the words of the site in one language: copy("es").home.hero…
 * English: site.ts + agents.ts. Spanish: site.es.ts + agents.es.ts.
 */

import type { Lang } from "@/lib/i18n";
import * as en from "./site";
import * as es from "./site.es";
import { agents, teams, wings } from "./agents";
import { agentsEs, teamsEs, wingsEs } from "./agents.es";

const COPY = {
  en: { ...en, agents, teams, wings },
  es: { ...es, agents: agentsEs, teams: teamsEs, wings: wingsEs },
};

export function copy(lang: Lang) {
  const c = COPY[lang];
  return {
    ...c,
    getAgent: (slug: string) => c.agents.find((a) => a.slug === slug),
    wingOf: (name: string) => c.wings.find((w) => w.name === name),
  };
}

export type Copy = ReturnType<typeof copy>;
