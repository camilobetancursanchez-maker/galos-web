import Link from "next/link";
import { copy } from "@/content";
import { to } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { GalosStar } from "@/components/sky/GalosStar";

export default async function NotFound() {
  const lang = await pageLang();
  const t = copy(lang).pages.notFound;
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-center justify-center text-center">
      <GalosStar className="twinkle h-10 w-10" />
      <p className="label mt-8">Cat. GLS-404</p>
      <h1 className="h2 mt-4 max-w-[16ch]">{t.title}</h1>
      <Link href={to(lang, "/")} className="btn btn-ink mt-10">{t.back}</Link>
    </section>
  );
}
