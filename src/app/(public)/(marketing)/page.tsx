import HeroSection from "@/components/home/hero-section";
import HowFixFlowWorks from "@/components/home/how-fixflow-works";
import WhyChooseFixFlow from "@/components/home/why-choose-fixflow";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      {/* Popular Services */}
      {/* How It Works */}
      <HowFixFlowWorks />
      {/* Why Choose FixFlow */}
        <WhyChooseFixFlow />
      {/* Reviews */}
      {/* CTA */}
    </main>
  );
}