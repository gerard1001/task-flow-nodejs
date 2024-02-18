import { Category, User } from "../../database/models";

export default class CategoryService {
  async create(data) {
    return await Category.create(data);
  }

  async getAll() {
    return await Category.findAll();
  }

  async getById(id) {
    return await Category.findByPk(id, {
      include: [
        {
          model: User,
          as: "users",
        },
      ],
    });
  }

  async getByName(name) {
    return await Category.findOne({
      where: {
        name,
      },
    });
  }

  async update(id, data) {
    return await Category.update(data, {
      returning: true,
      where: {
        categoryId: id,
      },
    });
  }

  async delete(id) {
    return await Category.destroy({
      where: {
        categoryId: id,
      },
    });
  }
}
