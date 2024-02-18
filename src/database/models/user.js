"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: {
          name: "roleId",
          allowNull: false,
        },
        as: "role",
        onDelete: "SET DEFAULT",
      });

      this.belongsToMany(models.Task, {
        foreignKey: "userId",
        through: "UserTask",
        as: "tasks",
        onDelete: "CASCADE",
      });

      this.belongsToMany(models.Category, {
        foreignKey: "userId",
        through: "UserCategory",
        as: "categories",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
      roleId: {
        allowNull: true,
        type: DataTypes.UUID,
        defaultValue: 2,
        onDelete: "SET DEFAULT",
        onUpdate: "CASCADE",
        references: {
          model: "Roles",
          key: "roleId",
          as: "role",
        },
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
          max: 16,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
          max: 16,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          min: 8,
          max: 32,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
          max: 16,
        },
      },
      picture: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM(["male", "female"]),
      },
      birthDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
