import {
  createServiceRequest,
  getCategories,
  getServiceRequests,
} from "@/api/service.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useGetServiceRequests() {
  return useQuery({
    queryKey: ["service-requests"],
    queryFn: getServiceRequests,
  });
}

export function useCreateServiceRequest() {
  return useMutation({
    mutationFn: createServiceRequest,
  });
}
