import Link from "next/link";
import { agents } from "@/content/agents";
import { site } from "@/content/site";
import { GalosStar } from "@/components/sky/GalosStar";
import { Pending } from "@/components/ui/Pending";

/** Section: 13_sections/00_every-page/03_footer */
export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-2.5">
            <GalosStar className="h-5 w-5" />
            <span className="text-[22px] font-bold tracking-[-0.03em]">Galos</span>
          </Link>
          <p className="mt-4 max-w-xs text-[15px] text-muted">A gallery of AI agents. Art meets systems.</p>
          <p className="label mt-6 flex items-center gap-2 !text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" /> {site.disclosure}
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="label">The Collection · Vol. I</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px]">
            {agents.map((a) => (
              <li key={a.slug}>
                <Link href={`/agents/${a.slug}`} className="group flex items-baseline gap-2 hover:text-ink">
                  <span className="num w-7 text-[11px] text-faint">{a.catalog.slice(-3)}</span>
                  <span className="text-muted transition-colors group-hover:text-ink">{a.figure}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-6 md:col-span-4">
          <div>
            <p className="label">Pages</p>
            <ul className="mt-4 space-y-2 text-[15px] text-muted">
              {[...site.nav, { href: "/teams", label: "Teams" }, { href: "/legal", label: "Legal" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Contact</p>
            <ul className="mt-4 space-y-2 text-[15px] text-muted">
              <li>WhatsApp <Pending note={site.contact.whatsapp.pending} align="right" /></li>
              <li>Email <Pending note={site.contact.email.pending} align="right" /></li>
              <li><a href="https://www.youtube.com" className="hover:text-ink">YouTube</a> <Pending note="Channel link: Camilo." align="right" /></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap label flex flex-col justify-between gap-2 border-t border-line py-6 sm:flex-row">
        <span>© {new Date().getFullYear()} Galos</span>
        <span>Catalogue of the Galos Collection · 10 works</span>
      </div>
    </footer>
  );
}
