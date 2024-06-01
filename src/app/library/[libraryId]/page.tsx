"use client";

import LibraryView from "@/app/_components/library-view";
import { useParams } from "next/navigation";

export default function LibraryBooks() {
  const { libraryId } = useParams<{ libraryId: string }>();
  return <LibraryView libraryId={parseInt(libraryId)} />;
}
