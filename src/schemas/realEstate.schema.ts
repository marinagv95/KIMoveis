import { z } from "zod";
import { categoriesResponseSchema } from "./categories.schema";

const addressRequestSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const addressReturnSchema = addressRequestSchema.extend({
  id: z.number(),
});

const realEstateRequestSchema = z.object({
  sold: z.boolean().default(false).optional(),
  value: z.string().or(z.number().positive()).default(0),
  size: z.number().positive().int(),
  address: addressRequestSchema,
  categoryId: z.number(),
});

const realEstateResponseSchema = realEstateRequestSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullish(),
    address: addressReturnSchema.pick({
      street: true,
      zipCode: true,
      number: true,
      city: true,
      state: true,
      id: true,
    }),
    category: categoriesResponseSchema,
  })
  .omit({
    categoryId: true,
  });

const listRealEstateSchema = z.array(realEstateResponseSchema);

export {
  realEstateRequestSchema,
  realEstateResponseSchema,
  addressRequestSchema,
  addressReturnSchema,
  listRealEstateSchema,
};
