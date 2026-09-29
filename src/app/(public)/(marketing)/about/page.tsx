import AboutHero from "@/components/about/about-hero";
import MissionVision from "@/components/about/mission-vision";
import WhatIsFixFlow from "@/components/about/what-is-fixflow";
import CtaSection from "@/components/home/cta-section";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <WhatIsFixFlow />
      <MissionVision />

      {/* Add more About sections here */}

      <CtaSection />
    </main>
  );
}
