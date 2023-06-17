import WebSocket from "ws";
import dotenv from "dotenv";

import { getData } from "./responses";
import { wss } from "./config/wss.config";
import { connectRabbitMQ } from "./config/rabbitmq.config";

dotenv.config();

wss.on("connection", function connection(ws: WebSocket) {
  // rabbitMQ connection
  connectRabbitMQ(wss);

  // default behaviour on Websocket
  ws.on("message", async function message(data: WebSocket.RawData) {
    try {
      ws.send(JSON.stringify(await getData(data)));
    } catch (e: any) {
      ws.send(e?.message || "[x] Undefined error occured!");
    }
  });

  ws.send("Hi from Chatman!");
});
