import express from "express";
import UserTaskController from "../../common/controllers/user_task.controller";

const userTaskRoutes = express.Router();

userTaskRoutes.post("/", async (req, res) => {
  return await new UserTaskController().create(req, res);
});

userTaskRoutes.get("/", async (req, res) => {
  return await new UserTaskController().getAll(req, res);
});

userTaskRoutes.get("/:id", async (req, res) => {
  return await new UserTaskController().getOne(req, res);
});

userTaskRoutes.delete("/:id", async (req, res) => {
  return await new UserTaskController().delete(req, res);
});

export default userTaskRoutes;
