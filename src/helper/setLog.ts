import dbClient from "../clients/dbClient";

export default function setLog(req: any, log: string) {
  dbClient.run("INSERT INTO tasks_log (time, method, log) VALUES (?, ?, ?)", [
    Math.floor(Date.now() / 1000),
    req.method === "POST"
      ? "CREATE"
      : req.method === "PUT"
      ? "UPDATE"
      : req.method === "DELETE"
      ? "DELETE"
      : req,
    log,
  ]);
}
