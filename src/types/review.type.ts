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
