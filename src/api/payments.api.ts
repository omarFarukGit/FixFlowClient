import apiClient from "@/lib/apiClient";
// export const getPayments = async () => {
//   return apiClient("/payments/my-payments");


// };
export const getAllPayments = async () => {
  return apiClient("/payments");
};
