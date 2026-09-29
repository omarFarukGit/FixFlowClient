import Link from "next/link";
import {
  AirVent,
  Car,
  Droplets,
  Home,
  Lightbulb,
  Paintbrush,
  Refrigerator,
  Wrench,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const serviceCategories = [
  {
    name: "Plumbing",
    description: "Professional plumbing repair and maintenance services.",
    icon: Droplets,
  },
  {
    name: "Electrical",
    description: "Safe and reliable electrical installation and repair.",
    icon: Lightbulb,
  },
  {
    name: "HVAC",
    description: "Heating, cooling, and air conditioning services.",
    icon: AirVent,
  },
  {
    name: "Appliance Repair",
    description: "Repair and maintenance for household appliances.",
    icon: Refrigerator,
  },
  {
    name: "Carpentry",
    description: "Furniture, doors, cabinets, and woodwork services.",
    icon: Home,
  },
  {
    name: "Painting",
    description: "Interior and exterior painting services for your property.",
    icon: Paintbrush,
  },
  {
    name: "Automotive",
    description: "Professional vehicle repair and maintenance services.",
    icon: Car,
  },
  {
    name: "General Repair",
    description: "Reliable solutions for everyday repair and maintenance.",
    icon: Wrench,
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Professional Services for Your Everyday Needs
          </h2>

          <p className="mt-4 text-muted-foreground">
            Find trusted professionals for home, electrical, plumbing,
            appliance, and other essential repair services.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.name}
                className="group border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {category.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-muted-foreground">
            Need professional help? Create a service request from your
            dashboard.
          </p>

          <Button >
            <Link href="/login">Login to Request a Service</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}