"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      taskId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
      },
      categoryId: {
        allowNull: true,
        type: Sequelize.UUID,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        references: {
          model: "Categories",
          key: "categoryId",
          as: "category",
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: { type: Sequelize.TEXT, allowNull: false },
      startDate: { allowNull: false, type: Sequelize.DATE },
      endDate: { allowNull: false, type: Sequelize.DATE },
      progess: {
        type: Sequelize.ENUM([
          "pending",
          "doing",
          "testing",
          "inReview",
          "completed",
        ]),
        allowNull: false,
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};
