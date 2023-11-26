import { injectable } from 'inversify';
import { Userinfo } from '../models/userinfo.model.js';
import logger from '../config/logger.js';

export interface UserinfoPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@injectable()
export class UserinfoService {

  public async create(userinfo: UserinfoPayload): Promise<Userinfo | void> {
    return Userinfo.create(userinfo as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<Userinfo[] | void> {
    return Userinfo.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }


  public async findOne(id: string): Promise<Userinfo | void> {
    return Userinfo.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => console.log(err.message));
  }

  public async update(userinfo: UserinfoPayload, id: string): Promise<void | number[]> {
   return Userinfo.update(userinfo, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async deleteUserinfo(id: string): Promise<void | number> {
    return Userinfo.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async deleteAll(): Promise<void | number> {
    return Userinfo.destroy({
      where: {},
      truncate: false
    })
      .then((nums: any) => nums)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }
}
