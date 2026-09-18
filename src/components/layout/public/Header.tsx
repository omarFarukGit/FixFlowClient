"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const { data: user, isLoading } = useGetMe();
  const { mutate: logout, isPending: logoutPending } = useLogout();

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out successfully",
        });

        queryClient.removeQueries({
          queryKey: ["user"],
        });

        router.push("/login");
      },

      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                  />
                }
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </SheetTrigger>

              <SheetContent side="right">
                <div className="mt-8 flex flex-col gap-5">
                  {/* Public Navigation */}
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="pl-2 text-lg font-medium hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Mobile User Actions */}
                  {user && (
                    <>
                      <div className="my-2 border-t" />

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 pl-2 text-lg font-medium hover:text-primary"
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                      </Link>

                      <Button
                        onClick={handleLogout}
                        disabled={logoutPending}
                        className="w-full"
                      >
                        {logoutPending ? "Logging out..." : "Logout"}
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop User Actions */}
          {isLoading ? null : !user ? (
            <Button onClick={() => router.push("/login")}>Login</Button>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 pl-2 text-lg font-medium hover:text-primary"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>

              <Button onClick={handleLogout} disabled={logoutPending}>
                {logoutPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
