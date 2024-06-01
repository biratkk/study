"use client";
import { api } from "@/trpc/react";
import { BlockNoteEditor, type PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Notes() {
  const { bookId: bookIdString } = useParams<{ bookId: string }>();
  const bookId = parseInt(bookIdString);
  const { theme } = useTheme();
  const utils = api.useUtils();
  const { data: note } = api.notes.getByBook.useQuery({ bookId: bookId });

  const { mutate: update } = api.notes.update.useMutation({
    onSuccess: () => {
      void utils.notes.getByBook.invalidate();
    },
  });

  const editor = useMemo(() => {
    return BlockNoteEditor.create({
      initialContent: note
        ? (JSON.parse(note.contentJSON) as PartialBlock[]).length !== 0
          ? (JSON.parse(note.contentJSON) as PartialBlock[])
          : undefined
        : undefined,
      _tiptapOptions: {
        autofocus: "end",
      },
      trailingBlock: false,
    });
  }, [note]);

  const [changed, setChanged] = useState(false);
  const [lastInputTime, setLastInputTime] = useState(0);

  const handleUpdate = async () => {
    if (note) {
      const markdown = await editor.blocksToMarkdownLossy(editor.document);
      const documentJSON = JSON.stringify(editor.document);
      update({ bookId, contentJSON: documentJSON, contentMD: markdown });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastInputTime(lastInputTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastInputTime]);

  useEffect(() => {
    // 3 seconds since the last input, save
    if (lastInputTime >= 2 && changed) {
      void handleUpdate();
      setLastInputTime(0);
      setChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastInputTime, changed]);

  return (
    <div className="p-4">
      <BlockNoteView
        onBlur={handleUpdate}
        theme={theme === "dark" ? "dark" : "light"}
        editor={editor}
        onChange={() => {
          setLastInputTime(0);
          setChanged(true);
        }}
      />
    </div>
  );
}
