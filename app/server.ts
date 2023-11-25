import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as express from 'express';
import { JobService } from './service/job.js';
import db from './models/index.js';
import { TYPES } from './service/types.js';

import './controllers/job.js';

// const app: Application = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// load everything needed to the Container
let container = new Container();
container.bind<JobService>(TYPES.JobService).to(JobService);

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