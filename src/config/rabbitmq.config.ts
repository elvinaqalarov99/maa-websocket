import { Channel, Connection, Message, connect } from "amqplib/callback_api";

import { RABBITMQ } from "./app.config";
import { CustomWebSocketServer } from "./wss.config";
import logger from "../utils/logger";

const connectRabbitMQ = (wss: CustomWebSocketServer) => {
  connect(
    RABBITMQ.connectionString,
    (connectionErr: any, connection: Connection) => {
      if (connectionErr) {
        logger.error(
          `RabbitMQ: ${
            connectionErr.message ||
            "Undefined error occured while RabbitMQ server connection"
          }`
        );
        return;
      }

      connection.createChannel((channelErr: any, channel: Channel) => {
        if (channelErr) {
          logger.error(
            `RabbitMQ: ${
              channelErr.message ||
              "Undefined error occured while RabbitMQ channel connection"
            }`
          );
          return;
        }

        const queue = RABBITMQ.queueName;

        channel.assertQueue(queue, {
          durable: true,
        });

        logger.info(`[*] Waiting for messages in ${queue} from rabbitMQ.`);
        channel.consume(
          queue,
          (msg: Message | null) => {
            const msgStr =
              msg?.content?.toString() || "[x] Undefined message from rabbitMQ";
            wss.broadcast(`[x] Received ${msgStr}`);
          },
          {
            noAck: true, // not sending any acknowledgement back to queue
          }
        );
      });
    }
  );
};

export { connectRabbitMQ };
