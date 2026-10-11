"use client";
import React, { ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types/user.type";
import AccessDenied from "./acces-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGuard({ children, roles }: IProps) {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();
  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user, router.replace]);

  if (isPending) {
    return <AuthLoading lavel="Vefifying Account" />;
  }
  if (isError || !user) {
    return <AuthLoading lavel="Redirecting..." />;
  }
  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
