import { envFolderPath } from "../providers/envProvider";
import sqlite3 from "sqlite3";

const dbClient = new sqlite3.Database(`${envFolderPath}barcode.db`);

export default dbClient;
