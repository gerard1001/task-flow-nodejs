import express from "express";
import { CategoryController } from "../../common/controllers/category.controller";
import {
  checkAdminOrOperator,
  checkLoggedIn,
} from "../../middlewares/user.middleware";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/",
  checkLoggedIn,
  checkAdminOrOperator,
  async (req, res) => {
    return await new CategoryController().create(req, res);
  }
);

categoryRoutes.get("/", async (req, res) => {
  return await new CategoryController().getAll(req, res);
});

categoryRoutes.get("/:id", async (req, res) => {
  return await new CategoryController().getById(req, res);
});

categoryRoutes.patch(
  "/:id",
  checkLoggedIn,
  checkAdminOrOperator,
  async (req, res) => {
    return await new CategoryController().update(req, res);
  }
);

categoryRoutes.delete(
  "/:id",
  checkLoggedIn,
  checkAdminOrOperator,
  async (req, res) => {
    return await new CategoryController().delete(req, res);
  }
);

export default categoryRoutes;
