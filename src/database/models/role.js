"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: "roleId",
        as: "users",
        onDelete: "SET DEFAULT",
      });
    }
  }
  Role.init(
    {
      roleId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM(["admin", "manager", "collaborator"]),
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
