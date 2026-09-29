import Link from "next/link";
import { ArrowRight, ShieldCheck, UsersRound, Wrench } from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    label: "Trusted Services",
  },
  {
    icon: UsersRound,
    label: "Verified Professionals",
  },
  {
    icon: Wrench,
    label: "Simple Experience",
  },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-primary/5">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 size-96 rounded-full bg-green-400/10 blur-3xl" />

      <div className="container relative mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Wrench className="size-4" />
            About FixFlow
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Making Service Management{" "}
            <span className="text-primary">Simple & Reliable</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            FixFlow connects customers with trusted service professionals
            through a simple, transparent, and reliable service management
            platform.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
            >
              Explore Services
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              How It Works
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm"
                >
                  <Icon className="size-4 text-primary" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
