import apiClient from "@/lib/apiClient";

export const createReview = async (payload: any) => {
  return apiClient(`/reviews`, {
    method: "POST",
    body: payload,
  });
};

export const getMyReviews = async () => {
  return apiClient(`/reviews/my`, {
    method: "GET",
  });
};
export const getTechnicianReviews = async () => {
  return apiClient(`/reviews/technician`, {
    method: "GET",
  });
};
export const getAllReviews = async () => {
  return apiClient(`/reviews/admin`, {
    method: "GET",
  });
};
