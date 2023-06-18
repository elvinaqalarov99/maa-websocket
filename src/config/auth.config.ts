import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";

import { AUTH } from "./app.config";

const auth = (request: IncomingMessage, callback: any) => {
  const authorization = request?.headers?.authorization;

  if (!authorization) {
    return callback(false, undefined);
  }

  let [authType, token] = authorization.split(" ");

  if (authType !== "Bearer") {
    return callback(false, undefined);
  }

  jwt.verify(
    token,
    AUTH.jwtSignKey,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return callback(false, undefined);
      }

      return callback(true, decoded);
    }
  );
};

export { auth };
