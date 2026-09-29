"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-2 text-sm font-medium text-primary">
              <Zap className="size-4" />
              Smart & Reliable Field Services
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Trusted Service.
              <span className="block text-primary">
                Better Living.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Connect with trusted professionals for reliable home and field
              services. Book a service, track your request, make secure
              payments, and get it fixed with FixFlow.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Book a Service
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                How It Works
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <TrustItem
                icon={<ShieldCheck className="size-4" />}
                text="Verified"
              />

              <TrustItem
                icon={<Zap className="size-4" />}
                text="Fast Service"
              />

              <TrustItem
                icon={<CheckCircle2 className="size-4" />}
                text="Secure Payment"
              />

              <TrustItem
                icon={<Star className="size-4" />}
                text="Rated Pros"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Image glow */}
            <div className="absolute inset-8 rounded-3xl bg-primary/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-2 shadow-2xl">
              <Image
                src="/images/fixflow-hero-banner.png"
                alt="FixFlow field service management"
                width={900}
                height={700}
                priority
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur sm:-left-6 sm:p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                <CheckCircle2 className="size-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Trusted Professionals
                </p>
                <p className="text-xs text-muted-foreground">
                  Quality service you can trust
                </p>
              </div>
            </div>

            {/* Rating card */}
            <div className="absolute -right-2 -top-4 flex items-center gap-2 rounded-xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur sm:-right-5">
              <Star className="size-5 fill-current text-yellow-500" />

              <div>
                <p className="text-sm font-bold text-foreground">4.9/5</p>
                <p className="text-xs text-muted-foreground">
                  Customer Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="text-primary">{icon}</span>
      <span>{text}</span>
    </div>
  );
}