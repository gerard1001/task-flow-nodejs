"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubTask extends Model {
    static associate(models) {
      this.belongsTo(models.Task, {
        foreignKey: {
          name: "taskId",
          allowNull: false,
        },
        as: "task",
        onDelete: "CASCADE",
      });
    }
  }
  SubTask.init(
    {
      subTaskId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
      taskId: {
        allowNull: true,
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "Tasks",
          key: "taskId",
          as: "task",
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
        },
      },
      status: {
        type: DataTypes.ENUM(["pending", "checked"]),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "SubTask",
    }
  );
  return SubTask;
};
