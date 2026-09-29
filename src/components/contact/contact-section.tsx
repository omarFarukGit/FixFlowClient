import ContactForm from "./contact-form";
import ContactInfo from "./contact-info";

export default function ContactSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
