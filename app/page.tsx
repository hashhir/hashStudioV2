import { CustomCursor } from "@/components/custom-cursor";
import { EntryLoader } from "@/components/entry-loader";
import { HeroSection } from "@/components/hero-section";
import { InfoSections } from "@/components/info-sections";
import { ParticlesBackground } from "@/components/particles-background";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <EntryLoader />
      <CustomCursor />
      <ParticlesBackground />
      <div className="relative z-10">
        <SiteHeader />
        <HeroSection />
        <InfoSections />
      </div>
    </main>
  );
}
