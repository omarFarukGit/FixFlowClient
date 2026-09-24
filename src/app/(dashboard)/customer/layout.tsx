import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React, { ReactNode } from "react";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["CUSTOMER"]}>
      {/* biome-ignore lint/a11y/useValidAriaRole: `role` is the dashboard role prop, not an ARIA role. */}
      <DashboardShell role="CUSTOMER">{children}</DashboardShell>
    </RoleGuard>
  );
}
