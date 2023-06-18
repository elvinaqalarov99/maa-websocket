import WebSocket, { WebSocketServer } from "ws";
import { IncomingMessage, createServer } from "http";

import {
  authenticate,
  removeConnectedUser,
  setConnectedUser,
} from "./auth.config";
import { connectRabbitMQ } from "./rabbitmq.config";
import logger from "../utils/logger";

class CustomWebSocketServer extends WebSocketServer {
  broadcast(msg: any): void {
    this.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  }
}

class CustomWebSocket extends WebSocket {
  id!: string;
}

const onSocketError = (err: Error) => logger.error(err.message);

const runWSServer = () => {
  const server = createServer();
  const wss = new CustomWebSocketServer({ noServer: true });

  // define Websocket connection functionality
  wss.on(
    "connection",
    (ws: CustomWebSocket, request: IncomingMessage, client: any) => {
      ws.on("error", (err) => logger.error(err.message));

      // set connection identifier and onnected user
      const wsKey = request.headers["sec-websocket-key"] || "";
      const userId = client?.userId;
      ws.id = wsKey;
      setConnectedUser(ws.id, userId);

      // rabbitMQ connection
      connectRabbitMQ(wss);

      // default behaviour on Websocket
      ws.on("message", async (data: WebSocket.RawData) => {
        try {
          // JSON.stringify(await getData(ws, data))
          ws.send(`[x] Data you sent: ${data}`);
        } catch (e: any) {
          ws.send(e?.message || "[x] Undefined error occured!");
        }
      });

      ws.on("close", () => {
        // remove connected user auth data after close
        removeConnectedUser(ws.id);
      });

      ws.send("Hi from Chatman!");
    }
  );

  // define and listen to Server Websocket connection type
  server.on("upgrade", (request, socket, head) => {
    socket.on("error", onSocketError);

    authenticate(request, (status: boolean, client: any | undefined) => {
      if (!status || !client) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }

      socket.removeListener("error", onSocketError);

      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request, client);
      });
    });
  });

  server.listen(8080);
};

export { runWSServer, CustomWebSocketServer, CustomWebSocket };
