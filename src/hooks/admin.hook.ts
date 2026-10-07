import {
  approveTechnician,
  assignTechnicianToServiceRequest,
  getAllCustomers,
  getAllServicesRequest,
  getAllThecnicians,
  getAuditLogs,
  updateTechnicianStatus,
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

export function useApproveTechnician() {
  return useMutation({
    mutationFn: (technicianId: string) => approveTechnician(technicianId),
  });
}
export function useUpdateUserStatus() {
  return useMutation({
    mutationFn: ({
      technicianId,
      status,
    }: {
      technicianId: string;
      status: string;
    }) => updateTechnicianStatus(technicianId, status),
  });
}

export function useGetAuditLogs() {
  return useQuery({
    queryKey: ["audit-logs"],
    queryFn: getAuditLogs,
  });
}
