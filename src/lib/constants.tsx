import Notes from "@/app/_components/notes";
import UploadView from "@/app/_components/upload/upload";
import {
  AlignRight,
  ArrowUpFromLine,
  Check,
  CopySlash,
  Library,
  Notebook,
  PersonStanding,
} from "lucide-react";
import { type ReactNode } from "react";

const pageNames = ["book", "library"] as const;
type PageName = (typeof pageNames)[number];

type PageProps<T extends PageName> = {
  name: string;
  Icon: typeof Library;
  route: `/${T}`;
};

export const pages: Record<PageName, PageProps<PageName>> = {
  library: {
    name: "Library",
    Icon: Library,
    route: "/library",
  },
  book: {
    name: "Books",
    Icon: Notebook,
    route: "/book",
  },
} as const;

type BookViewsType = Record<
  string,
  { name: string; children: ReactNode; icon: typeof AlignRight }
>;

export const bookViews: BookViewsType = {
  notes: {
    name: "Notes",
    children: <Notes />,
    icon: AlignRight,
  },
  todo: {
    name: "To-do",
    children: <div>Todo</div>,
    icon: Check,
  },
  upload: {
    name: "Upload",
    children: <UploadView />,
    icon: ArrowUpFromLine,
  },
  flashcards: {
    name: "Flashcards",
    children: <div>Flashcard</div>,
    icon: CopySlash,
  },
  chat: {
    name: "Studypal",
    children: <div>Study</div>,
    icon: PersonStanding,
  },
} as const;
