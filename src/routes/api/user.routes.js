import express from "express";
import UserController from "../../common/controllers/user.controller";
import { upload } from "../../helpers/multer.helper";
import {
  checkAdmin,
  checkAdminOrOwner,
  checkLoggedIn,
  checkOwner,
} from "../../middlewares/user.middleware";
import {
  createUserValidations,
  loginUserValidations,
} from "../../common/validators/user.validate";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  upload.single("picture"),
  createUserValidations,
  async (req, res) => {
    return await new UserController().register(req, res);
  }
);

userRoutes.post("/login", loginUserValidations, async (req, res) => {
  return await new UserController().login(req, res);
});

userRoutes.get("/", checkLoggedIn, checkAdmin, async (req, res) => {
  return await new UserController().getAll(req, res);
});

userRoutes.get("/one/:id", async (req, res) => {
  return await new UserController().getById(req, res);
});

userRoutes.get("/token", checkLoggedIn, async (req, res) => {
  return await new UserController().getByToken(req, res);
});

userRoutes.get("/validate/token", checkLoggedIn, async (req, res) => {
  return await new UserController().validateToken(req, res);
});

userRoutes.patch("/:id", checkLoggedIn, checkOwner, async (req, res) => {
  return await new UserController().update(req, res);
});

userRoutes.patch(
  "/approve/:id",
  checkLoggedIn,
  checkAdmin,
  async (req, res) => {
    return await new UserController().approveUser(req, res);
  }
);

userRoutes.delete(
  "/:id",
  checkLoggedIn,
  checkAdminOrOwner,
  async (req, res) => {
    return await new UserController().delete(req, res);
  }
);

export default userRoutes;
