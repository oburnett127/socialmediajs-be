import { Router } from 'express';
import * as userinfos from '../controllers/userinfo.controller.js';

export default function (app: Router) {

  app.post('/', userinfos.create);
  app.get('/', userinfos.findAll);
  app.get('/:id', userinfos.findOne);
  app.put('/:id', userinfos.update);
 
  // router.delete('/:id', userinfos.delete);

  app.use('/api/userinfos', app);
};
