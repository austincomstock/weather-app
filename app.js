const express = require("express"); // https://expressjs.com/en/starter/hello-world.html
const https = require("node:https"); // https://nodejs.org/docs/latest-v16.x/api/https.html#httpsgeturl-options-callback:~:text=%23-,https.get(url%5B%2C%20options%5D%5B%2C%20callback%5D),-%23
const bodyParser = require("body-parser"); // https://www.npmjs.com/package/body-parser

require("dotenv").config();
const MAPI_KEY = process.env.API_KEY;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const zip = req.body.zipCode;
  const unit = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zip +
    "&appid=" +
    MAPI_KEY +
    "&units=" +
    unit +
    "";

  https.get(url, function (response) {
    console.log("statusCode:", response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const name = weatherData.name;
      console.log(name);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // res.write(
      //   "<h1>The temperature in " +
      //     name +
      //     " is " +
      //     temp +
      //     " degrees Fahrenheit.</h1>"
      // );
      // res.write("<p>The weather is currently " + weatherDescription + "</p>");
      // res.write("<img src=" + imageUrl + ">");

      // res.send();
      res.send(
        "<h1>The temperature in " +
          name +
          " is " +
          temp +
          " degrees Fahrenheit.</h1>" +
          "<p>The weather is currently " +
          weatherDescription +
          "</p>" +
          "<img src=" +
          imageUrl +
          ">"
      );
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
