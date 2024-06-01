"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  "use client";
  return (
    <div
      className="w-full flex items-center justify-between gap-4 cursor-pointer"
      onClick={() => signOut()}
    >
      Log out
      <LogOut className="h-4 w-4 rotate-180 text-destructive" />
    </div>
  );
}
