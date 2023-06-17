import { Pool } from "pg";
import { DB } from "./app.config";
import logger from "../utils/logger";

const pool = new Pool({
  connectionString: DB.connectionString,
  min: 2,
  max: 20,
});

pool.on("error", (e: Error) => {
  logger.error(e.message || "Connection to db error!");
});

export { pool };
