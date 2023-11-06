module.exports = function (app) {
    var stakeholders = require("../controllers/stakeholder.controller.js");
    var router = require("express").Router();
    router.post("/", stakeholders.create);
    router.get("/", stakeholders.findAll);
    router.get("/:id", stakeholders.findOne);
    router.put("/:id", stakeholders.update);
    router.delete("/:id", stakeholders.delete);
    app.use('/api/stakeholders', router);
};
