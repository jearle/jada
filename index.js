
var express = require('express');

var app = express();

app.use(function (req, res, next) {
  console.log('called');
  next();
})

app.get('/', function (req, res) {
  res.send('hello');
});

app.listen(3001);