import UserService from "../common/services/user.service";
import checkToken from "../helpers/token.helper";
import { verifyToken } from "../helpers/user.helper";

export const checkLoggedIn = async (req, res, next) => {
  try {
    const token = checkToken(req);

    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    req.decoded = decoded;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied", error: error.message });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const user = await new UserService().getById(id);

    if (!user) {
      return res.status(401).json({ message: "Signed in user not found" });
    }

    const role = user.role.type;

    if (role !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admins can perform this action" });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied", error: error.message });
  }
};

export const checkAdminOrOperator = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const user = await new UserService().getById(id);

    if (!user) {
      return res.status(401).json({ message: "Signed in user not found" });
    }

    const role = user.role.type;

    if (role !== "admin" && role !== "operator") {
      return res
        .status(401)
        .json({ message: "Only admins or operators can perform this action" });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied", error: error.message });
  }
};

export const checkOwner = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const user = await new UserService().getById(id);

    if (!user) {
      return res.status(401).json({ message: "Signed in user not found" });
    }
    if (user.userId !== req.params.id) {
      return res
        .status(401)
        .json({ message: "Only profile owner can perform this action" });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied", error: error.message });
  }
};

export const checkAdminOrOwner = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const user = await new UserService().getById(id);

    if (!user) {
      return res.status(401).json({ message: "Signed in user not found" });
    }

    const role = user.role.type;

    if (role !== "admin" && user.userId !== req.params.id) {
      return res
        .status(401)
        .json({
          message: "Only admins or profile owner can perform this action",
        });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied", error: error.message });
  }
};
