var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  cssmin = require('gulp-cssmin'),
  minify = require('gulp-minify'), // eslint-disable-line
  sourcemaps = require('gulp-sourcemaps');

var styleFiles = [
    './bower_components/HTML5-Reset/assets/css/reset.css',
    './src/css/main.css',
  ],
  scriptFiles = [
    './bower_components/firebase/firebase.js',
    './bower_components/lodash/dist/lodash.min.js',
    './bower_components/chance/dist/chance.min.js',
    './bower_components/randomcolor/randomColor.js',
    './src/js/entity/Entity.js',
    './src/js/static/Resource.js',
    './src/js/static/Util.js',
    './src/js/main.js',
    './src/js/engine/Engine.js',
  ];

function handleError(err) { // eslint-disable-line
  console.error('Error', err.message);
  if (typeof this.emit === 'function') this.emit('end')
}

gulp.task('style', function () {
  return gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('script', function () {
  return gulp.src(scriptFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
  gulp.watch('./src/css/**/*.css', ['style']);
  gulp.watch('./src/js/**/*.js', ['script']);
});

gulp.task('build', ['style', 'script']);
gulp.task('default', ['watch']);
