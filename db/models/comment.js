"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.content);
      this.belongsTo(models.user);
    }
  }
  Comment.init(
    {
      text: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      contentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "content",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "comment",
      underscored: true,
    }
  );
  return Comment;
};
