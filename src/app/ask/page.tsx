import type { Metadata } from "next";
import { Suspense } from "react";
import { AskFlow } from "@/components/ask/AskFlow";

export const metadata: Metadata = { title: "Ask Galos", description: "Tell Galos about your business. Get the agents it needs." };

/** Ask Galos (/ask). Sections: 13_sections/04_ask-galos */
export default function AskPage() {
  return (
    <Suspense>
      <AskFlow />
    </Suspense>
  );
}
