export const PAGE_SIZE = 10;

export type TechnicianReview = {
  id: string;
  rating: number;
  comment?: string | null;
  serviceRequestId: string;
  reviewerId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;

  reviewer?: {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    imageUrl?: string | null;
  } | null;

  serviceRequest?: {
    id: string;
    title: string;
    status: string;
    finalPrice?: string | number | null;
  } | null;
};

export type ReviewsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TechnicianReview[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatPrice = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return `৳${Number(value).toLocaleString("en-BD")}`;
};

export type CustomerReview = {
  id: string;
  rating: number;
  comment?: string | null;
  serviceRequestId: string;
  reviewerId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;

  technician?: {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    imageUrl?: string | null;

    technicianProfile?: {
      bio?: string | null;
      experienceYears?: number;
      averageRating?: number;
      totalJobs?: number;
    } | null;
  } | null;

  serviceRequest?: {
    id: string;
    title: string;
    status: string;
    finalPrice?: string | number | null;
  } | null;
};

export type AdminReview = {
  id: string;
  rating: number;
  comment?: string | null;
  serviceRequestId: string;
  reviewerId: string;
  technicianId: string;
  createdAt: string;
  updatedAt: string;

  reviewer?: {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    imageUrl?: string | null;
  } | null;

  technician?: {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
    imageUrl?: string | null;
    technicianProfile?: {
      averageRating?: number;
      experienceYears?: number;
      totalJobs?: number;
    } | null;
  } | null;

  serviceRequest?: {
    id: string;
    title: string;
    status: string;
    finalPrice?: string | number | null;
  } | null;
};

export const getRatingLabel = (rating: number) => {
  if (rating === 5) return "Excellent";
  if (rating === 4) return "Very Good";
  if (rating === 3) return "Good";
  if (rating === 2) return "Fair";
  return "Poor";
};

export const getStatusVariant = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "CANCELLED":
      return "destructive";
    case "IN_PROGRESS":
      return "secondary";
    default:
      return "outline";
  }
};
