import { createReview } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useCreateReview() {
  return useMutation({
    //mutationFn
    mutationFn: createReview,
  });
}
