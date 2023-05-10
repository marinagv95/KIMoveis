import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureAdminIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const isAdmin = res.locals.admin;
  const id = parseInt(res.locals.userId);
  const UserId = parseInt(req.params.id);

  if (!isAdmin && id !== UserId) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
export default ensureAdminIsValidMiddleware;
