"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          userId: Sequelize.literal("uuid_generate_v4()"),
          roleId: "1c369a6d-afe9-41b7-8aaa-3b80cec71e5d",
          firstName: "MANZI",
          lastName: "Gerard",
          email: "gerard@gmail.com",
          password: await bcrypt.hash("ruta1001", 10),
          picture: null,
          gender: "male",
          birthDate: new Date("2001-09-12"),
          isApproved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: Sequelize.literal("uuid_generate_v4()"),
          roleId: "a6b2b92d-6df1-4eb8-8135-4271989152fe",
          firstName: "KALISA",
          lastName: "Serge",
          email: "serge@gmail.com",
          password: await bcrypt.hash("ruta1001", 10),
          picture: null,
          gender: "male",
          birthDate: new Date("1998-11-27"),
          isApproved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
