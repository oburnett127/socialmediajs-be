import { Request, Response } from 'express';
import { Job } from '../models/job.model.js';

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
    .then((data) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Job."
      });
    });
};

export const findAll = (req: Request, res: Response) => {
  Job.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving jobs."
      });
    });
};

export const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Job.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Job with id=${id}.`
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error retrieving Job with id=" + id
      });
    });
};

export const update = (req: Request, res: Response) => {
  const id = req.params.id;

  Job.update(req.body, { where: { id: id } })
    .then(([affectedCount]: [number]) => {
      if (affectedCount === 1) {
        res.send({
          message: "Job was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Job with id=${id}. Maybe Job was not found or req.body is empty.`
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error updating Job with id=" + id
      });
    });
};



export const deleteJob = (req: Request, res: Response) => {
  const id = req.params.id;

  Job.destroy({
    where: { id: id }
  })
    .then((num: number) => {
      if (num === 1) {
        res.send({
          message: "Job was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Job with id=${id}. Maybe Job was not found.`
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Could not delete Job with id=" + id
      });
    });
};

export const deleteAll = (req: Request, res: Response) => {
  Job.destroy({
    where: {},
    truncate: false
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Jobs were deleted successfully.` });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all jobs."
      });
    });
};
