import { Task, User, SubTask, Category } from "../../database/models";

export default class TaskService {
  async create(data) {
    return await Task.create(data);
  }

  async getOne(id) {
    return await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: "users",
          through: {
            attributes: [],
          },
        },
        {
          model: SubTask,
          as: "subTasks",
        },
      ],
    });
  }

  async getAll() {
    return await Task.findAll({
      include: [
        {
          model: User,
          as: "users",
          through: {
            attributes: [],
          },
        },
        {
          model: SubTask,
          as: "subTasks",
        },
        {
          model: Category,
          as: "category",
        },
      ],
    });
  }

  async update(id, data, options) {
    return await Task.update(data, {
      ...options,
      returning: true,
      where: {
        taskId: id,
      },
    });
  }

  async delete(id) {
    return await Task.destroy({
      where: {
        taskId: id,
      },
    });
  }
}
