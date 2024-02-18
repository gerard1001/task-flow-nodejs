import CategoryService from "../services/category.service";
import UserCategoryService from "../services/user_category.service";

export class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
    this.userCategoryService = new UserCategoryService();
  }
  async create(req, res) {
    try {
      const { name } = req.body;
      const categoryExist = await this.categoryService.getByName(name);
      if (categoryExist) {
        return res.status(409).json({ error: "Category already exist" });
      }
      const category = await this.categoryService.create({ name });
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    const categories = await this.categoryService.getAll();
    return res.status(200).json(categories);
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await this.categoryService.getById(id);
      if (!category) {
        return res.status(400).json({ error: "Category not Found" });
      }
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const categoryExist = await this.categoryService.getById(id);
      if (!categoryExist) {
        return res.status(404).json({ message: "Category not found" });
      }
      const category = await this.categoryService.update(
        req.params.id,
        req.body
      );
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const categoryExist = await this.categoryService.getById(id);
      if (!categoryExist) {
        return res.status(404).json({ message: "Category not found" });
      }

      const userCategories = await this.userCategoryService.getByUserOrCategory(
        null,
        id
      );
      if (userCategories.length > 0) {
        for (const userCategory of userCategories) {
          await this.userCategoryService.delete(userCategory._id);
        }
      }

      await this.categoryService.delete(id);
      return res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
