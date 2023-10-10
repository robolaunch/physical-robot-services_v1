import databaseCreationFlow from "./functions/databaseCreationFlow";
import express, { Request, Response, NextFunction } from "express";
import rosBarcodeListener from "./functions/rosBarcodeListener";
import barcodeRouters from "./routes/barcode.routes";
import { envRobotPort } from "./providers/envProvider";
import appRouters from "./routes/app.routes";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import logRouters from "./routes/log.routes";

function main() {
  const app = express();

  app.all("/*", function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.use(
    bodyParser.json(),
    cors({
      origin: "*",
    })
  );

  app.use("/barcode", barcodeRouters);

  app.use("/log", logRouters);

  app.use("/task", taskRoutes);

  app.use("/", appRouters);

  const server = app.listen(envRobotPort, async function () {
    await databaseCreationFlow();
    await rosBarcodeListener();
    await console.log(
      `[Physical Robot Services] Service is running on port ${envRobotPort}`
    );
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("[Physical Robot Services] Service is shutting down");
      process.exit(0);
    });
  });
}

main();
