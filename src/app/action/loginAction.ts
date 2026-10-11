"use server";

import { cookies } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginAction(payload: LoginPayload) {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Login failed");
  }

  const { accessToken, refreshToken, user } = result.data;

  if (!accessToken || !refreshToken) {
    throw new Error("Authentication tokens are missing");
  }

  const decoded = jwt.decode(accessToken) as JwtPayload | null;
  const role = user?.role ?? decoded?.role;

  if (!["ADMIN", "CUSTOMER", "TECHNICIAN"].includes(role)) {
    throw new Error("Invalid user role");
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // Do not return tokens to the client.
  return {
    success: true,
    message: result.message || "Login successful",
    data: {
      user: { role },
    },
  };
}
