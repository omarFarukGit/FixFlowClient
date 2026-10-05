"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Search,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyServiceRequests } from "@/hooks";

const statusConfig = {
  ASSIGNED: {
    label: "Assigned",
    variant: "default" as const,
  },
  ACCEPTED: {
    label: "Accepted",
    variant: "secondary" as const,
  },
  IN_PROGRESS: {
    label: "In Progress",
    variant: "secondary" as const,
  },
};

type AssignedService = {
  id: string;
  title: string;
  status: keyof typeof statusConfig;
  scheduledAt?: string | null;
  finalPrice?: string | number | null;
  estimatedPrice?: string | number | null;
  address: string;
  area?: string | null;
  city?: string | null;
  category?: {
    name?: string | null;
  } | null;
  customer?: {
    name?: string | null;
    email?: string | null;
  } | null;
};

type StatusFilter = "ALL" | keyof typeof statusConfig;

const PAGE_SIZE = 10;

const formatPrice = (price?: string | number | null) => {
  if (price === null || price === undefined) {
    return "N/A";
  }

  return `৳${Number(price).toLocaleString("en-BD")}`;
};

const formatDate = (date?: string | null) => {
  if (!date) {
    return "Not scheduled";
  }

  return new Date(date).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date?: string | null) => {
  if (!date) {
    return "Not scheduled";
  }

  return new Date(date).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AssignedServices() {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetMyServiceRequests();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const allServices: AssignedService[] =
    response?.data?.data ?? [];

  const activeServices = useMemo(() => {
    return allServices.filter(
      (service) =>
        service.status === "ASSIGNED" ||
        service.status === "ACCEPTED" ||
        service.status === "IN_PROGRESS",
    );
  }, [allServices]);

  /**
   * Search + status filter
   */
  const filteredServices = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return activeServices.filter((service) => {
      const matchesStatus =
        statusFilter === "ALL" ||
        service.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!searchValue) {
        return true;
      }

      const searchableText = [
        service.title,
        service.id,
        service.address,
        service.area,
        service.city,
        service.category?.name,
        service.customer?.name,
        service.customer?.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchValue);
    });
  }, [activeServices, search, statusFilter]);

  /**
   * Pagination
   */
  const totalItems = filteredServices.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / PAGE_SIZE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedServices = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * PAGE_SIZE;

    return filteredServices.slice(
      startIndex,
      startIndex + PAGE_SIZE,
    );
  }, [filteredServices, safeCurrentPage]);

  const startItem =
    totalItems === 0
      ? 0
      : (safeCurrentPage - 1) * PAGE_SIZE + 1;

  const endItem = Math.min(
    safeCurrentPage * PAGE_SIZE,
    totalItems,
  );

  /**
   * Reset page when search/filter changes
   */
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1),
    );
  };

  const goToPage = (page: number) => {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages),
    );
  };

  /**
   * Summary counts
   */
  const assignedCount = activeServices.filter(
    (service) => service.status === "ASSIGNED",
  ).length;

  const acceptedCount = activeServices.filter(
    (service) => service.status === "ACCEPTED",
  ).length;

  const inProgressCount = activeServices.filter(
    (service) => service.status === "IN_PROGRESS",
  ).length;

  const summarySkeletons = [
    "assigned-count",
    "accepted-count",
    "in-progress-count",
  ];

  const serviceSkeletons = [
    "service-row-1",
    "service-row-2",
    "service-row-3",
    "service-row-4",
    "service-row-5",
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-52" />
          <Skeleton className="mt-2 h-4 w-80" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summarySkeletons.map((skeletonId) => (
            <Card key={skeletonId}>
              <CardContent className="p-5">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-2 h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="space-y-4 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>

            {serviceSkeletons.map((skeletonId) => (
              <Skeleton
                key={skeletonId}
                className="h-12 w-full"
              />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-48 items-center justify-center">
          <div className="text-center">
            <Wrench className="mx-auto mb-3 size-10 text-muted-foreground" />

            <h3 className="font-semibold">
              Failed to load assigned services
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
          Assigned Services
        </h1>

        <p className="text-sm text-muted-foreground">
          View and manage service requests currently
          assigned to you.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
              <Wrench className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Assigned
              </p>

              <p className="text-2xl font-bold">
                {assignedCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-500/10">
              <Clock className="size-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Accepted
              </p>

              <p className="text-2xl font-bold">
                {acceptedCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-orange-500/10">
              <Wrench className="size-5 text-orange-600" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                In Progress
              </p>

              <p className="text-2xl font-bold">
                {inProgressCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder="Search service, customer, category..."
                className="pl-9"
              />
            </div>

            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                handleStatusChange(
                  value as StatusFilter,
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  All Status
                </SelectItem>

                <SelectItem value="ASSIGNED">
                  Assigned
                </SelectItem>

                <SelectItem value="ACCEPTED">
                  Accepted
                </SelectItem>

                <SelectItem value="IN_PROGRESS">
                  In Progress
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredServices.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-56 flex-col items-center justify-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Wrench className="size-7 text-primary" />
            </div>

            <h3 className="font-semibold">
              {search || statusFilter !== "ALL"
                ? "No matching services"
                : "No assigned services"}
            </h3>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {search || statusFilter !== "ALL"
                ? "Try changing your search or filter."
                : "You currently don't have any active service requests assigned to you."}
            </p>

            {(search || statusFilter !== "ALL") && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("ALL");
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-xl border bg-card md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">
                      Service
                    </th>

                    <th className="px-4 py-3 text-left font-medium">
                      Customer
                    </th>

                    <th className="px-4 py-3 text-left font-medium">
                      Scheduled
                    </th>

                    <th className="px-4 py-3 text-left font-medium">
                      Price
                    </th>

                    <th className="px-4 py-3 text-left font-medium">
                      Status
                    </th>

                    <th className="px-4 py-3 text-right font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedServices.map((service) => {
                    const status =
                      statusConfig[service.status];

                    return (
                      <tr
                        key={service.id}
                        className="border-b last:border-0"
                      >
                        {/* Service */}
                        <td className="px-4 py-4">
                          <div className="max-w-56">
                            <p className="truncate font-medium">
                              {service.title}
                            </p>

                            <p className="mt-1 truncate text-xs text-muted-foreground">
                              {service.category?.name ??
                                "Service"}
                            </p>
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium">
                              {service.customer?.name ??
                                "Customer"}
                            </p>

                            {service.customer?.email && (
                              <p className="text-xs text-muted-foreground">
                                {service.customer.email}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Scheduled */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="size-4 text-muted-foreground" />

                            <span>
                              {formatDate(
                                service.scheduledAt,
                              )}
                            </span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-4 font-medium">
                          {formatPrice(
                            service.finalPrice ??
                              service.estimatedPrice,
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <Badge
                            variant={status.variant}
                          >
                            {status.label}
                          </Badge>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4 text-right">
                          <Button
                            
                            size="sm"
                            variant="outline"
                          >
                            <Link
                              href={`/technician/services/${service.id}`}
                            >
                              View
                              <ChevronRight className="size-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {paginatedServices.map((service) => {
              const status =
                statusConfig[service.status];

              return (
                <Card key={service.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <CardTitle className="truncate text-base">
                          {service.title}
                        </CardTitle>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {service.category?.name ??
                            "Service"}
                        </p>
                      </div>

                      <Badge
                        variant={status.variant}
                        className="shrink-0"
                      >
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Customer */}
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Customer
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {service.customer?.name ??
                          "Customer"}
                      </p>

                      {service.customer?.email && (
                        <p className="text-xs text-muted-foreground">
                          {service.customer.email}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Service Location
                        </p>

                        <p className="mt-1 text-sm">
                          {service.address}
                        </p>

                        {(service.area ||
                          service.city) && (
                          <p className="text-xs text-muted-foreground">
                            {[
                              service.area,
                              service.city,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-muted-foreground" />

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Scheduled
                        </p>

                        <p className="text-sm">
                          {formatDateTime(
                            service.scheduledAt,
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Price + Action */}
                    <div className="flex items-center justify-between border-t pt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Price
                        </p>

                        <p className="mt-1 font-semibold">
                          {formatPrice(
                            service.finalPrice ??
                              service.estimatedPrice,
                          )}
                        </p>
                      </div>

                      <Button  size="sm">
                        <Link
                          href={`/technician/services/${service.id}`}
                        >
                          View Details
                          <ChevronRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {startItem}
                </span>{" "}
                to{" "}
                <span className="font-medium text-foreground">
                  {endItem}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {totalItems}
                </span>{" "}
                services
              </p>

              <div className="flex items-center gap-1">
                {/* Previous */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={safeCurrentPage === 1}
                >
                  <ChevronLeft className="size-4" />
                  <span className="hidden sm:inline">
                    Previous
                  </span>
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => {
                    const isActive =
                      page === safeCurrentPage;

                    return (
                      <Button
                        key={page}
                        variant={
                          isActive
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="size-9 p-0"
                        onClick={() =>
                          goToPage(page)
                        }
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                {/* Next */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={
                    safeCurrentPage === totalPages
                  }
                >
                  <span className="hidden sm:inline">
                    Next
                  </span>
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


// services-requests/{id}/start
// services-requests/{id}/complete
// services-requests/{id}/accept

