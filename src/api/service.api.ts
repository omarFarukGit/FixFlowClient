import apiClient from "@/lib/apiClient";
import { CreateServiceRequestPayload } from "@/types/service.type";

export function getCategories() {
  return apiClient("/categories");
}

export const createServiceRequest = async (
  payload: CreateServiceRequestPayload,
) => {
  return apiClient("/service-requests", {
    method: "POST",
    body: payload,
  });
};

export const getServiceRequests = async () => {
  return apiClient("/service-requests");
};
