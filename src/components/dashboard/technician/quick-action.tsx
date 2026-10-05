import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuickAction() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>

          <p className="text-sm text-muted-foreground">
            Quickly access your most important technician tasks.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-between">
              <Link
                className="flex justify-center items-center gap-2"
                href="/technician/services"
              >
                Assigned Services
                <ArrowRight />
              </Link>
            </Button>

            <Button variant="outline" className="justify-between">
              <Link
                className="flex justify-center items-center gap-2"
                href="/technician/services/completed"
              >
                Completed Services
                <ArrowRight />
              </Link>
            </Button>

            <Button variant="outline" className="justify-between">
              <Link
                className="flex justify-center items-center gap-2"
                href="/technician/availability"
              >
                My Availability
                <ArrowRight />
              </Link>
            </Button>

            <Button variant="outline" className="justify-between">
              <Link
                className="flex justify-center items-center gap-2"
                href="/technician/profile"
              >
                My Profile
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
