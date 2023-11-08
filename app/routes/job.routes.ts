import { Router } from 'express';
import { Express } from 'express-serve-static-core';
import * as jobs from '../controllers/job.controller';

module.exports = (app: Express) => {
  const router: Router = Router();

  router.post('/', jobs.create);

  router.get('/', jobs.findAll);

  router.get('/:id', jobs.findOne);

  router.put('/:id', jobs.update);

  router.delete('/:id', jobs.delete);

  app.use('/api/jobs', router);
};
