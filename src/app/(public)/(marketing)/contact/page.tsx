import ContactFaq from "@/components/contact/contact-faq";
import ContactHero from "@/components/contact/contact-hero";
import ContactSection from "@/components/contact/contact-section";
import CtaSection from "@/components/home/cta-section";

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactSection />
      <ContactFaq />
      <CtaSection />
    </main>
  );
}
