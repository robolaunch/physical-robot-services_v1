import dbClient from "../clients/dbClient";
import setResponse from "../helper/setResponse";
import { Request, Response } from "express";

async function task(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.all("SELECT * FROM tasks_log", (err, rows) => {
        setResponse(res, 200, "Data retrieved successfully.", rows || []);
      });
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while fetching data.", error);
  }
}

async function taskAfterTime(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.all(
        "SELECT * FROM tasks_log WHERE time >= ?",
        [parseInt(req.params.time)],
        (err, rows) => {
          if (err) throw err;
          setResponse(res, 200, "Data retrieved successfully.", rows);
        }
      );
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while fetching data.", error);
  }
}

async function barcode(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.all("SELECT * FROM barcodes_log", (err, rows) => {
        setResponse(res, 200, "Data retrieved successfully.", rows || []);
      });
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while fetching data.", error);
  }
}

async function barcodeAfterTime(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.all(
        "SELECT * FROM barcodes_log WHERE time >= ?",
        [parseInt(req.params.time)],
        (err, rows) => {
          setResponse(res, 200, "Data retrieved successfully.", rows);
        }
      );
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while fetching data.", error);
  }
}

export default {
  task,
  taskAfterTime,
  barcode,
  barcodeAfterTime,
};
