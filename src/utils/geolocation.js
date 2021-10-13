const request = require("request");

const coordinates = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    location +
    ".json?access_token=pk.eyJ1IjoibXVuZWVyYWJpZCIsImEiOiJja3VpZmQxYzQybm1lMzFtb2E2dmJlZThtIn0.eRzIwsh8OiSUNgPZEABXvg";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("some error occured", undefined);
    } else if (response.body.error) {
      callback("can not find location", undefined);
    } else {
      callback(undefined, {
        location,
      });
    }
  });
};

module.exports.coordinates = coordinates;
