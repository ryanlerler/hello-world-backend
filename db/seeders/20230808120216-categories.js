"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Frontend Development",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Backend Development",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Mobile App Development",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Game Development",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Cybersecurity",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Artificial Intelligence and Machine Learning",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Cloud Computing and DevOps",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Internet of Things (IoT)",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Big Data and Data Science",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "UI/UX Design",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Digital Marketing and E-commerce",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "IT Certifications",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Algorithms and Data Structures",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
