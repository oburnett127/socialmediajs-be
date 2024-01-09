import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { PaymentPayload, PaymentService } from '../service/payment.js';
import { TYPES } from '../service/types.js';

@controller('/payment')
export class PaymentController implements interfaces.Controller {

  constructor(
    @inject(TYPES.PaymentService) private paymentService: PaymentService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createPayment(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const payment: PaymentPayload = req.body;

    if (!payment) {
      res.sendStatus(400);
    }

    const createPayment = await this.paymentService.create(payment);
    if (createPayment) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll', localPassport.authenticate('jwt', { session: false}))
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.paymentService.findAll();
    if (response) {
      res.status(200)
      res.send(response);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findOne/:id', localPassport.authenticate('jwt', { session: false}))
  private async findOne(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.paymentService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const payment: PaymentPayload = req.body; 
    if (!payment || !id) {
      res.sendStatus(400);
    }

    const response = await this.paymentService.update(payment, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deletePayment/:id', localPassport.authenticate('jwt', { session: false}))
  private async deletePayment(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.paymentService.deletePayment(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.paymentService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
}