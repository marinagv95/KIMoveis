import { Request, Response } from "express";
import { TScheduleRequest } from "../interfaces/shedule.interface";
import { Schedule } from "../entities/schedules.entity";
import createScheduleService from "../services/schedule/CreateSchedules.service";
import listAllSchedulesService from "../services/schedule/listAllSchedules.service";
import { RealEstate } from "../entities";

const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.userId);
  const scheduleData: TScheduleRequest = req.body;

  await createScheduleService(userId, scheduleData);

  return res.status(201).json({ message: "Schedule created" });
};

const listAllSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const scheduleId: number = parseInt(req.params.id);
  const schedules: RealEstate | null = await listAllSchedulesService(
    scheduleId
  );

  return res.json(schedules);
};

export { createSchedulesController, listAllSchedulesController };
