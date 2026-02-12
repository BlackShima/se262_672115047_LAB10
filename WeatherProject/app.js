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
            res.setHeader("Content-Type", "text/html");
            res.write("<h3>The temperature in " + cityName + " is " + temp + " degree Celcius.</h3>");
            res.write("<p>The weather currently is " + desc + "</p>");
            
        })
        .catch(err => {
            console.log(err);
        });
});

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  res.write('<!DOCTYPE html>\n');
  res.write('<html>\n');
  res.write('<head><title>Node.js Response Example</title></head>\n');
  res.write('<body>\n');
  res.write('<h1>Hello from Node.js!</h1>\n');
  res.write('<p>This response was sent using the ServerResponse object.</p>\n');
  res.write('</body>\n');
  res.write('</html>');
  
  res.end();
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});