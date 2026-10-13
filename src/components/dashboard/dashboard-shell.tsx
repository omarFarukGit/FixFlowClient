import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { ReactNode } from "react";
import { UserRole } from "@/types/user.type";
import Logout from "../profile/logout";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset>
        <header className=" flex z-50 sticky top-0 h-16 shrink-0 items-center justify-between gap-2 border-b px-4  bg-background/70 backdrop-blur-xl">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Logout />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
