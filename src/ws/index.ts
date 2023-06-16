import { WebSocketServer } from "ws";
import { AUTH } from "../config/app.config";
import jwt from "jsonwebtoken";

const wss = new WebSocketServer({
  port: 8080,
  verifyClient: function (info, cb) {
    const authorization = info.req.headers.authorization;
    if (!authorization) {
      cb(false, 401, "Unauthorized");
      return;
    }

    let [authType, token] = authorization.split(" ");

    if (authType !== "Bearer") {
      cb(false, 401, "Unauthorized");
      return;
    }

    jwt.verify(token, AUTH.jwtSignKey, function (err, decoded) {
      if (err) {
        cb(false, 401, "Unauthorized");
        return;
      }

      cb(true);
    });
  },
});

export { wss };
