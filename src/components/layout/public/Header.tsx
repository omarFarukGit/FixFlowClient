"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
export function Header() {
  const { data: user, isLoading } = useGetMe();
  const { mutate: logout, isPending: logoutPending } = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({ title: "Logged out successfully" });
        queryClient.removeQueries({ queryKey: ["user"] });
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
  const getDashboardLink = () => {
    if (!user) return "/customer";
    const role = user.data?.role;
    if (role === "ADMIN") return "/admin";
    if (role === "CUSTOMER") return "/customer";
    return "/technician";
  };
  return (
    <nav className=" sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 ">
      {" "}
      <div className=" mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ">
        {" "}
        {/* ========================================================= LOGO ========================================================= */}{" "}
        <Link
          href="/"
          className=" flex shrink-0 items-center rounded-xl bg-white p-1 shadow-sm  transition-all duration-200 hover:shadow-md dark:ring-white/10 "
        >
          {" "}
          <Image
            src="/images/fix-flow-logo-main.png"
            alt="FixFlow logo"
            priority
            width={400}
            height={400}
            className="h-13 w-13"
          />{" "}
        </Link>{" "}
        {/* ========================================================= DESKTOP NAVIGATION ========================================================= */}{" "}
        <div className="hidden items-center gap-7 md:flex">
          {" "}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className=" relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground "
            >
              {" "}
              {item.label}{" "}
            </Link>
          ))}{" "}
        </div>{" "}
        {/* ========================================================= RIGHT SIDE ACTIONS ========================================================= */}{" "}
        <div className="flex items-center gap-2 sm:gap-3">
          {" "}
          {/* Theme Toggle */} <ModeToggle />{" "}
          {/* ======================================================= MOBILE MENU ======================================================= */}{" "}
          <div className="md:hidden">
            {" "}
            <Sheet>
              {" "}
              <SheetTrigger
                render={
                  <Button
                    size="icon"
                    variant="outline"
                    className=" cursor-pointer border-border/70 bg-background/60 transition-colors hover:bg-accent "
                  />
                }
              >
                {" "}
                <Menu className="h-5 w-5" />{" "}
                <span className="sr-only"> Open navigation menu </span>{" "}
              </SheetTrigger>{" "}
              <SheetContent
                side="right"
                className=" w-[300px] sm:w-[350px] border-l border-border/60 bg-background "
              >
                {" "}
                <div className="mt-8 flex flex-col gap-3">
                  {" "}
                  {/* ----------------------------------------------- PUBLIC NAVIGATION ------------------------------------------------ */}{" "}
                  <div className="flex flex-col gap-1">
                    {" "}
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className=" rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-all duration-200 hover:bg-accent hover:text-primary "
                      >
                        {" "}
                        {item.label}{" "}
                      </Link>
                    ))}{" "}
                  </div>{" "}
                  {/* ----------------------------------------------- USER ACTIONS ------------------------------------------------ */}{" "}
                  {user && (
                    <>
                      {" "}
                      <div className="my-3 border-t border-border/60" />{" "}
                      <Link
                        href={getDashboardLink()}
                        className=" flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-all duration-200 hover:bg-accent hover:text-primary "
                      >
                        {" "}
                        <LayoutDashboard className="h-5 w-5" />{" "}
                        <span>Dashboard</span>{" "}
                      </Link>{" "}
                      <Button
                        onClick={handleLogout}
                        disabled={logoutPending}
                        className="mt-2 w-full"
                      >
                        {" "}
                        {logoutPending ? "Logging out..." : "Logout"}{" "}
                      </Button>{" "}
                    </>
                  )}{" "}
                  {/* ----------------------------------------------- MOBILE LOGIN ------------------------------------------------ */}{" "}
                  {!isLoading && !user && (
                    <>
                      {" "}
                      <div className="my-3 border-t border-border/60" />{" "}
                      <Button
                        onClick={() => router.push("/login")}
                        className="w-full"
                      >
                        {" "}
                        Login{" "}
                      </Button>{" "}
                    </>
                  )}{" "}
                </div>{" "}
              </SheetContent>{" "}
            </Sheet>{" "}
          </div>{" "}
          {/* ======================================================= DESKTOP USER ACTIONS ======================================================= */}{" "}
          {isLoading ? null : !user ? (
            <Button
              onClick={() => router.push("/login")}
              className="hidden md:inline-flex"
            >
              {" "}
              Login{" "}
            </Button>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              {" "}
              {/* Dashboard */}{" "}
              <Link
                href={getDashboardLink()}
                className=" flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground "
              >
                {" "}
                <LayoutDashboard className="h-4 w-4" /> <span>
                  Dashboard
                </span>{" "}
              </Link>{" "}
              {/* Logout */}{" "}
              <Button
                onClick={handleLogout}
                disabled={logoutPending}
                variant="outline"
                className=" border-border/70 bg-background/50 transition-colors hover:bg-accent "
              >
                {" "}
                {logoutPending ? "Logging out..." : "Logout"}{" "}
              </Button>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
}
