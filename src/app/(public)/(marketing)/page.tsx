import CtaSection from "@/components/home/cta-section";
import CustomerReviews from "@/components/home/customer-reviews";
import HeroSection from "@/components/home/hero-section";
import HowFixFlowWorks from "@/components/home/how-fixflow-works";
import HowItWorksUsers from "@/components/home/how-it-works-users";
import ServiceWorkflow from "@/components/home/service-workflow";
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

      <HowItWorksUsers />

      <ServiceWorkflow />

      {/* Reviews */}
      <CustomerReviews />
      {/* CTA */}
      <CtaSection />
    </main>
  );
}
