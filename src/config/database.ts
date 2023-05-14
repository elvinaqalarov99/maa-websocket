import { DataSourceOptions } from "typeorm";

import { Comment, Post, User } from "../models";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [User, Post, Comment],
  synchronize: true,
};

export default config;
