// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

gulp.task('lint-client', function() {
    return gulp.src('./index.js')
        .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function() {
    return gulp.src('./test/*.js')
        .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

gulp.task('default', ['lint-client', 'lint-test']);
