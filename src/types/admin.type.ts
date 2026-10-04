export const statusConfig = {
  PENDING: { label: "Pending", variant: "secondary" as const },
  ASSIGNED: { label: "Assigned", variant: "outline" as const },
  ACCEPTED: { label: "Accepted", variant: "default" as const },
  IN_PROGRESS: { label: "In Progress", variant: "default" as const },
  COMPLETED: { label: "Completed", variant: "default" as const },
  CANCELLED: { label: "Cancelled", variant: "destructive" as const },
};

export type ServiceStatus = keyof typeof statusConfig;

export interface IServiceRequest {
  id: string;
  title: string;
  description?: string;
  address: string;
  city?: string;
  area?: string;
  scheduledAt?: string;
  estimatedPrice?: number | string;
  finalPrice?: number | string;
  status: ServiceStatus;
  createdAt: string;
  category?: {
    id: string;
    name: string;
  };
  customer?: {
    id: string;
    name: string;
    email?: string;
  };
  user?: {
    id: string;
    name: string;
    email?: string;
  };
  technician?: {
    id: string;
    user?: {
      name: string;
    };
  };
}
