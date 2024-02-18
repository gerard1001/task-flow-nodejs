import CategoryService from "../services/category.service";
import TaskService from "../services/task.service";
import UserService from "../services/user.service";
import UserTaskService from "../services/user_task.service";

export default class TaskController {
  constructor() {
    this.taskService = new TaskService();
    this.categoryService = new CategoryService();
    this.userService = new UserService();
    this.userTaskService = new UserTaskService();
  }

  async create(req, res) {
    try {
      const {
        title,
        description,
        startDate,
        endDate,
        categoryId,
        collaborators,
      } = req.body;

      for (const collaborator of collaborators) {
        const userExist = await this.userService.getById(collaborator);
        if (!userExist) {
          return res.status(404).json({ error: "User not found" });
        }
      }

      const categoryExist = await this.categoryService.getById(categoryId);
      if (!categoryExist) {
        return res.status(404).json({ error: "Category not found" });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        return res
          .status(400)
          .json({ error: "Start date can't be greater or equal to end date" });
      }

      const task = await this.taskService.create({
        title,
        description,
        startDate: start,
        endDate: end,
        categoryId,
      });

      for (const collaborator of collaborators) {
        await this.userTaskService.create({
          userId: collaborator,
          taskId: task.taskId,
        });
      }

      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const task = await this.taskService.getOne(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const tasks = await this.taskService.getAll();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, startDate, endDate, categoryId } = req.body;
      const categoryExist = await this.categoryService.getById(categoryId);
      if (categoryId && !categoryExist) {
        return res.status(404).json({ error: "Category not found" });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        return res
          .status(400)
          .json({ error: "Start date can't be greater or equal to end date" });
      }

      const taskExist = await this.taskService.getOne(id);
      if (!taskExist) {
        return res.status(404).json({ message: "Task not found" });
      }

      const task = await this.taskService.update(id, req.body, {
        title,
        description,
        startDate: start,
        endDate: end,
        categoryId,
      });
      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const taskExist = await this.taskService.getOne(id);
      if (!taskExist) {
        return res.status(404).json({ message: "Task not found" });
      }

      const taskUsers = await this.userTaskService.getByUserOrTask(null, id);
      if (taskUsers.length > 0) {
        for (const taskUser of taskUsers) {
          await this.userTaskService.delete(taskUser._id);
        }
      }
      await this.taskService.delete(id);
      return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
