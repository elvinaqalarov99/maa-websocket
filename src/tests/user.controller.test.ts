import { EntityNotFoundError } from "typeorm";
import { IJsonResponse } from "../controllers/base.controller";
import UserController from "../controllers/user.controller";
import { User } from "../models";
import { UserRepository } from "../repositories/user.repository";
import {
  generateUserData,
  generateUserPayload,
  generateUsersData,
} from "./utils/user.util";

afterEach(() => {
  jest.resetAllMocks();
});

describe("UserController", () => {
  describe("getUsers", () => {
    test("should return empty array", async () => {
      const spy = jest.spyOn(UserRepository, "find").mockResolvedValueOnce([]);
      const controller = new UserController();
      const response: IJsonResponse<Array<User>> = await controller.getUsers();
      expect(response.data).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return user list", async () => {
      const usersData = generateUsersData(2);
      const spy = jest
        .spyOn(UserRepository, "find")
        .mockResolvedValueOnce(usersData);
      const controller = new UserController();
      const response: IJsonResponse<Array<User>> = await controller.getUsers();
      expect(response.data).toEqual(usersData);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("addUser", () => {
    test("should add user to the database", async () => {
      const payload = generateUserPayload();
      const userData = generateUserData(payload);
      const spy = jest
        .spyOn(UserRepository, "save")
        .mockResolvedValueOnce(userData);
      const controller = new UserController();
      const response: IJsonResponse<User> = await controller.createUser(
        payload
      );
      expect(response.data).toMatchObject(payload);
      expect(response.data).toEqual(userData);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUser ", () => {
    test("should return user from the database", async () => {
      const id = 1;
      const userData = generateUserData({ id });
      const spy = jest
        .spyOn(UserRepository, "findOneByOrFail")
        .mockResolvedValueOnce(userData);
      const controller = new UserController();
      const response: IJsonResponse<User> = await controller.getUser(
        id.toString()
      );
      expect(response.data).toEqual(userData);
      expect(response.data.id).toBe(id);
      expect(spy).toHaveBeenCalledWith({ id });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should throw error if user not found", async () => {
      const id = 1;
      const spy = jest
        .spyOn(UserRepository, "findOneByOrFail")
        .mockRejectedValueOnce(new Error());
      const controller = new UserController();

      await expect(controller.getUser(id.toString())).rejects.toThrow();

      expect(spy).toHaveBeenCalledWith({ id });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
