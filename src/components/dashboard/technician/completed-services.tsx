"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyServiceRequests } from "@/hooks";
import {
  CompletedService,
  formatDate,
  formatPrice,
  PAGE_SIZE,
} from "@/types/technician.type";

export default function CompletedServices() {
  const { data: response, isLoading, isError } = useGetMyServiceRequests();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const allServices: CompletedService[] = response?.data?.data ?? [];

  const completedServices = useMemo(() => {
    return allServices.filter((service) => service.status === "COMPLETED");
  }, [allServices]);

  /*
   * Search
   */
  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return completedServices;
    }

    return completedServices.filter((service) => {
      const searchableValues = [
        service.id,
        service.title,
        service.description,
        service.address,
        service.area,
        service.city,
        service.category?.name,
        service.customer?.name,
        service.customer?.email,
      ];

      return searchableValues
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [completedServices, search]);

  /*
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredServices.length / PAGE_SIZE),
  );

  const paginatedServices = filteredServices.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  /*
   * Summary
   */
  const totalCompleted = completedServices.length;

  const totalValue = completedServices.reduce(
    (total, service) =>
      total + Number(service.finalPrice ?? service.estimatedPrice ?? 0),
    0,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-56" />

          <Skeleton className="mt-2 h-4 w-80" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>

        <Skeleton className="h-14 w-full rounded-xl" />

        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  /*
   * Error
   */
  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-60 items-center justify-center">
          <div className="text-center">
            <CheckCircle2 className="mx-auto size-10 text-muted-foreground" />

            <h3 className="mt-3 font-semibold">
              Failed to load completed services
            </h3>

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
        <h1 className="text-2xl font-bold tracking-tight">
          Completed Services
        </h1>

        <p className="text-sm text-muted-foreground">
          View all services completed by you.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Completed</p>

                <p className="mt-2 text-2xl font-bold">{totalCompleted}</p>
              </div>

              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="size-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Service Value
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {formatPrice(totalValue)}
                </p>
              </div>

              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="size-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search completed services..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Completed Services</CardTitle>
        </CardHeader>

        <CardContent>
          {paginatedServices.length === 0 ? (
            <div className="py-16 text-center">
              <CheckCircle2 className="mx-auto size-10 text-muted-foreground" />

              <p className="mt-3 font-medium">No completed services found</p>

              <p className="mt-1 text-sm text-muted-foreground">
                {search
                  ? "Try a different search."
                  : "You have not completed any services yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 pr-4">Service</th>

                    <th className="pb-3 pr-4">Customer</th>

                    <th className="pb-3 pr-4">Location</th>

                    <th className="pb-3 pr-4">Completed</th>

                    <th className="pb-3 pr-4">Final Price</th>

                    <th className="pb-3 pr-4">Status</th>

                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedServices.map((service) => (
                    <tr key={service.id} className="border-b last:border-0">
                      {/* Service */}
                      <td className="py-4 pr-4">
                        <div>
                          <p className="font-medium">{service.title}</p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {service.category?.name ?? "Service"}
                          </p>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <UserRound className="size-4 text-muted-foreground" />

                          <div>
                            <p className="text-sm font-medium">
                              {service.customer?.name ?? "Customer"}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {service.customer?.email ?? ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-4 pr-4">
                        <div className="flex max-w-48 items-start gap-2">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                          <div>
                            <p className="text-sm">{service.address}</p>

                            {(service.area || service.city) && (
                              <p className="text-xs text-muted-foreground">
                                {[service.area, service.city]
                                  .filter(Boolean)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarDays className="size-4 text-muted-foreground" />

                          {formatDate(service.scheduledAt)}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 pr-4 font-semibold">
                        {formatPrice(service.finalPrice)}
                      </td>

                      {/* Status */}
                      <td className="py-4 pr-4">
                        <Badge>
                          <CheckCircle2 />
                          Completed
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="py-4 text-right">
                        <Button variant="outline" size="sm">
                          <Link
                            className="flex justify-center items-center gap-2"
                            href={`/technician/services/${service.id}`}
                          >
                            View
                            <ChevronRight />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {paginatedServices.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <CheckCircle2 className="mx-auto size-10 text-muted-foreground" />

              <p className="mt-3 font-medium">No completed services found</p>

              <p className="mt-1 text-sm text-muted-foreground">
                {search
                  ? "Try a different search."
                  : "You have not completed any services yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          paginatedServices.map((service) => (
            <Card key={service.id}>
              <CardContent className="space-y-4 p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{service.title}</h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {service.category?.name ?? "Service"}
                    </p>
                  </div>

                  <Badge className="shrink-0">
                    <CheckCircle2 />
                    Completed
                  </Badge>
                </div>

                {/* Customer */}
                <div className="flex items-center gap-3 text-sm">
                  <UserRound className="size-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="font-medium">
                      {service.customer?.name ?? "Customer"}
                    </p>

                    {service.customer?.email && (
                      <p className="text-xs text-muted-foreground">
                        {service.customer.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p>{service.address}</p>

                    {(service.area || service.city) && (
                      <p className="text-xs text-muted-foreground">
                        {[service.area, service.city]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays className="size-4 shrink-0 text-muted-foreground" />

                  <span>{formatDate(service.scheduledAt)}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Final Price</p>

                    <p className="font-semibold">
                      {formatPrice(service.finalPrice)}
                    </p>
                  </div>

                  <Button size="sm">
                    <Link
                      className="flex justify-center items-center gap-2"
                      href={`/technician/services/${service.id}`}
                    >
                      View
                      <ChevronRight />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredServices.length > 0 && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
