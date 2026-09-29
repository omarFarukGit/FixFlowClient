import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ServicesCta() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border bg-muted/40 px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Need a Professional Service?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Log in to your customer dashboard and create a service request.
            We&apos;ll help connect you with the right professional.
          </p>

          <Button className="mt-6">
            <Link href="/login" className="flex justify-center items-center">
              Login to Request a Service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
