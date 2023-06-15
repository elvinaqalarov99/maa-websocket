import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { getData } from "./responses";
import { AUTH } from "./config/app.config";

dotenv.config();

const wss = new WebSocketServer({
  port: 8080,
  verifyClient: function (info, cb) {
    const authorization = info.req.headers.authorization;
    if (!authorization) {
      cb(false, 401, "Unauthorized");
      return;
    }

    let [authType, token] = authorization.split(" ");

    if (authType !== "Bearer") {
      cb(false, 401, "Unauthorized");
      return;
    }

    jwt.verify(token, AUTH.jwtSignKey, function (err, decoded) {
      if (err) {
        cb(false, 401, "Unauthorized");
        return;
      }

      cb(true);
    });
  },
});

wss.on("connection", function connection(ws: WebSocket) {
  ws.on("message", async function message(data: WebSocket.RawData) {
    try {
      ws.send(JSON.stringify(await getData(data)));
    } catch (e: any) {
      ws.send(e?.message || "Undefined error occured!");
    }
  });

  ws.send("Hi from Chatman!");
});
