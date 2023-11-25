import { Router } from 'express';
import * as userinfos from '../controllers/userinfo.controller.js';

export default function(router: Router) {

  router.get('/userinfo/:email', userinfos.findOne);

  router.post('/userinfo/login', userinfos.login);

  router.post('/userinfo/create', userinfos.create);
  
  router.get('/userinfo/findAll', userinfos.findAll);

  router.put('/userinfo/update/:id', userinfos.update);
 
   router.delete('/userinfo/deleteUserInfo/:id', userinfos.deleteUserInfo);

   router.delete('/userinfo/deleteAll', userinfos.deleteAll);

};
