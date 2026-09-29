import {
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  PlayCircle,
  UserRoundCheck,
} from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Request Created",
    description:
      "Customer creates a service request with the required details.",
  },
  {
    step: "02",
    icon: UserRoundCheck,
    title: "Technician Assigned",
    description: "Admin assigns a suitable technician to the service request.",
  },
  {
    step: "03",
    icon: BadgeCheck,
    title: "Service Accepted",
    description: "The assigned technician reviews and accepts the service.",
  },
  {
    step: "04",
    icon: PlayCircle,
    title: "Work In Progress",
    description:
      "The technician starts the job and updates the service status.",
  },
  {
    step: "05",
    icon: CheckCircle2,
    title: "Service Completed",
    description: "The technician completes the requested service successfully.",
  },
  {
    step: "06",
    icon: CreditCard,
    title: "Payment & Review",
    description: "Customer completes payment and leaves a service review.",
  },
];

export default function ServiceWorkflow() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-16 sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            Simple Service Journey
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Simple Service Workflow
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Follow the complete service journey from creating a request to
            completing payment and sharing your experience.
          </p>
        </div>

        {/* Workflow */}
        <div className="mx-auto mt-14 max-w-6xl">
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-border lg:block" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
              {workflowSteps.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.step} className="group relative text-center">
                    {/* Icon */}
                    <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-lg">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
                      </div>

                      {/* Step Number */}
                      <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                        {item.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-5">
                      <h3 className="text-sm font-semibold text-foreground sm:text-base">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Status Flow */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-yellow-500/10 px-3 py-1.5 text-yellow-700 dark:text-yellow-400">
            PENDING
          </span>

          <span className="text-muted-foreground">→</span>

          <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-blue-700 dark:text-blue-400">
            ASSIGNED
          </span>

          <span className="text-muted-foreground">→</span>

          <span className="rounded-full bg-indigo-500/10 px-3 py-1.5 text-indigo-700 dark:text-indigo-400">
            ACCEPTED
          </span>

          <span className="text-muted-foreground">→</span>

          <span className="rounded-full bg-orange-500/10 px-3 py-1.5 text-orange-700 dark:text-orange-400">
            IN PROGRESS
          </span>

          <span className="text-muted-foreground">→</span>

          <span className="rounded-full bg-green-500/10 px-3 py-1.5 text-green-700 dark:text-green-400">
            COMPLETED
          </span>

          <span className="text-muted-foreground">→</span>

          <span className="rounded-full bg-primary/10 px-3 py-1.5 text-primary">
            PAID
          </span>
        </div>
      </div>
    </section>
  );
}
