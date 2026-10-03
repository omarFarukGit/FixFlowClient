"use client";

import Link from "next/link";
import { CheckCircle2, Home, Receipt, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <main className="bg-background flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg shadow-sm">
        <CardHeader className="flex justify-center flex-col items-center pb-4 text-center">
          {/* Success Icon */}
          <div className=" flex size-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="size-12 text-green-600" />
          </div>

          <CardTitle className="mt-4 text-2xl">Payment Successful!</CardTitle>

          <p className="text-muted-foreground max-w-sm text-sm">
            Your payment has been successfully completed. Thank you for using
            FixFlow.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success Message */}
          <div className="rounded-lg border bg-green-500/5 p-4 text-center">
            <Receipt className="mx-auto mb-2 size-6 text-green-600" />

            <p className="text-sm font-medium">
              Your payment has been confirmed.
            </p>

            <p className="text-muted-foreground mt-1 text-xs">
              You can view all your payment details from the Payments section.
            </p>
          </div>

          {/* Actions */}
          <div className="grid gap-3 sm:grid-cols-2 flex">
            <Button>
              <Link
                className="flex justify-center items-center gap-2"
                href="/customer/payments"
              >
                <Receipt className="size-4" />
                View Payments
              </Link>
            </Button>

            <Button variant="outline">
              <Link
                className="flex justify-center items-center gap-2"
                href="/customer"
              >
                <Home className="size-4" />
                Dashboard
              </Link>
            </Button>
          </div>

          <Button variant="ghost" className="w-full">
            <Link
              href="/customer/service-requests"
              className="flex justify-center items-center gap-2"
            >
              <Wrench className="size-4" />
              My Services
            </Link>
          </Button>

          <p className="text-muted-foreground text-center text-xs">
            Thank you for choosing FixFlow.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
