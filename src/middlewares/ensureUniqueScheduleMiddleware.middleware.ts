import { NextFunction, Request, Response } from "express";
import { Address, RealEstate, Schedule } from "../entities";
import { AppDataSource } from "../data-source";

const ensureUniqueScheduleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { date, hour } = req.body;
  const userId = res.locals.userId;

  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const existingSchedule = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.userId = :userId", { userId })
    .andWhere("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .getOne();

  if (existingSchedule) {
    return res.status(409).json({
      message:
        "User schedule to this real estate at this date and time already exists",
    });
  }

  return next();
};

export default ensureUniqueScheduleMiddleware;
