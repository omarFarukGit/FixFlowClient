import Link from "next/link";
import { ArrowLeft, ArrowRight, Home, SearchX, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <Card className="w-full max-w-lg border-border shadow-lg">
        <CardHeader className="flex flex-col justify-center  items-center text-center ">
          <div className="mb-4 flex size-24 items-center justify-center rounded-2xl bg-primary/10">
            <SearchX className="size-12 text-primary" aria-hidden="true" />
          </div>

          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <Wrench className="size-5" />
            FixFlow
          </div>

          <p className="text-6xl font-extrabold tracking-tight text-primary sm:text-7xl">
            404
          </p>

          <CardTitle className="text-2xl sm:text-3xl">Page Not Found</CardTitle>

          <CardDescription className="max-w-sm text-sm leading-6">
            The page you are looking for may have been moved, deleted, or does
            not exist. Let&apos;s get you back on track.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-border bg-muted/40 p-4 text-center">
            <p className="text-sm font-medium">Need a home service?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Return to FixFlow and explore our services.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button className="w-full sm:w-auto">
            <Link className=" flex justify-center items-center gap-2" href="/">
              <Home className="mr-2 size-4" />
              Go to Homepage
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button variant="outline" className="w-full sm:w-auto">
            <Link href="/services">Explore Services</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
