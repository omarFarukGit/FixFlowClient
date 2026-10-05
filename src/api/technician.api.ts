import apiClient from "@/lib/apiClient";

export function getMyServiceRequests() {
  return apiClient("service-requests/technician/my-services", {
    method: "GET",
  });
}
