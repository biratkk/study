import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const notesRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.note.findFirst({
        where: { id: input.id },
      });
    }),

  getByBook: protectedProcedure
    .input(z.optional(z.object({ bookId: z.optional(z.number()) })))
    .query(({ ctx, input }) => {
      return ctx.db.note.findFirst({
        where: {
          bookId: input?.bookId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.delete({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        contentJSON: z.string(),
        contentMD: z.string(),
        bookId: z.number(),
      }),
    )
    .mutation(async ({ input: { contentJSON, contentMD, bookId }, ctx }) => {
      return ctx.db.note.upsert({
        where: {
          bookId: bookId,
        },
        update: {},
        create: {
          contentJSON,
          contentMD,
          book: { connect: { id: bookId } },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        bookId: z.number(),
        contentJSON: z.optional(z.string()),
        contentMD: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.upsert({
        where: {
          bookId: input.bookId,
        },
        update: {
          contentJSON: input.contentJSON,
          contentMD: input.contentMD,
        },
        create: {
          contentJSON: "[]",
          contentMD: "",
          book: { connect: { id: input.bookId } },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
