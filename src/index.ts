import dotenv from "dotenv";

import { runWSServer } from "./config/wss.config";

dotenv.config();

runWSServer();
