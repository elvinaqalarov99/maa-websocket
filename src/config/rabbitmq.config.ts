import { Channel, Connection, Message, connect } from "amqplib/callback_api";
import { RABBITMQ } from "./app.config";
import { CustomWebSocketServer } from "./wss.config";
import logger from "../utils/logger";

const connectRabbitMQ = (wss: CustomWebSocketServer) => {
  connect(
    RABBITMQ.connectionString,
    function (connectionErr: any, connection: Connection) {
      if (connectionErr) {
        logger.error(
          `${
            connectionErr.message ||
            "Undefined error occured while RabbitMQ server connection"
          }`
        );
        return;
      }
      connection.createChannel(function (channelErr: any, channel: Channel) {
        if (channelErr) {
          logger.error(
            `${
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
          function (msg: Message | null) {
            const msgStr =
              msg?.content?.toString() || "[x] Undefined message from rabbitMQ";
            logger.info(`[x] Received ${msgStr} from rabbitMQ.`);
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
