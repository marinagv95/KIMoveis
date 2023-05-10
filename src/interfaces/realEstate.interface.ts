import { z } from "zod";
import {
  listRealEstateSchema,
  realEstateRequestSchema,
  realEstateResponseSchema,
} from "../schemas/realEstate.schema";

type TRealEstateRequest = z.infer<typeof realEstateRequestSchema>;
type TRealEstateResponse = z.infer<typeof realEstateResponseSchema>;

type TRealEstateList = z.infer<typeof listRealEstateSchema>;

export { TRealEstateRequest, TRealEstateResponse, TRealEstateList };
