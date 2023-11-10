import { Router } from 'express';
import * as stakeholders from '../controllers/stakeholder.controller.js';

export default function(router: Router) {
  
    router.post("/", stakeholders.create);
  
    router.get("/", stakeholders.findAll);
  
    router.get("/:id", stakeholders.findOne);
  
    router.put("/:id", stakeholders.update);
  
    //router.delete("/:id", stakeholders.delete);
  
    router.use('/api/stakeholders', router);
};
