import { injectable } from 'inversify';
import { Payment } from '../models/payment.model.js';
import logger from '../config/logger.js';
import { Category } from 'app/models/category.model.js';

export interface PaymentPayload {
  name: string;
  description: string;
  unitPrice: string;
  imageUrl: string;
  category: Category;
  stockQuantity: number;
  manufacturer: string;
}

@injectable()
export class PaymentService {

  public async create(payment: PaymentPayload): Promise<Payment | void> {
    return Payment.create(payment as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<Payment[] | void> {
    return Payment.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }


  public async findOne(id: string): Promise<Payment | void> {
    return Payment.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async update(payment: PaymentPayload, id: string): Promise<void | number[]> {
   return Payment.update(payment, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deletePayment(id: string): Promise<void | number> {
    return Payment.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteAll(): Promise<void | number> {
    return Payment.destroy({
      where: {},
      truncate: false
    })
      .then((num: number) => num)
      .catch((err: any ) => { logger.error(err.message); throw err });
  }
}
