"use client";

import { redirect, useParams } from "next/navigation";

export default function BookPage() {
  const { bookId } = useParams<{ bookId: string }>();
  return redirect(`/book/${bookId}/notes`);
}
