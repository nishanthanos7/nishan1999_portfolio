import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { JourneySection } from "@/components/JourneySection";
import { Navigation } from "@/components/Navigation";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <WorkSection />
      <AboutSection />
      <JourneySection />
      <ContactSection />
    </main>
  );
}
