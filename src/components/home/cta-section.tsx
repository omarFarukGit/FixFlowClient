import Link from "next/link";
import { ArrowRight, CheckCircle2, Wrench } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 shadow-xl sm:px-10 sm:py-16 lg:px-16">
          {/* Decorative Background */}
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 size-80 rounded-full bg-green-400/20 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            {/* Content */}
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                <Wrench className="size-4" />
                Your Service, Simplified
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to Get Your Service Done?
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                Find trusted professionals, book your service, track the
                progress, and pay securely — all in one place with FixFlow.
              </p>

              {/* Benefits */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Verified professionals",
                  "Easy service booking",
                  "Secure payments",
                  "Real-time service tracking",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/90"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-green-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
              >
                Book a Service
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Join as a Professional
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}