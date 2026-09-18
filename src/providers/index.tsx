import type { ReactNode } from "react";
import QueryPoviders from "./query.porvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <QueryPoviders>{children}</QueryPoviders>;
}
