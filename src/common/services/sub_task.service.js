import { SubTask } from "../../database/models";

export default class SubTaskService {
  async create(data) {
    return await SubTask.create(data);
  }

  async getAll() {
    return await SubTask.findAll();
  }

  async getOne(id) {
    return await SubTask.findByPk(id);
  }

  async update(id, data, options) {
    return await SubTask.update(data, {
      ...options,
      returning: true,
      where: {
        subTaskId: id,
      },
    });
  }

  async delete(id) {
    return await SubTask.destroy({
      where: {
        subTaskId: id,
      },
    });
  }
}
