import { z } from "zod";

const categoriesRequestSchema = z.object({
  name: z.string(),
});

const categoriesResponseSchema = categoriesRequestSchema.extend({
  id: z.number(),
});

const categoriesListSchema = z.array(categoriesResponseSchema);

export {
  categoriesRequestSchema,
  categoriesResponseSchema,
  categoriesListSchema,
};
