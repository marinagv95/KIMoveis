import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";

const ensureCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is missing" });
  }

  const categoryRepository = AppDataSource.getRepository(Category);
  const existingCategory = await categoryRepository.findOneBy({
    id: Number(id),
  });

  if (!existingCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  next();
};

export default ensureCategoryExistsMiddleware;
