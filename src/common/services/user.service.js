import { User, Role, Task, Category } from "../../database/models";

export default class UserService {
  async create(data) {
    return await User.create(data);
  }

  async getAll() {
    return await User.findAll({
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });
  }

  async getById(id) {
    return await User.findOne({
      where: {
        userId: id,
      },
      include: [
        {
          model: Role,
          as: "role",
        },
        {
          model: Task,
          as: "tasks",
        },
        {
          model: Category,
          as: "categories",
        },
      ],
    });
  }

  async getByEmail(email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  }

  async update(id, data, options) {
    return await User.update(data, {
      ...options,
      returning: true,
      where: {
        userId: id,
      },
    });
  }

  async delete(id) {
    return await User.destroy({
      where: {
        userId: id,
      },
    });
  }
}
