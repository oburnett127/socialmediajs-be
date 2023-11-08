import { Router } from 'express';
import { Express } from 'express-serve-static-core';
import * as userinfos from '../controllers/userinfo.controller';

const userinfoRoutes = (app: Express) => {
  const router: Router = Router();

  router.post('/', userinfos.create);
  router.get('/', userinfos.findAll);
  router.get('/:id', userinfos.findOne);
  router.put('/:id', userinfos.update);
  router.delete('/:id', userinfos.delete);

  app.use('/api/userinfos', router);
};

export default userinfoRoutes;
