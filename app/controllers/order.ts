import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { OrderPayload, OrderService } from '../service/order.js';
import { TYPES } from '../service/types.js';
import logger from '../config/logger.js';

@controller('/order')
export class OrderController implements interfaces.Controller {

  constructor(
    @inject(TYPES.OrderService) private orderService: OrderService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createOrder(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const order: OrderPayload = req.body;

    if (!order) {
      res.sendStatus(400);
    }

    const createOrder = await this.orderService.create(order);
    if (createOrder) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll')
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.orderService.findAll();
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

    const response = await this.orderService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const order: OrderPayload = req.body; 
    if (!order || !id) {
      res.sendStatus(400);
    }

    const response = await this.orderService.update(order, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteOrder/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteOrder(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.orderService.deleteOrder(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.orderService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
}