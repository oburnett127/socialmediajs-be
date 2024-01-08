import { injectable } from 'inversify';
import { Userinfo } from '../models/userinfo.model.js';
import logger from '../config/logger.js';
import { RefreshToken } from '../models/refreshtoken.model.js';
import bcrypt from 'bcryptjs';

export interface UserinfoPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  id: number;
  email: string;
  password: string;
}

interface RefreshTokenPayload {
  token: string;
  userId: number;
  expiryDate: Date;
}

interface RefreshTokenCreationAttributes {
  token: string;
  userId: number;
  expiryDate: Date;
}

@injectable()
export class UserinfoService {

  public async login(loginInfo: LoginPayload): Promise<boolean> {
    return Userinfo.findOne({
      where: { email: loginInfo.email },
    })
      .then(async (userinfo) => {
        if (!userinfo) return false;
        const receivedHashedPassword = loginInfo.password;
        const storedHashedPassword = userinfo.password;
        const passwordMatch = await bcrypt.compare(receivedHashedPassword, storedHashedPassword);
        return passwordMatch;
      })
      .catch((err) => {
        logger.error(err.message);
        throw err;
      });
  }
  
  public async create(userinfo: UserinfoPayload): Promise<Userinfo | void> {
    return Userinfo.create(userinfo as any)
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async saveRefreshToken(refreshTokenPayload: RefreshTokenPayload): Promise<void> {
    try {
        const payload: RefreshTokenCreationAttributes = {
            token: refreshTokenPayload.token,
            userId: refreshTokenPayload.userId,
            expiryDate: refreshTokenPayload.expiryDate
        };
        await RefreshToken.create(payload as any);
    } catch (error) {
        console.error("Error saving refresh token:", error);
        throw new Error("Could not save refresh token.");
    }
}

  public async findAll(): Promise<Userinfo[] | void> {
    return Userinfo.findAll()
      .then((data: any) => data)
      .catch((err: { message: any; }) => { logger.error(err.message); throw err; });
  }

  public async findOne(id: string): Promise<Userinfo | void> {
    return Userinfo.findByPk(id)
      .then((data: any) => data)
      .catch((err: any) => {logger.error(err.message); throw err; });
  }

  public async findByEmail(email: string): Promise<Userinfo | void> {
    return Userinfo.findOne({
      where: { email: email },
    })
    .then((data: any) => data)
    .catch((err: any) => {logger.error(err.message); throw err; });
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
