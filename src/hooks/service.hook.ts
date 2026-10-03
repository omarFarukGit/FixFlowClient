import { createServiceRequest, getCategories } from "@/api/service.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useCreateServiceRequest() {
  return useMutation({
    mutationFn: createServiceRequest,
  });
}
