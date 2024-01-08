import { injectable } from 'inversify';
import { CartProduct } from '../models/cartproduct.model.js';
import logger from '../config/logger.js';
import { Category } from 'app/models/category.model.js';

export interface CartProductPayload {
  name: string;
  description: string;
  unitPrice: string;
  imageUrl: string;
  category: Category;
  stockQuantity: number;
  manufacturer: string;
}

@injectable()
export class CartProductService {

  public async create(cartProduct: CartProductPayload): Promise<CartProduct | void> {
    return CartProduct.create(cartProduct as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<CartProduct[] | void> {
    return CartProduct.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }


  public async findOne(id: string): Promise<CartProduct | void> {
    return CartProduct.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async update(cartProduct: CartProductPayload, id: string): Promise<void | number[]> {
   return CartProduct.update(cartProduct, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteCartProduct(id: string): Promise<void | number> {
    return CartProduct.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteAll(): Promise<void | number> {
    return CartProduct.destroy({
      where: {},
      truncate: false
    })
      .then((num: number) => num)
      .catch((err: any ) => { logger.error(err.message); throw err });
  }
}
