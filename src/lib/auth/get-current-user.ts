import "server-only";

import { cookies } from "next/headers";
import type { UserRole } from "@/types/user.type";

interface CurrentUser {
  id: string;
  role: UserRole;
}

interface MeResponse {
  success: boolean;
  data: CurrentUser;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = (await response.json()) as MeResponse;

    if (!result.success || !result.data?.role) return null;

    return result.data;
  } catch {
    return null;
  }
}
