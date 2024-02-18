"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          categoryId: Sequelize.literal("uuid_generate_v4()"),
          name: "Dev Ops",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: Sequelize.literal("uuid_generate_v4()"),
          name: "CI/CD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: Sequelize.literal("uuid_generate_v4()"),
          name: "Frontend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: Sequelize.literal("uuid_generate_v4()"),
          name: "Backend",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: Sequelize.literal("uuid_generate_v4()"),
          name: "Design",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
