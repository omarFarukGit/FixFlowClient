import apiClient from "@/lib/apiClient";

export function createCategory(payload: any) {
  return apiClient("/categories", {
    method: "POST",
    body: payload,
  });
}
export function updateCategory(id: string, payload: FormData) {
  return apiClient(`/categories/${id}`, {
    method: "PATCH",
    body: payload,
  });
}
export function deleteCategory(id: string) {
  return apiClient(`/categories/${id}`, {
    method: "DELETE",
  });
}
export function getAllCategories(payload: any) {
  return apiClient("/categories", {
    method: "GET",
    body: payload,
  });
}
