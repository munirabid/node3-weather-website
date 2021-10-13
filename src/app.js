const { request } = require("express");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const location = require("./utils/geolocation");
const weather = require("./utils/forecast");

//define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    createdBy: "Muneer Abid",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    createdBy: "Muneer Abid",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    createdBy: "Muneer Abid",
    message: "Contact support at munirabid@gmail.com for any query...",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide address",
    });
  }
  location.coordinates(req.query.address, (error, { location }) => {
    if (error) {
      return res.send({
        error,
      });
    }
    weather.forecast(location, (error, response) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        response: response,
        location: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search param",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    createdBy: "Muneer Abid",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    createdBy: "Muneer Abid",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});
