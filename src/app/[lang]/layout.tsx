import type { Metadata, Viewport } from "next";
import { copy } from "@/content";
import { langs } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AskGalosButton } from "@/components/layout/AskGalosButton";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { Starfield } from "@/components/sky/Starfield";
import "../globals.css";

// English at /, Spanish at /es (src/proxy.ts rewrites the rest to /en). Any other language is a 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await pageLang();
  const { site } = copy(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: site.seo.title, template: "%s · Galos" },
    description: site.seo.description,
    openGraph: { type: "website", siteName: "Galos", title: site.seo.title, description: site.seo.description, locale: lang === "es" ? "es_CO" : "en_US" },
  };
}

export const viewport: Viewport = { themeColor: "#ffffff" };

// Runs before paint so a saved dark theme never flashes white
const themeScript = `try{if(localStorage.getItem("galos-theme")==="dark"){document.documentElement.dataset.theme="dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.content="#000000"}}catch(e){}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await pageLang();
  return (
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {/* The sky behind every page */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <Starfield mode="ambient" seed={3} />
        </div>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <AskGalosButton />
        <RevealObserver />
      </body>
    </html>
  );
}
