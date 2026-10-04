import { getAllServicesRequest } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllServicesRequests() {
  return useQuery({
    queryKey: ["service-requests"],
    queryFn: getAllServicesRequest,
  });
}
