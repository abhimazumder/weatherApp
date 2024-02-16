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

export const getWeather = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m&daily=uv_index_max&timezone=auto&forecast_days=7`
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
