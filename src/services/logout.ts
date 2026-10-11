"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const logout = async () => {
  const cookieStore = await cookies();

  console.log(cookieStore, "cookie store");
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  revalidateTag("my-profile", { expire: 0 });

  return {
    success: true,
    message: "Logout successful",
  };
};
