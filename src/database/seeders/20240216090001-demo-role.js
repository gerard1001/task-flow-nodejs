"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          roleId: "1c369a6d-afe9-41b7-8aaa-3b80cec71e5d",
          type: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: "a6b2b92d-6df1-4eb8-8135-4271989152fe",
          type: "manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleId: "722b8164-8a28-4bf6-b5c2-501459546cff",
          type: "collaborator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
