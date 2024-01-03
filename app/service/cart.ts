import { injectable } from 'inversify';
import { Cart } from '../models/cart.model.js';
import logger from '../config/logger.js';
import { Category } from 'app/models/category.model.js';

export interface CartPayload {
  name: string;
  description: string;
  unitPrice: string;
  imageUrl: string;
  category: Category;
  stockQuantity: number;
  manufacturer: string;
}

@injectable()
export class CartService {

  public async create(cart: CartPayload): Promise<Cart | void> {
    return Cart.create(cart as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<Cart[] | void> {
    return Cart.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }


  public async findOne(id: string): Promise<Cart | void> {
    return Cart.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async update(cart: CartPayload, id: string): Promise<void | number[]> {
   return Cart.update(cart, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteCart(id: string): Promise<void | number> {
    return Cart.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteAll(): Promise<void | number> {
    return Cart.destroy({
      where: {},
      truncate: false
    })
      .then((num: number) => num)
      .catch((err: any ) => { logger.error(err.message); throw err });
  }
}
