var gulp = require('gulp');
// Beautify html files
var htmlbeautify = require('gulp-html-beautify');
// Optimize image files
var imagemin = require('gulp-imagemin');
// Caching images that were already optimized
var cache = require('gulp-cache');
// Process scss files
var sass = require('gulp-sass');
// Enable Autoprefixer
var autoprefixer = require('gulp-autoprefixer');
// Enable browsersync
var browserSync = require('browser-sync').create();

// The following task is used to pipe the html files
gulp.task('copyHTML', function() {
  gulp.src('./source/html/*.html')
//    .pipe(htmlbeautify())
//    .pipe(gulp.dest('./source/html'))
    .pipe(gulp.dest('./build'));
});

// The following task is used to pipe image files
gulp.task('copyImage', function() {
  gulp.src('./source/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('./build/design/img/'));
});

// The following task is used to pipe the javascript files
gulp.task('copyJavascript', function() {
  gulp.src('./source/js/*.js')
    .pipe(gulp.dest('build/design/js'));
});

// The following task is used to pipe the scss files
gulp.task('sass', function () {
  return gulp.src('./source/scss/main.scss')
    // outputStyle nested, expanded, compact, compressed
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/design/css'))
    .pipe(browserSync.stream());
});

gulp.task('init', ['copyHTML', 'copyHTML', 'copyImage', 'copyJavascript'], function (){
  console.log('initializing project');
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch('./source/html/*.html', ['copyHTML']);
    gulp.watch('./source/img/*', ['copyImage']);
    gulp.watch('./source/js/*js', ['copyJavascript']);
    gulp.watch('./source/scss/**/*.scss', ['sass']);
    gulp.watch('./build/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
