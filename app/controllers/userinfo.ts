import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import * as passport from 'passport';
import jwt from 'jsonwebtoken';
import { UserinfoPayload, LoginPayload, UserinfoService } from '../service/userinfo.js';
import { TYPES } from '../service/types.js';

@controller('/userinfo')
export class UserinfoController implements interfaces.Controller {

  constructor(
    @inject(TYPES.UserinfoService) private userinfoService: UserinfoService
  ) { }

  @httpPost('/login')
  private async login(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const loginInfo: LoginPayload = req.body;

    if (!loginInfo) {
      res.sendStatus(400);
    }

    const loginUserinfo = await this.userinfoService.login(loginInfo);

    if (loginUserinfo) {

      if (!process.env.JWT_SECRET) {
        console.error("JWT secret is undefined");
        res.sendStatus(500);
        return;
      }

      const token = jwt.sign({ sub: req.body.id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      res.status(200).json({ token: token });
    } else {
      res.sendStatus(500);
    }
  }

  @httpPost('/create', passport.authenticate('jwt', { session: false}))
  private async createUserinfo(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const userinfo: UserinfoPayload = req.body;

    if (!userinfo) {
      res.sendStatus(400);
    }

    const createUserinfo = await this.userinfoService.create(userinfo);
    if (createUserinfo) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll')
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.userinfoService.findAll();
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findOne/:id')
  private async findOne(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.userinfoService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpGet('/findByEmail/:email')
  private async findByEmail(@requestParam('email') email: string, @response() res: express.Response): Promise<void> {
    if (!email) {
      res.sendStatus(400);
    }

    const response = await this.userinfoService.findByEmail(email);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', passport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const userinfo: UserinfoPayload = req.body; 
    if (!userinfo || !id) {
      res.sendStatus(400);
    }

    const response = await this.userinfoService.update(userinfo, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteUserinfo/:id', passport.authenticate('jwt', { session: false}))
  private async deleteUserinfo(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.userinfoService.deleteUserinfo(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', passport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.userinfoService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

}