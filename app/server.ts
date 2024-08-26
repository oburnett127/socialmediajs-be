import 'dotenv/config';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import express from 'express';
import cors from "cors";
import passport from '../passportext.js';
import { JobService } from './service/job.js';
import { StakeholderService } from './service/stakeholder.js';
import { UserinfoService } from './service/userinfo.js';
import { ProductService } from './service/product.js';
import { CartService } from './service/cart.js';
import { CartProductService } from './service/cartProduct.js'
import { CategoryService } from './service/category.js';
import { OrderService } from './service/order.js';
import { OrderProductService } from './service/orderProduct.js';
import { PaymentService } from './service/payment.js';
import db from './models/index.js';
import { TYPES } from './service/types.js';
import logger from './config/logger.js';
import sequelize from './models/index.js';

let container = new Container();
container.bind<JobService>(TYPES.JobService).to(JobService);
container.bind<StakeholderService>(TYPES.StakeholderService).to(StakeholderService);
container.bind<UserinfoService>(TYPES.UserinfoService).to(UserinfoService);
container.bind<ProductService>(TYPES.ProductService).to(ProductService);
container.bind<CartService>(TYPES.CartService).to(CartService);
container.bind<CartProductService>(TYPES.CartProductService).to(CartProductService);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService);
container.bind<OrderService>(TYPES.OrderService).to(OrderService);
container.bind<OrderProductService>(TYPES.OrderProductService).to(OrderProductService);
container.bind<PaymentService>(TYPES.PaymentService).to(PaymentService);


container.bind(TYPES.Database).toConstantValue(db);

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(passport.initialize());
});

import './controllers/job.js';
import './controllers/stakeholder.js';
import './controllers/userinfo.js';
import './controllers/product.js';
import './controllers/cart.js';
import './controllers/cartProduct.js';
import './controllers/category.js';
import './controllers/order.js';
import './controllers/orderProduct.js';
import './controllers/payment.js';

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('Failed to synchronize database:', err.message);
    } else {
      console.error('Failed to synchronize database:', err);
    }
  });

const serverInstance = server.build();

const portString: string | undefined = process.env.PORT;
const port: number = parseInt(portString || '7050', 10);

serverInstance.listen(port);

logger.info(`Server started on port ${port} :)`);
