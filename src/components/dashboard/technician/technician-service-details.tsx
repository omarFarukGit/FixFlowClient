"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetServiceRequestById } from "@/hooks";

import ServiceStatusActions from "./service-status-actions";

type ServiceStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

interface TechnicianServiceDetailsProps {
  serviceRequestId: string;
}

const statusConfig: Record<
  ServiceStatus,
  {
    label: string;
    variant:
      | "default"
      | "secondary"
      | "destructive";
  }
> = {
  PENDING: {
    label: "Pending",
    variant: "secondary",
  },

  ASSIGNED: {
    label: "Assigned",
    variant: "default",
  },

  ACCEPTED: {
    label: "Accepted",
    variant: "secondary",
  },

  IN_PROGRESS: {
    label: "In Progress",
    variant: "secondary",
  },

  COMPLETED: {
    label: "Completed",
    variant: "default",
  },

  CANCELLED: {
    label: "Cancelled",
    variant: "destructive",
  },
};

const formatPrice = (
  price?: string | number | null,
) => {
  if (
    price === null ||
    price === undefined
  ) {
    return "N/A";
  }

  return `৳${Number(price).toLocaleString(
    "en-BD",
  )}`;
};

const formatDateTime = (
  date?: string | null,
) => {
  if (!date) {
    return "Not scheduled";
  }

  return new Date(date).toLocaleString(
    "en-BD",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
};

export default function TechnicianServiceDetails({
  serviceRequestId,
}: TechnicianServiceDetailsProps) {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetServiceRequestById(
    serviceRequestId,
  );

  const service = response?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-48" />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="space-y-6 p-6">
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-5 w-52" />
              <Skeleton className="h-5 w-64" />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-52" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-9 w-28" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <Card>
        <CardContent className="flex min-h-56 items-center justify-center">
          <div className="text-center">
            <Wrench className="mx-auto mb-3 size-10 text-muted-foreground" />

            <h3 className="font-semibold">
              Failed to load service
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              This service request could not be found.
            </p>

            <Button
              className="mt-4 flex gap-2"
            >
              <Link href="/technician/services">
                Back to Services
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStatus =
    statusConfig[
      service.status as ServiceStatus
    ] ?? statusConfig.PENDING;

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button
        variant="ghost"
        className="-ml-2 "
      >
        <Link href="/technician/services" className="flex gap-2 justify-center items-center">
          <ArrowLeft />
          Back to Services
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {service.title}
            </h1>

            <Badge
              variant={currentStatus.variant}
            >
              {currentStatus.label}
            </Badge>
          </div>

          <p className="mt-1 break-all text-sm text-muted-foreground">
            Service Request ID: {service.id}
          </p>
        </div>

        <ServiceStatusActions
          serviceRequestId={service.id}
          status={service.status}
          onSuccess={refetch}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 lg:col-span-2">
          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="size-5 text-primary" />
                Service Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Category
                </p>

                <p className="mt-1 font-medium">
                  {service.category?.name ??
                    "Service"}
                </p>
              </div>

              {service.description && (
                <>
                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Description
                    </p>

                    <p className="mt-1 whitespace-pre-wrap leading-6">
                      {service.description}
                    </p>
                  </div>
                </>
              )}

              <Separator />

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Scheduled At
                    </p>

                    <p className="mt-1 font-medium">
                      {formatDateTime(
                        service.scheduledAt,
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Created At
                    </p>

                    <p className="mt-1 font-medium">
                      {formatDateTime(
                        service.createdAt,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                Service Location
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="font-medium">
                {service.address}
              </p>

              {(service.area ||
                service.city) && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {[
                    service.area,
                    service.city,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-5 text-primary" />
                Customer
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="font-medium">
                {service.customer?.name ??
                  "Customer"}
              </p>

              {service.customer?.email && (
                <p className="text-sm text-muted-foreground">
                  {service.customer.email}
                </p>
              )}

              {service.customer?.phone && (
                <p className="text-sm text-muted-foreground">
                  {service.customer.phone}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Price */}
          <Card>
            <CardHeader>
              <CardTitle>
                Service Price
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">
                {formatPrice(
                  service.finalPrice ??
                    service.estimatedPrice,
                )}
              </p>

              {service.finalPrice !== null &&
                service.finalPrice !==
                  undefined && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Final Price
                  </p>
                )}

              {!service.finalPrice &&
                service.estimatedPrice && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Estimated Price
                  </p>
                )}
            </CardContent>
          </Card>

          {/* Completed */}
          {service.status ===
            "COMPLETED" && (
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <CheckCircle2 className="size-6 shrink-0 text-green-600" />

                <div>
                  <p className="font-semibold">
                    Service Completed
                  </p>

                  <p className="text-sm text-muted-foreground">
                    This service has been completed.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}