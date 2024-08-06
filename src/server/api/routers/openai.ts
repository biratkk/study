import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import OpenAI from "openai";
import { env } from "process";

const openAI = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const openaiRouter = createTRPCRouter({
  complete: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await openAI.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{ role: "system", content: input.prompt }],
      });
    }),
});
