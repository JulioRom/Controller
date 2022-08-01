import express from "express";
import logger from "./utils/logger";
import routes from "./routes/controller.routes";
import swaggerDocs from "./utils/swagger";
import { responseEnhancer } from "express-response-formatter";
import * as dotenv from "dotenv";
import path from "path";
import {
  NODE_ENV,
  isProduction,
  isDevelopment,
} from "./utils/Environments/EnvironmentVar";

dotenv.config({ path: path.resolve(__dirname, "../.env.development") });

logger.info({ NODE_ENV });
logger.info({ isProduction, isDevelopment });

const PORT = process.env.PORT;
console.log(PORT);
const app = express();

app.use(express.json());
app.use(responseEnhancer());

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  routes(app);

  swaggerDocs(app, PORT);
});
