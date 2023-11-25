import { Router } from 'express';
import * as stakeholders from '../controllers/stakeholder.js';

export default function(router: Router) {
  
    router.post("/stakeholder/create", stakeholders.create);
  
    router.get("/stakeholder/findAll", stakeholders.findAll);
  
    router.get("/stakeholder/findOne/:id", stakeholders.findOne);
  
    router.put("/stakeholder/update/:id", stakeholders.update);
  
    router.delete("/stakeholder/deleteStakeholder/:id", stakeholders.deleteStakeholder);

    router.delete("/stakeholder/deleteAll", stakeholders.deleteAll);
    
};
