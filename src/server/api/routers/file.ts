import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const fileRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        bookId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.fileUpload.create({
        data: {
          book: { connect: { id: input.bookId } },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  get: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.db.fileUpload.findFirst({ where: { id: input.id } });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.fileUpload.delete({ where: { id: input.id } });
    }),
});
