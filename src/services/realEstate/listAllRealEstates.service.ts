import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { TRealEstateResponse } from "../../interfaces/realEstate.interface";

const listAllRealEstateService = async (): Promise<TRealEstateResponse[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstates: Array<RealEstate> = await realEstateRepository.find({
    relations: { address: true },
  });

  return realEstates;
};

export default listAllRealEstateService;
