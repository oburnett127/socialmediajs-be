import { Router } from 'express';
import * as jobs from '../controllers/job.controller.js';

// Define a function that takes an Express application instance and sets up the routes
export default function (app: Router) {
  const router: Router = Router();

  router.post('/', jobs.create);
  // Uncomment and implement other routes as needed
  // router.get('/', jobs.findAll);
  // router.get('/:id', jobs.findOne);
  // router.put('/:id', jobs.update);
  // router.delete('/:id', jobs.delete);

  // Use the configured routes with your Express application
  app.use('/api/jobs', router);
};

// Export the jobRoutes function as a default export

