import { getAllPayments } from "@/api/payments.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllPayments() {
  return useQuery({
    queryKey: ["payments-all"],
    queryFn: getAllPayments,
  });
}
