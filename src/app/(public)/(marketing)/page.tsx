import CtaSection from "@/components/home/cta-section";
import CustomerReviews from "@/components/home/customer-reviews";
import HeroSection from "@/components/home/hero-section";
import HowFixFlowWorks from "@/components/home/how-fixflow-works";
import HowItWorksUsers from "@/components/home/how-it-works-users";
import ServiceWorkflow from "@/components/home/service-workflow";
import ServicesSection from "@/components/home/services-section";
import WhyChooseFixFlow from "@/components/home/why-choose-fixflow";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <ServicesSection />
      <HowFixFlowWorks />
      <WhyChooseFixFlow />

      <HowItWorksUsers />

      <ServiceWorkflow />
      <CustomerReviews />

      <CtaSection />
    </main>
  );
}
