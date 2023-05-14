import { Repository } from "typeorm";

import { User } from "../models";
import AppDataSource from "../config/dataSource.config";

export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

const repository: Repository<User> = AppDataSource.getRepository(User);

export const getUsers = async (): Promise<Array<User>> => {
  return repository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const user = new User();

  return repository.save({
    ...user,
    ...payload,
  });
};

export const getUser = async (id: number): Promise<User | null> => {
  const user = await repository.findOneBy({ id });

  if (!user) return null;

  return user;
};
