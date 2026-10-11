"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  revalidateTag("my-profile", { expire: 0 });

  return {
    success: true,
    message: "Logged out successfully",
  };
}
