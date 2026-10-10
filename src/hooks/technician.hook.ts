import {
  acceptServiceRequest,
  completeServiceRequest,
  getMyServiceRequests,
  getServiceRequestById,
  startServiceRequest,
  updateTechnicainInfo,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetMyServiceRequests() {
  return useQuery({
    queryKey: ["my-service-requests"],
    queryFn: getMyServiceRequests,
    retry: false,
  });
}

export const useGetServiceRequestById = (serviceRequestId: string) => {
  return useQuery({
    queryKey: ["service-request", serviceRequestId],
    queryFn: () => getServiceRequestById(serviceRequestId),
    enabled: Boolean(serviceRequestId),
  });
};

export const useAcceptServiceRequest = () => {
  return useMutation({
    mutationFn: acceptServiceRequest,
  });
};

export const useStartServiceRequest = () => {
  return useMutation({
    mutationFn: startServiceRequest,
  });
};

export const useCompleteServiceRequest = () => {
  return useMutation({
    mutationFn: completeServiceRequest,
  });
};

export const useUpdateTechnicainInfo = () => {
  return useMutation({
    mutationFn: updateTechnicainInfo,
  });
};
