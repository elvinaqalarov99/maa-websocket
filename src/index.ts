import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { pool } from "./config/database.config";

dotenv.config();

const LIMIT = 25;

type Req = {
  type: string;
  sort: string;
  page: number;
};

type Res = {
  payload: any;
  hasMore: boolean;
};

const checkData = (data: any) => {
  try {
    JSON.parse(data);
  } catch (e) {
    throw new Error("Provided data should be a json!");
  }
};

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws: WebSocket) {
  ws.on("message", async function message(data: WebSocket.RawData) {
    try {
      const dataStr = data.toString();

      checkData(dataStr);

      const req: Req = JSON.parse(dataStr);
      const res: Res = {
        payload: [],
        hasMore: false,
      };

      const OFFSET = req.page * LIMIT;

      switch (req.type) {
        case "sending":
          res.payload = (
            await pool.query(
              `SELECT * FROM sendings LIMIT ${LIMIT} OFFSET ${OFFSET};`
            )
          ).rows;
          res.hasMore = res.payload.length === 25;
          break;
        default:
          throw new Error("Type is not provided or defined yet!");
      }

      ws.send(JSON.stringify(res));
    } catch (e: any) {
      ws.send(e.message);
    }
  });

  ws.send("Hi from Chatman!");
});
