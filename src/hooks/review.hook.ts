import {
  createReview,
  getAllReviews,
  getMyReviews,
  getTechnicianReviews,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateReview() {
  return useMutation({
    //mutationFn
    mutationFn: createReview,
  });
}

export function useGetMyReviews() {
  return useQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
  });
}
export function useGetTechnicianReviews() {
  return useQuery({
    queryKey: ["technician-reviews"],
    queryFn: getTechnicianReviews,
  });
}
export function useGetAllReviews() {
  return useQuery({
    queryKey: ["all-reviews"],
    queryFn: getAllReviews,
  });
}
