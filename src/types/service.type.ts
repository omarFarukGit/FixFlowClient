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

type ServiceStatus2 =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type CustomerService = {
  id: string;
  title: string;
  description?: string | null;
  status: ServiceStatus;
  estimatedPrice?: string | number | null;
  finalPrice?: string | number | null;
  scheduledAt?: string | null;
  createdAt?: string | null;

  category?: {
    id?: string;
    name?: string | null;
  } | null;

  technician?: {
    id?: string;
    name?: string | null;
  } | null;
};

type CustomerOverviewSummary = {
  totalRequests: number;
  pendingRequests: number;
  assignedServices: number;
  acceptedServices: number;
  inProgressServices: number;
  activeServices: number;
  completedServices: number;
  cancelledServices: number;
  totalSpent: number;
};

export type CustomerServiceRequestsResponse = {
  success: boolean;
  statusCode: number;
  message: string;

  data: CustomerService[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  summary: CustomerOverviewSummary;
};

export const statusConfig2: Record<
  ServiceStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  },

  ASSIGNED: {
    label: "Assigned",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },

  ACCEPTED: {
    label: "Accepted",
    className:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  },

  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },

  COMPLETED: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },

  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
};

export const formatPrice = (price?: string | number | null) => {
  if (price === null || price === undefined || price === "") {
    return "৳0";
  }

  return `৳${Number(price).toLocaleString("en-BD")}`;
};

export const formatDate = (date?: string | null) => {
  if (!date) {
    return "Not scheduled";
  }

  return new Date(date).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
