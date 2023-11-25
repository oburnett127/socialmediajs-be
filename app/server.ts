import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as express from 'express';
import { JobService } from './service/job';
import db from './models/index.js';
import { TYPES } from './service/types';

import './controllers/job';

// load everything needed to the Container
let container = new Container();
container.bind<JobService>(TYPES.JobService).to(JobService).inSingletonScope();
container.bind<StakeholderService>(TYPES.StakeholderService).to(StakeholderService).inSingletonScope();
container.bind<UserinfoService>(TYPES.UserinfoService).to(UserinfoService).inSingletonScope();

container.bind(TYPES.Database).toConstantValue(db);

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
});

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err: Error) => {
    console.log('Failed to sync db: ' + err.message);
  });

const serverInstance = server.build();

const portString: string | undefined = process.env.PORT;
const port: number = parseInt(portString || '8080', 10);

serverInstance.listen(port);

console.log(`Server started on port ${port} :)`);