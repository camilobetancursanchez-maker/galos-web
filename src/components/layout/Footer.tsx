import Link from "next/link";
import { copy } from "@/content";
import { to } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { GalosStar } from "@/components/sky/GalosStar";
import { Pending } from "@/components/ui/Pending";

/** Section: 13_sections/00_every-page/03_footer */
export async function Footer() {
  const lang = await pageLang();
  const { agents, site, ui } = copy(lang);
  return (
    <footer className="relative mt-24 border-t border-line bg-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <Link href={to(lang, "/")} className="flex items-center gap-2.5">
            <GalosStar className="h-5 w-5" />
            <span className="text-[22px] font-bold tracking-[-0.03em]">Galos</span>
          </Link>
          <p className="mt-4 max-w-xs text-[15px] text-muted">{ui.footer.tagline}</p>
          <p className="label mt-6 flex items-center gap-2 !text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" /> {site.disclosure}
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="label">{ui.footer.collection}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px]">
            {agents.map((a) => (
              <li key={a.slug}>
                <Link href={to(lang, `/workers/${a.slug}`)} className="group flex items-baseline gap-2 hover:text-ink">
                  <span className="num w-7 text-[11px] text-faint">{a.catalog.slice(-3)}</span>
                  <span className="text-muted transition-colors group-hover:text-ink">{a.figure}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-6 md:col-span-4">
          <div>
            <p className="label">{ui.footer.pages}</p>
            <ul className="mt-4 space-y-2 text-[15px] text-muted">
              {site.footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={to(lang, l.href)} className="hover:text-ink">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">{ui.footer.contact}</p>
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
        <span>{ui.footer.catalogue}</span>
      </div>
    </footer>
  );
}
