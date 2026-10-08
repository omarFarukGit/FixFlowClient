import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateCategory() {
  return useMutation({
    //mutationFn
    mutationFn: createCategory,
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      updateCategory(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}
export function useDeleteCategory() {
  return useMutation({
    //mutationFn
    mutationFn: deleteCategory,
  });
}
// export function useGetAllCategories() {
//   return useQuery({
//     queryKey: ["categories"],
//     queryFn: getAllCategories,
//   });
// }
