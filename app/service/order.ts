import { injectable } from 'inversify';
import { Order } from '../models/order.model.js';
import logger from '../config/logger.js';
import { Category } from 'app/models/category.model.js';

export interface OrderPayload {
  name: string;
  description: string;
  unitPrice: string;
  imageUrl: string;
  category: Category;
  stockQuantity: number;
  manufacturer: string;
}

@injectable()
export class OrderService {

  public async create(order: OrderPayload): Promise<Order | void> {
    return Order.create(order as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<Order[] | void> {
    return Order.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }


  public async findOne(id: string): Promise<Order | void> {
    return Order.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async update(order: OrderPayload, id: string): Promise<void | number[]> {
   return Order.update(order, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteOrder(id: string): Promise<void | number> {
    return Order.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteAll(): Promise<void | number> {
    return Order.destroy({
      where: {},
      truncate: false
    })
      .then((num: number) => num)
      .catch((err: any ) => { logger.error(err.message); throw err });
  }
}
