import { getMyServiceRequests } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetMyServiceRequests() {
  return useQuery({
    queryKey: ["my-service-requests"],
    queryFn: getMyServiceRequests,
    retry: false,
  });
}
