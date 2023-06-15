import { RawData } from "ws";

import sendings from "./sendings";
import { checkData } from "../utils/utils";
import { DATA } from "../config/app.config";
import { Request, Response } from "../types";

const getData = async (data: RawData) => {
  const dataStr = data.toString();

  checkData(dataStr);

  const req: Request = JSON.parse(dataStr);
  const res: Response = {
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

  res.hasMore = res.payload.length === DATA.limit;

  return res;
};

export { getData };
