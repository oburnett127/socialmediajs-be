import { Router } from 'express';
import * as jobs from '../controllers/job.controller.js';

export default function (app: Router) {
  const router: Router = Router();

  router.post('/', jobs.create);
  // router.get('/', jobs.findAll);
  // router.get('/:id', jobs.findOne);
  // router.put('/:id', jobs.update);
  // router.delete('/:id', jobs.delete);

  app.use('/api/jobs', router);
};
