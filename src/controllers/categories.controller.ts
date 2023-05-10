import { Response, Request } from "express";
import { TCategoriesRequest } from "../interfaces/categories.interface";
import { Category } from "../entities/category.entity";
import createCategoryService from "../services/categories/createCategories.service";
import listAllCategoriesByRealEstateService from "../services/categories/listAllCategoriesByRealEstate.service";
import listAllCategoriesService from "../services/categories/listAllCategories.service";
import { RealEstate } from "../entities";

const createCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoriesData: TCategoriesRequest = req.body;
  const newCategory: Category = await createCategoryService(categoriesData);
  return res.status(201).json(newCategory);
};

const listAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category = await listAllCategoriesService();

  return res.json(category);
};

const listAllCategoriesbyRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);

  const categoryRealEstate: Category | null =
    await listAllCategoriesByRealEstateService(categoryId);

  return res.json(categoryRealEstate);
};

export {
  createCategoriesController,
  listAllCategoriesController,
  listAllCategoriesbyRealEstateController,
};
