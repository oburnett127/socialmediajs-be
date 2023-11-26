import { injectable } from 'inversify';
import { Stakeholder } from '../models/stakeholder.model.js';
import logger from '../config/logger.js';

export interface StakeholderPayload {
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

@injectable()
export class StakeholderService {

  public async create(stakeholder: StakeholderPayload): Promise<Stakeholder | void> {
    return Stakeholder.create(stakeholder as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<Stakeholder[] | void> {
    return Stakeholder.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }


  public async findOne(id: string): Promise<Stakeholder | void> {
    return Stakeholder.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async update(stakeholder: StakeholderPayload, id: string): Promise<void | number[]> {
   return Stakeholder.update(stakeholder, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteStakeholder(id: string): Promise<void | number> {
    return Stakeholder.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err });
  }

  public async deleteAll(): Promise<void | number> {
    return Stakeholder.destroy({
      where: {},
      truncate: false
    })
      .then((num: number) => num)
      .catch((err: any ) => { logger.error(err.message); throw err });
  }
}
