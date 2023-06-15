import { QueryResult } from "pg";

import { pool } from "../config/database.config";
import { DATA } from "../config/app.config";
import { Request } from "../types";

export default async (req: Request): Promise<QueryResult<any>> => {
  const OFFSET = req.page || 1 * DATA.limit;

  return await pool.query(
    `SELECT * FROM sendings LIMIT ${DATA.limit} OFFSET ${OFFSET};`
  );
};
