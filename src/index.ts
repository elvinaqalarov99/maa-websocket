import { Channel, Connection, Message, connect } from "amqplib/callback_api";
import WebSocket from "ws";
import dotenv from "dotenv";

import { RABBITMQ } from "./config/app.config";
import { getData } from "./responses";
import { wss } from "./ws";

dotenv.config();

wss.on("connection", function connection(ws: WebSocket) {
  // rabbitMQ connection
  connect(
    RABBITMQ.connectionString,
    function (error0: any, connection: Connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1: any, channel: Channel) {
        if (error1) {
          throw error1;
        }
        const queue = "test-queue";

        channel.assertQueue(queue, {
          durable: true,
        });

        //  behaviour on Websocket
        console.log("[*] Waiting for messages in %s from websocket.");
        ws.on("message", async function message(data: WebSocket.RawData) {
          try {
            ws.send(JSON.stringify(await getData(data)));
          } catch (e: any) {
            ws.send(e?.message || "[x] Undefined error occured!");
          }
        });

        // behaviour on rabbitMQ
        console.log("[*] Waiting for messages in %s from rabbitMQ.", queue);
        channel.consume(
          queue,
          function (msg: Message | null) {
            const msgStr =
              msg?.content?.toString() || "[x] Undefined message from rabbitMQ";
            console.log("[x] Received %s", msgStr);
            ws.send(`[x] Received ${msgStr}`);
          },
          {
            noAck: true, // not sending any acknowledgement back to queue
          }
        );
      });
    }
  );

  ws.send("Hi from Chatman!");
});
