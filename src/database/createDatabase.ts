import { envFolderPath } from "../providers/envProvider";
import dbClient from "../clients/dbClient";
import fs from "fs";

export default async function createDatabase() {
  await createDatabaseFile();
  await createTables();
}

async function createDatabaseFile() {
  const filePath = `${envFolderPath}barcode.db`;

  if (fs.existsSync(filePath)) {
    return console.log("[Database] Database already exists!");
  }
  try {
    await fs.promises.writeFile(filePath, "");
    console.log("[Database] Database created successfully!");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createTables() {
  try {
    await new Promise<void>((resolve, reject) => {
      dbClient.serialize(function () {
        dbClient.get(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='barcodes'",
          function (err, row) {
            if (err) {
              throw err;
            } else if (row) {
              console.log("[Database] Tables already exists!");
              resolve();
            } else {
              dbClient.run(
                "CREATE TABLE IF NOT EXISTS barcodes (" +
                  "scanner_id INTEGER, " +
                  "time INTEGER, " +
                  "barcode TEXT, " +
                  "location_x INTEGER, " +
                  "location_y INTEGER, " +
                  "location_z INTEGER" +
                  ");"
              );
              dbClient.run(
                "CREATE TABLE IF NOT EXISTS barcodes_log (" +
                  "scanner_id INTEGER, " +
                  "time INTEGER, " +
                  "barcode TEXT, " +
                  "location_x INTEGER, " +
                  "location_y INTEGER, " +
                  "location_z INTEGER" +
                  ");"
              );
              console.log("[Database] Tables created successfully!");
              resolve();
            }
            dbClient.close();
          }
        );
      });
    });
  } catch (error) {
    throw error;
  }
}
