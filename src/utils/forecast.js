const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/" +
    "0738f0c575774572d8d7f638fd2819ef" +
    "/" +
    latitude +
    "," +
    longitude;

  fetch(url)
    .then(resp => resp.json())
    .then(body => {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degress / " +
          (((body.currently.temperature - 32) * 5) / 9).toFixed(1) +
          " celsius out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    });
};

module.exports = forecast;
