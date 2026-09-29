import { Eye, Target } from "lucide-react";

const items = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make field service management easier, more transparent, and more accessible by connecting customers and professionals through a reliable digital platform.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To build a trusted service ecosystem where customers can confidently request services and professionals can efficiently manage and grow their work.",
  },
];

export default function MissionVision() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Our Purpose</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Mission & Vision
          </h2>

          <p className="mt-4 text-muted-foreground">
            The principles behind the FixFlow platform.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
