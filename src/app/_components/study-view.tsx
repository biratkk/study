"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import CustomMarkdown from "./custom-markdown";

type ChatMessage = {
  type: "user" | "assistant";
  message: string;
};

export default function StudyView() {
  const { mutateAsync: chat } = api.openAI.complete.useMutation();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    const message: ChatMessage = { type: "user", message: input };
    const newHistory = [...history, message];
    setHistory(newHistory);
    setInput("");
    const res = await chat({
      prompt: newHistory
        .map((chat) => `${chat.type}: ${chat.message}`)
        .join("\n\n"),
    });
    const replyMessage = res.choices
      .map((choice) => choice.message.content ?? "")
      .join("");
    const reply: ChatMessage = { type: "assistant", message: replyMessage };
    setHistory([...newHistory, reply]);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col justify-between p-4">
      <div className="flex flex-col overflow-y-scroll">
        {history.map((chat, idx) => (
          <div
            key={idx}
            className={cn(
              "mx-4 mb-2 w-4/5 md:w-3/5 border p-2 mt-2",
              chat.type === "user"
                ? "self-end rounded-l-lg rounded-tr-lg bg-primary text-primary-foreground "
                : "self-start rounded-r-lg rounded-tl-lg bg-secondary text-secondary-foreground slide-in-from-right-8",
            )}
          >
            <CustomMarkdown>{chat.message}</CustomMarkdown>
          </div>
        ))}
      </div>
      <div className="flex h-1/5 items-center justify-center gap-2">
        <Textarea
          className="min-h-9 w-4/5"
          onKeyDown={async (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.stopPropagation();
              await handleSubmit();
            }
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></Textarea>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
