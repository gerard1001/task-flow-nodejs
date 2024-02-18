import { UserCategory } from "../../database/models";
import { Op } from "sequelize";

export default class UserCategoryService {
  async create(data) {
    return await UserCategory.create(data);
  }

  async getAll() {
    return await UserCategory.findAll();
  }

  async getOne(id) {
    return await UserCategory.findByPk(id);
  }

  async getByUserAndCategory(userId, categoryId) {
    return await UserCategory.findAll({
      where: {
        userId,
        categoryId,
      },
    });
  }

  async getByUserOrCategory(userId, categoryId) {
    return await UserCategory.findAll({
      where: {
        [Op.or]: [{ userId }, { categoryId }],
      },
    });
  }

  async delete(id) {
    return await UserCategory.destroy({ where: { _id: id } });
  }
}
