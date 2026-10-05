"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  DollarSign,
  Star,
  Wrench,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetMyServiceRequests } from "@/hooks";
import TechnicianOverviewSkeleton from "./technician-overview-skeleton";
import {
  formatDate,
  formatPrice,
  statusConfig3,
  TechnicianService,
} from "@/types/technician.type";
import QuickAction from "./quick-action";

export default function TechnicianOverview() {
  const { data: response, isLoading, isError } = useGetMyServiceRequests();

  const services: TechnicianService[] = response?.data?.data ?? [];

  const assignedServices = services.filter(
    (service) => service.status === "ASSIGNED",
  );

  const acceptedServices = services.filter(
    (service) => service.status === "ACCEPTED",
  );

  const inProgressServices = services.filter(
    (service) => service.status === "IN_PROGRESS",
  );

  const completedServices = services.filter(
    (service) => service.status === "COMPLETED",
  );

  const totalEarnings = completedServices.reduce((total, service) => {
    const price = service.finalPrice ?? service.estimatedPrice ?? 0;

    return total + Number(price);
  }, 0);

  const recentServices = [...services]
    .filter(
      (service) =>
        service.status === "ASSIGNED" ||
        service.status === "ACCEPTED" ||
        service.status === "IN_PROGRESS",
    )
    .slice(0, 5);

  if (isLoading) {
    return <TechnicianOverviewSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <Wrench className="mx-auto mb-3 size-10 text-muted-foreground" />

            <h3 className="text-lg font-semibold">Unable to load overview</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Technician Overview
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your assigned services and track your work.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Assigned */}
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Assigned Services
              </p>

              <p className="mt-2 text-3xl font-bold">
                {assignedServices.length}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Waiting for acceptance
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <Wrench className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        {/* Accepted */}
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Accepted
              </p>

              <p className="mt-2 text-3xl font-bold">
                {acceptedServices.length}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Ready to start
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-950">
              <Clock3 className="size-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                In Progress
              </p>

              <p className="mt-2 text-3xl font-bold">
                {inProgressServices.length}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Currently working
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
              <Zap className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold">
                {completedServices.length}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Successfully completed
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings + Rating */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="size-5 text-primary" />
              Total Earnings
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{formatPrice(totalEarnings)}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Based on completed services
            </p>

            <Button variant="outline" className="mt-4">
              <Link
                className="flex justify-center items-center gap-2"
                href="/technician/earnings"
              >
                View Earnings
                <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="size-5 text-yellow-500" />
              Technician Performance
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="size-6 fill-yellow-400 text-yellow-400" />

                <span className="text-2xl font-bold">5.0</span>
              </div>

              <span className="text-sm text-muted-foreground">
                Average rating
              </span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Keep providing excellent service to maintain your rating.
            </p>

            <Button variant="outline" className="mt-4">
              <Link
                href="/technician/reviews"
                className="flex justify-center items-center gap-2"
              >
                View Reviews
                <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assigned Services */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Assigned Services</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest active service requests.
            </p>
          </div>

          <Button variant="outline" size="sm">
            <Link
              className="flex justify-center items-center gap-2"
              href="/technician/services"
            >
              View All
              <ArrowRight />
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          {recentServices.length === 0 ? (
            <div className="py-10 text-center">
              <Wrench className="mx-auto mb-3 size-10 text-muted-foreground" />

              <h3 className="font-semibold">No active services</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                You currently have no assigned services.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentServices.map((service) => {
                const status = statusConfig3[service.status];

                return (
                  <div
                    key={service.id}
                    className="flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-semibold">
                          {service.title}
                        </h3>

                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {service.category?.name ?? "Service"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Customer: {service.customer?.name ?? "Unknown customer"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Scheduled: {formatDate(service.scheduledAt)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="font-semibold">
                        {formatPrice(
                          service.finalPrice ?? service.estimatedPrice,
                        )}
                      </span>

                      <Button size="sm">
                        <Link
                          className="flex justify-center items-center gap-2"
                          href={`/technician/services/${service.id}`}
                        >
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <QuickAction />
    </div>
  );
}
