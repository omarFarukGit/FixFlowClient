"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAllServicesRequests } from "@/hooks";
import { IServiceRequest, ServiceStatus, statusConfig } from "@/types";

import AdminServiceRequestsSkeleton from "./admin-service-skeleton";
import TechnicianAssignModal from "./technician-assign-modal";

const filters = [
  { label: "All Requests", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Assigned", value: "ASSIGNED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const PAGE_SIZE = 10;

export default function AdminServiceRequests() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetAllServicesRequests();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Technician assign modal
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedServiceRequestId, setSelectedServiceRequestId] = useState<
    string | null
  >(null);
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<
    string | null
  >(null);

  // Supports both direct array and paginated API response
  const requests: IServiceRequest[] = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response?.data?.data)
      ? response.data.data
      : [];

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "ALL" || request.status === statusFilter;

      const customerName = request.customer?.name ?? request.user?.name ?? "";

      const searchableValues = [
        request.title,
        request.id,
        request.description,
        request.category?.name,
        customerName,
        request.customer?.email,
        request.user?.email,
        request.technician?.user?.name,
        request.address,
        request.city,
        request.area,
      ];

      const matchesSearch =
        !query ||
        searchableValues.some((value) => value?.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [requests, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / PAGE_SIZE),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const resetPage = () => {
    setPage(1);
  };

  const openAssignModal = (request: IServiceRequest) => {
    setSelectedServiceRequestId(request.id);

    // If technician already assigned, keep current technician ID
    // Otherwise null; admin will select one from modal.
    setSelectedTechnicianId(request.technician?.id ?? null);

    setAssignModalOpen(true);
  };

  const closeAssignModal = (open: boolean) => {
    setAssignModalOpen(open);

    if (!open) {
      setSelectedServiceRequestId(null);
      setSelectedTechnicianId(null);
    }
  };

  if (isLoading) {
    return <AdminServiceRequestsSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
          <p className="font-medium text-destructive">
            Failed to load service requests.
          </p>

          <Button variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Service Requests
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor customer requests and track service progress.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit px-3 py-1">
          {filteredRequests.length} Requests
        </Badge>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard title="Total Requests" value={requests.length} />

        <SummaryCard
          title="Pending"
          value={requests.filter((item) => item.status === "PENDING").length}
        />

        <SummaryCard
          title="In Progress"
          value={
            requests.filter((item) => item.status === "IN_PROGRESS").length
          }
        />

        <SummaryCard
          title="Completed"
          value={requests.filter((item) => item.status === "COMPLETED").length}
        />
      </div>

      {/* Search and filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Service Requests</CardTitle>

          <CardDescription>
            Search requests or filter by their current status.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search title, customer, category, location..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  resetPage();
                }}
                className="pl-9"
              />
            </div>

            {/* Status filter */}
            <select
              aria-label="Filter by service request status"
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                resetPage();
              }}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring md:w-48"
            >
              {filters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          {/* Empty state */}
          {filteredRequests.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center text-center">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                <Wrench className="size-6 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">No service requests found</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or status filter.
              </p>

              {(search || statusFilter !== "ALL") && (
                <Button
                  variant="link"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("ALL");
                    resetPage();
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto rounded-lg border md:block">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b text-left">
                      <th className="px-4 py-3 font-medium">Service</th>
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Technician</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="border-b last:border-0 hover:bg-muted/30"
                      >
                        {/* Service */}
                        <td className="max-w-64 px-4 py-4">
                          <p className="truncate font-medium">
                            {request.title}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {request.category?.name ?? "Uncategorized"}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3 shrink-0" />

                            <span className="truncate">
                              {request.area
                                ? `${request.area}, ${request.city ?? ""}`
                                : request.address}
                            </span>
                          </p>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-4">
                          <p className="font-medium">
                            {request.customer?.name ??
                              request.user?.name ??
                              "—"}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {request.customer?.email ??
                              request.user?.email ??
                              ""}
                          </p>
                        </td>

                        {/* Technician */}
                        <td className="px-4 py-4">
                          {request.technician?.user?.name ? (
                            <div className="space-y-2">
                              <p className="font-medium">
                                {request.technician.user.name}
                              </p>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openAssignModal(request)}
                              >
                                <Wrench className="size-4" />
                                Reassign
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => openAssignModal(request)}
                              disabled={request.status !== "PENDING"}
                            >
                              <Wrench className="size-4" />
                              {request.status === "PENDING"
                                ? "Assign"
                                : "Assigned"}
                            </Button>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <RequestStatus status={request.status} />
                        </td>

                        {/* Price */}
                        <td className="whitespace-nowrap px-4 py-4">
                          {formatPrice(
                            request.finalPrice ?? request.estimatedPrice,
                          )}
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4 text-right">
                          <Button variant="outline" size="sm">
                            <Link
                              href={`/admin/service-requests/${request.id}`}
                            >
                              View Details
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 md:hidden">
                {paginatedRequests.map((request) => (
                  <div
                    key={request.id}
                    className="space-y-3 rounded-lg border p-4"
                  >
                    {/* Title */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {request.title}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {request.category?.name ?? "Uncategorized"}
                        </p>
                      </div>

                      <RequestStatus status={request.status} />
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        Customer:{" "}
                        <span className="text-foreground">
                          {request.customer?.name ?? request.user?.name ?? "—"}
                        </span>
                      </p>

                      <p>
                        Technician:{" "}
                        <span className="text-foreground">
                          {request.technician?.user?.name ?? "Not assigned"}
                        </span>
                      </p>

                      <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5 size-4 shrink-0" />

                        <span>
                          {request.area
                            ? `${request.area}, ${request.city ?? ""}`
                            : request.address}
                        </span>
                      </p>

                      {request.scheduledAt && (
                        <p className="flex items-center gap-2">
                          <CalendarDays className="size-4 shrink-0" />

                          {new Date(request.scheduledAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* Price + actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                      <span className="font-semibold">
                        {formatPrice(
                          request.finalPrice ?? request.estimatedPrice,
                        )}
                      </span>

                      <div className="flex gap-2">
                        {/* Assign / Reassign */}
                        <Button
                          size="sm"
                          variant={request.technician ? "outline" : "default"}
                          onClick={() => openAssignModal(request)}
                        >
                          <Wrench className="size-4" />

                          {request.technician ? "Reassign" : "Assign"}
                        </Button>

                        {/* View */}
                        <Button variant="outline" size="sm">
                          <Link href={`/admin/service-requests/${request.id}`}>
                            View
                            <ChevronRight className="ml-1 size-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(currentPage * PAGE_SIZE, filteredRequests.length)}{" "}
                  of {filteredRequests.length} requests
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>

                  <span className="text-sm text-muted-foreground">
                    {currentPage} / {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Technician Assign Modal */}
      {selectedServiceRequestId && (
        <TechnicianAssignModal
          open={assignModalOpen}
          onOpenChange={closeAssignModal}
          serviceRequestId={selectedServiceRequestId}
          currentTechnicianId={selectedTechnicianId}
          onSuccess={() => {
            refetch();
          }}
        />
      )}
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <p className="text-xs text-muted-foreground sm:text-sm">{title}</p>

        <p className="mt-2 text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function RequestStatus({ status }: { status: ServiceStatus }) {
  const config = statusConfig[status];

  return (
    <Badge variant={config?.variant ?? "secondary"}>
      {config?.label ?? status}
    </Badge>
  );
}

function formatPrice(value?: number | string) {
  if (value === undefined || value === null || value === "") {
    return "—";
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "—";
  }

  return `৳${amount.toLocaleString("en-BD")}`;
}
