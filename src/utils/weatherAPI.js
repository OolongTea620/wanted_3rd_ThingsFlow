require("dotenv").config();
const axios = require("axios");
const requestIp = require("request-ip");

const getWeatherNow = async (req) => {
  try {
    const clientIp = requestIp.getClientIp(req);
    // axios 요청
    const response = axios.get(`${process.env.WEATER_URL}current.json`, {
      params: {
        key: process.env.WEATHER_KEY,
        q: clientIp || "Seoul",
      },
    });
    const data = response.data;
  } catch (error) {
    console.error(error.message);
    const data = undefined;
  } finally {
    return data;
  }
};
module.exports = { getWeatherNow };
