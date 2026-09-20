import apiClient from "@/lib/apiClient";
import { RegistrationPyload, VerifyAccountPyaload } from "@/types";

export function userLogin(payload: { email: string; password: string }) {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}
export function userRegistation(payload: RegistrationPyload) {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
}
export function verifyAccount(payload: VerifyAccountPyaload) {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/users/me");
}
export function googleOAuth(payload: { idToken: string }) {
  return apiClient("/auth/google/callback", { method: "POST", body: payload });
}
