import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { listUserSchema } from "../../schemas/users.schema";
import { TUsersResponse } from "../../interfaces/users.interface";

const listUsersService = async (): Promise<TUsersResponse[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find();

  const returnUsers: TUsersResponse[] = listUserSchema.parse(users);

  return returnUsers;
};

export default listUsersService;
