import {
  assignTechnicianToServiceRequest,
  getAllCustomers,
  getAllServicesRequest,
  getAllThecnicians,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetAllServicesRequests() {
  return useQuery({
    queryKey: ["service-requests"],
    queryFn: getAllServicesRequest,
  });
}

export function useGetTechnicians() {
  return useQuery({
    queryKey: ["technicians"],
    queryFn: getAllThecnicians,
  });
}
export function useGetCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
}

export function useAssignTechnician() {
  return useMutation({
    mutationFn: ({
      serviceRequestId,
      technicianId,
    }: {
      serviceRequestId: string;
      technicianId: string;
    }) => assignTechnicianToServiceRequest(serviceRequestId, technicianId),
  });
}
