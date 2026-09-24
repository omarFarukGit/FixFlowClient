import type { ReactNode } from "react";
import QueryPoviders from "./query.porvider";
import { GoogleAuhtProvider } from "./google.auth.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuhtProvider>
      <TooltipProvider>
        <ThemeProvider>
          <QueryPoviders>{children}</QueryPoviders>
        </ThemeProvider>
      </TooltipProvider>
    </GoogleAuhtProvider>
  );
}
