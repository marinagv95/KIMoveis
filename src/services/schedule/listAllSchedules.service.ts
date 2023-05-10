import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";

// const listAllSchedulesService = async (
//   scheduleId: number
// ): Promise<Schedule[]> => {
//   const schedulesRepository: Repository<Schedule> =
//     AppDataSource.getRepository(Schedule);

//   const schedules: Schedule[] = await schedulesRepository.find({
//     where: {
//       id: scheduleId,
//     },
//     relations: {
//       realEstate: {
//         address: true,
//         category: true,
//       },
//       user: true,
//     },
//   });

//   return schedules;
// };

const listAllSchedulesService = async (
  scheduleId: number
): Promise<RealEstate | null> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("real_estate")
    .leftJoinAndSelect("real_estate.address", "address")
    .leftJoinAndSelect("real_estate.category", "category")
    .innerJoinAndSelect("real_estate.schedules", "schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .where("real_estate.id = :scheduleId", { scheduleId })
    .getOne();

  return realEstate;
};

export default listAllSchedulesService;
