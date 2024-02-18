import CategoryService from "../services/category.service";
import UserService from "../services/user.service";
import UserCategoryService from "../services/user_category.service";

export default class UserCategoryController {
  constructor() {
    this.userCategoryService = new UserCategoryService();
    this.userService = new UserService();
    this.categoryService = new CategoryService();
  }

  async create(req, res) {
    try {
      const { userId, categoryId } = req.body;
      const userExist = await this.userService.getById(userId);
      const categoryExist = await this.categoryService.getById(categoryId);

      if (!userExist) {
        return res.status(400).json({ error: "User not found" });
      }
      if (!categoryExist) {
        return res.status(400).json({ error: "Category not found" });
      }

      const relationExist = await this.userCategoryService.getByUserAndCategory(
        userId,
        categoryId
      );
      if (relationExist.length > 0) {
        return res.status(400).json({ error: "UserCategory already exists" });
      }
      const userCategory = await this.userCategoryService.create({
        userId,
        categoryId,
      });
      return res.status(201).json(userCategory);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const userCategorys = await this.userCategoryService.getAll();
      return res.status(200).json(userCategorys);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const userCategory = await this.userCategoryService.getOne(id);
      if (!userCategory) {
        return res.status(404).json({ message: "UserCategory not found" });
      }
      return res.status(200).json(userCategory);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userCategory = await this.userCategoryService.getOne(id);
      if (!userCategory) {
        return res.status(404).json({ message: "UserCategory not found" });
      }
      await this.userCategoryService.delete(id);

      return res.status(200).json({
        message: "UserCategory deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
