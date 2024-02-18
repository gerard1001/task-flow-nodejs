import express from "express";
import UserCategoryController from "../../common/controllers/user_category.controller";

const userCategoryRoutes = express.Router();

userCategoryRoutes.post("/", async (req, res) => {
  return await new UserCategoryController().create(req, res);
});

userCategoryRoutes.get("/", async (req, res) => {
  return await new UserCategoryController().getAll(req, res);
});

userCategoryRoutes.get("/:id", async (req, res) => {
  return await new UserCategoryController().getOne(req, res);
});

userCategoryRoutes.delete("/:id", async (req, res) => {
  return await new UserCategoryController().delete(req, res);
});

export default userCategoryRoutes;
