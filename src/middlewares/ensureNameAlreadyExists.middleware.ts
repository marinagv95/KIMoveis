import { NextFunction, Request, Response } from "express";
import { Category, User } from "../entities";
import { AppDataSource } from "../data-source";

const ensureNameAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateName = req.body;
  req.body = validateName;
  const { name } = req.body;

  if (name) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const existingCategory = await categoryRepository.findOne({
      where: { name },
    });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }
  }

  return next();
};

export default ensureNameAlreadyExistsMiddleware;
