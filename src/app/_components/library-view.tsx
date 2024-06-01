"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { generateRandomImageURL } from "@/lib/utils";
import { api } from "@/trpc/react";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Notebook, Plus } from "lucide-react";
import { PreviewCard } from "../_components/preview-card";

export default function LibraryView(props: { libraryId?: number }) {
  const utils = api.useUtils();

  const { data: library } = props.libraryId
    ? api.library.get.useQuery({
        id: props.libraryId,
      })
    : { data: undefined };

  const { mutateAsync: create } = api.book.create.useMutation({
    onSuccess: () => {
      void utils.book.getAll.invalidate();
    },
  });

  const { mutate: deleteBook } = api.book.delete.useMutation({
    onSuccess: () => {
      void utils.book.getAll.invalidate();
    },
  });

  const { mutate: update } = api.book.update.useMutation({
    onSuccess: () => {
      void utils.book.getAll.invalidate();
    },
  });

  const { data: books, isLoading } = api.book.getAll.useQuery({
    libraryId: props.libraryId,
  });

  const handleCreateNewBook = () => {
    void create({
      name: "Untitled",
      description:
        "Please delete this and enter a description of your book here.",
      imageURL: generateRandomImageURL(),
      libraryId: library?.id,
    });
  };
  return (
    !isLoading && (
      <div className="container mt-20">
        <div className="flex justify-between">
          <div>
            <h1 className="flex items-center gap-4 text-5xl font-bold">
              {library?.name ?? "Books"}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleCreateNewBook} size={"icon"}>
                    <Plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-secondary text-secondary-foreground">
                  Start a new book
                </TooltipContent>
              </Tooltip>
            </h1>
            <p className="mt-2 text-muted-foreground">
              You can make changes to{" "}
              {library?.name ? `the books in ${library.name}` : "your books"}{" "}
              here.
            </p>
          </div>
          <Notebook className="h-20 w-20 justify-self-end text-purple-800" />
        </div>
        <Separator className="my-2" />
        {books && (
          <div className="mb-20 flex w-full items-center gap-2">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
              {books.map((book) => (
                <PreviewCard
                  key={book.id}
                  type="book"
                  onDelete={(id) => deleteBook({ id })}
                  onUpdate={update}
                  {...book}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
}
