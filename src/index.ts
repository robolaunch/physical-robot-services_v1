import databaseCreationFlow from "./functions/databaseCreationFlow";
import express, { Request, Response, NextFunction } from "express";
import rosBarcodeListener from "./functions/rosBarcodeListener";
import barcodeRouters from "./routes/barcode.routes";
import { envPort } from "./providers/envProvider";
import appRouters from "./routes/app.routes";
import bodyParser from "body-parser";
import cors from "cors";

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

  app.use("/", appRouters);

  app.use("/barcode", barcodeRouters);

  app.listen(envPort, async function () {
    await databaseCreationFlow();
    await rosBarcodeListener();
    await console.log(
      `[Physical Robot Services] Service is running on port ${envPort}`
    );
  });
}

main();
