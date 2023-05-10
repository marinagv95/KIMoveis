import { z } from "zod";

const userSchemaRequest = z.object({
  name: z.string().max(45),
  email: z.string().max(45).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
});

const userSchema = userSchemaRequest.extend({
  id: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
  deletedAt: z.string().nullish(),
});

const userSchemaResponse = userSchema.omit({
  password: true,
});

const listUserSchema = userSchemaResponse.array();

const userSchemaUpdateRequest = userSchema.partial().omit({
  admin: true,
  id: true,
});

const requestLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const responseLoginSchema = z.object({
  token: z.string(),
});
const loginUserSchema = userSchema.pick({
  email: true,
  password: true,
});

export {
  userSchemaRequest,
  userSchema,
  userSchemaResponse,
  userSchemaUpdateRequest,
  listUserSchema,
  loginUserSchema,
  responseLoginSchema,
  requestLoginSchema,
};
