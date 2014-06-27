
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

var constants = require('./lib/constants');

var options = {
  debug: true,
  transform: [
    'jadeify',
    'stylify'
  ]
};

gulp.task('browserify', function () {
  console.log('called?');
  return gulp.src(constants.getMain())

    .pipe(
      browserify(options)
    )

    .on('error', function (err) {
      gutil.log(err.message);
    })

    .pipe(
      rename(constants.getDev())
    )

    .pipe(
      gulp.dest(constants.getBuild())
    );

});