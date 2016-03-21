// Gulp Dependencies
var gulp = require('gulp')
// var rename = require('gulp-rename')

// Development Dependencies
var standard = require('gulp-standard')

// Test Dependencies
// var mochaPhantomjs = require('gulp-mocha-phantomjs')
// +chai

gulp.task('lint-client', function () {
  return gulp.src('./index.js')
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('lint-test', function () {
  return gulp.src('./test/*.js')
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('default', ['lint-client', 'lint-test'])
