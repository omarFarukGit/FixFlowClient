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

const categories = [
  {
    name: "Plumbing",
    description:
      "Professional plumbing repair, installation, and maintenance services.",
    icon: Droplets,
  },
  {
    name: "Electrical",
    description:
      "Reliable electrical installation, repair, and maintenance services.",
    icon: Lightbulb,
  },
  {
    name: "HVAC",
    description:
      "Heating, cooling, ventilation, and air conditioning services.",
    icon: AirVent,
  },
  {
    name: "Appliance Repair",
    description:
      "Repair and maintenance services for your household appliances.",
    icon: Refrigerator,
  },
  {
    name: "Carpentry",
    description:
      "Furniture, doors, cabinets, and other professional woodwork services.",
    icon: Home,
  },
  {
    name: "Painting",
    description:
      "Interior and exterior painting services for residential properties.",
    icon: Paintbrush,
  },
  {
    name: "Automotive",
    description: "Vehicle repair, maintenance, and other automotive services.",
    icon: Car,
  },
  {
    name: "General Repair",
    description:
      "Reliable solutions for general home and property repair needs.",
    icon: Wrench,
  },
];

export default function ServiceCategoryGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Explore Our Services
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Browse our service categories and find the right professional for
            your needs.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.name}
                className="group border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-semibold">{category.name}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
