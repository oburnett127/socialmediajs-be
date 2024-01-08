import { injectable } from 'inversify';
import { OrderProduct } from '../models/orderproduct.model.js';
import logger from '../config/logger.js';
import { Category } from 'app/models/category.model.js';

export interface OrderProductPayload {
  name: string;
  description: string;
  unitPrice: string;
  imageUrl: string;
  category: Category;
  stockQuantity: number;
  manufacturer: string;
}

@injectable()
export class OrderProductService {

  public async create(orderProduct: OrderProductPayload): Promise<OrderProduct | void> {
    return OrderProduct.create(orderProduct as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<OrderProduct[] | void> {
    return OrderProduct.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }


  public async findOne(id: string): Promise<OrderProduct | void> {
    return OrderProduct.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async update(orderProduct: OrderProductPayload, id: string): Promise<void | number[]> {
   return OrderProduct.update(orderProduct, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteOrderProduct(id: string): Promise<void | number> {
    return OrderProduct.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteAll(): Promise<void | number> {
    return OrderProduct.destroy({
      where: {},
      truncate: false
    })
      .then((num: number) => num)
      .catch((err: any ) => { logger.error(err.message); throw err });
  }
}
