import express from "express";
import {
  checkAdminOrOperator,
  checkLoggedIn,
} from "../../middlewares/user.middleware";
import TaskController from "../../common/controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.post("/", checkLoggedIn, checkAdminOrOperator, async (req, res) => {
  return await new TaskController().create(req, res);
});

taskRoutes.get("/", checkLoggedIn, async (req, res) => {
  return await new TaskController().getAll(req, res);
});

taskRoutes.get("/:id", checkLoggedIn, async (req, res) => {
  return await new TaskController().getOne(req, res);
});

taskRoutes.patch(
  "/:id",
  checkLoggedIn,
  checkAdminOrOperator,
  async (req, res) => {
    return await new TaskController().update(req, res);
  }
);

taskRoutes.post("/", checkLoggedIn, checkAdminOrOperator, async (req, res) => {
  return await new TaskController().create(req, res);
});

taskRoutes.delete(
  "/:id",
  checkLoggedIn,
  checkAdminOrOperator,
  async (req, res) => {
    return await new TaskController().delete(req, res);
  }
);

export default taskRoutes;
