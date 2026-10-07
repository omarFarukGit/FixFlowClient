"use client";

import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Receipt,
  Search,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllPayments, useGetPayments } from "@/hooks";

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED";

type AdminPayment = {
  id: string;
  amount: string | number;
  currency: string;
  status: PaymentStatus;
  method: string;
  transactionId?: string | null;
  stripeSessionId?: string | null;
  serviceRequestId: string;
  createdAt: string;
  updatedAt: string;

  serviceRequest?: {
    id: string;
    title: string;
    status: string;
    finalPrice?: string | number | null;

    customer?: {
      id: string;
      name: string;
      email: string;
      phone?: string | null;
    } | null;

    technician?: {
      id: string;
      name: string;
      email: string;
    } | null;
  } | null;
};

type PaymentResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data:
    | AdminPayment[]
    | {
        data: AdminPayment[];
        meta?: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      };
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const PAGE_SIZE = 10;

const statusConfig: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
    icon: typeof CheckCircle2;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: Receipt,
  },
  PAID: {
    label: "Paid",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icon: CheckCircle2,
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: XCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    icon: XCircle,
  },
  REFUNDED: {
    label: "Refunded",
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    icon: Receipt,
  },
};

function formatAmount(amount: string | number, currency: string) {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return `${amount} ${currency}`;
  }

  return `${value.toLocaleString("en-BD")} ${currency}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | PaymentStatus>(
    "ALL",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading, isError } = useGetAllPayments();

  const apiResponse = response as PaymentResponse | undefined;

  const payments = useMemo(() => {
    if (!apiResponse?.data) {
      return [];
    }

    if (Array.isArray(apiResponse.data)) {
      return apiResponse.data;
    }

    return apiResponse.data.data ?? [];
  }, [apiResponse]);

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesStatus =
        statusFilter === "ALL" || payment.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const serviceTitle = payment.serviceRequest?.title ?? "";

      const customerName = payment.serviceRequest?.customer?.name ?? "";

      const customerEmail = payment.serviceRequest?.customer?.email ?? "";

      const technicianName = payment.serviceRequest?.technician?.name ?? "";

      return [
        payment.id,
        payment.serviceRequestId,
        payment.transactionId ?? "",
        payment.method,
        serviceTitle,
        customerName,
        customerEmail,
        technicianName,
      ].some((value) => value.toLowerCase().includes(normalizedSearch));
    });
  }, [payments, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayments.length / PAGE_SIZE),
  );

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    return filteredPayments.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredPayments, currentPage]);

  const totalRevenue = payments
    .filter((payment) => payment.status === "PAID")
    .reduce((total, payment) => total + Number(payment.amount || 0), 0);

  const pendingAmount = payments
    .filter((payment) => payment.status === "PENDING")
    .reduce((total, payment) => total + Number(payment.amount || 0), 0);

  const failedPayments = payments.filter(
    (payment) => payment.status === "FAILED" || payment.status === "CANCELLED",
  ).length;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: "ALL" | PaymentStatus) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-destructive">Failed to load payments.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Payments</h1>

        <p className="text-muted-foreground">
          Manage and monitor all customer payments.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <DollarSign className="size-5 text-green-600 dark:text-green-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>

              <p className="text-xl font-bold">
                {totalRevenue.toLocaleString("en-BD")} BDT
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <CreditCard className="size-5 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Payments</p>

              <p className="text-xl font-bold">{payments.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
              <Receipt className="size-5 text-yellow-600 dark:text-yellow-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Pending Amount</p>

              <p className="text-xl font-bold">
                {pendingAmount.toLocaleString("en-BD")} BDT
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <XCircle className="size-5 text-red-600 dark:text-red-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Failed / Cancelled
              </p>

              <p className="text-xl font-bold">{failedPayments}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="size-5" />
              Payment Transactions
            </CardTitle>

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search payments..."
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "PAID", "PENDING", "FAILED", "CANCELLED", "REFUNDED"].map(
              (status) => (
                <Button
                  key={status}
                  type="button"
                  size="sm"
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() =>
                    handleStatusChange(status as "ALL" | PaymentStatus)
                  }
                >
                  {status === "ALL"
                    ? "All"
                    : status.charAt(0) + status.slice(1).toLowerCase()}
                </Button>
              ),
            )}
          </div>

          {filteredPayments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Receipt className="mb-3 size-10 text-muted-foreground" />

              <h3 className="font-semibold">No payments found</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Service</th>

                      <th className="px-4 py-3 font-medium">Customer</th>

                      <th className="px-4 py-3 font-medium">Technician</th>

                      <th className="px-4 py-3 font-medium">Amount</th>

                      <th className="px-4 py-3 font-medium">Method</th>

                      <th className="px-4 py-3 font-medium">Status</th>

                      <th className="px-4 py-3 font-medium">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedPayments.map((payment) => {
                      const config = statusConfig[payment.status];

                      const StatusIcon = config.icon;

                      return (
                        <tr key={payment.id} className="border-b last:border-0">
                          <td className="px-4 py-4">
                            <div>
                              <p className="max-w-[180px] truncate font-medium">
                                {payment.serviceRequest?.title ??
                                  "Service Request"}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {payment.serviceRequestId.slice(0, 8)}
                                ...
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium">
                                {payment.serviceRequest?.customer?.name ??
                                  "N/A"}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {payment.serviceRequest?.customer?.email ??
                                  "N/A"}
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium">
                                {payment.serviceRequest?.technician?.name ??
                                  "Not assigned"}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {payment.serviceRequest?.technician?.email ??
                                  ""}
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-4 font-semibold">
                            {formatAmount(payment.amount, payment.currency)}
                          </td>

                          <td className="px-4 py-4">
                            <Badge variant="outline">{payment.method}</Badge>
                          </td>

                          <td className="px-4 py-4">
                            <Badge className={config.className}>
                              <StatusIcon className="mr-1 size-3" />
                              {config.label}
                            </Badge>
                          </td>

                          <td className="px-4 py-4 text-sm text-muted-foreground">
                            {formatDate(payment.createdAt)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 md:hidden">
                {paginatedPayments.map((payment) => {
                  const config = statusConfig[payment.status];

                  const StatusIcon = config.icon;

                  return (
                    <div key={payment.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold">
                            {payment.serviceRequest?.title ?? "Service Request"}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Payment ID: {payment.id.slice(0, 8)}...
                          </p>
                        </div>

                        <Badge className={config.className}>
                          <StatusIcon className="mr-1 size-3" />
                          {config.label}
                        </Badge>
                      </div>

                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">
                            Customer
                          </span>

                          <span className="text-right font-medium">
                            {payment.serviceRequest?.customer?.name ?? "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">
                            Technician
                          </span>

                          <span className="text-right font-medium">
                            {payment.serviceRequest?.technician?.name ??
                              "Not assigned"}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Amount</span>

                          <span className="font-semibold">
                            {formatAmount(payment.amount, payment.currency)}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Method</span>

                          <Badge variant="outline">{payment.method}</Badge>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Date</span>

                          <span className="flex items-center gap-1">
                            <CalendarDays className="size-3.5" />
                            {formatDate(payment.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {Math.min(
                    (currentPage - 1) * PAGE_SIZE + 1,
                    filteredPayments.length,
                  )}{" "}
                  to{" "}
                  {Math.min(currentPage * PAGE_SIZE, filteredPayments.length)}{" "}
                  of {filteredPayments.length} payments
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                  >
                    Previous
                  </Button>

                  <span className="min-w-20 text-center text-sm">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
