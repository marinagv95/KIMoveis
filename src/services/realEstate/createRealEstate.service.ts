import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate, Schedule } from "../../entities";
import { TRealEstateRequest } from "../../interfaces/realEstate.interface";
import { AppError } from "../../error";

const createRealEstateService = async (
  realEstateData: TRealEstateRequest,
  scheduleId: number
): Promise<RealEstate> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const category: Category | null = await categoryRepository.findOne({
    where: { id: realEstateData.categoryId },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const newAddress: Address = addressRepository.create({
    street: realEstateData.address.street,
    number: realEstateData.address.number,
    city: realEstateData.address.city,
    state: realEstateData.address.state,
    zipCode: realEstateData.address.zipCode,
  });

  await addressRepository.save(newAddress);

  const realEstate: RealEstate = realEstateRepository.create({
    value: realEstateData.value,
    size: realEstateData.size,
    address: newAddress,
    category: category,
  });

  await realEstateRepository.save(realEstate);

  return realEstate;
};

export default createRealEstateService;
