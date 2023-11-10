import { Request, Response } from 'express';
import { initializeJobModel } from '../models/job.model.js';
import db from '../models/index.js';
import {Job } from '../models/job.model.js';

const sequelize = db.sequelize;

//const Job = initializeJobModel(sequelize);

interface JobModelInstance {
  create: (job: any) => Promise<any>;
  findAll: (options?: any) => Promise<any>;
  findByPk: (id: string | number) => Promise<any>;
  update: (values: any, options: any) => Promise<[number, any[]]>;
  destroy: (options: any) => Promise<number>;
}

interface JobPayload {
  title: string;
  description: string;
  requirements: string;
  postDate: Date;
}

export const create = (req: Request, res: Response) => {
  const job: JobPayload = {
    title: req.body.title,
    description: req.body.description,
    requirements: req.body.requirements,
    postDate: req.body.postDate,
  };

  Job.create(job as any)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Job."
      });
    });
};
