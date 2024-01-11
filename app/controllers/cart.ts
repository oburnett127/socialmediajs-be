import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import * as express from 'express';
import localPassport from '../../passportext.js';
import { CartPayload, CartService } from '../service/cart.js';
import { TYPES } from '../service/types.js';
import { Cart } from 'app/models/cart.model.js';
import { CartProduct } from 'app/models/cartProduct.model.js';

@controller('/cart')
export class CartController implements interfaces.Controller {

  constructor(
    @inject(TYPES.CartService) private cartService: CartService
  ) { }

  @httpPost('/create', localPassport.authenticate('jwt', { session: false}))
  private async createCart(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const cart: CartPayload = req.body;

    if (!cart) {
      res.sendStatus(400);
    }

    const createCart = await this.cartService.create(cart);
    if (createCart) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }

  // @httpPost('/addToCart', localPassport.authenticate('jwt', { session: false}))
  // private async addToCart(@request() req: express.Request, @response() res: express.Response): Promise<express.Response> {
  //   const { productId, quantity } = req.body;

  //   try {
  //     const userinfo = req.userinfo;

  //     const [cart, created] = await Cart.findOrCreate({
  //       where: { userId: userinfo.id },
  //     });

  //     const cartProduct = await CartProduct.findOne({
  //       where: { cartId: cart.id, productId },
  //     });

  //     if (cartProduct) {
  //       cartProduct.quantity += quantity;
  //       await cartProduct.save();
  //     } else {
  //       await CartProduct.create({
  //         cartId: cart.id,
  //         productId,
  //         quantity,
  //       });
  //     }

  //     return res.status(created ? 201 : 200).json({ message: 'Product added to cart' });
  //   } catch (error) {
  //     console.error('Error adding product to cart:', error);
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }
  // });

  @httpGet('/findAll', localPassport.authenticate('jwt', { session: false}))
  private async findAll(@request() req: express.Request, @response() res: express.Response) : Promise<void> {
    const response = await this.cartService.findAll();
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

    const response = await this.cartService.findOne(id);
    if (response) {
      res.status(200);
      res.send(response);
    } else {
      res.sendStatus(400);
    }
  }

  @httpPut('/update/:id', localPassport.authenticate('jwt', { session: false}))
  private async update(@requestParam('id') id: string, @request() req: express.Request, @response() res: express.Response): Promise<void> {
    const cart: CartPayload = req.body; 
    if (!cart || !id) {
      res.sendStatus(400);
    }

    const response = await this.cartService.update(cart, id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteCart/:id', localPassport.authenticate('jwt', { session: false}))
  private async deleteCart(@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    if (!id) {
      res.sendStatus(400);
    }

    const response = await this.cartService.deleteCart(id);
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  @httpDelete('/deleteAll', localPassport.authenticate('jwt', { session: false}))
  private async deleteAll(@request() req: express.Request, @response() res: express.Response): Promise<void> {
    const response = await this.cartService.deleteAll();
    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

}