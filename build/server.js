"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
var index_js_1 = require("./app/models/index.js");
index_js_1.db.sequelize.sync()
    .then(function () {
    console.log("Synced db.");
})
    .catch(function (err) {
    console.log("Failed to sync db: " + err.message);
});
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
require("./app/routes/job.routes")(app);
require("./app/routes/stakeholder.routes")(app);
require("./app/routes/userinfo.routes")(app);
// set port, listen for requests
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT, "."));
});
