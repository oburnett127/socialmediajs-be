import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import express, { Application } from 'express';
import { JobService } from './service/job.js';
import { StakeholderService } from './service/stakeholder.js';
import { UserinfoService } from './service/userinfo.js';
import db from './models/index.js';
import { TYPES } from './service/types.js';
import logger from './config/logger.js';
import cors from "cors";

import './controllers/job.js';
import './controllers/stakeholder.js';
import './controllers/userinfo.js';

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// load everything needed to the Container
let container = new Container();
container.bind<JobService>(TYPES.JobService).to(JobService); //.inSingletonScope();
container.bind<StakeholderService>(TYPES.StakeholderService).to(StakeholderService); //.inSingletonScope();
container.bind<UserinfoService>(TYPES.UserinfoService).to(UserinfoService); //.inSingletonScope();

container.bind(TYPES.Database).toConstantValue(db);

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
});

db.sequelize.sync()
  .then(() => {
    logger.info('Synced db.');
  })
  .catch((err: Error) => {
    logger.info('Failed to sync db: ' + err.message);
  });

const serverInstance = server.build();

const portString: string | undefined = process.env.PORT;
const port: number = parseInt(portString || '8080', 10);

serverInstance.listen(port);

logger.info(`Server started on port ${port} :)`);