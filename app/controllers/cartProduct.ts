import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { CartProductPayload, CartProductService } from '../service/cartproduct.js';
import { TYPES } from '../service/types.js';
import logger from '../config/logger.js';

@controller('/cartProduct')
export class CartProductController implements interfaces.Controller {

  constructor(
    @inject(TYPES.CartProductService) private cartProductService: CartProductService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createCartProduct(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const cartProduct: CartProductPayload = req.body;

    if (!cartProduct) {
      res.sendStatus(400);
    }

    const createCartProduct = await this.cartProductService.create(cartProduct);
    if (createCartProduct) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll')
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.cartProductService.findAll();
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

    const response = await this.cartProductService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const cartProduct: CartProductPayload = req.body; 
    if (!cartProduct || !id) {
      res.sendStatus(400);
    }

    const response = await this.cartProductService.update(cartProduct, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteCartProduct/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteCartProduct(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.cartProductService.deleteCartProduct(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.cartProductService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
}