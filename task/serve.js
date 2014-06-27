
var gulp = require('gulp');
var express = require('express');
var livereload = require('connect-livereload');
// var connect = require('gulp-connect');

var publicPath = __dirname + '/../';

gulp.task('serve', function () {

  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(publicPath));
  app.listen(5001);

});