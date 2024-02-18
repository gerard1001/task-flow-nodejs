import express from "express";
import userRoutes from "./api/user.routes";
import categoryRoutes from "./api/category.routes";
import taskRoutes from "./api/task.routes";
import subTaskRoutes from "./api/sub_task.routes";
import userTaskRoutes from "./api/user_task.routes";
import userCategoryRoutes from "./api/user_category.routes";

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/category", categoryRoutes);
routes.use("/task", taskRoutes);
routes.use("/sub_task", subTaskRoutes);
routes.use("/user_task", userTaskRoutes);
routes.use("/user_category", userCategoryRoutes);
routes.use("/user", userCategoryRoutes);

export default routes;
