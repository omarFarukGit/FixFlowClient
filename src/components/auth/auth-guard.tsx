import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function AuthGuard({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  console.log(user, "user");
  // if (!user) {
  //   redirect("/login");
  // }

  return <>{children}</>;
}
