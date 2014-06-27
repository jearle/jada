
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var fs = require('fs-extra');

var constants = require('./lib/constants');

gulp.task('compress', ['browserify', 'browserify-test'], function () {

  var index = fs.readFileSync(__dirname + '/../index.html', 'utf8');
  var prodIndex = index.replace('src="build/dev.js"', 'src="build/prod.js"');

  fs.writeFileSync(__dirname + '/../prod.html', prodIndex);

  return gulp.src(constants.getBuild() + '/' + constants.getDev())

    .pipe(
      uglify()
    )

    .pipe(
      rename(constants.getProd())
    )

    .pipe(
      gulp.dest(constants.getBuild())
    );

});