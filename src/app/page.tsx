
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  const redirectToLibrary = async() => {
    "use server";
    return redirect("/library");
  };
  if (session) return redirectToLibrary();
  
  return (
    <main className="container flex flex-col">
    </main>
  );
}