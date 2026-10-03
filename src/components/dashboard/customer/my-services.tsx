"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCreateServiceRequestPayment,
  useGetServiceRequests,
} from "@/hooks/service.hook";
import { IServiceRequest, statusConfig } from "@/types/service.type";
import MyServicesSkeleton from "./customer-service-skeleton";

export default function MyServices() {
  const { data: servicesResponse, isLoading, error } = useGetServiceRequests();

  const services: IServiceRequest[] = servicesResponse?.data ?? [];

  if (isLoading) {
    return <MyServicesSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center">
          <p className="text-destructive text-sm">
            Failed to load your service requests.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!services.length) {
    return (
      <Card>
        <CardContent className="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
          <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
            <Wrench className="text-primary size-6" />
          </div>

          <div>
            <h3 className="font-semibold">No Service Requests</h3>

            <p className="text-muted-foreground mt-1 text-sm">
              You haven't created any service requests yet.
            </p>
          </div>

          <Link
            href="/customer/service-requests/create"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition"
          >
            Create Service Request
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Service Requests</CardTitle>

          <p className="text-muted-foreground mt-1 text-sm">
            Track your service requests and their current status.
          </p>
        </div>

        <Link
          href="/customer/service-requests"
          className="text-primary hidden items-center gap-1 text-sm font-medium sm:flex"
        >
          View All
          <ChevronRight className="size-4" />
        </Link>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <Link
          href="/customer/service-requests"
          className="text-primary mt-5 flex items-center justify-center gap-1 text-sm font-medium sm:hidden"
        >
          View All Services
          <ChevronRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

function ServiceCard({ service }: { service: IServiceRequest }) {
  const { mutate: createPayment, isPending } = useCreateServiceRequestPayment();

  const status = statusConfig[service.status] ?? {
    label: service.status,
    variant: "secondary" as const,
  };

  const scheduledDate = service.scheduledAt
    ? new Date(service.scheduledAt)
    : null;

  const isCompleted = service.status === "COMPLETED";
  const isPaid = service.payment?.status === "PAID";

  const serviceUrl = `/customer/service-requests/${service.id}`;

  const handlePayment = () => {
    createPayment(service.id, {
      onSuccess: (response) => {
        const paymentData = response.data;

        if (paymentData.checkoutUrl) {
          window.location.href = paymentData.checkoutUrl;
        }
      },

      onError: (error) => {
        console.error("Payment creation failed:", error);
      },
    });
  };

  return (
    <div className="group rounded-lg border transition-colors hover:bg-muted/50">
      <div className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Service Information */}
          <Link href={serviceUrl} className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-medium group-hover:text-primary">
                {service.title}
              </h3>

              <Badge variant={status.variant}>{status.label}</Badge>
            </div>

            {service.category?.name && (
              <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Wrench className="size-3.5" />
                {service.category.name}
              </p>
            )}

            <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {service.address && (
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5 shrink-0" />

                  {service.area
                    ? `${service.area}${service.city ? `, ${service.city}` : ""}`
                    : service.address}
                </span>
              )}

              {scheduledDate && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3.5" />
                  {scheduledDate.toLocaleDateString()}
                </span>
              )}
            </div>
          </Link>

          {/* Price + Payment */}
          <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
            <div className="flex items-center gap-3">
              {service.finalPrice != null ? (
                <div className="text-right">
                  <p className="text-muted-foreground text-xs">Final Price</p>

                  <p className="font-semibold">
                    ৳{service.finalPrice.toLocaleString()}
                  </p>
                </div>
              ) : service.estimatedPrice != null ? (
                <div className="text-right">
                  <p className="text-muted-foreground text-xs">Estimated</p>

                  <p className="font-semibold">
                    ৳{service.estimatedPrice.toLocaleString()}
                  </p>
                </div>
              ) : null}

              <Link
                href={serviceUrl}
                className="text-muted-foreground hover:text-primary"
                aria-label={`View ${service.title}`}
              >
                <ChevronRight className="size-5 transition-colors" />
              </Link>
            </div>

            {/* Payment */}
            {isPaid ? (
              <Badge variant="default">Paid</Badge>
            ) : isCompleted ? (
              <Button
                type="button"
                disabled={isPending}
                onClick={handlePayment}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-xs font-medium transition-colors"
              >
                {isPending ? "Processing..." : "Pay Now"}
              </Button>
            ) : (
              <Button
                type="button"
                disabled
                className="bg-muted text-muted-foreground inline-flex cursor-not-allowed items-center justify-center rounded-md px-4 py-2 text-xs font-medium opacity-70"
              >
                Pay Now
              </Button>
            )}
          </div>
        </div>

        {/* Technician */}
        {service.technician?.user?.name && (
          <div className="text-muted-foreground mt-3 flex items-center gap-1.5 border-t pt-3 text-xs">
            <Clock3 className="size-3.5" />

            <span>Technician:</span>

            <span className="text-foreground font-medium">
              {service.technician.user.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
