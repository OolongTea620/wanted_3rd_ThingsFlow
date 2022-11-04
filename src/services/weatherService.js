const weatherUtil = require("../utils/weatherAPI");
const WeatherRecord = require("../models/weatherRecord");

const recordWeather = async (req, postId) => {
  const current = weatherUtil.getWeatherNow(req);
  const result = await WeatherRecord.create({
    expression: current.condition.text,
    temperature_c: current.temp_c,
    precip_mm: current.precip_mm,
    humidity: current.humidity,
    json_raw: data,
    post_id: postId,
  });
  return result;
};

module.exports = { recordWeather };
