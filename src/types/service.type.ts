export interface ICategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CreateServiceRequestPayload {
  title: string;
  description: string;
  address: string;
  city: string;
  area: string;
  scheduledAt?: string;
  estimatedPrice?: number;
  categoryId: string;
}

export const statusConfig = {
  PENDING: {
    label: "Pending",
    variant: "secondary" as const,
  },
  ACCEPTED: {
    label: "Accepted",
    variant: "default" as const,
  },
  ASSIGNED: {
    label: "Assigned",
    variant: "default" as const,
  },
  IN_PROGRESS: {
    label: "In Progress",
    variant: "default" as const,
  },
  COMPLETED: {
    label: "Completed",
    variant: "default" as const,
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "destructive" as const,
  },
};
type ServiceStatus = keyof typeof statusConfig;

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED";

export interface IServiceRequest {
  id: string;
  title: string;
  description: string;
  address: string;
  city?: string;
  area?: string;
  scheduledAt?: string;
  estimatedPrice?: number;
  finalPrice?: number;
  status: ServiceStatus;

  payment?: {
    id: string;
    status: PaymentStatus;
  };

  category?: {
    id: string;
    name: string;
  };

  technician?: {
    id: string;
    user?: {
      name: string;
    };
  };

  createdAt: string;
}
