import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
const ensureEmailAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const validateEmail = req.body;
  req.body = validateEmail;
  const { email } = req.body;
  if (email) {
    const userRepository = AppDataSource.getRepository(User);
    const existingEmail = await userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }
  }
  return next();
};
export default ensureEmailAlreadyExistsMiddleware;
