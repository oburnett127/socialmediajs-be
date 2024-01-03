import { injectable } from 'inversify';
import { Category } from '../models/category.model.js';
import logger from '../config/logger.js';

export interface CategoryPayload {
  name: string;
  description: string;
  unitPrice: string;
  imageUrl: string;
  category: Category;
  stockQuantity: number;
  manufacturer: string;
}

@injectable()
export class CategoryService {

  public async create(category: CategoryPayload): Promise<Category | void> {
    return Category.create(category as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<Category[] | void> {
    return Category.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findOne(id: string): Promise<Category | void> {
    return Category.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async update(category: CategoryPayload, id: string): Promise<void | number[]> {
   return Category.update(category, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteCategory(id: string): Promise<void | number> {
    return Category.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteAll(): Promise<void | number> {
    return Category.destroy({
      where: {},
      truncate: false
    })
      .then((num: number) => num)
      .catch((err: any ) => { logger.error(err.message); throw err });
  }
}
