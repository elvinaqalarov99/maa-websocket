import { RawData } from "ws";

import { sendingList } from "./sendings";
import { checkData } from "../utils/utils";
import { DATA } from "../config/app.config";
import { Request, Response } from "../types";
import { CustomWebSocket } from "../config/wss.config";

const getData = async (ws: CustomWebSocket, data: RawData) => {
  const dataStr = data.toString();

  checkData(dataStr);

  const req: Request = JSON.parse(dataStr);
  const res: Response = {
    payload: [],
    hasMore: false,
  };

  switch (req.type) {
    case "sending":
      res.payload = (await sendingList(ws, req)).rows;
      break;
    default:
      throw new Error("Type is not provided or defined yet!");
  }

  res.hasMore = res.payload.length === DATA.limit;

  return res;
};

export { getData };
