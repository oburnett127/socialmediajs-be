import { Request, Response } from 'express';
import { db2 } from '../models'; // Replace with the actual path to your Sequelize models

// Assuming db2.userinfo is a Sequelize model with a correctly typed definition
const UserInfo = db2.userinfo;

interface UserInfoRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export const create = (req: Request, res: Response) => {
  const userInfo: UserInfoRequest = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isAdmin: req.body.isAdmin || false, // Simplified with logical OR operator
  };

  UserInfo.create(userInfo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the UserInfo."
      });
    });
};

export const findAll = (req: Request, res: Response) => {
  UserInfo.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving userInfos."
      });
    });
};

export const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  UserInfo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find UserInfo with id=${id}.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving UserInfo with id=" + id
      });
    });
};

export const update = (req: Request, res: Response) => {
  const id = req.params.id;

  UserInfo.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "UserInfo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update UserInfo with id=${id}. Maybe UserInfo was not found or req.body is empty.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating UserInfo with id=" + id
      });
    });
};

export const deleteUserInfo = (req: Request, res: Response) => {
  const id = req.params.id;

  UserInfo.destroy({ where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "UserInfo was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete UserInfo with id=${id}. Maybe UserInfo was not found.`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete UserInfo with id=" + id
      });
    });
};

export const deleteAll = (req: Request, res: Response) => {
  UserInfo.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `${nums} UserInfos were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all userInfos."
      });
    });
};

export const findAllPublished = (req: Request, res: Response) => {
  UserInfo.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving userInfos."
      });
    });
};
