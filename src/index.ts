import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";
import AppDataSource from "./config/dataSource.config";

const PORT: number = Number(process.env.PORT) || 8000;

const app: Application = express();

// specify midddlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

// add Swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

// add router middleware
app.use(Router);

// initialize DB connection
AppDataSource.initialize()
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
