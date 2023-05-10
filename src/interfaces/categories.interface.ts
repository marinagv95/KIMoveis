import { z } from "zod";
import {
  categoriesListSchema,
  categoriesRequestSchema,
  categoriesResponseSchema,
} from "../schemas/categories.schema";

type TCategoriesRequest = z.infer<typeof categoriesRequestSchema>;
type TCategoriesResponse = z.infer<typeof categoriesResponseSchema>;
type TCategoriesList = z.infer<typeof categoriesListSchema>;

export { TCategoriesRequest, TCategoriesResponse, TCategoriesList };
