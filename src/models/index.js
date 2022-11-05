const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const User = require("../models/user");
const Post = require("../models/post");
const WeatherRecord = require("../models/weatherRecord");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.WeatherRecord = WeatherRecord;

User.init(sequelize);
Post.init(sequelize);
WeatherRecord.init(sequelize);

User.associate(db);
Post.associate(db);
WeatherRecord.associate(db);

module.exports = db;
