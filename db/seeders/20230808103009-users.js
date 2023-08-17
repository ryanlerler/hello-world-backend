"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "lyp2726@outlook.com",
        nickname: "Ryan Ler",
        profile_pic_url: "https://i0.wp.com/cdn.auth0.com/avatars/ly.png?ssl=1",
        country: "Singapore",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
