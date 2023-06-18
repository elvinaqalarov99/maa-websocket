import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";

import { AUTH } from "./app.config";

const connectedUsers = new Map();

class ConnectedUser {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

const getConnectedUser = (wsKey: string): ConnectedUser => {
  return connectedUsers.get(wsKey);
};

const setConnectedUser = (wsKey: string, userId: string): void => {
  connectedUsers.set(wsKey, new ConnectedUser(userId));
};

const removeConnectedUser = (wsKey: string): void => {
  connectedUsers.delete(wsKey);
};

const authenticate = (request: IncomingMessage, callback: any) => {
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

export {
  authenticate,
  setConnectedUser,
  getConnectedUser,
  removeConnectedUser,
};
