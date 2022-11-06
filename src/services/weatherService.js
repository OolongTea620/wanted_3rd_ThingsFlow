require("dotenv").config();
const weatherUtil = require("../utils/weatherAPI");
const WeatherRecord = require("../models/weatherRecord");
const error = require("../middlewares/errorConstructor");

const recordWeather = async (req, postId) => {
  const weather = await weatherUtil.getWeatherNow();
  if (!weather) {
    return null;
  }
  const result = await WeatherRecord.create({
    expression: weather.current.condition.text,
    temperature_c: weather.current.temp_c,
    precip_mm: weather.current.precip_mm,
    humidity: weather.current.humidity,
    json_raw: weather,
    post_id: postId,
  });
  return result;
};

module.exports = { recordWeather };
