import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenisValid.middleware";
import {
  createSchedulesController,
  listAllSchedulesController,
} from "../controllers/schedule.controller";
import ensureAdminIsValidMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureCheckTimeSchedule from "../middlewares/ensureCheckTimeSchedule.middleware";
import ensureNotUserSchedule from "../middlewares/ensureNotUserSchedules.middleware";
import ensureRealEstateExistsMiddleware from "../middlewares/ensureRealEstateExists.middleware";
import ensureRealEstateForSchedulePostExistsMiddleware from "../middlewares/ensureRealEstateForPostSchedule.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValidMiddleware.middleware";
import { ScheduleSchemaPost } from "../schemas/schedules.schema";
import ensureUniqueRealEstateMiddleware from "../middlewares/ensureUniqueRealEstate.middleware";
import ensureUniqueScheduleMiddleware from "../middlewares/ensureUniqueScheduleMiddleware.middleware";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(ScheduleSchemaPost),
  ensureRealEstateForSchedulePostExistsMiddleware,
  ensureUniqueScheduleMiddleware,
  ensureUniqueRealEstateMiddleware,
  ensureCheckTimeSchedule,
  createSchedulesController
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureNotUserSchedule,
  ensureRealEstateExistsMiddleware,
  listAllSchedulesController
);

export default schedulesRoutes;
