import { Router } from "express";
import {
  userSchemaRequest,
  userSchemaUpdateRequest,
} from "../schemas/users.schema";
import {
  createUsersController,
  deleteUsersController,
  listUsersController,
  retrieveUsersController,
  updateUsersController,
} from "../controllers/users.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValidMiddleware.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenisValid.middleware";
import ensureEmailAlreadyExistsMiddleware from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensureAdminIsValidMiddleware from "../middlewares/ensureIsAdmin.middleware";
import ensureIdExistsMiddleware from "../middlewares/ensureUserExists.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureEmailAlreadyExistsMiddleware,
  ensureDataIsValidMiddleware(userSchemaRequest),
  createUsersController
);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminIsValidMiddleware,
  listUsersController
);
userRoutes.get(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureAdminIsValidMiddleware,
  retrieveUsersController
);

userRoutes.patch(
  "/:id",
  ensureIdExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureAdminIsValidMiddleware,
  ensureDataIsValidMiddleware(userSchemaUpdateRequest),
  updateUsersController
);
userRoutes.delete(
  "/:id",
  ensureIdExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureAdminIsValidMiddleware,
  deleteUsersController
);

export default userRoutes;
