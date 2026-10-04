import apiClient from "@/lib/apiClient";

export function getAllServicesRequest() {
  return apiClient("/service-requests/admin", { method: "GET" });
}

export function getAllThecnicians() {
  return apiClient("/technicians", { method: "GET" });
}

export function assignTechnicianToServiceRequest(
  serviceRequestId: string,
  technicianId: string,
) {
  return apiClient(`/service-requests/${serviceRequestId}/assign`, {
    method: "PATCH",
    body: technicianId,
  });
}
