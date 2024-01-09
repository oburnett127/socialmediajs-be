import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { ProductPayload, ProductService } from '../service/product.js';
import { TYPES } from '../service/types.js';

@controller('/product')
export class ProductController implements interfaces.Controller {

  constructor(
    @inject(TYPES.ProductService) private productService: ProductService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createProduct(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const product: ProductPayload = req.body;

    if (!product) {
      res.sendStatus(400);
    }

    const createProduct = await this.productService.create(product);
    if (createProduct) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll')
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.productService.findAll();
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

    const response = await this.productService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const product: ProductPayload = req.body; 
    if (!product || !id) {
      res.sendStatus(400);
    }

    const response = await this.productService.update(product, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteProduct/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteProduct(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.productService.deleteProduct(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.productService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
}