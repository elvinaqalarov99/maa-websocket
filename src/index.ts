import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";

import { getData } from "./responses";

dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws: WebSocket) {
  ws.on("message", async function message(data: WebSocket.RawData) {
    try {
      ws.send(JSON.stringify(await getData(data)));
    } catch (e: any) {
      ws.send(e?.message ?? "Undefined error occured!");
    }
  });

  ws.send("Hi from Chatman!");
});
