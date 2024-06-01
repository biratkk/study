import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const questionAnswerRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.questionAnswer.findFirst({
        where: { id: input.id },
      });
    }),

  getAllByFile: protectedProcedure
    .input(z.object({ fileId: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.questionAnswer.findMany({
        where: { fileId: input.fileId },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        answerType: z.string(),
        answer: z.string(),
        fileId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input: { fileId, ...rest } }) => {
      return ctx.db.questionAnswer.create({
        data: {
          ...rest,
          file: { connect: { id: fileId } },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.questionAnswer.delete({
        where: { id: input.id },
      });
    }),

  deleteAllFromFile: protectedProcedure
    .input(z.object({ fileId: z.number() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.questionAnswer.deleteMany({
        where: { fileId: input.fileId },
      });
    }),
});
