import { DataSource } from "typeorm";

import dbConfig from "./database.config";

const AppDataSource: DataSource = new DataSource(dbConfig);

export default AppDataSource;
