import { Pool } from "pg";
import { DB } from "./app.config";

const pool = new Pool({
  connectionString: DB.connectionString,
  min: 2,
  max: 20,
});

pool.on("error", (e: Error) => {
  console.log(e.message || "Connection to db error!");
});

export { pool };
