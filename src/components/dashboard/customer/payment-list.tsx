"use client";

import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Receipt,
  ReceiptText,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPayments } from "@/hooks";

// তোমার actual hook এখানে import করবে

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED";

type PaymentMethod = "STRIPE";

interface IPayment {
  id: string;
  amount: string;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  stripeSessionId?: string;
  serviceRequestId: string;
  createdAt: string;
  updatedAt: string;

  serviceRequest: {
    id: string;
    title: string;
    status: string;
    finalPrice: string;
  };
}

const statusConfig: Record<
  PaymentStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive";
  }
> = {
  PAID: {
    label: "Paid",
    variant: "default",
  },
  PENDING: {
    label: "Pending",
    variant: "secondary",
  },
  FAILED: {
    label: "Failed",
    variant: "destructive",
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "destructive",
  },
  REFUNDED: {
    label: "Refunded",
    variant: "secondary",
  },
};

export default function PaymentList() {
  const { data: paymentsResponse, isLoading, error } = useGetPayments();

  const payments: IPayment[] = paymentsResponse?.data?.data ?? [];

  if (isLoading) {
    return <PaymentListSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center">
          <p className="text-destructive text-sm">
            Failed to load payment history.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!payments.length) {
    return (
      <Card>
        <CardContent className="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
          <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
            <Receipt className="text-primary size-6" />
          </div>

          <div>
            <h3 className="font-semibold">No Payments Found</h3>

            <p className="text-muted-foreground mt-1 text-sm">
              You haven't made any payments yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </div>
  );
}

function PaymentCard({ payment }: { payment: IPayment }) {
  const status = statusConfig[payment.status];

  const amount = Number(payment.amount);

  const createdDate = new Date(payment.createdAt);

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
              <ReceiptText className="text-primary size-5" />
            </div>

            <div className="min-w-0">
              <CardTitle className="truncate text-base">
                {payment.serviceRequest.title}
              </CardTitle>

              <p className="text-muted-foreground mt-1 text-xs">
                Service Request
              </p>
            </div>
          </div>

          <Badge variant={status.variant}>
            {payment.status === "PAID" && (
              <CheckCircle2 className="mr-1 size-3.5" />
            )}

            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Amount */}
          <PaymentInfo
            icon={<CreditCard className="size-4" />}
            label="Amount"
            value={`৳${amount.toLocaleString()} ${payment.currency}`}
          />

          {/* Payment Method */}
          <PaymentInfo
            icon={<CreditCard className="size-4" />}
            label="Payment Method"
            value={payment.method}
          />

          {/* Service Status */}
          <PaymentInfo
            icon={<CheckCircle2 className="size-4" />}
            label="Service Status"
            value={payment.serviceRequest.status}
          />

          {/* Date */}
          <PaymentInfo
            icon={<CalendarDays className="size-4" />}
            label="Payment Date"
            value={createdDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          />
        </div>

        {/* Transaction ID */}
        {payment.transactionId && (
          <div className="bg-muted/40 mt-5 rounded-lg p-3">
            <p className="text-muted-foreground text-xs">Transaction ID</p>

            <p className="mt-1 break-all font-mono text-xs">
              {payment.transactionId}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PaymentInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-muted-foreground mt-0.5">{icon}</div>

      <div className="min-w-0">
        <p className="text-muted-foreground text-xs">{label}</p>

        <p className="mt-0.5 truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function PaymentListSkeleton() {
  return (
    <div className="space-y-4">
      {["payment-1", "payment-2", "payment-3"].map((id) => (
        <Card key={id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3 w-24" />
              </div>

              <Skeleton className="h-6 w-16" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {["a", "b", "c", "d"].map((item) => (
                <div key={item} className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>

            <Skeleton className="mt-5 h-12 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
