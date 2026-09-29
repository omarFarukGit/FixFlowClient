import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Search,
  UserRoundCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choose a Service",
    description:
      "Browse available services and choose the one you need for your home or field service.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Submit a Request",
    description:
      "Provide your service details, location, and preferred schedule to create a service request.",
  },
  {
    number: "03",
    icon: UserRoundCheck,
    title: "Get a Professional",
    description:
      "A suitable technician is assigned to your request and manages the service professionally.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Get It Fixed",
    description:
      "Track your service, complete the payment securely, and share your experience with a review.",
  },
];

export default function HowFixFlowWorks() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            Simple & Hassle-Free
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How FixFlow Works
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            From booking a service to getting the job completed, FixFlow makes
            the entire service experience simple, transparent, and hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Connecting Line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-12 hidden h-px bg-border lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="group relative text-center">
                  {/* Icon */}
                  <div className="relative mx-auto flex size-24 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-lg">
                    <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-7" />
                    </div>

                    {/* Step Number */}
                    <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md">
                      {step.number.replace("0", "")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Explore Our Services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
