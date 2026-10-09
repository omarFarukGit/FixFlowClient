import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMe,
  googleOAuth,
  updateMyProfileImage,
  updateMyProfileInfromation,
  userLogin,
  userLogout,
  userRegistation,
  verifyAccount,
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

export function useVerifyAccount() {
  return useMutation({
    //mutationFn
    mutationFn: verifyAccount,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}

export function useUpdateMyProfileInformation() {
  return useMutation({
    mutationFn: updateMyProfileInfromation,
  });
}

export function useUpdateMyProfileImage() {
  return useMutation({
    mutationFn: updateMyProfileImage,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
