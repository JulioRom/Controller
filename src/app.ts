import express from "express";
import config from "config";
import logger from "./utils/logger";
import routes from "./routes/controller.routes";
import swaggerDocs from "./utils/swagger";
import { responseEnhancer } from 'express-response-formatter'

const port = config.get<number>("port");

const app = express();

app.use(express.json());
app.use(responseEnhancer())

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  
  routes(app);
  
  swaggerDocs(app, port);
});
