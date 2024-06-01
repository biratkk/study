"use client"

import { Button } from "@/components/ui/button";
import { type ClientSafeProvider, signIn } from "next-auth/react";
import { GoogleIcon } from "./icons/google";

type ProviderOptions = {
  google?: ClientSafeProvider;
};

export default function ProviderSignIn({ google }: ProviderOptions) {
  return (
    <div className="w-full flex items-center justify-center">
      {google && (
        <Button
          onClick={() => signIn(google.id)}
          size={"icon"}
          variant={"ghost"}
          className="w-full"
        >
          <GoogleIcon />
        </Button>
      )}
    </div>
  );
}
