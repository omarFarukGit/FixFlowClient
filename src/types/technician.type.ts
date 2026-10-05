export const statusConfig = {
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

export type AssignedService = {
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

export type StatusFilter = "ALL" | keyof typeof statusConfig;

export const PAGE_SIZE = 10;

export const formatPrice = (price?: string | number | null) => {
  if (price === null || price === undefined) {
    return "N/A";
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

export const formatDateTime = (date?: string | null) => {
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

type ServiceStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface TechnicianServiceDetailsProps {
  serviceRequestId: string;
}

export const statusConfig2: Record<
  ServiceStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive";
  }
> = {
  PENDING: {
    label: "Pending",
    variant: "secondary",
  },

  ASSIGNED: {
    label: "Assigned",
    variant: "default",
  },

  ACCEPTED: {
    label: "Accepted",
    variant: "secondary",
  },

  IN_PROGRESS: {
    label: "In Progress",
    variant: "secondary",
  },

  COMPLETED: {
    label: "Completed",
    variant: "default",
  },

  CANCELLED: {
    label: "Cancelled",
    variant: "destructive",
  },
};

export type CompletedService = {
  id: string;
  title: string;
  description?: string | null;
  status: "COMPLETED";
  scheduledAt?: string | null;
  finalPrice?: string | number | null;
  estimatedPrice?: string | number | null;
  address: string;
  area?: string | null;
  city?: string | null;

  category?: {
    id?: string;
    name?: string | null;
  } | null;

  customer?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    imageUrl?: string | null;
  } | null;

  technician?: {
    id?: string;
    name?: string | null;
  } | null;
};
