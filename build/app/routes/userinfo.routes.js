module.exports = function (app) {
    var userinfos = require("../controllers/userinfo.controller.js");
    var router = require("express").Router();
    router.post("/", userinfos.create);
    router.get("/", userinfos.findAll);
    router.get("/:id", userinfos.findOne);
    router.put("/:id", userinfos.update);
    router.delete("/:id", userinfos.delete);
    app.use('/api/userinfos', router);
};
