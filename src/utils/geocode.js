const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const geocode = async (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=" +
    process.env.GEOCODE_TOKEN +
    "&limit=1";

  try {
    fetch(url)
      .then(resp => resp.json())
      .then(body => {
        if (body.features.length == 0) {
          return callback(
            "No address found. Please try another term.",
            undefined
          );
        }
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        });
      });
  } catch (error) {
    callback("Unable to connect to location services!", undefined);
  }
};

module.exports = geocode;
