"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Task, {
        foreignKey: "categoryId",
        as: "tasks",
        onDelete: "SET NULL",
      });

      this.belongsToMany(models.User, {
        foreignKey: "categoryId",
        through: "UserCategory",
        as: "users",
        onDelete: "CASCADE",
      });
    }
  }
  Category.init(
    {
      categoryId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
          max: 16,
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
