import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, userLogin, userLogout } from "@/api";

export function useLogin() {
  return useMutation({
    //mutationFn
    mutationFn: userLogin,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
