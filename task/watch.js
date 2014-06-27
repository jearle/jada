
var gulp = require('gulp');

gulp.task('watch', function () {
  return gulp.watch(
    [
      'lib/**/*',
      'test/**/*',
      'index.html'
    ],
    [
      'lint',
      'test',
      'live-reload'
    ]
  )
});