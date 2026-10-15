"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { copy } from "@/content";
import { langOf, switchPath, to } from "@/lib/i18n";
import { GalosStar } from "@/components/sky/GalosStar";
import { ThemeToggle } from "./ThemeToggle";

/** Section: 13_sections/00_every-page/01_header-nav */
export function Header() {
  const pathname = usePathname();
  const lang = langOf(pathname);
  const { site, ui } = copy(lang);
  const other = lang === "es" ? "en" : "es";
  const [scrolled, setScrolled] = useState(false);
  // Open for one page only: changing page closes it
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof v === "function" ? v(open) : v) ? pathname : null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open ? "bg-white/75 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : ""
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <Link href={to(lang, "/")} className="flex items-center gap-2.5" aria-label={ui.home}>
            <GalosStar className="h-[18px] w-[18px]" />
            <span className="text-[19px] font-bold tracking-[-0.03em]">Galos</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label={ui.menu.main}>
            {site.nav.map((l) => {
              const href = to(lang, l.href);
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={l.href}
                  href={href}
                  className={`relative rounded-full px-3.5 py-2 text-[15px] transition-colors ${active ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {active && <span className="absolute left-1/2 top-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-ink" />}
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            {/* EN / ES: the same page in the other language */}
            <Link
              href={switchPath(pathname, other)}
              hrefLang={other}
              aria-label={ui.switchLabel}
              title={ui.switchLabel}
              className="label flex h-10 items-center rounded-full px-2.5 !text-ink transition-colors hover:bg-wash"
            >
              {other.toUpperCase()}
            </Link>
            <ThemeToggle />
            <Link href={to(lang, "/ask")} className="btn btn-line ml-1 hidden !h-10 !px-4 !text-[15px] md:inline-flex">
              <GalosStar className="h-3.5 w-3.5" /> {ui.askGalos}
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
              aria-label={open ? ui.menu.close : ui.menu.open}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Phone menu: a full white sheet */}
      <div
        className={`fixed inset-0 z-30 bg-white transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <nav className="wrap flex h-full flex-col pb-10 pt-24" aria-label={ui.menu.main}>
          {site.nav.map((l, i) => (
            <Link
              key={l.href}
              href={to(lang, l.href)}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-5 text-[34px] font-bold tracking-[-0.03em]"
              style={{ transition: "transform 600ms var(--ease-slow)", transform: open ? "none" : `translateY(${12 + i * 6}px)` }}
            >
              {l.label}
              <span className="label">0{i + 1}</span>
            </Link>
          ))}
          <div className="mt-6 flex gap-5 text-[17px] text-muted">
            <Link href={to(lang, "/about")} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{ui.about}</Link>
            <Link href={to(lang, "/custom")} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{ui.customProjects}</Link>
          </div>
          <Link href={to(lang, "/ask")} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="btn btn-ink btn-lg mt-auto w-full">
            <GalosStar className="h-4 w-4" /> {ui.askGalos}
          </Link>
        </nav>
      </div>
    </>
  );
}
