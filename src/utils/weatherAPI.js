require("dotenv").config();
const axios = require("axios");
const requestIp = require("request-ip");

const getWeatherNow = async (req) => {
  const clientIp = requestIp.getClientIp(req);
  // axios 요청
  const response = axios.get(`${process.env.WEATER_URL}current.json`, {
    params: {
      key: process.env.WEATHER_KEY,
      q: clientIp || "Seoul",
    },
  });
  return response;
};
module.exprots = { getWeatherNow };
