import WebSocket from "ws";

import { LIMIT } from "../utils/constants";
import { Req, Res } from "../utils/types";
import sendings from "./sendings";
import { checkData } from "../utils/utils";

const getData = async (data: WebSocket.RawData) => {
  const dataStr = data.toString();

  checkData(dataStr);

  const req: Req = JSON.parse(dataStr);
  const res: Res = {
    payload: [],
    hasMore: false,
  };

  switch (req.type) {
    case "sending":
      res.payload = (await sendings(req)).rows;
      break;
    default:
      throw new Error("Type is not provided or defined yet!");
  }

  res.hasMore = res.payload.length === LIMIT;

  return res;
};

export { getData };
