import SubTaskService from "../services/sub_task.service";
import TaskService from "../services/task.service";

export default class SubTaskController {
  constructor() {
    this.subTaskService = new SubTaskService();
    this.taskService = new TaskService();
  }

  async create(req, res) {
    try {
      const { name, taskId } = req.body;
      const taskExist = await this.taskService.getOne(taskId);
      if (!taskExist) {
        return res.status(404).json({ error: "Task not found" });
      }
      const subTask = await this.subTaskService.create({
        name,
        taskId,
        status: "pending",
      });
      return res.status(201).json(subTask);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const subTasks = await this.subTaskService.getAll();
      return res.status(200).json(subTasks);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const subTask = await this.subTaskService.getOne(id);
      if (!subTask) {
        return res.status(404).json({ message: "SubTask not found" });
      }
      return res.status(200).json(subTask);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
      const subTaskExist = await this.subTaskService.getOne(id);
      if (!subTaskExist) {
        return res.status(404).json({ message: "SubTask not found" });
      }
      const subTask = await this.subTaskService.update(
        id,
        { name, status },
        {}
      );
      return res.status(200).json(subTask);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const subTaskExist = await this.subTaskService.getOne(id);
      if (!subTaskExist) {
        return res.status(404).json({ message: "SubTask not found" });
      }
      await this.subTaskService.delete(id);

      return res.status(200).json({
        message: "SubTask deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
