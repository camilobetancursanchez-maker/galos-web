import type { Metadata } from "next";
import { Suspense } from "react";
import { copy } from "@/content";
import { pageLang } from "@/lib/lang";
import { AskFlow } from "@/components/ask/AskFlow";

export async function generateMetadata(): Promise<Metadata> {
  const t = copy(await pageLang()).pages.ask;
  return { title: t.title, description: t.description };
}

/** Ask Galos (/ask). Sections: 13_sections/04_ask-galos */
export default function AskPage() {
  return (
    <Suspense>
      <AskFlow />
    </Suspense>
  );
}
