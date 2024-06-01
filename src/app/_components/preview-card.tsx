import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type api } from "@/trpc/react";
import { type Book, type Library } from "@prisma/client";
import {
  Ellipsis,
  ExternalLink,
  FlipVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CardProps =
  | (Library & {
      type: "library";
      onDelete: (id: number) => void;
      onUpdate: ReturnType<typeof api.library.update.useMutation>["mutate"];
    })
  | (Book & {
      type: "book";
      onDelete: (id: number) => void;
      onUpdate: ReturnType<typeof api.book.update.useMutation>["mutate"];
    });

export function PreviewCard(props: CardProps) {
  const [editMode, setEditMode] = useState(false);

  const handleTitleUpdate = ({ title }: { title: string }) => {
    props.onUpdate({ id: props.id, name: title });
  };

  const handleDescriptionUpdate = (description: string) => {
    props.onUpdate({ id: props.id, description });
  };

  const handleImageUpdate = ({ newURL }: { newURL: string }) => {
    props.onUpdate({ id: props.id, imageURL: newURL });
  };

  return (
    <Card
      className={cn(
        "h-96 w-full overflow-clip",
        editMode ? "shadow-primary" : "shadow-none",
      )}
    >
      <CardImagePreview
        imageUrl={props.imageURL}
        onChange={(url) => handleImageUpdate({ newURL: url })}
      />
      <div className="p-4">
        <div className="flex justify-between">
          {editMode ? (
            <Header
              title={props.name}
              editMode={editMode}
              handleTitleUpdate={handleTitleUpdate}
            />
          ) : (
            <Link href={editMode ? "#" : `/${props.type}/${props.id}`}>
              <Header
                withHref
                title={props.name}
                editMode={editMode}
                handleTitleUpdate={handleTitleUpdate}
              />
            </Link>
          )}
          <span className="flex gap-1">
            {editMode ? (
              <Button onClick={() => setEditMode(!editMode)}>Finish</Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    onClick={() => setEditMode(!editMode)}
                    size={"icon"}
                    variant={editMode ? "default" : "ghost"}
                    className="h-8 w-8 p-2"
                  >
                    <Ellipsis className="" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="flex items-center justify-between"
                    onClick={() => setEditMode(!editMode)}
                  >
                    Edit mode
                    <Pencil className="h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => props.onDelete(props.id)}
                    className="flex items-center justify-between"
                  >
                    Delete
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </span>
        </div>
        <span className="mt-1 text-sm text-muted-foreground">
          {props.createdAt.toDateString()}
        </span>
        <div
          suppressContentEditableWarning
          className="mt-2 outline-none"
          contentEditable={editMode}
          onBlur={(e) =>
            handleDescriptionUpdate(
              e.currentTarget.textContent ?? props.description,
            )
          }
        >
          {props.description}
        </div>
      </div>
    </Card>
  );
}

const Header = ({
  editMode,
  handleTitleUpdate,
  withHref,
  title,
}: {
  title: string;
  editMode: boolean;
  withHref?: boolean;
  handleTitleUpdate: (props: { title: string }) => void;
}) => (
  <h2
    suppressContentEditableWarning
    className={cn(
      "flex items-center gap-4 text-2xl outline-none",
      withHref ? "hover:underline" : "",
    )}
    contentEditable={editMode}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.blur();
      }
    }}
    onBlur={(e) => {
      handleTitleUpdate({ title: e.currentTarget.textContent ?? title });
    }}
  >
    {title}
  </h2>
);

const CardImagePreview = ({
  imageUrl,
  onChange,
}: {
  imageUrl: string;
  onChange: (url: string) => void;
}) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [preview, showPreview] = useState(false);

  const handleCancel = () => {
    setValue("");
    setOpen(false);
    showPreview(false);
  };

  const handleSave = () => {
    const val = value;
    onChange(val);
    setValue("");
    setOpen(false);
    showPreview(false);
  };

  const handleInputChange = (newInput: string) => {
    showPreview(false);
    setValue(newInput);
  };

  return (
    <div className="group relative h-48 w-full">
      <Image
        className="object-cover duration-150 group-hover:brightness-75"
        src={imageUrl}
        alt="Random image"
        fill
      />
      <Dialog
        open={open}
        onOpenChange={(open) => (!open ? handleCancel() : setOpen(true))}
      >
        <DialogTrigger asChild>
          <Button
            variant={"secondary"}
            className="absolute bottom-2 right-2 px-2 py-1 text-xs"
          >
            Change
          </Button>
        </DialogTrigger>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Change image</DialogTitle>
            <DialogDescription>
              Enter a new URL for the image below.
            </DialogDescription>
          </DialogHeader>
          <DialogDescription className="flex gap-4">
            <Input onChange={(e) => handleInputChange(e.target.value)}></Input>
          </DialogDescription>
          {preview && (
            <div className="relative h-48 w-full">
              {
                <Image
                  className="object-cover"
                  src={value}
                  alt="Please enter valid URL"
                  fill
                />
              }
            </div>
          )}
          <div className="flex w-full flex-row justify-between">
            <Button onClick={() => showPreview(true)} variant={"ghost"}>
              Preview
            </Button>
            <span className="flex gap-2">
              <Button variant={"secondary"} onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </span>
          </div>
        </DialogContent>
      </Dialog>
      ;
    </div>
  );
};
