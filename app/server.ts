import express, { Application } from "express";
import cors from "cors";
import db from "./models/index.js";

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

import jobRoutes from "./routes/job.routes.js";
import stakeholderRoutes from "./routes/stakeholder.routes.js";
import userinfoRoutes from "./routes/userinfo.routes.js";

jobRoutes(app);
stakeholderRoutes(app);
userinfoRoutes(app);

const portString: string | undefined = process.env.PORT;
const PORT: number = parseInt(portString || '8080', 10);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
