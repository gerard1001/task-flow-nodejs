import express from "express";
import SubTaskController from "../../common/controllers/sub_task.controller";

const subTaskRoutes = express.Router();

subTaskRoutes.post("/", async (req, res) => {
  return await new SubTaskController().create(req, res);
});

subTaskRoutes.get("/", async (req, res) => {
  return await new SubTaskController().getAll(req, res);
});

subTaskRoutes.get("/:id", async (req, res) => {
  return await new SubTaskController().getOne(req, res);
});

subTaskRoutes.patch("/:id", async (req, res) => {
  return await new SubTaskController().update(req, res);
});

subTaskRoutes.delete("/:id", async (req, res) => {
  return await new SubTaskController().delete(req, res);
});

export default subTaskRoutes;
