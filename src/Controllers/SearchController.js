import axios from "axios";
import { API_KEY } from "../../API_KEYS";

export const getGeoCode = async (cityName) => {
  try {
    const res = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName.toLowerCase()}&count=10&language=en&format=json`
    );
    return res?.data?.results || [];
  } catch (err) {
    console.log(err);
  }
};

export const getWeather = async (latitude, longitude, signal) => {
  try {
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=uv_index_max&timezone=auto&forecast_days=7`, {signal}
    );
    return res.data || {};
  } catch (err) {
    console.log(err);
  }
};

export const getLocalAddress = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
    );
    return res.data || {};
  } catch (err) {
    console.log(err);
  }
};

export const getWeatherDescriptionImage = async (weatherCode, isDay = "1", signal) => {
  try {
    const res = await axios.get(
      "https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json", {signal}
    );
    if (res.data[weatherCode]) {
      if (isDay == "1") return res.data[weatherCode]["day"];
      else return res.data[weatherCode]["night"];
    } else return null;
  } catch (err) {
    console.log(err);
  }
};
