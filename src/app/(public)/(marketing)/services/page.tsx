import ServiceCategoryGrid from "@/components/services/service-category-grid";
import ServicesCta from "@/components/services/services-cta";
import ServicesHero from "@/components/services/services-hero";


export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />

      <ServiceCategoryGrid />

      <ServicesCta />
    </main>
  );
}