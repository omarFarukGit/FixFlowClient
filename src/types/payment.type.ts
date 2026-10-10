export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod = "STRIPE";

export interface IPayment {
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

export const statusConfig: Record<
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
