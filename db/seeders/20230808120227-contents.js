"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "contents",
      [
        {
          title: "MVC",
          description: "Testing Application and Framing Challenge",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/hello-world-55ba2.appspot.com/o/38%20Testing%20Application%2C%20Framing%20Challenge.mp4?alt=media&token=6f2c6300-fc98-4737-af83-f541a82e413c",
          category_id: 2,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Sequelize Model",
          description: "Developing Sequelize Model",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/hello-world-55ba2.appspot.com/o/Sequelize%20Model.mp4?alt=media&token=51742f2f-36bb-47ce-967e-f20e46dff655",
          category_id: 2,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Express",
          description: "Express Middleware",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/hello-world-55ba2.appspot.com/o/Express.mp4?alt=media&token=23596230-465e-40db-bcfb-a45d0cd67439",
          category_id: 2,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "React Blog",
          description:
            "Creating a Blog Component within the BlogList, passing down state as props",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/hello-world-55ba2.appspot.com/o/18%20-%20React%20%20blogs%202.mp4?alt=media&token=2fbbbcbd-e8b3-4be5-a8ba-15b450af7926",
          category_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "React and Axios",
          description: "Axios Implementation of HTTP Request and Response",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/hello-world-55ba2.appspot.com/o/React%20Axios.mp4?alt=media&token=ceb74df2-188e-4c95-9e81-294c49d25cfc",
          category_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "React Router",
          description: "Nested Routing",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/hello-world-55ba2.appspot.com/o/React%20Router.mp4?alt=media&token=89b4ea40-ee43-457f-b811-35f607de19aa",
          category_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contents", null, {});
  },
};
