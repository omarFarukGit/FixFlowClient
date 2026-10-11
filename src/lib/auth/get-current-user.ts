"use server";

import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;

  const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //   Authorization: accessToken,
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-cache",
    // next: {
    //   revalidate: 60 * 60 * 24,
    //   tags: ["my-profile"],
    // },
  });

  const result = await res.json();
  console.log(result);

  return result;
};
