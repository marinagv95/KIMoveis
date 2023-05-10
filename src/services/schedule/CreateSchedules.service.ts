import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { TScheduleRequest } from "../../interfaces/shedule.interface";
import { Schedule } from "../../entities/schedules.entity";

const createScheduleService = async (
  userId: number,
  scheduleData: TScheduleRequest
): Promise<Schedule> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const user: User | null = await userRepository.findOneBy({ id: userId });

  const schedule: Schedule = scheduleRepository.create({
    ...scheduleData,
    user: user!,
  });

  await scheduleRepository.save(schedule);

  return schedule;
};

export default createScheduleService;
