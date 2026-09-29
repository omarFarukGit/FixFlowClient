import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    title: "Email Us",
    description: "For general questions and support",
    value: "support@fixflow.com",
    href: "mailto:support@fixflow.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "For urgent service assistance",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Our service team is based in",
    value: "Dhaka, Bangladesh",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "Customer support availability",
    value: "Sat - Thu, 9:00 AM - 6:00 PM",
  },
];

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
        Contact Information
      </h2>

      <p className="mt-3 leading-7 text-muted-foreground">
        Choose the most convenient way to reach the FixFlow team. We&apos;re
        always happy to hear from you.
      </p>

      <div className="mt-8 space-y-5">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">{item.title}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>

                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
