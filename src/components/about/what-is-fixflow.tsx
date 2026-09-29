import { CheckCircle2 } from "lucide-react";

const points = [
  "Connect customers with trusted service professionals",
  "Make service requests simple and easy to manage",
  "Provide transparent service progress tracking",
  "Support secure and convenient payments",
  "Create a reliable experience for every user",
];

export default function WhatIsFixFlow() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div>
            <div className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              What is FixFlow?
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              One Platform for Your Complete Service Journey
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              FixFlow is a field service management platform designed to
              simplify the way customers request services and professionals
              manage their work.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              From creating a service request to technician assignment, service
              completion, secure payment, and customer reviews, FixFlow brings
              the complete workflow into one connected experience.
            </p>

            {/* Points */}
            <div className="mt-8 space-y-4">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground sm:text-base">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-primary/10 p-6">
                  <p className="text-3xl font-bold text-primary">3</p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    User Roles
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Customer, Technician & Admin
                  </p>
                </div>

                <div className="rounded-2xl bg-green-500/10 p-6">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    1
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    Connected Platform
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Complete service workflow
                  </p>
                </div>

                <div className="rounded-2xl bg-primary/10 p-6 sm:col-span-2">
                  <p className="text-sm font-semibold text-primary">
                    From Request to Review
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-background px-3 py-1.5">
                      Request
                    </span>
                    <span>→</span>
                    <span className="rounded-full bg-background px-3 py-1.5">
                      Assign
                    </span>
                    <span>→</span>
                    <span className="rounded-full bg-background px-3 py-1.5">
                      Service
                    </span>
                    <span>→</span>
                    <span className="rounded-full bg-background px-3 py-1.5">
                      Payment
                    </span>
                    <span>→</span>
                    <span className="rounded-full bg-background px-3 py-1.5">
                      Review
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
