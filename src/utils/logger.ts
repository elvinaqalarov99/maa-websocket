import pino, { StreamEntry } from "pino";
import fs from "fs";
import { LOGGER } from "../config/app.config";

const streams: StreamEntry[] = [
  {
    level: "info",
    stream: fs.createWriteStream("app.log", { flags: "a" }),
  },
  {
    level: "error",
    stream: fs.createWriteStream("error.log", { flags: "a" }),
  },
];

const logger = pino(
  {
    level: LOGGER.level,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream(streams)
);

export default logger;
