import { Router } from 'express';
import * as stakeholders from '../controllers/stakeholder.controller.js';

export default function(app: Router) {
  
    app.post("/", stakeholders.create);
  
    app.get("/", stakeholders.findAll);
  
    app.get("/:id", stakeholders.findOne);
  
    app.put("/:id", stakeholders.update);
  
    //router.delete("/:id", stakeholders.delete);
  
    app.use('/api/stakeholders', app);
};
