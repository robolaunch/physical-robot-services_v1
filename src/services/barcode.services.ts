import setResponse from "../helper/setResponse";
import { Request, Response } from "express";
import dbClient from "../clients/dbClient";

async function get(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.all("SELECT * FROM barcodes", (err, rows) => {
        setResponse(res, 200, "Data retrieved successfully.", rows || []);
      });
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while fetching data.");
  }
}

async function getWithTime(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.all(
        "SELECT * FROM barcodes WHERE time >= ?",
        [parseInt(req.params.time)],
        (err, rows) => {
          if (err) throw err;
          setResponse(res, 200, "Data retrieved successfully.", rows);
        }
      );
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while fetching data.");
  }
}

async function post(req: Request, res: Response) {
  const { scanner_id, barcode, location_x, location_y, location_z } = req.body;

  try {
    await new Promise<void>((resolve) => {
      dbClient.serialize(function () {
        dbClient.get(
          "SELECT barcode FROM barcodes WHERE barcode = ?",
          [barcode],
          function (err, existingRow) {
            if (err) {
              throw err;
            }

            if (existingRow) {
              setResponse(res, 400, "Barcode already exists in the table.");
              resolve();
            } else {
              dbClient.run(
                "INSERT INTO barcodes (scanner_id, time, barcode, location_x, location_y, location_z) VALUES (?, ?, ?, ?, ?, ?)",
                [
                  scanner_id,
                  Math.floor(Date.now() / 1000),
                  barcode,
                  location_x,
                  location_y,
                  location_z,
                ],
                function (insertErr) {
                  if (insertErr) {
                    throw insertErr;
                  } else {
                    setResponse(res, 201, "Data added successfully.");
                    resolve();
                  }
                }
              );
            }
          }
        );
      });
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while processing the request.");
  }
}

async function remove(req: Request, res: Response) {
  try {
    await new Promise<void>((resolve) => {
      dbClient.serialize(function () {
        dbClient.run(
          "INSERT INTO barcodes_log SELECT * FROM barcodes",
          function (err) {
            if (err) throw err;
            dbClient.run("DELETE FROM barcodes", function (err) {
              if (err) throw err;
              resolve();
            });
          }
        );
      });
    });
    setResponse(res, 200, "All data moved to barcodes_log successfully.");
  } catch (error) {
    setResponse(res, 500, "Error while moving data to barcodes_log.");
  }
}

export default {
  get,
  getWithTime,
  post,
  remove,
};
