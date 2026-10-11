"use client";
import React, { ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();
  const user = data?.data;
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

  return <div>{children}</div>;
}
