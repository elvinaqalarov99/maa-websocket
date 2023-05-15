import { Get, Route, Tags, Post, Body, Path } from "tsoa";

import { UserRepository } from "../repositories/user.repository";
import BaseController, { IJsonResponse } from "./base.controller";
import { User } from "../models";

@Route("users")
@Tags("User")
export default class UserController extends BaseController {
  @Get("/")
  public async getUsers(): Promise<IJsonResponse<Array<User>>> {
    const data = await UserRepository.find();

    return this.jsonResponse(data);
  }

  @Post("/")
  public async createUser(@Body() body: any): Promise<IJsonResponse<User>> {
    const data = await UserRepository.save(body);

    return this.jsonResponse(data);
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<IJsonResponse<User>> {
    const data = await UserRepository.findOneByOrFail({ id: Number(id) });

    return this.jsonResponse(data);
  }
}
