"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = ["Dark", "Light"];

export default function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-between gap-4 cursor-pointer"
    >
      Toggle theme
      <div className="flex items-center justify-center h-5 w-5">
        {theme === "dark" ? <Moon /> : <Sun />}
      </div>
    </div>
  );
}
