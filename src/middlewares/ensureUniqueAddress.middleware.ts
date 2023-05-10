import { NextFunction, Request, Response } from "express";
import { Address, RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureAddressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const validateAddress = req.body;
  req.body = validateAddress;

  const { zipCode } = req.body.address;

  if (zipCode) {
    const addressRepository = AppDataSource.getRepository(Address);
    const existingZipCode = await addressRepository.findOne({
      where: { zipCode },
    });

    if (existingZipCode) {
      return res.status(409).json({ message: "Address already exists" });
    }

    return next();
  }
};

export default ensureAddressExistsMiddleware;
