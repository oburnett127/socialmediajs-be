import { injectable } from 'inversify';
import { Userinfo } from '../models/userinfo.model.js';
import logger from '../config/logger.js';
import { RefreshToken } from '../models/refreshtoken.model.js';

export interface UserinfoPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface RefreshTokenPayload {
  token: string;
  email: string;
  expiryDate: Date;
}

@injectable()
export class UserinfoService {

  public async login(loginInfo: LoginPayload): Promise<boolean> {
    return Userinfo.findOne({
      where: { email: loginInfo.email },
    })
      .then((userinfo) => {
        if (!userinfo) return false;
        const isValidPassword = loginInfo.password === userinfo.dataValues.password;
        return isValidPassword;
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
        await RefreshToken.create({
            token: refreshTokenPayload.token,
            email: refreshTokenPayload.email,
            expiryDate: refreshTokenPayload.expiryDate
        });
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
