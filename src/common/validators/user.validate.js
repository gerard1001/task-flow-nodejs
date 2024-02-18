import Joi from "joi";

export const createUserValidations = (req, res, next) => {
  const schema = Joi.object({
    roleId: Joi.string().optional().empty(),
    firstName: Joi.string().required().empty().min(4).max(16),
    lastName: Joi.string().required().empty().min(4).max(16),
    email: Joi.string().email().required().empty(),
    password: Joi.string().required().empty().min(8).max(16),
    birthDate: Joi.date().required().empty(),
    picture: Joi.string().optional().empty(),
    gender: Joi.string().valid("male", "female").required().empty(),
    categories: Joi.array().items(Joi.string()).optional().empty(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    return next();
  }
};

export const loginUserValidations = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().empty(),
    password: Joi.string().required().empty().min(8).max(16),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    return next();
  }
};
