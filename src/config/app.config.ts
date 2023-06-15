const DATA = {
  limit: 25,
};

const AUTH = {
  jwtSignKey: process.env.JWT_SIGN_KEY || "",
};

const DB = {
  connectionString: process.env.DATABASE_URL || "",
};

export { DATA, AUTH, DB };
