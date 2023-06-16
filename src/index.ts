import dotenv from "dotenv";
import { wss } from "./ws";
import WebSocket from "ws";
import { getData } from "./responses";
import { connect } from "amqplib/callback_api";
import { RABBITMQ } from "./config/app.config";

dotenv.config();

wss.on("connection", function connection(ws: WebSocket) {
  // rabbitMQ connection
  connect(RABBITMQ.connectionString, function (error0: any, connection: any) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1: any, channel: any) {
      if (error1) {
        throw error1;
      }
      const queue = "test-queue";

      channel.assertQueue(queue, {
        durable: true,
      });

      //  behaviour on Websocket
      console.log(" [*] Waiting for messages in %s from websocket.");
      ws.on("message", async function message(data: WebSocket.RawData) {
        try {
          ws.send(JSON.stringify(await getData(data)));
        } catch (e: any) {
          ws.send(e?.message || "Undefined error occured!");
        }
      });

      // behaviour on rabbitMQ
      console.log(" [*] Waiting for messages in %s from rabbit.", queue);
      channel.consume(
        queue,
        function (msg: any) {
          const msgStr = msg?.content?.toString();
          console.log(" [x] Received %s", msgStr);
          ws.send(` [x] Received ${msgStr}`);
        },
        {
          noAck: true,
        }
      );
    });
  });

  ws.send("Hi from Chatman!");
});
