import axios from "axios";
export const getWeatherFromNet = async data => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${
    data.lat
  }&lon=${data.lon}&appid=02209aa59ed5efd0d2976605f455a257`;
  const res = await axios(URL);

  return res;
};
