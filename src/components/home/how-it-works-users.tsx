import {
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";

const userTypes = [
  {
    icon: UserRound,
    title: "For Customers",
    description:
      "Find trusted professionals, request services, track progress, and manage your complete service experience.",
    color: "blue",
    steps: [
      {
        icon: Search,
        title: "Find a Service",
        description: "Browse and choose the service you need.",
      },
      {
        icon: ClipboardCheck,
        title: "Create Request",
        description: "Submit your service details and schedule.",
      },
      {
        icon: CreditCard,
        title: "Pay Securely",
        description: "Complete your payment through Stripe.",
      },
      {
        icon: Star,
        title: "Rate & Review",
        description: "Share your experience after completion.",
      },
    ],
  },
  {
    icon: Wrench,
    title: "For Technicians",
    description:
      "Build your professional profile, manage assigned services, and keep customers updated throughout the job.",
    color: "green",
    steps: [
      {
        icon: UserRound,
        title: "Create Profile",
        description: "Set up your skills and professional information.",
      },
      {
        icon: BriefcaseBusiness,
        title: "Get Assigned",
        description: "Receive suitable service requests from admins.",
      },
      {
        icon: CheckCircle2,
        title: "Manage Service",
        description: "Accept and update the service progress.",
      },
      {
        icon: BadgeCheck,
        title: "Complete Job",
        description: "Finish the service and update its status.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "For Admins",
    description:
      "Manage the entire platform, approve technicians, assign services, and monitor system operations.",
    color: "purple",
    steps: [
      {
        icon: UsersRound,
        title: "Manage Users",
        description: "Manage customers and technician accounts.",
      },
      {
        icon: BadgeCheck,
        title: "Approve Technicians",
        description: "Review and approve technician profiles.",
      },
      {
        icon: LayoutDashboard,
        title: "Manage Services",
        description: "Manage categories and service requests.",
      },
      {
        icon: ShieldCheck,
        title: "Monitor Operations",
        description: "Track payments, services, and activities.",
      },
    ],
  },
];

const colorStyles = {
  blue: {
    icon: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    badge: "bg-primary/10 text-primary",
    line: "bg-primary/20",
  },
  green: {
    icon: "bg-accent/15 text-accent-foreground group-hover:bg-accent group-hover:text-accent-foreground",
    badge: "bg-accent/15 text-accent-foreground",
    line: "bg-accent/30",
  },
  purple: {
    icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    line: "bg-violet-500/20",
  },
} as const;

export default function HowItWorksUsers() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            One Platform, Three Experiences
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How It Works for Different Users
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            FixFlow provides a dedicated experience for customers, technicians,
            and administrators to make service management simple and efficient.
          </p>
        </div>

        {/* User Cards */}
        <div className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-3">
          {userTypes.map((user) => {
            const UserIcon = user.icon;
            const styles = colorStyles[user.color as keyof typeof colorStyles];

            return (
              <div
                key={user.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
              >
                {/* Top Accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${styles.line}`}
                />

                {/* User Icon */}
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl transition-all duration-300 ${styles.icon}`}
                >
                  <UserIcon className="size-7" />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-xl font-bold text-foreground">
                  {user.title}
                </h3>

                <p className="mt-2 min-h-20 text-sm leading-6 text-muted-foreground">
                  {user.description}
                </p>

                {/* Steps */}
                <div className="mt-6 space-y-5">
                  {user.steps.map((step, index) => {
                    const StepIcon = step.icon;

                    return (
                      <div key={step.title} className="relative flex gap-4">
                        {/* Connecting line */}
                        {index !== user.steps.length - 1 && (
                          <div className="absolute left-5 top-10 h-[calc(100%+4px)] w-px bg-border" />
                        )}

                        {/* Step Icon */}
                        <div
                          className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl ${styles.badge}`}
                        >
                          <StepIcon className="size-4" />
                        </div>

                        {/* Step Content */}
                        <div className="pt-0.5">
                          <h4 className="text-sm font-semibold text-foreground">
                            {step.title}
                          </h4>

                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-5" />
          </div>

          <p className="text-sm text-muted-foreground">
            One connected platform for{" "}
            <span className="font-semibold text-foreground">
              customers, technicians, and administrators.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
