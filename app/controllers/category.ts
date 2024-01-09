import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { CategoryPayload, CategoryService } from '../service/category.js';
import { TYPES } from '../service/types.js';

@controller('/category')
export class CategoryController implements interfaces.Controller {

  constructor(
    @inject(TYPES.CategoryService) private categoryService: CategoryService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createCategory(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const category: CategoryPayload = req.body;

    if (!category) {
      res.sendStatus(400);
    }

    const createCategory = await this.categoryService.create(category);
    if (createCategory) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  @httpGet('/findAll')
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.categoryService.findAll();
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

    const response = await this.categoryService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const category: CategoryPayload = req.body; 
    if (!category || !id) {
      res.sendStatus(400);
    }

    const response = await this.categoryService.update(category, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteCategory/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteCategory(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.categoryService.deleteCategory(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.categoryService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
}