import type { ReactNode } from "react";
import QueryPoviders from "./query.porvider";
import { GoogleAuhtProvider } from "./google.auth.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuhtProvider>
      <QueryPoviders>{children}</QueryPoviders>
    </GoogleAuhtProvider>
  );
}
