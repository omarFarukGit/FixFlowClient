"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md border p-2"
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
