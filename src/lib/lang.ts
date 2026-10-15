import { lang } from "next/root-params";
import { asLang } from "./i18n";

/** The language of the page in Server Components (Client Components use useLang). */
export async function pageLang() {
  return asLang(await lang());
}
