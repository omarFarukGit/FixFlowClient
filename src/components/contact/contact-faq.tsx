import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I book a service?",
    answer:
      "Visit the Services page, choose the service you need, and submit a service request. A suitable technician can then be assigned to your request.",
  },
  {
    question: "Can I track my service request?",
    answer:
      "Yes. FixFlow provides service status updates so customers can follow the progress of their requests.",
  },
  {
    question: "How do I become a technician?",
    answer:
      "You can create an account as a technician and complete your professional profile. Your profile may then go through the required approval process.",
  },
  {
    question: "How does payment work?",
    answer:
      "FixFlow supports secure online payment for completed services through the available payment system.",
  },
];

export default function ContactFaq() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Need Help?</p>

          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-muted-foreground">
            Find quick answers to some common questions about FixFlow.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-border bg-card px-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {faq.question}

                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>

              <p className="pb-5 pr-8 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
