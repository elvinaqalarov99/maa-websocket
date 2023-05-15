import { Get, Route } from "tsoa";

import BaseController, { IJsonResponse } from "./base.controller";

export interface IPingResponse {
  message: string;
}

@Route("ping")
export default class PingController extends BaseController {
  @Get("/")
  public async getMessage(): Promise<IJsonResponse<IPingResponse>> {
    const data: IPingResponse = { message: "pong" };

    return this.jsonResponse(data);
  }
}
