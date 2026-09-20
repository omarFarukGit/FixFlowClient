import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMe,
  googleOAuth,
  userLogin,
  userLogout,
  userRegistation,
} from "@/api";

export function useLogin() {
  return useMutation({
    //mutationFn
    mutationFn: userLogin,
  });
}
export function useRegistration() {
  return useMutation({
    //mutationFn
    mutationFn: userRegistation,
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
export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}
