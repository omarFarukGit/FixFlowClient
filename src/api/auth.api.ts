import apiClient from "@/lib/apiClient";
import { RegistrationPyload } from "@/types";

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

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/users/me");
}
export function googleOAuth(payload: { idToken: string }) {
  return apiClient("/auth/google/callback", { method: "POST", body: payload });
}
