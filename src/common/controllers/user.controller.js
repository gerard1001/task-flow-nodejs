import { imageUpload } from "../../helpers/upload.helper";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../../helpers/user.helper";
import CategoryService from "../services/category.service";
import UserService from "../services/user.service";
import UserCategoryService from "../services/user_category.service";
import UserTaskService from "../services/user_task.service";

export default class UserController {
  constructor() {
    this.userService = new UserService();
    this.categoryService = new CategoryService();
    this.userTaskService = new UserTaskService();
    this.userCategoryService = new UserCategoryService();
  }

  async register(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        birthDate,
        gender,
        categories,
      } = req.body;

      console.log(req.body);
      for (const category of categories) {
        const categoryExist = await this.categoryService.getById(category);
        if (!categoryExist) {
          return res.status(404).json({ error: "Category not found" });
        }
      }

      const emailExist = await this.userService.getByEmail(email);

      if (emailExist) {
        return res.status(409).json({ error: "Email already exist" });
      }

      if (req.file) {
        // req.body.picture = `http://localhost:4040/image/${req.file.filename}`;
        req.body.picture = await imageUpload(req);
      }
      const user = await this.userService.create({
        roleId: "722b8164-8a28-4bf6-b5c2-501459546cff",
        firstName,
        lastName,
        email,
        password: hashPassword(password),
        birthDate: new Date(birthDate),
        gender,
        picture: req.body.picture,
        isApproved: false,
      });

      for (const category of categories) {
        await this.userCategoryService.create({
          userId: user.userId,
          categoryId: category,
        });
      }

      return res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await this.userService.getByEmail(email);

      if (!user) {
        return res.status(404).json({
          error: "Incorrect email or password",
        });
      }
      if (!user.isApproved) {
        return res.status(404).json({
          error: "You are not approved yet, please contact the admin",
        });
      }

      const validPassword = comparePassword(password, user.password);

      if (!validPassword) {
        return res.status(404).json({
          error: "Incorrect email or password",
        });
      }

      const token = generateToken({ id: user.userId }, "7d");

      return res.status(200).json({
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getByToken(req, res) {
    try {
      const { id } = req.decoded;
      const user = await this.userService.getById(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async validateToken(req, res) {
    try {
      console.log(req.decoded);
      const { id } = req.decoded;
      const user = await this.userService.getById(id);
      if (!user) {
        return res.status(404).json({
          valid: false,
          error: "User not found",
        });
      }
      return res.status(200).json({
        valid: true,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await this.userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, password, birthDate, gender } =
        req.body;
      const user = await this.userService.getById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (req.file) {
        // req.body.picture = `http://localhost:4040/image/${req.file.filename}`;
        req.body.picture = await imageUpload(req);
      }
      if (req.body.roleId) delete req.body.roleId;

      const updatedUser = await this.userService.update(id, req.body, {
        firstName,
        lastName,
        email,
        password: password && hashPassword(password),
        birthDate: new Date(birthDate),
        gender,
        picture: req.body.picture,
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async approveUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.getById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedUser = await this.userService.update(
        id,
        { isApproved: true },
        {}
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userExist = await this.userService.getById(id);
      if (!userExist) {
        return res.status(404).json({ message: "User not found" });
      }

      const userTasks = await this.userTaskService.getByUserOrTask(id, null);
      if (userTasks.length > 0) {
        for (const userTask of userTasks) {
          await this.userTaskService.delete(userTask._id);
        }
      }

      const userCategories = await this.userCategoryService.getByUserOrCategory(
        id,
        null
      );
      if (userCategories.length > 0) {
        for (const userCategory of userCategories) {
          await this.userCategoryService.delete(userCategory._id);
        }
      }

      await this.userService.delete(id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
