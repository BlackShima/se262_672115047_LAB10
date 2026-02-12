const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const cityName = req.body.cityName;
    const apiKey = "47dfa9d7373c34d563043039ad88c20b";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";

    axios.get(url)
        .then(response => {
            const data = response.data;
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const icon = data.weather[0].icon;

            res.setHeader("Content-Type", "text/html");
            res.write("<h3>The temperature in " + cityName + " is " + temp + " degree Celcius.</h3>");
            res.write("<p>The weather currently is " + desc + "</p>");
            res.write("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'>");
            
            const pollutionUrl = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            return axios.get(pollutionUrl);
        })
        .then(pollutionResponse => {
            const pollutionData = pollutionResponse.data.list[0];
            const aqi = pollutionData.main.aqi;
            const pm10 = pollutionData.components.pm10;
            const pm2_5 = pollutionData.components.pm2_5;
            res.write("<p>The Air Quality Index is " + aqi + "</p>");
            res.write("<p>The PM10: " + pm10 + "</p>");
            res.write("<p>The PM2.5: " + pm2_5 + "</p>");
            res.end();
        })
        .catch(err => {
            console.log(err);
        });
});
app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});