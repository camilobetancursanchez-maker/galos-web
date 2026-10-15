/**
 * Two languages: English at / (default, no prefix) and Spanish at /es.
 * The pages live in src/app/[lang]/; src/proxy.ts sends every URL without /es to /en inside.
 */

export const langs = ["en", "es"] as const;
export type Lang = (typeof langs)[number];

export const isLang = (v: unknown): v is Lang => langs.includes(v as Lang);
export const asLang = (v: unknown): Lang => (isLang(v) ? v : "en");

/** The language of a URL path as the browser shows it ("/es/workers" → "es"). */
export const langOf = (pathname: string): Lang => (pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en");

/** A site link in this language: to("es", "/workers") → "/es/workers", to("es", "/#how") → "/es#how". */
export function to(lang: Lang, href: string): string {
  if (lang === "en" || !href.startsWith("/")) return href;
  if (href === "/") return "/es";
  if (href.startsWith("/#") || href.startsWith("/?")) return "/es" + href.slice(1);
  return "/es" + href;
}

/** The same page in the other language ("/es/workers" ↔ "/workers"). */
export function switchPath(pathname: string, lang: Lang): string {
  const bare = langOf(pathname) === "es" ? pathname.slice(3) || "/" : pathname;
  return to(lang, bare);
}
