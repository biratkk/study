import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const bookRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.book.findFirst({
        where: { id: input.id },
      });
    }),
  getAll: protectedProcedure
    .input(z.optional(z.object({ libraryId: z.optional(z.number()) })))
    .query(({ ctx, input }) => {
      return ctx.db.book.findMany({
        where: {
          libraryId: input?.libraryId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.note.delete({
        where: {
          bookId: input.id,
        },
      });
      return ctx.db.book.delete({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        imageURL: z.string().url(),
        libraryId: z.optional(z.number()),
      }),
    )
    .mutation(
      async ({ input: { name, description, imageURL, libraryId }, ctx }) => {
        const book = await ctx.db.book.create({
          data: {
            name,
            description,
            imageURL,
            library:
              typeof libraryId !== "undefined"
                ? { connect: { id: libraryId } }
                : undefined,
            createdBy: { connect: { id: ctx.session.user.id } },
          },
        });

        await ctx.db.note.create({
          data: {
            book: { connect: { id: book.id } },
            contentJSON: "[]",
            contentMD: "",
            createdBy: { connect: { id: ctx.session.user.id } },
          },
        });
        
        return book;
      },
    ),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.optional(z.string().min(1)),
        description: z.optional(z.string()),
        imageURL: z.optional(z.string().url()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.book.update({
        data: {
          ...input,
        },
        where: {
          id: input.id,
        },
      });
    }),
});
