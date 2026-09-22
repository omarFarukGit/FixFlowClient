import type { ReactNode } from "react";
import QueryPoviders from "./query.porvider";
import { GoogleAuhtProvider } from "./google.auth.provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuhtProvider>
      <TooltipProvider>
        <QueryPoviders>{children}</QueryPoviders>
      </TooltipProvider>
    </GoogleAuhtProvider>
  );
}
