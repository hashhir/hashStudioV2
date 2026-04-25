import { CustomCursor } from "@/components/custom-cursor";
import { HeroSection } from "@/components/hero-section";
import { InfoSections } from "@/components/info-sections";
import { ParticlesBackground } from "@/components/particles-background";
import { SiteShell } from "@/components/site-shell";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <SiteShell />
      <CustomCursor />
      <ParticlesBackground />
      <div className="pointer-events-none fixed right-4 top-28 z-30 hidden items-start gap-3 sm:right-6 sm:top-32 md:flex lg:right-10">
        <div className="h-24 w-px bg-accent/80" />
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
      <div className="relative z-10">
        <SiteHeader />
        <HeroSection />
        <InfoSections />
      </div>
    </main>
  );
}
