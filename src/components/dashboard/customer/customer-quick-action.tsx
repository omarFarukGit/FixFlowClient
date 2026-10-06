import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CustomerQuickAction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>

        <p className="text-sm text-muted-foreground">
          Quickly access your most important customer actions.
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="justify-between">
            <Link
              className="flex items-center justify-between gap-2"
              href="/customer/service-requests/create"
            >
              Create Service Request
              <ArrowRight />
            </Link>
          </Button>

          <Button variant="outline" className="justify-between">
            <Link
              className="flex items-center justify-between gap-2"
              href="/customer/service-requests"
            >
              My Services
              <ArrowRight />
            </Link>
          </Button>

          <Button variant="outline" className="justify-between">
            <Link
              className="flex items-center justify-between gap-2"
              href="/customer/payments"
            >
              Payment History
              <ArrowRight />
            </Link>
          </Button>

          <Button variant="outline" className="justify-between">
            <Link
              className="flex items-center justify-between gap-2"
              href="/customer/profile"
            >
              My Profile
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
