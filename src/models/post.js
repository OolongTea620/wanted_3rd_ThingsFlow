const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(21),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(210),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Post",
        tableName: "post",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User, {
      foreignKey: "user_id",
      targetkey: "id",
    });
    db.Post.hasOne(db.WeatherRecord, {
      foreignKey: "post_id",
      sourceKey: "id",
      onDelete: "cascade",
    });
  }
};
