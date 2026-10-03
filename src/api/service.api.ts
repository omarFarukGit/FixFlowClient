import apiClient from "@/lib/apiClient";

export function getCategories() {
  return apiClient("/categories");
}
