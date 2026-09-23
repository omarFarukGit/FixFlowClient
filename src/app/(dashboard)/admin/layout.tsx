import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ADMIN"]}>
      {/* biome-ignore lint/a11y/useValidAriaRole: `role` is the dashboard role prop, not an ARIA role. */}
      <DashboardShell role="ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
