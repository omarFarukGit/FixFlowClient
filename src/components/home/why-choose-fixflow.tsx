import {
  BadgeCheck,
  CreditCard,
  Headphones,
  SearchCheck,
  ShieldCheck,
  Star,
  UsersRound,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description:
      "Connect with approved and skilled technicians who are ready to handle your service needs.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable Service",
    description:
      "Get your service request handled efficiently with a clear and organized workflow.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Trusted",
    description:
      "Your account and service information are protected with secure authentication and authorization.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Make payments safely through Stripe with a reliable and transparent payment process.",
  },
  {
    icon: SearchCheck,
    title: "Easy Service Tracking",
    description:
      "Track your service request from creation and technician assignment to completion.",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description:
      "Share your experience and help maintain service quality through ratings and reviews.",
  },
  {
    icon: UsersRound,
    title: "For Everyone",
    description:
      "A complete platform designed for customers, technicians, and administrators.",
  },
  {
    icon: Headphones,
    title: "Simple Experience",
    description:
      "Enjoy a clean and intuitive experience that makes managing services easier.",
  },
];

export default function WhyChooseFixFlow() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-16 sm:py-20 lg:py-24">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            Why FixFlow?
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Why Choose FixFlow?
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            FixFlow brings customers and skilled professionals together through
            a secure, simple, and reliable service management experience.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-primary/15 bg-primary/5 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <ShieldCheck className="size-7" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                Everything you need in one place
              </h3>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                From finding the right professional to completing payment and
                leaving a review, FixFlow keeps the entire service journey
                organized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
