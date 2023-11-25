import { Request, Response } from 'express';
import { UserInfo } from '../models/userinfo.model.js';

type UserDb = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const findOne = async (email: string): Promise<UserDb | null> => {
  console.log("Searching for user with email:", email);

  try {
    const userDb = await UserInfo.findOne({
      where: { email: email },
    });

    if (userDb) {
      const userData = userDb.get({ plain: true }) as UserDb;
      console.log("User found:", userData);
      return userData;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (err) {
    console.error("Error during findOne:", err);
    throw err;
  }
};

export const login = async (req: Request, res: Response) => {
  const userInfo: LoginRequest = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const userDb = await findOne(userInfo.email);

    if (userDb) {
      console.log("userInfo.password: ", userInfo.password);
      console.log("userDb.password: ", userDb.password);
      
      if ((userInfo.password.trim() === userDb.password.trim())) {
        // Send a JSON response
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: "Error during login: " + err.message });
  }
};

export const create = (req: Request, res: Response) => {
  const userInfo: RegisterRequest = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  UserInfo.create(userInfo as any)
    .then((data) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
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
        message: err.message || "Some error occurred while retrieving user."
      });
    });
};

export const update = (req: Request, res: Response) => {
  const id = req.params.id;

  UserInfo.update(req.body, { where: { id: id } })
    .then((result) => {
      const [affectedRows] = result;
      if (affectedRows === 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty.`
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

export const deleteUserInfo = (req: Request, res: Response) => {
  const id = req.params.id;

  UserInfo.destroy({ where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "User was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found.`
        });
      }
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};

export const deleteAll = (req: Request, res: Response) => {
  UserInfo.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `${nums} users were deleted successfully.` });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users."
      });
    });
};
