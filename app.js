const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


// display the index.html file
app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    console.log(req.body.cityName);

    // the city input from index.html
    const query = req.body.cityName
    const apiKey = "60ddb5fc0f13d7164d036787b3cc7772#";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            var imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in "+ query +" is " + temp + " Degrees Celsius</h1>");
            res.write("<img src='" + imgUrl + "'/>");
            res.send()
        })
    });
})


app.listen(3000, function() {
    console.log("server is running on port 3000");
});