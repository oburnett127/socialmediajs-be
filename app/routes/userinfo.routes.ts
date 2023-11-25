import { Router } from 'express';
import * as userinfos from '../controllers/userinfo.js';

export default function(router: Router) {

  router.post('/userinfo/create', userinfos.create);
  
  router.get('/userinfo/findAll', userinfos.findAll);

  router.get('/userinfo/:id', userinfos.findOne);

  router.put('/userinfo/update/:id', userinfos.update);
 
   router.delete('/userinfo/deleteUserinfo/:id', userinfos.deleteUserinfo);

   router.delete('/userinfo/deleteAll', userinfos.deleteAll);

};
