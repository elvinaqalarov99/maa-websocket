import { Repository } from "typeorm";

import { User } from "../models";
import AppDataSource from "../config/dataSource.config";

export const UserRepository: Repository<User> =
  AppDataSource.getRepository(User);
