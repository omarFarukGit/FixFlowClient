import React, { type ReactNode } from "react";
import Footer from "@/components/layout/public/Footer";
import { Header } from "@/components/layout/public/Header";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
