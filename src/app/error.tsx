"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCw,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("FixFlow application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <Card className="w-full max-w-lg border-border shadow-lg">
        <CardHeader className="flex flex-col justify-center items-center items-center text-center">
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle
              className="size-10 text-destructive"
              aria-hidden="true"
            />
          </div>

          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <Wrench className="size-5" />
            FixFlow
          </div>

          <CardTitle className="text-2xl sm:text-3xl">
            Something Went Wrong
          </CardTitle>

          <CardDescription className="max-w-sm text-sm leading-6">
            We encountered an unexpected problem while processing
            your request. Please try again.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error.digest && (
            <p className="rounded-md bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
              Error reference: {error.digest}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={reset}
            className="w-full sm:w-auto cursor-pointer"
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>

          <Button
            
            variant="outline"
            className="w-full sm:w-auto cursor-pointer"
          >
            <Link className="flex justify-center items-center gap-2 " href="/">
              <Home className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}