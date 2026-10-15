import { Hero } from "@/components/home/Hero";
import { AskPrompt } from "@/components/home/AskPrompt";
import { CollectionPreview } from "@/components/home/CollectionPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Proof } from "@/components/home/Proof";
import { Custom } from "@/components/home/Custom";
import { FinalCall } from "@/components/home/FinalCall";

/** Home (the entrance). One component per folder in 13_sections/01_home. */
export default function Home() {
  return (
    <>
      <Hero />
      <AskPrompt />
      <CollectionPreview />
      <HowItWorks />
      <Proof />
      <Custom />
      <FinalCall />
    </>
  );
}
