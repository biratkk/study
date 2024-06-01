import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateRandomImageURL } from "@/lib/utils";

export const libraryRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.library.findFirst({
        where: { id: input.id },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.library.findMany();
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        imageURL: z.optional(z.string().url()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.library.create({
        data: {
          imageURL: generateRandomImageURL(),
          ...input,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.library.delete({
        where: {
          id: input.id,
        },
      });
    }),

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
      return ctx.db.library.update({
        data: {
          ...input,
        },
        where: {
          id: input.id,
        },
      });
    }),
});
