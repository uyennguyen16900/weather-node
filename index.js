require('dotenv').config();

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

// middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

var request = require('request');

app.get('/',(req, res) => {
  res.render('index')
})

app.post('/weather', (req, res) => {
  let city = req.body.city;
  console.log(city);
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.CONSUMER_KEY}`

  request(url, (err, response, body) => {
    weather_json = JSON.parse(body)
    console.log(weather_json);

    let weather = {
      city: weather_json.name,
      temperature: Math.round(weather_json.main.temp),
      description: weather_json.weather[0].description,
      icon: weather_json.weather[0].icon
    }
    res.render('index', {weather: weather})
  })
})

app.listen(`${process.env.PORT}`, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
