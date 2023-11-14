import { Request, Response } from 'express';
import { UserInfo } from '../models/userinfo.model.js';

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
    isAdmin: req.body.isAdmin || false,
  };

  UserInfo.create(userInfo as any)
    .then((data) => {
      res.send(data);
    })
    .catch((err: Error) => {
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
    .catch((err: Error) => {
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
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error retrieving UserInfo with id=" + id
      });
    });
};

export const update = (req: Request, res: Response) => {
  const id = req.params.id;

  UserInfo.update(req.body, { where: { id: id } })
    .then((result) => {
      // Sequelize returns an array where the first element is the number of rows affected
      const [affectedRows] = result;
      if (affectedRows === 1) {
        res.send({
          message: "UserInfo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update UserInfo with id=${id}. Maybe UserInfo was not found or req.body is empty.`
        });
      }
    })
    .catch((err: Error) => {
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
    .catch((err: Error) => {
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
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all userInfos."
      });
    });
};
