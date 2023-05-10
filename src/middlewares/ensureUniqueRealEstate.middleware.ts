import { NextFunction, Request, Response } from "express";
import { Schedule } from "../entities";
import { AppDataSource } from "../data-source";

const ensureUniqueRealEstateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { realEstateId } = req.body;

  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const existingSchedule = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.realEstateId = :realEstateId", { realEstateId })
    .getOne();

  if (existingSchedule) {
    return res.status(409).json({
      message:
        "Schedule to this real estate at this date and time already exists",
    });
  }

  return next();
};

export default ensureUniqueRealEstateMiddleware;
