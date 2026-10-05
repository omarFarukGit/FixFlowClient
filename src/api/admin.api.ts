import apiClient from "@/lib/apiClient";

export function getAllServicesRequest() {
  return apiClient("/service-requests/admin", { method: "GET" });
}

export function getAllThecnicians() {
  return apiClient("/users/technicians", { method: "GET" });
}
export function getAllCustomers() {
  return apiClient("/users/customers", { method: "GET" });
}

//http://localhost:5000/api/v1/users/technicians

export function assignTechnicianToServiceRequest(
  serviceRequestId: string,
  technicianId: string,
) {
  return apiClient(`/service-requests/${serviceRequestId}/assign`, {
    method: "PATCH",
    body: { technicianId },
  });
}
export function approveTechnician(technicianId: string) {
  return apiClient(`/technicians/${technicianId}/approve`, {
    method: "PATCH",
  });
}
export function updateTechnicianStatus(technicianId: string, status: string) {
  return apiClient(`/technicians/${technicianId}/status`, {
    method: "PATCH",
    body: { status },
  });
}
