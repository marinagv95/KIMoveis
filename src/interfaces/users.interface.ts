import { z } from "zod";

import { DeepPartial } from "typeorm";
import {
  listUserSchema,
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
} from "../schemas/users.schema";

type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUser = z.infer<typeof userSchema>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TUsersResponse = z.infer<typeof userSchemaResponse>;
type TUsersUpdateRequest = DeepPartial<TUserRequest>;
type TlistAllUsers = z.infer<typeof listUserSchema>;

export {
  TUserRequest,
  TUser,
  TUserResponse,
  TUsersResponse,
  TUsersUpdateRequest,
  TlistAllUsers,
};
