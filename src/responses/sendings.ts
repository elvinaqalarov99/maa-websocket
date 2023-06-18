import { QueryResult } from "pg";

import { pool } from "../config/database.config";
import { DATA } from "../config/app.config";
import { Request } from "../types";
import { CustomWebSocket } from "../config/wss.config";
import { getConnectedUser } from "../config/auth.config";

const sendingList = async (
  ws: CustomWebSocket,
  req: Request
): Promise<QueryResult<any>> => {
  const page = req.page || 1;
  const OFFSET = page === 1 ? 0 : page * DATA.limit;
  const userId = getConnectedUser(ws.id).id || 0;

  return await pool.query(
    `SELECT * FROM sendings 
     WHERE user_id = ${userId}
     LIMIT ${DATA.limit} OFFSET ${OFFSET};`
  );
};

export { sendingList };
