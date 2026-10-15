import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AskGalosButton } from "@/components/layout/AskGalosButton";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { Starfield } from "@/components/sky/Starfield";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: "%s · Galos" },
  description: site.seo.description,
  openGraph: { type: "website", siteName: "Galos", title: site.seo.title, description: site.seo.description },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

// Runs before paint so a saved dark theme never flashes white
const themeScript = `try{if(localStorage.getItem("galos-theme")==="dark"){document.documentElement.dataset.theme="dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.content="#000000"}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
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
