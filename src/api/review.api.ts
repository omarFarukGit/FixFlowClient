import apiClient from "@/lib/apiClient";

export const createReview = async (payload: any) => {
  return apiClient(`/reviews`, {
    method: "POST",
    body: payload,
  });
};
