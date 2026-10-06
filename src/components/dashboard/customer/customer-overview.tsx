"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  FilePlus2,
  History,
  LoaderCircle,
  Receipt,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetServiceRequests } from "@/hooks";
import TechnicianOverviewSkeleton from "../technician/technician-overview-skeleton";
import {
  CustomerServiceRequestsResponse,
  formatDate,
  formatPrice,
  statusConfig2,
} from "@/types/service.type";
import CustomerQuickAction from "./customer-quick-action";

export default function CustomerOverview() {
  const { data: response, isLoading, isError } = useGetServiceRequests();

  const apiResponse = response as CustomerServiceRequestsResponse | undefined;

  const services = apiResponse?.data ?? [];

  const summary = apiResponse?.summary ?? {
    totalRequests: 0,
    pendingRequests: 0,
    assignedServices: 0,
    acceptedServices: 0,
    inProgressServices: 0,
    activeServices: 0,
    completedServices: 0,
    cancelledServices: 0,
    totalSpent: 0,
  };

  /**
   * API already returns paginated data.
   *
   * For overview we only need the latest 5
   * from the current response.
   */
  const recentServices = [...services]
    .sort((a, b) => {
      const first = a.createdAt ? new Date(a.createdAt).getTime() : 0;

      const second = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return second - first;
    })
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <TechnicianOverviewSkeleton />
      </div>
    );
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
          Customer Overview
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your service requests and track your services.
        </p>
      </div>

      {/* Quick Create */}
      <Card className="overflow-hidden border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Need a service?</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create a new service request and get professional help.
            </p>
          </div>

          <Button>
            <Link
              className="flex items-center justify-center gap-2"
              href="/customer/service-requests/create"
            >
              <FilePlus2 />
              Create Service Request
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Requests */}
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Requests
              </p>

              <p className="mt-2 text-3xl font-bold">{summary.totalRequests}</p>

              <p className="mt-1 text-xs text-muted-foreground">
                All service requests
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <Receipt className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending
              </p>

              <p className="mt-2 text-3xl font-bold">
                {summary.pendingRequests}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Waiting for assignment
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-950">
              <Clock3 className="size-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        {/* Active */}
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Services
              </p>

              <p className="mt-2 text-3xl font-bold">
                {summary.activeServices}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Currently being handled
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
              <LoaderCircle className="size-5 text-purple-600 dark:text-purple-400" />
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
                {summary.completedServices}
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

      {/* Spending + History */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Total Spent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              Total Spent
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {formatPrice(summary.totalSpent)}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Based on completed services
            </p>

            <Button variant="outline" className="mt-4">
              <Link
                className="flex items-center justify-center gap-2"
                href="/customer/payments"
              >
                View Payments
                <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Service History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="size-5 text-primary" />
              Service History
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-2xl font-bold">
                  {summary.completedServices}
                </p>

                <p className="text-sm text-muted-foreground">Completed</p>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  {summary.cancelledServices}
                </p>

                <p className="text-sm text-muted-foreground">Cancelled</p>
              </div>
            </div>

            <Button variant="outline" className="mt-4">
              <Link
                className="flex items-center justify-center gap-2"
                href="/customer/service-requests"
              >
                View All Services
                <ArrowRight />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Service Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Service Requests</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest service requests.
            </p>
          </div>

          <Button variant="outline" size="sm">
            <Link
              className="flex items-center justify-center gap-2"
              href="/customer/service-requests"
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

              <h3 className="font-semibold">No service requests yet</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Create your first service request to get started.
              </p>

              <Button className="mt-4">
                <Link
                  className="flex items-center justify-center gap-2"
                  href="/customer/service-requests/create"
                >
                  <FilePlus2 />
                  Create Service Request
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentServices.map((service) => {
                const status = statusConfig2[service.status];

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
                        Technician: {service.technician?.name ?? "Not assigned"}
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
                        <Link href={`/customer/service-requests/${service.id}`}>
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
      <CustomerQuickAction />
    </div>
  );
}
