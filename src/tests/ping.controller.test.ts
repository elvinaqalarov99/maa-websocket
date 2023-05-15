import { IJsonResponse } from "../controllers/base.controller";
import PingController, { IPingResponse } from "../controllers/ping.controller";

test("should return pong message", async () => {
  const controller = new PingController();
  const response: IJsonResponse<IPingResponse> = await controller.getMessage();
  expect(response.data?.message).toBe("pong");
});
