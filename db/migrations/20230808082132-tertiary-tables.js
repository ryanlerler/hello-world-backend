"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      video_url: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      photo_url: {
        type: Sequelize.TEXT,
      },
      external_reference_url: {
        type: Sequelize.TEXT,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("clicks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      click_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      // live_lesson_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: live_lessons,
      //     key: "id",
      //   },
      // },
      content_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "contents",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("user_learning_records", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      // live_lesson_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "live_lessons",
      //     key: "id",
      //   },
      // },
      content_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "contents",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("follows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      following_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      follower_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.createTable("live_lessons", {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   title: {
    //     allowNull: false,
    //     type: Sequelize.STRING,
    //   },
    //   description: {
    //     allowNull: false,
    //     type: Sequelize.TEXT,
    //   },
    //   category_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: "categories",
    //       key: "id",
    //     },
    //   },
    //   user_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: "categories",
    //       key: "id",
    //     },
    //   },
    //   created_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    //   updated_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    // });

    // await queryInterface.createTable("live_lesson_participants", {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   live_lesson_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: "live_lessons",
    //       key: "id",
    //     },
    //   },
    //   user_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: "users",
    //       key: "id",
    //     },
    //   },
    //   created_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    //   updated_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    // });

    await queryInterface.createTable("chat_participants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      chatroom_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      like_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      content_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "contents",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      content_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "contents",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.createTable("live_lesson_reminders", {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   user_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: "users",
    //       key: "id",
    //     },
    //   },
    //   live_lesson_id: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: "live_lessons",
    //       key: "id",
    //     },
    //   },
    //   reminder_datetime: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    //   created_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    //   updated_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    // });

    await queryInterface.createTable("chats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      chatroom_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "chatrooms",
          key: "id",
        },
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("chats");
    // await queryInterface.dropTable("live_lesson_reminders");
    await queryInterface.dropTable("comments");
    await queryInterface.dropTable("likes");
    await queryInterface.dropTable("chat_participants");
    // await queryInterface.dropTable("live_lesson_participants");
    // await queryInterface.dropTable("live_lessons");
    await queryInterface.dropTable("follows");
    await queryInterface.dropTable("user_learning_records");
    await queryInterface.dropTable("clicks");
    await queryInterface.dropTable("contents");
  },
};
