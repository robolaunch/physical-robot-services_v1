import dbClient from "../clients/dbClient";
import setLog from "../helper/setLog";
import setResponse from "../helper/setResponse";
import { Request, Response } from "express";

async function get(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.all("SELECT * FROM tasks", (err, rows) => {
        setResponse(res, 200, "Data retrieved successfully.", rows || []);
      });
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while fetching data.");
  }
}

async function post(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.run(
        "INSERT INTO tasks (task_id, task_name, task_json) VALUES (?, ?, ?)",
        [req.body.task_id, req.body.task_name, req.body.task_json],
        () => {
          setLog(
            req,
            JSON.stringify({
              task_id: req.body.task_id,
              task_name: req.body.task_name,
              task_json: req.body.task_json,
            })
          );
          setResponse(res, 200, `Task ${req.body.task_id} added successfully.`);
        }
      );
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while adding task.");
  }
}

async function put(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.run(
        "UPDATE tasks SET task_name = ?, task_json = ? WHERE task_id = ?",
        [req.body.task_name, req.body.task_json, req.params.id],
        () => {
          setLog(
            req,
            JSON.stringify({
              task_id: req.params.id,
              task_name: req.body.task_name,
              task_json: req.body.task_json,
            })
          );

          setResponse(res, 200, "Task updated successfully.");
        }
      );
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while updating task.");
  }
}

async function remove(req: Request, res: Response) {
  try {
    dbClient.serialize(() => {
      dbClient.run(
        "DELETE FROM tasks WHERE task_id = ?",
        [req.params.id],
        () => {
          setLog(
            req,
            JSON.stringify({
              task_id: req.params.id,
              task_name: req.body.task_name,
              task_json: req.body.task_json,
            })
          );
          setResponse(res, 200, "Task deleted successfully.");
        }
      );
    });
  } catch (error) {
    setResponse(res, 500, "An error occurred while deleting task.");
  }
}

export default {
  get,
  put,
  post,
  remove,
};
