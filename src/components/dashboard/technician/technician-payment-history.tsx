"use client";

import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Receipt,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetPayments } from "@/hooks";

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED";

type TechnicianPayment = {
  id: string;
  amount: string | number;
  currency: string;
  status: PaymentStatus;
  method: string;
  transactionId?: string | null;
  serviceRequestId: string;
  createdAt: string;
  updatedAt: string;
  serviceRequest?: {
    id: string;
    title: string;
    status: string;
    finalPrice?: string | number | null;
  } | null;
};

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
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `${amount} ${currency}`;
  }

  return `${numericAmount.toLocaleString("en-BD")} ${currency}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TechnicianPaymentHistory() {
  const { data: response, isLoading, isError } = useGetPayments();

  /**
   * Supports:
   * response.data -> array
   * response.data.data -> paginated array
   */
  const payments: TechnicianPayment[] =
    response?.data?.data ?? response?.data ?? [];

  const paidPayments = payments.filter((payment) => payment.status === "PAID");

  const totalEarnings = paidPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0,
  );

  const pendingAmount = payments
    .filter((payment) => payment.status === "PENDING")
    .reduce((total, payment) => total + Number(payment.amount || 0), 0);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load payment history.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
        <p className="text-muted-foreground">
          View your service payment history and earnings.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <DollarSign className="size-5 text-green-600 dark:text-green-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-xl font-bold">
                {totalEarnings.toLocaleString("en-BD")} BDT
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
              <p className="text-sm text-muted-foreground">Paid Payments</p>
              <p className="text-xl font-bold">{paidPayments.length}</p>
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
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="size-5" />
            Payment History
          </CardTitle>
        </CardHeader>

        <CardContent>
          {payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Receipt className="mb-3 size-10 text-muted-foreground" />

              <h3 className="font-semibold">No payment history</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Your service payments will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Service</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Method</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {payments.map((payment) => {
                      const config = statusConfig[payment.status];

                      const StatusIcon = config.icon;

                      return (
                        <tr key={payment.id} className="border-b last:border-0">
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium">
                                {payment.serviceRequest?.title ??
                                  "Service Request"}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                ID: {payment.serviceRequestId.slice(0, 8)}
                                ...
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

                          <td className="px-4 py-4 text-right">
                            <Button asChild variant="outline" size="sm">
                              <Link
                                href={`/technician/services/${payment.serviceRequestId}`}
                              >
                                View Service
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="space-y-4 md:hidden">
                {payments.map((payment) => {
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

                        <Badge className={config.className} variant="outline">
                          <StatusIcon className="mr-1 size-3" />
                          {config.label}
                        </Badge>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-semibold">
                            {formatAmount(payment.amount, payment.currency)}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Method</p>
                          <p className="font-medium">{payment.method}</p>
                        </div>

                        <div>
                          <p className="text-muted-foreground">Date</p>

                          <div className="flex items-center gap-1">
                            <CalendarDays className="size-3.5 text-muted-foreground" />
                            <span>{formatDate(payment.createdAt)}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-muted-foreground">
                            Service Status
                          </p>
                          <p className="font-medium">
                            {payment.serviceRequest?.status ?? "N/A"}
                          </p>
                        </div>
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                      >
                        <Link
                          href={`/technician/services/${payment.serviceRequestId}`}
                        >
                          View Service
                        </Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
