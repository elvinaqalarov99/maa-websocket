import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
// import helmet from "helmet";
// import hpp from "hpp";
// import session from "express-session";

import router from "./routes";
import AppDataSource from "./config/dataSource.config";

const PORT: number = Number(process.env.PORT) || 8000;

// const SESSION_AGE: number = 1000 * 60 * 60 * 24; // 24 hours
// const SESSION_SECRET: string =
//   process.env.SESSION_SECRET || "thisismysecrctekeyforelvinsadigapp";

const app: Application = express();

// Parse incoming requests with JSON payloads∂
app.use(express.json());
// Create HTTP requests logging
app.use(morgan("tiny"));
// Define static files folder
app.use(express.static("public"));
// Secure HTTP headers
// app.use(
//   helmet({
//     xPoweredBy: false,
//   })
// );
// Protect HTTP parameter pollution attacks
// app.use(hpp());
// Session configs
// app.use(
//   session({
//     secret: SESSION_SECRET,
//     saveUninitialized: true,
//     cookie: { maxAge: SESSION_AGE, httpOnly: true, secure: true },
//     resave: false,
//   })
// );
// add Swagger configs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
// add Router middleware
app.use(router);

// initialize DB connection and run the Application
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
