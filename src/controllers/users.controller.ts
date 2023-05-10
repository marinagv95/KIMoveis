import { Request, Response } from "express";

import {
  TUserRequest,
  TUserResponse,
  TUsersUpdateRequest,
} from "../interfaces/users.interface";
import createUsersService from "../services/users/createUsers.service";
import retrieveUsersService from "../services/users/retrieveUsersService.service";
import listUsersService from "../services/users/listUsersServices.service";
import updateUsersService from "../services/users/updateUserService.service";
import deleteUsersService from "../services/users/deleteUsersService.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const newUser = await createUsersService(userData);
  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();
  return res.json(users);
};

const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const user: TUserResponse = await retrieveUsersService(userId);

  return res.json(user);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUsersUpdateRequest = req.body;
  const userId: number = parseInt(req.params.id);

  const newUserData: TUserResponse = await updateUsersService(userData, userId);
  return res.json(newUserData);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  await deleteUsersService(userId);

  return res.status(204).send();
};

export {
  createUsersController,
  listUsersController,
  retrieveUsersController,
  updateUsersController,
  deleteUsersController,
};
