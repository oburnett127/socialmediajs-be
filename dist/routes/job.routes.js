module.exports = app => {
    const jobs = require("../controllers/job.controller.js");
    var router = require("express").Router();
    router.post("/", jobs.create);
    router.get("/", jobs.findAll);
    router.get("/:id", jobs.findOne);
    router.put("/:id", jobs.update);
    router.delete("/:id", jobs.delete);
    app.use('/api/jobs', router);
};
