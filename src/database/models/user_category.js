"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCategory extends Model {
    static associate(models) {}
  }
  UserCategory.init(
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
      },
      categoryId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "UserCategory",
    }
  );
  return UserCategory;
};
