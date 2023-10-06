import express, { Request, Response, NextFunction } from "express";
import rosBarcodeListener from "./functions/rosBarcodeListener";
import createDatabase from "./database/createDatabase";
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

  app.use("/barcode", barcodeRouters);

  app.use("/barcode", appRouters);

  app.listen(8084, async function () {
    await createDatabase();
    await rosBarcodeListener();
    await console.log("[Robot Backend] Server is running on port 8084");
  });
}

main();
