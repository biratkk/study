"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipContent } from "@/components/ui/tooltip";
import { api } from "@/trpc/react";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { LibraryIcon, Plus } from "lucide-react";
import { PreviewCard } from "../_components/preview-card";

export default function Library() {
  const utils = api.useUtils();
  const { mutateAsync: create } = api.library.create.useMutation({
    onSuccess: () => {
      void utils.library.getAll.invalidate();
    },
  });

  const { mutate: deleteLibrary } = api.library.delete.useMutation({
    onSuccess: () => {
      void utils.library.getAll.invalidate();
    },
  });

  const { mutate: update } = api.library.update.useMutation({
    onSuccess: () => {
      void utils.library.getAll.invalidate();
    },
  });

  const { data: libraries } = api.library.getAll.useQuery();

  const handleCreateNewLibrary = () => {
    void create({
      name: "Untitled",
      description:
        "Please delete this and enter a description of your library here.",
    });
  };

  return (
    <div className="container mt-20">
      <div className="flex justify-between">
        <div>
          <h1 className="flex items-center gap-4 text-5xl font-bold">
            Library
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleCreateNewLibrary} size={"icon"}>
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-secondary text-secondary-foreground">
                Create new library
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="mt-2 text-muted-foreground">
            You can see any of your saved book collections here.
          </p>
        </div>
        <LibraryIcon className="h-20 w-20 justify-self-end text-purple-800" />
      </div>
      <Separator className="my-2" />
      {libraries && (
        <div className="mb-20 flex w-full items-center gap-2">
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {libraries.map((library) => (
              <PreviewCard
                key={library.id}
                type="library"
                onDelete={(id) => deleteLibrary({ id })}
                onUpdate={update}
                {...library}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
