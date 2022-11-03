const Sequelize = require("sequelize");

module.exports = class WeatherRecord extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        expression: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        temperature_c: {
          type: Sequelize.TINYINT,
          allowNull: true,
        },
        precip_mm: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        humidity: {
          type: Sequelize.TINYINT.UNSIGNED,
          allowNull: true,
        },
        json_raw: {
          type: Sequelize.JSON,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "WeatherRecord",
        tableName: "weather_record",
        paranoid: false,
        charset: "utf8mb4",
      }
    );
  }

  static associate(db) {
    db.WeatherRecord.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
    });
  }
};
