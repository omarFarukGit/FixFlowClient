import apiClient from "@/lib/apiClient";

export function getMyServiceRequests() {
  return apiClient("service-requests/technician/my-services", {
    method: "GET",
  });
}

export const getServiceRequestById = async (serviceRequestId: string) => {
  return apiClient(`service-requests/${serviceRequestId}`, {
    method: "GET",
  });
};

export const acceptServiceRequest = async (serviceRequestId: string) => {
  return apiClient(`service-requests/${serviceRequestId}/accept`, {
    method: "PATCH",
  });
};

export const startServiceRequest = async (serviceRequestId: string) => {
  return apiClient(`service-requests/${serviceRequestId}/start`, {
    method: "PATCH",
  });
};

export const completeServiceRequest = async ({
  serviceRequestId,
  finalPrice,
}: {
  serviceRequestId: string;
  finalPrice: number;
}) => {
  return apiClient(`service-requests/${serviceRequestId}/complete`, {
    method: "PATCH",
    body: {
      finalPrice,
    },
  });
};

export interface UpdateTechnicianInfoPayload {
  bio: string;
  experienceYears: number;
  skills: string[];
  hourlyRate: number;
}

export const updateTechnicainInfo = async (
  payload: UpdateTechnicianInfoPayload,
) => {
  return apiClient("technicians/me/profile", {
    method: "PATCH",
    body: payload,
  });
};
