"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { GalosStar } from "@/components/sky/GalosStar";

/** Section: 13_sections/00_every-page/01_header-nav */
export function Header() {
  const pathname = usePathname();
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
          scrolled || open ? "bg-white/75 shadow-[0_1px_0_#e5e5ea] backdrop-blur-xl" : ""
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Galos, home">
            <GalosStar className="h-[18px] w-[18px]" />
            <span className="text-[19px] font-bold tracking-[-0.03em]">Galos</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {site.nav.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-2 text-[15px] transition-colors ${active ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {active && <span className="absolute left-1/2 top-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-ink" />}
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link href={site.bookingUrl} className="btn btn-line hidden !h-10 !px-4 !text-[15px] md:inline-flex">
              Book a call
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
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
        <nav className="wrap flex h-full flex-col pb-10 pt-24" aria-label="Main">
          {site.nav.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={open ? 0 : -1}
              className="flex items-baseline justify-between border-b border-line py-5 text-[34px] font-bold tracking-[-0.03em]"
              style={{ transition: "transform 600ms var(--ease-slow)", transform: open ? "none" : `translateY(${12 + i * 6}px)` }}
            >
              {l.label}
              <span className="label">0{i + 1}</span>
            </Link>
          ))}
          <Link href={site.bookingUrl} tabIndex={open ? 0 : -1} className="btn btn-ink btn-lg mt-auto w-full">
            Book a call
          </Link>
        </nav>
      </div>
    </>
  );
}
