"use client";
import { SidebarView } from "@/app/_components/book-view";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function BookNotes() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book } = api.book.get.useQuery({ id: parseInt(bookId) });

  return (
    book && (
      <div className="h-[calc(100vh-4rem)]">
        <SidebarView name={book?.name}/>
        <div className="mt-20"></div>
      </div>
    )
  );
}
