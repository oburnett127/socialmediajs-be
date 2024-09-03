import 'dotenv/config';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import express from 'express';
import cors from "cors";
import passport from '../passportext.js';
import { CommentService } from './service/comment.js';
import { FriendService } from './service/friend.js';
import { PostService } from './service/post.js';
import { UserinfoService } from './service/userinfo.js'
import db from './models/index.js';
import { TYPES } from './service/types.js';
import logger from './config/logger.js';
import sequelize from './models/index.js';

const container = new Container();
container.bind<CommentService>(TYPES.CommentService).to(CommentService);
container.bind<FriendService>(TYPES.FriendService).to(FriendService);
container.bind<PostService>(TYPES.PostService).to(PostService);
container.bind<UserinfoService>(TYPES.UserinfoService).to(UserinfoService);

container.bind(TYPES.Database).toConstantValue(db);

export { container };

const server = new InversifyExpressServer(container);

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

import './controllers/comment.js';
import './controllers/friend.js';
import './controllers/post.js';
import './controllers/userinfo.js';

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
const port: number = parseInt(portString || '8080', 10);

serverInstance.listen(port);

logger.info(`Server started on port ${port} :)`);
