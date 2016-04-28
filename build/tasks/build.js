var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('build-system', function() {
  return gulp.src(paths.source)
	    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
	    .pipe(changed(paths.output, {extension: '.js'}))
	    .pipe(sourcemaps.init({loadMaps: true}))
	    .pipe(to5(assign({}, compilerOptions.system())))
	    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
	    .pipe(gulp.dest(paths.output));
});

gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, { extension: '.html' }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-scss', function() {
  return gulp.src(paths.scss)
    .pipe(changed(paths.output, { extension: '.scss' }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.stream());
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-scss'],
    callback
  );
});
