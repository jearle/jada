
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var shell = require('gulp-shell');

var constants = require('./lib/constants');

var options = {
  debug: true
};

gulp.task('browserify-test', shell.task(['npm run browserify-test']));
gulp.task('test', shell.task(['npm test'], { ignoreErrors: true}));