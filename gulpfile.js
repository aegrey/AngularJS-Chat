/* -----------------------------------------------------------------------------
|
| GULP BUILD SCRIPT
|
| TASKS:
| - gulp watch - starts the browser sync server
| - gulp lint - runs jslint
| - gulp build - compiles a build for prod
|
----------------------------------------------------------------------------- */

'use strict';

//---------------------------
// LIBRARY INCLUDES
//---------------------------
var gulp       = require('gulp'),
browserSync    = require('browser-sync'),
runSequence    = require('run-sequence'),
changed        = require('gulp-changed'),
gulpif         = require('gulp-if'),
gutil          = require('gulp-util'),
rename         = require('gulp-rename'),
concat         = require('gulp-concat'),
clean          = require('gulp-clean'),
autoprefixer   = require('gulp-autoprefixer'),
sourcemaps     = require('gulp-sourcemaps'),
sass           = require('gulp-sass'),
jshintLib      = require('jshint'),
jshint         = require('gulp-jshint'),
jshintStyle    = require('jshint-stylish'),
uglify         = require('gulp-uglify'),
ngAnnotate     = require('gulp-ng-annotate'),
gulpDocs       = require('gulp-ngdocs'),
bowerFiles     = require('main-bower-files');

//---------------------------
//CONFIG VARIABLES
//---------------------------
var buildPath   = './public',
stylePath       = './app/assets/styles/**/*.scss',
imagePath       = './app/assets/images/**/*',
jsonPath        = './app/assets/json/**/*.json',
scriptPath      = './app/**/*.js',
viewPath        = './app/**/*.html',
indexPath       = './app/index.html',
reload          = browserSync.reload({stream: true}),
prod            = false;


//---------------------------
// SCRIPT TASKS
//---------------------------
gulp.task('lint', function() {
    return gulp.src(scriptPath)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts:dev', function () {
  gulp.src(scriptPath)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildPath + '/assets/js'))
    .pipe(reload)
    .on('error', gutil.log);
});

gulp.task('scripts:prod', function () {
  gulp.src(scriptPath)
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(gulp.dest(buildPath + '/assets/js'))
    .on('error', gutil.log);
});

gulp.task('bower', function () {
  return gulp.src(bowerFiles())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPath + '/assets/js'))
    .on('error', gutil.log);
});

//---------------------------
// STYLE TASKS
//---------------------------

gulp.task('styles:dev', function () {
  return gulp.src(stylePath)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle:'expanded' })
      .on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildPath + '/assets/styles'))
    .pipe(gulpif(browserSync.active, reload));
});

gulp.task('styles:prod', function () {
  return gulp.src(stylePath)
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(buildPath + '/assets/styles'));
});

//---------------------------
// VIEW TASKS
//---------------------------
gulp.task('views', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest(buildPath))
    .on('error', gutil.log);

  return gulp.src(['!app/index.html', viewPath])
    .pipe(changed(viewPath))
    .pipe(gulp.dest(buildPath + '/views'))
    .on('error', gutil.log);
});

//---------------------------
// JSON TASKS
//---------------------------
gulp.task('json', function() {
  return gulp.src(jsonPath)
    .pipe(changed(jsonPath))
    .pipe(gulp.dest(buildPath + '/assets/json'))
    .on('error', gutil.log);
});

//---------------------------
// IMAGE TASKS
//---------------------------
gulp.task('images', function() {
  return gulp.src(imagePath)
    .pipe(changed(imagePath))
    .pipe(gulp.dest(buildPath + '/assets/images'))
    .on('error', gutil.log);
});

//---------------------------
// BUILD TASKS
//---------------------------
gulp.task('clean', function () {
  return gulp.src(buildPath, { read: false })
    .pipe(clean())
    .on('error', gutil.log);
});

gulp.task('watch', function(callback) {
  callback = callback || function() {};
  runSequence('clean', ['lint', 'scripts:dev', 'styles:dev', 'images', 'views', 'json'], 'bower', callback);

  var server = require("browser-sync").create();
  server.init({
      server: {
        baseDir: buildPath
        //middleware: [history({})]
      },
      port: 9074,
      https: false
  });

  gulp.watch(scriptPath, ['lint']);
  gulp.watch(viewPath,   ['views']).on('change', browserSync.reload);
  gulp.watch(scriptPath, ['scripts:dev']).on('change', browserSync.reload);
  gulp.watch(stylePath,  ['styles:dev']).on('change', browserSync.reload);
  gulp.watch(imagePath,  ['images']);
  gulp.watch(jsonPath,   ['json']);
});

gulp.task('build', function(callback) {
  callback = callback || function() {};
  prod = true;
  runSequence('clean', ['lint', 'scripts:prod', 'styles:prod', 'images', 'views', 'json'], 'bower', callback);
});
