"use client";

import { usePathname } from "next/navigation";
import { langOf } from "./i18n";

/** The language of the page in Client Components (Server Components use `lang()` from next/root-params). */
export function useLang() {
  return langOf(usePathname());
}
