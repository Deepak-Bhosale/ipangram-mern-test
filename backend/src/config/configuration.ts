import { config } from "dotenv";
import IConfig from "./IConfig";

config();

export const configuration: IConfig = Object.freeze({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_TOKEN_SECRET,
  mongoUrl: process.env.MONGO_URL,
});
