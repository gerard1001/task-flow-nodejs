import TaskService from "../services/task.service";
import UserService from "../services/user.service";
import UserTaskService from "../services/user_task.service";

export default class UserTaskController {
  constructor() {
    this.userTaskService = new UserTaskService();
    this.userService = new UserService();
    this.taskService = new TaskService();
  }

  async create(req, res) {
    try {
      const { userId, taskId } = req.body;
      const userExist = await this.userService.getById(userId);
      const taskExist = await this.taskService.getOne(taskId);

      if (!userExist) {
        return res.status(400).json({ error: "User not found" });
      }
      if (!taskExist) {
        return res.status(400).json({ error: "Task not found" });
      }

      const relationExist = await this.userTaskService.getByUserAndTask(
        userId,
        taskId
      );
      if (relationExist.length > 0) {
        return res.status(400).json({ error: "UserTask already exists" });
      }
      const userTask = await this.userTaskService.create({
        userId,
        taskId,
      });
      return res.status(201).json(userTask);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const userTasks = await this.userTaskService.getAll();
      return res.status(200).json(userTasks);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const userTask = await this.userTaskService.getOne(id);
      if (!userTask) {
        return res.status(404).json({ message: "UserTask not found" });
      }
      return res.status(200).json(userTask);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userTask = await this.userTaskService.getOne(id);
      if (!userTask) {
        return res.status(404).json({ message: "UserTask not found" });
      }
      await this.userTaskService.delete(id);

      return res.status(200).json({
        message: "UserTask deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
