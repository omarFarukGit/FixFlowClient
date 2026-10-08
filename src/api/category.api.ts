import apiClient from "@/lib/apiClient";

export function createCategory(payload: any) {
  return apiClient("categories", {
    method: "POST",
    body: payload,
  });
}
