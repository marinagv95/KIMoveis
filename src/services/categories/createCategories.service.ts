import { InsertResult, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TCategoriesRequest } from "../../interfaces/categories.interface";
import { Category } from "../../entities/category.entity";

const createCategoriesService = async (
  categoriesData: TCategoriesRequest
): Promise<Category> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepository.create(categoriesData);
  await categoryRepository.save(category);

  return category;
};

export default createCategoriesService;
