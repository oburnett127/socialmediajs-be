import { injectable } from 'inversify';
import { Job } from '../models/job.model.js';
import logger from '../config/logger.js';

export interface JobPayload {
  title: string;
  description: string;
  requirements: string;
  postDate: Date;
}

@injectable()
export class JobService {

  public async create(job: JobPayload): Promise<Job | void> {
    return Job.create(job as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findAll(): Promise<Job[] | void> {
    return Job.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }


  public async findOne(id: string): Promise<Job | void> {
    return Job.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async update(job: JobPayload, id: string): Promise<void | number[]> {
   return Job.update(job, { where: { id: id } })
    .then((affectedCount: number[]) => affectedCount)
    .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async deleteJob(id: string): Promise<void | number> {
    return Job.destroy({ where: { id: id } })
      .then((num: number) => num)
      .catch((err: any) => { logger.error(err.message); throw err; });
  }

  public async deleteAll(): Promise<void | number> {
    return Job.destroy({
      where: {},
      truncate: false
    })
      .then((num: number) => num)
      .catch((err: any ) => { logger.error(err.message); throw err; });
  }
}
