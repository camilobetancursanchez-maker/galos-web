"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { copy } from "@/content";
import { langOf, to, shownPath } from "@/lib/i18n";
import { GalosStar } from "@/components/sky/GalosStar";

/**
 * Ask Galos: the Galos star in a black circle that beats softly, always visible.
 * Tap → Chat or Speak. Section: 13_sections/00_every-page/02_ask-galos-button
 */
export function AskGalosButton() {
  const pathname = shownPath(usePathname());
  const lang = langOf(pathname);
  const { ui } = copy(lang);
  // Open for one page only: changing page closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof v === "function" ? v(open) : v) ? pathname : null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const onDown = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  if (pathname.startsWith(to(lang, "/ask"))) return null;

  return (
    <div ref={box} className="fixed bottom-5 right-5 z-50 md:bottom-8 md:right-8">
      <div
        role="dialog"
        aria-label={ui.askGalos}
        className={`absolute bottom-[76px] right-0 w-[min(300px,calc(100vw-40px))] origin-bottom-right rounded-[24px] bg-white p-2 shadow-[0_0_0_1px_var(--color-line),0_24px_60px_-20px_rgba(0,0,0,0.25)] transition-[opacity,transform] duration-300 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <p className="label px-4 pb-2 pt-3">{ui.askButton.title}</p>
        {[
          { href: to(lang, "/ask?mode=chat"), ...ui.askButton.chat },
          { href: to(lang, "/ask?mode=speak"), ...ui.askButton.speak },
        ].map((o) => (
          <Link key={o.t} href={o.href} tabIndex={open ? 0 : -1} className="flex items-center justify-between rounded-[18px] px-4 py-3.5 transition-colors hover:bg-wash">
            <span>
              <span className="block text-[17px] font-semibold">{o.t}</span>
              <span className="block text-[14px] text-muted">{o.d}</span>
            </span>
            <span aria-hidden className="text-muted">→</span>
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-label={ui.askGalos}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ink text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] transition-transform duration-200 active:scale-95"
      >
        {!open && <span className="beat-ring absolute inset-0 rounded-full border border-ink" />}
        <span className={open ? "" : "beat"}>
          <GalosStar className={`h-6 w-6 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
        </span>
      </button>
    </div>
  );
}
