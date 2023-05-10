import { NextFunction, Request, Response } from "express";
import { RealEstate } from "../entities";
import { AppDataSource } from "../data-source";

const ensureRealEstateForSchedulePostExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  const id = req.body.realEstateId;

  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const existingRealEstate = await realEstateRepository.findOneBy({
    id: Number(id),
  });

  if (!existingRealEstate) {
    return res.status(404).json({ message: "RealEstate not found" });
  }

  next();
};

export default ensureRealEstateForSchedulePostExistsMiddleware;
