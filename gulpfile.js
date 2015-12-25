var gulp    = require('gulp'),
coffee      = require('gulp-coffee'),
amdOptimize = require("amd-optimize"),
concat      = require('gulp-concat'),
uglify      = require("gulp-uglify"),
sourcemaps  = require('gulp-sourcemaps'),
plumber     = require('gulp-plumber'),
browserSync = require('browser-sync').create();

gulp.task('coffeescript', function () {
    gulp.src('./coffee/**/*.coffee')
    .pipe(plumber())
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest('./src/'));
});

gulp.task('build', ['coffeescript'], function () {
    gulp.src(["src/**/*.js"])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(plumber())
    .pipe(amdOptimize("main", {baseURL: './src', configFile: 'src/main.js'}))
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./"));
});

gulp.task('reload', ['build'],  browserSync.reload);

gulp.task('stream', function () {
    gulp.src('./css/**/*.css')
    .pipe(browserSync.stream());
});

gulp.task('serve', ['build'], function() {
    browserSync.init({
          server: {
              baseDir: "./"
          }
    });
    gulp.watch('./coffee/**/*.coffee', ['reload']);
    gulp.watch('./css/**/*.css', ['stream']);
});

gulp.task('default', ['serve']);
