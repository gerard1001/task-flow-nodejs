"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: {
          name: "categoryId",
          allowNull: true,
        },
        as: "category",
        onDelete: "SET NULL",
      });

      this.belongsToMany(models.User, {
        foreignKey: "taskId",
        through: "UserTask",
        as: "users",
        onDelete: "SET NULL",
      });

      this.hasMany(models.SubTask, {
        foreignKey: "taskId",
        as: "subTasks",
        onDelete: "SET NULL",
      });
    }
  }
  Task.init(
    {
      taskId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.UUID,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        references: {
          model: "Categories",
          key: "categoryId",
          as: "category",
        },
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
          max: 16,
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
          max: 16,
        },
      },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      progess: {
        type: DataTypes.ENUM([
          "pending",
          "doing",
          "testing",
          "inReview",
          "completed",
        ]),
        defaultValue: "pending",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
