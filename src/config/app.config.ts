const DATA = {
  limit: 25,
};

const AUTH = {
  jwtSignKey: process.env.JWT_SIGN_KEY || "",
};

const DB = {
  connectionString: process.env.DATABASE_URL || "",
};

const RABBITMQ = {
  connectionString: process.env.RABBITMQ_URL || "",
  queueName: process.env.RABBITMQ_QUEUE || "",
};

const LOGGER = {
  level: process.env.LOG_LEVEL || "info",
};

export { DATA, AUTH, DB, RABBITMQ, LOGGER };
