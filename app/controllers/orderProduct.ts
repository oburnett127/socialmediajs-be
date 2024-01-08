import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { OrderProductPayload, OrderProductService } from '../service/orderproduct.js';
import { TYPES } from '../service/types.js';
import logger from '../config/logger.js';

@controller('/orderProduct')
export class OrderProductController implements interfaces.Controller {

  constructor(
    @inject(TYPES.OrderProductService) private orderProductService: OrderProductService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createOrderProduct(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const orderProduct: OrderProductPayload = req.body;

    if (!orderProduct) {
      res.sendStatus(400);
    }

    const createOrderProduct = await this.orderProductService.create(orderProduct);
    if (createOrderProduct) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll')
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.orderProductService.findAll();
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

    const response = await this.orderProductService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const orderProduct: OrderProductPayload = req.body; 
    if (!orderProduct || !id) {
      res.sendStatus(400);
    }

    const response = await this.orderProductService.update(orderProduct, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteOrderProduct/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteOrderProduct(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.orderProductService.deleteOrderProduct(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.orderProductService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
}