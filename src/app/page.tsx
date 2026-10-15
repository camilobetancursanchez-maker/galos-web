import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ClientJourney } from "@/components/home/ClientJourney";
import { AskPrompt } from "@/components/home/AskPrompt";
import { MeetTheWorkers } from "@/components/home/MeetTheWorkers";
import { YourStudio } from "@/components/home/YourStudio";
import { PricingLine } from "@/components/home/PricingLine";
import { Proof } from "@/components/home/Proof";
import { Custom } from "@/components/home/Custom";
import { FinalCall } from "@/components/home/FinalCall";

/**
 * Home. Order from the vault: 07_content/Page — Home (and 00 Galos — Explained Simply, section 7).
 * One component per folder in 13_sections/01_home.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ClientJourney />
      <AskPrompt />
      <MeetTheWorkers />
      <YourStudio />
      <PricingLine />
      <Proof />
      <Custom />
      <FinalCall />
    </>
  );
}
