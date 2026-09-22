import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ADMIN", "CUSTOMER", "TECHNICIAN"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
