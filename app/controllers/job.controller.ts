import { Request, Response } from 'express';
import { JobModel } from '../models/job.model'; // adjust the import path as necessary

// Assuming we have a Job model with the following interface
// Replace `any` with the actual type of the sequelize model instance if available
interface JobModelInstance {
  create: (job: any) => Promise<any>;
  findAll: (options?: any) => Promise<any>;
  findByPk: (id: string | number) => Promise<any>;
  update: (values: any, options: any) => Promise<[number, any[]]>;
  destroy: (options: any) => Promise<number>;
}

// Import the db object with its models
import { db } from '../models'; // Adjust the path to where your models are initialized
const Job = db.jobs as JobModelInstance;

// Define interfaces for the job structure
interface JobPayload {
  title: string;
  description: string;
  requirements: string;
  postDate: Date;
  published?: boolean; // Add if you have this field and it's optional
}

// Create and Save a new job
export const create = (req: Request, res: Response) => {
  // Validate request parameters, queries using express-validator
  const job: JobPayload = {
    title: req.body.title,
    description: req.body.description,
    requirements: req.body.requirements,
    postDate: req.body.postDate,
  };

  Job.create(job)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Job."
      });
    });
};

// Other functions (findAll, findOne, update, delete, deleteAll, findAllPublished) would follow the same pattern

// Make sure to also adjust your models to TypeScript with proper type definitions.
// For example, JobModel should be properly typed, reflecting Sequelize model definitions.
