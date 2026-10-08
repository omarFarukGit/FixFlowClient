import { createCategory } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useCreateCategory() {
  return useMutation({
    //mutationFn
    mutationFn: createCategory,
  });
}
