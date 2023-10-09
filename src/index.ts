import express, { Request, Response, NextFunction } from "express";
import rosBarcodeListener from "./functions/rosBarcodeListener";
import createDatabaseFlow from "./database/createDatabaseFlow";
import barcodeRouters from "./routes/barcode.routes";
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

  app.listen(8091, async function () {
    await createDatabaseFlow();
    await rosBarcodeListener();
    await console.log("[Robot Backend] Server is running on port 8091");
  });
}

main();
