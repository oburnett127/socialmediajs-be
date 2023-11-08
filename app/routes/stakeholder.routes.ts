import { Router } from 'express';
import { Express } from 'express-serve-static-core';
import * as stakeholders from '../controllers/stakeholder.controller';

module.exports = (app: Express) => {
    const router: Router = Router();
  
    router.post("/", stakeholders.create);
  
    router.get("/", stakeholders.findAll);
  
    router.get("/:id", stakeholders.findOne);
  
    router.put("/:id", stakeholders.update);
  
    router.delete("/:id", stakeholders.delete);
  
    app.use('/api/stakeholders', router);
};
