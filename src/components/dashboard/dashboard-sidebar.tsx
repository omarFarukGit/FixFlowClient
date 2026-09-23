import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserRole } from "@/types/user.type";
import { adminRoutes } from "@/routes";
import { customerRoutes } from "@/routes/customer.routes";
import { technicianRoutes } from "@/routes/technician.routes";
import Link from "next/link";
import Image from "next/image";

// This is sample data.
const data = {

  navMain: [
    {
      title: "Mangement",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "/admin",
        },
        {
          title: "/admin/approve-technician",
          url: "/admin/technician",
        },
      ],
    },

  ],
};


const sidebarRoutes: Record<
  UserRole,
  typeof adminRoutes | typeof customerRoutes | typeof technicianRoutes
> = {
    ADMIN:adminRoutes,
    CUSTOMER:customerRoutes,
   TECHNICIAN:technicianRoutes
}

export function DashboardSidebar({role}:{role:UserRole}) {

    const routes=sidebarRoutes[role]
  return (
    <Sidebar >
      <SidebarHeader>
        {/* Logo */}
        <Link href="/" className="shrink-0 rounded-full dark:bg-white">
          <Image
            src="/images/fix-flow-logo-main.png"
            alt="FixFlow logo"
            priority
            className="object-cover"
            width={80}
            height={80}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
