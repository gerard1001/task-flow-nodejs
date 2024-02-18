"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {
    static associate(models) {}
  }
  UserTask.init(
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
      taskId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "UserTask",
    }
  );
  return UserTask;
};
