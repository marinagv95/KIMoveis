import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities/category.entity";

const listAllCategoriesByRealEstateService = async (
  categoryId: number
): Promise<Category | null> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Category | null = await categoryRepository
    .createQueryBuilder("category")
    .innerJoinAndSelect("category.realEstate", "real_estate")
    .where("category.id = :categoryId", { categoryId })
    .getOne();

  return categories;
};

export default listAllCategoriesByRealEstateService;
