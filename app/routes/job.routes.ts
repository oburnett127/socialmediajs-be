import { Router } from 'express';
import * as jobs from '../controllers/job.controller.js';

export default function (router: Router) {

  router.post('/job/create', jobs.create);

  router.get('/job/findAll', jobs.findAll);

  router.get('/job/findOne/:id', jobs.findOne);

  router.put('/job/update/:id', jobs.update);

  router.delete('/job/deleteJob/:id', jobs.deleteJob);
  
  router.delete('/job/deleteAll', jobs.deleteAll);

};
