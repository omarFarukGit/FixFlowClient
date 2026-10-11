
"use server";

import { cookies } from "next/headers";
import apiClient from "@/lib/apiClient";

export const login = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient<{
      success: boolean;
      data: {
        accessToken: string;
        refreshToken: string;
      };
    }>("/api/v1/auth/login", {
      method: "POST",
      body: payload,
    });

    const cookieStore = await cookies();

    cookieStore.set("accessToken", response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refreshToken", response.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
};

