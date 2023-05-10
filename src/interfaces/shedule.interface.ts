import { z } from "zod";
import {
  scheduleRequestSchema,
  scheduleResponseSchema,
  schedulesRealEstateSchema,
} from "../schemas/schedules.schema";
import { DeepPartial } from "typeorm";

type TScheduleRequest = z.infer<typeof scheduleRequestSchema>;
type TScheduleResponse = z.infer<typeof scheduleResponseSchema>;
type TSheduleRealEstate = z.infer<typeof schedulesRealEstateSchema>;

type TSchedulePartial = DeepPartial<TScheduleRequest>;

export {
  TScheduleRequest,
  TScheduleResponse,
  TSheduleRealEstate,
  TSchedulePartial,
};
