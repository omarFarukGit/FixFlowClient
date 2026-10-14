
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const ROLE_DASHBOARDS: Record<string, string> = {
  ADMIN: "/admin",
  CUSTOMER: "/customer",
  TECHNICIAN: "/technician",
};

export function Header() {
  const { data: userResponse, isLoading } = useGetMe();
  const { mutateAsync: logout, isPending: logoutPending } = useLogout();

  const queryClient = useQueryClient();
  const router = useRouter();

  const user = userResponse?.data;

  const getDashboardLink = () => {
    if (!user?.role) return "/login";
    return ROLE_DASHBOARDS[user.role] ?? "/login";
  };

  const handleLogout = async () => {
    try {
      await logout();

      queryClient.clear();

      toast.add({
        description: "Logged out successfully!",
        type: "success",
      });

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);

      toast.add({
        description: "Failed to log out. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md dark:ring-white/10"
        >
          <Image
            src="/images/fix-flow-logo-main.png"
            alt="FixFlow logo"
            width={500}
            height={500}
            className="h-11 w-11 cursor-pointer object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative cursor-pointer text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer border-border/70 bg-background/60 transition-colors hover:bg-accent"
                  />
                }
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] border-l border-border/60 bg-background sm:w-[350px]"
              >
                <div className="mt-8 flex flex-col gap-3">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="cursor-pointer rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-all duration-200 hover:bg-accent hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="my-3 border-t border-border/60" />

                  {/* Mobile Loading Skeleton */}
                  {isLoading ? (
                    <div className="flex flex-col gap-3">
                      <Skeleton className="h-10 w-full rounded-lg" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  ) : user ? (
                    <>
                      {/* Mobile Dashboard */}
                      <Link
                        href={getDashboardLink()}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-all duration-200 hover:bg-accent hover:text-primary"
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>

                      {/* Mobile Logout */}
                      <Button
                        onClick={handleLogout}
                        disabled={logoutPending}
                        className="mt-2 w-full cursor-pointer"
                      >
                        {logoutPending ? "Logging out..." : "Logout"}
                      </Button>
                    </>
                  ) : (
                    /* Mobile Login */
                    <Button
                      onClick={() => router.push("/login")}
                      className="w-full cursor-pointer"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop User Actions */}
          {isLoading ? (
            <div className="hidden items-center gap-2 md:flex">
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          ) : user ? (
            <div className="hidden items-center gap-2 md:flex">
              {/* Dashboard */}
              <Link
                href={getDashboardLink()}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                disabled={logoutPending}
                variant="outline"
                className="cursor-pointer border-border/70 bg-background/50 transition-colors hover:bg-accent"
              >
                {logoutPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
          ) : (
            /* Desktop Login */
            <Button
              onClick={() => router.push("/login")}
              className="hidden cursor-pointer md:inline-flex"
            >
              Login
            </Button>
          )}

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
