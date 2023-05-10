import { Router } from "express";
import {
  createCategoriesController,
  listAllCategoriesController,
  listAllCategoriesbyRealEstateController,
} from "../controllers/categories.controller";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenisValid.middleware";
import ensureAdminIsValidMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureNameAlreadyExistsMiddleware from "../middlewares/ensureNameAlreadyExists.middleware";
import ensureCategoryExistsMiddleware from "../middlewares/ensureCategoryAlreadyExists.middleware";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminIsValidMiddleware,
  ensureNameAlreadyExistsMiddleware,
  createCategoriesController
);

categoriesRoutes.get("", listAllCategoriesController);

categoriesRoutes.get(
  "/:id/realEstate",
  ensureCategoryExistsMiddleware,
  listAllCategoriesbyRealEstateController
);
export default categoriesRoutes;
