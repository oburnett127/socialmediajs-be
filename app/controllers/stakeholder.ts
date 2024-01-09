import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { StakeholderPayload, StakeholderService } from '../service/stakeholder.js';
import { TYPES } from '../service/types.js';

@controller('/stakeholder')
export class StakeholderController implements interfaces.Controller {

  constructor(
    @inject(TYPES.StakeholderService) private stakeholderService: StakeholderService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createStakeholder(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const stakeholder: StakeholderPayload = req.body;

    if (!stakeholder) {
      res.sendStatus(400);
    }

    const createStakeholder = await this.stakeholderService.create(stakeholder);
    if (createStakeholder) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll')
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.stakeholderService.findAll();
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

    const response = await this.stakeholderService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const stakeholder: StakeholderPayload = req.body; 
    if (!stakeholder || !id) {
      res.sendStatus(400);
    }

    const response = await this.stakeholderService.update(stakeholder, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteStakeholder/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteStakeholder(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.stakeholderService.deleteStakeholder(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.stakeholderService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
}