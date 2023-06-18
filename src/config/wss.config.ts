import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

import { AUTH } from "../config/app.config";

class CustomWebSocketServer extends WebSocketServer {
  broadcast(msg: any): void {
    this.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  }
}

const wss = new CustomWebSocketServer({
  port: 8080,
  verifyClient: (info, cb) => {
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

    jwt.verify(
      token,
      AUTH.jwtSignKey,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          cb(false, 401, "Unauthorized");
          return;
        }

        cb(true);
      }
    );
  },
});

export { wss, CustomWebSocketServer };
