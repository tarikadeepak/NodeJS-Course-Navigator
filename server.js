const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    resave: false,
    saveUninitilized: true,
    secret: 'any string'
}));

mongoose.connect('mongodb://localhost/webdev-course-db', { useNewUrlParser: true })

require('./services/user.service.server')(app);

app.listen(3000)