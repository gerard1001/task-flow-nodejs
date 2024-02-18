import { Task, User } from "../../database/models";

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
      ],
    });
  }

  async getAll() {
    return await Task.findAll();
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
