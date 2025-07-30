import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // cuz of depth 1 doc will be type category
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subCategorySlugs = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subCategorySlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );
        }

        where["category.slug"] = {
          in: [parentCategory.slug, ...subCategorySlugs],
        };
      }

      return ctx.db.find({
        collection: "products",
        where,
        depth: 1,
      });
    }),
});
