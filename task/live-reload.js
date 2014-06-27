
var gulp = require('gulp');
var tinylr = require('tiny-lr');

var lr;

var options = {
  body: {
    files: 'build/dev.js'
  }
};

function createLr () {
  lr = tinylr();
  lr.listen(35729);
}

gulp.task('live-reload', ['compress'], function () {
  if (!lr) createLr();

  lr.changed(options);
});