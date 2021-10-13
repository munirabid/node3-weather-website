const request = require("request");

const forecast = (location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=050376f53f86a5d2c44007fcb295aff6&query=" +
    location +
    "";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("some error occured");
    } else if (body.error) {
      callback(
        "Could not find data for the provided location. Please try different location."
      );
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          ". it is currently " +
          body.current.temperature +
          ". it feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports.forecast = forecast;
