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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReviewModal from "./review-modal";
import { useState } from "react";
import PaymentListSkeleton from "./payment-skeletion";
import { IPayment, statusConfig } from "@/types/payment.type";



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
  const [reviewOpen, setReviewOpen] = useState(false);

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

          <div className=" flex justify-center items-center gap-2">
            <Badge variant={status.variant}>
              {payment.status === "PAID" && (
                <CheckCircle2 className="mr-1 size-3.5" />
              )}

              {status.label}
            </Badge>
            {payment.status === "PAID" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setReviewOpen(true)}
              >
                Give Review
              </Button>
            )}
          </div>
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
      <ReviewModal
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        serviceRequestId={payment.serviceRequestId}
      />
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


