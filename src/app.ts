import express from "express";
import logger from "./utils/logger";
import routes from "./routes/controller.routes";
import swaggerDocs from "./utils/swagger";
import { responseEnhancer } from 'express-response-formatter';
import * as dotenv from "dotenv";
import { NODE_ENV ,isProduction, isDevelopment } from "./utils/Environments/EnvironmentVar"

dotenv.config();

logger.info({NODE_ENV})
logger.info({isProduction, isDevelopment})

const app = express();

app.use(express.json());
app.use(responseEnhancer())

app.listen(process.env.PORT, async () => {
  logger.info(`App is running at http://localhost:${process.env.PORT}`);
  
  routes(app);
  
  swaggerDocs(app, process.env.PORT);
});
