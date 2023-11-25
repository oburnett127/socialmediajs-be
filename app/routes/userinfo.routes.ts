import { Router } from 'express';
import * as userinfos from '../controllers/userinfo.js';

export default function(router: Router) {

  router.get('/userinfo/:email', userinfos.findOne);

  router.post('/userinfo/login', userinfos.login);

  router.post('/userinfo/create', userinfos.create);
  
  router.get('/userinfo/findAll', userinfos.findAll);

  router.put('/userinfo/update/:id', userinfos.update);
 
   router.delete('/userinfo/deleteUserinfo/:id', userinfos.deleteUserinfo);

   router.delete('/userinfo/deleteAll', userinfos.deleteAll);

};
