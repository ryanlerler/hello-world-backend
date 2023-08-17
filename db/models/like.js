"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.content);
      this.belongsTo(models.user);
    }
  }
  Like.init(
    {
      likeStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "like",
      underscored: true,
    }
  );
  return Like;
};
