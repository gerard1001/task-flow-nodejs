import { UserTask } from "../../database/models";
import { Op } from "sequelize";

export default class UserTaskService {
  async create(data) {
    return await UserTask.create(data);
  }

  async getAll() {
    return await UserTask.findAll();
  }

  async getOne(id) {
    return await UserTask.findByPk(id);
  }

  async getByUserAndTask(userId, taskId) {
    return await UserTask.findAll({
      where: {
        userId,
        taskId,
      },
    });
  }

  async getByUserOrTask(userId, taskId) {
    return await UserTask.findAll({
      where: {
        [Op.or]: [{ userId }, { taskId }],
      },
    });
  }

  async delete(id) {
    return await UserTask.destroy({ where: { _id: id } });
  }
}
