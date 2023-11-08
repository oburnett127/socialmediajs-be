import { Request, Response } from 'express';
import { db3 } from '../models'; // Adjust the import to your actual file structure
import { StakeholderInstance } from '../models/stakeholder'; // Assuming StakeholderInstance is properly typed

// Assuming db3.stakeholder is a Sequelize model instance with proper typing
const Stakeholder = db3.stakeholder as typeof StakeholderInstance;

interface StakeholderPayload {
  firstName: string;
  lastName: string;
  published?: boolean; // Include other fields as necessary
}

export const create = (req: Request, res: Response) => {
  const stakeholder: StakeholderPayload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    // include other fields from req.body as necessary
  };

  Stakeholder.create(stakeholder)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Stakeholder."
      });
    });
};

export const findAll = (req: Request, res: Response) => {
  Stakeholder.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stakeholders."
      });
    });
};

export const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Stakeholder.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Stakeholder with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Stakeholder with id=" + id
      });
    });
};

export const update = (req: Request, res: Response) => {
  const id = req.params.id;

  Stakeholder.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Stakeholder was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Stakeholder with id=${id}. Maybe Stakeholder was not found or req.body is empty.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Stakeholder with id=" + id
      });
    });
};

export const deleteStakeholder = (req: Request, res: Response) => {
  const id = req.params.id;

  Stakeholder.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Stakeholder was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Stakeholder with id=${id}. Maybe Stakeholder was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Stakeholder with id=" + id
      });
    });
};

export const deleteAll = (req: Request, res: Response) => {
  Stakeholder.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Stakeholders were deleted successfully.` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all stakeholders."
      });
    });
};

export const findAllPublished = (req: Request, res: Response) => {
  Stakeholder.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stakeholders."
      });
    });
};
