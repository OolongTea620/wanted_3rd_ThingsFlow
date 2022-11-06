require("dotenv").config();
const axios = require("axios");
const requestIp = require("request-ip");
const error = require("../middlewares/errorConstructor");

const getWeatherNow = async (req) => {
  const clientIp = "Seoul";
  try {
    const response = await axios.get(process.env.WEATHER_URL, {
      params: { key: process.env.WEATHER_KEY, q: "Seoul" },
    });
    return response.data;
  } catch (error) {
    return null; // 입력하지 않는 걸로 마무리
  }
};
module.exports = { getWeatherNow };
