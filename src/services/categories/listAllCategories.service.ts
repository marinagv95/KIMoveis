import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities/category.entity";

const listAllCategoriesService = async (): Promise<Category[]> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category[] = await categoryRepository
    .createQueryBuilder("categories")
    .select(["categories.id", "categories.name"])
    .getMany();

  return category;
};

export default listAllCategoriesService;
