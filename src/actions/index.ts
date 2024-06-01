"use server";

import { api } from "@/trpc/server";

export async function createNewLibrary() {
  "use server"
  return (await api.library.create({ name: "Untitled" })).id;
}
