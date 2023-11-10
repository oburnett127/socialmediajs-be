import express, { Application } from "express";
import cors from "cors";
import db from "./models/index";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err: Error) => {
    console.log("Failed to sync db: " + err.message);
  });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

import jobRoutes from "./app/routes/job.routes";
import stakeholderRoutes from "./app/routes/stakeholder.routes";
import userinfoRoutes from "./app/routes/userinfo.routes";

jobRoutes(app);
stakeholderRoutes(app);
userinfoRoutes(app);

const PORT: number = parseInt(process.env.PORT, 10) || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
