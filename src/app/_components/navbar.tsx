import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getServerAuthSession } from "@/server/auth";
import { CircleUser, Library } from "lucide-react";
import { getProviders } from "next-auth/react";
import Link from "next/link";
import ProviderSignIn from "./providers-signin";
import SignOutButton from "./sign-out";
import { pages } from "@/lib/constants";
import ToggleThemeButton from "./theme-toggle";

export default async function Navbar() {
  const session = await getServerAuthSession();
  const providers = await getProviders();
  return (
    <nav className="h-16 w-screen items-center border-b">
      <div className="container flex h-full w-full items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold text-primary">StudyPal</h1>
        </Link>
        <div className="flex items-center gap-2">
          {Object.entries(pages).map(([name, props]) => (
            <Tooltip key={name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={props.route}>
                  <Button size={"icon"} variant={"ghost"}>
                    <props.Icon className="text-primary" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="border bg-secondary text-secondary-foreground">
                {props.name}
              </TooltipContent>
            </Tooltip>
          ))}
          <Button>Generate</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                {session ? (
                  <AvatarImage src={session.user.image ?? undefined} />
                ) : (
                  <AvatarFallback>
                    <CircleUser />
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <ToggleThemeButton />
              </DropdownMenuItem>
              {session ? (
                <DropdownMenuItem >
                  <SignOutButton />
                </DropdownMenuItem>
              ) : (
                <DropdownMenuLabel>
                  {session ? (
                    "Sign out"
                  ) : (
                    <ProviderSignIn google={providers?.google} />
                  )}
                </DropdownMenuLabel>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
