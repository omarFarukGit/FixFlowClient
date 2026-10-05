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

export type TechnicianService = {
  id: string;
  title: string;
  status:
    | "PENDING"
    | "ASSIGNED"
    | "ACCEPTED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";
  finalPrice?: string | number | null;
  estimatedPrice?: string | number | null;
  scheduledAt?: string | null;
  category?: {
    id?: string;
    name?: string | null;
  } | null;
  customer?: {
    id?: string;
    name?: string | null;
    email?: string | null;
  } | null;
};

export const statusConfig3 = {
  ASSIGNED: {
    label: "Assigned",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  ACCEPTED: {
    label: "Accepted",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
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
  PENDING: {
    label: "Pending",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
};
