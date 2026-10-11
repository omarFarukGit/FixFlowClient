import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import type { UserRole } from "@/types/user.type";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import AccessDenied from "./acces-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export default async function RoleGuard({ children, roles }: IProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!roles.includes(user.data.role)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
