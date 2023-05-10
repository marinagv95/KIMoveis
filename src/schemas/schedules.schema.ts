import { z } from "zod";
import { userSchemaResponse } from "./users.schema";
import { realEstateResponseSchema } from "./realEstate.schema";

const scheduleRequestSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hour: z.string().regex(/^\d{2}:\d{2}$/),
  realEstateId: z.number(),
});

const ScheduleSchemaPost = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const scheduleResponseSchema = scheduleRequestSchema
  .extend({
    id: z.number(),
    user: userSchemaResponse,
    realEstate: realEstateResponseSchema,
  })
  .omit({
    realEstateId: true,
  });

const schedulesRealEstateSchema = z.object({
  id: z.number(),
  userId: userSchemaResponse,
});

export {
  scheduleResponseSchema,
  scheduleRequestSchema,
  schedulesRealEstateSchema,
  ScheduleSchemaPost,
};
