"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

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
    const res = await chat({
      prompt: [...history, message]
        .map((chat) => `${chat.type}: ${chat.message}`)
        .join("\n\n"),
    });
    const replyMessage = res.choices
      .map((choice) => choice.message.content ?? "")
      .join("");
    const reply: ChatMessage = { type: "assistant", message: replyMessage };
    setHistory([...history, message, reply]);
    setInput("");
  };

  return (
    <div className="flex flex-col justify-between p-4 h-[calc(100vh-4rem)] w-full">
      <div className="flex flex-col overflow-y-scroll">
        {history.map((chat, idx) => (
          <div
            key={idx}
            className={cn(
              "w-5/6 border p-2 mx-4 mb-2",
              chat.type === "user"
                ? "self-end rounded-l-lg rounded-tr-lg bg-primary text-primary-foreground "
                : "self-start rounded-r-lg rounded-tl-lg bg-secondary text-secondary-foreground",
            )}
          >
            {chat.message}
          </div>
        ))}
      </div>
      <div className="flex h-1/5 items-center justify-center gap-2">
        <Textarea
          className="h-9 w-4/5"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
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
