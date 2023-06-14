import { QueryResult } from "pg";

import { pool } from "../config/database.config";
import { LIMIT } from "../utils/constants";
import { Req } from "../utils/types";

export default async (req: Req): Promise<QueryResult<any>> => {
  const OFFSET = req.page ?? 1 * LIMIT;

  return await pool.query(
    `SELECT * FROM sendings LIMIT ${LIMIT} OFFSET ${OFFSET};`
  );
};
