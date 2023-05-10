import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenisValid.middleware";
import {
  createRealEstateController,
  listAllRealEstateController,
} from "../controllers/realEstate.controller";
import ensureAdminIsValidMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureAddressExistsMiddleware from "../middlewares/ensureUniqueAddress.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValidMiddleware.middleware";
import { realEstateRequestSchema } from "../schemas/realEstate.schema";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminIsValidMiddleware,
  ensureDataIsValidMiddleware(realEstateRequestSchema),
  ensureAddressExistsMiddleware,
  createRealEstateController
);

realEstateRoutes.get("", listAllRealEstateController);

export default realEstateRoutes;
