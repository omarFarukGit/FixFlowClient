import React, { type ReactNode } from "react";

import { Header } from "@/components/layout/public/Header";
import { Footer } from "@/components/layout/public/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
