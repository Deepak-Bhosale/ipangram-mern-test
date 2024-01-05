import * as express from "express";
import IConfig from "./config/IConfig";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import { Database } from "./libs/Database";
import router from "./router";
import * as cors from 'cors';

export default class server {
  private app: express.Express;
  constructor(private config: IConfig) {
    this.app = express();
  }

  public bootstrap = () => {
    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
    this.initBodyParser();
    this.setupRoutes();
    return this.app;
  };

  public initBodyParser = () => {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  };

  public setupRoutes = () => {
    this.app.get("/health-check", (_, res) => res.send("I am OK...!"));
    this.app.use("/api", router);
  };

  public run = () => {
    const { port, env, mongoUrl } = this.config;
    Database.open(mongoUrl)
      .then(() => {
        this.app.listen(port, () => {
          console.log(`App Running ${port} on ${env} successfully`);
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}
