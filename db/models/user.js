"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.content);
      this.belongsToMany(models.content, { through: "like" });
      this.hasMany(models.comment);
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profilePicUrl: {
        type: DataTypes.TEXT,
      },
      country: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
