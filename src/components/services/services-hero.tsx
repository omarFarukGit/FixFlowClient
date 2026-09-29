import { Wrench } from "lucide-react";

export default function ServicesHero() {
  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-16 text-center md:py-24">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Wrench className="h-7 w-7" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Professional Services
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Find reliable professionals for your home, property, and everyday
          service needs.
        </p>
      </div>
    </section>
  );
}