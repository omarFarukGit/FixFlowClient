"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value as string;

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`,
    },
    cache: "no-cache",
  });

  const result = await res.json();
  return result;
};
