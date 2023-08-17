"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.category);
      this.belongsToMany(models.user, { through: "like" });
      this.hasMany(models.comment);
      this.hasMany(models.like);
    }
  }
  Content.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      videoUrl: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      photoUrl: {
        type: DataTypes.TEXT,
      },
      externalReferenceUrl: {
        type: DataTypes.TEXT,
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "content",
      underscored: true,
    }
  );
  return Content;
};
