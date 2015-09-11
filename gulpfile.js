var gulp    = require('gulp'),
coffee      = require('gulp-coffee'),
browserSync = require('browser-sync').create();

gulp.task('coffeescript', function () {
    gulp.src('./coffee/**/*.coffee')
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest('./src/'));
});

gulp.task('reload', ['coffeescript'],  browserSync.reload);

gulp.task('stream', function () {
    gulp.src('./css/**/*.css')
    .pipe(browserSync.stream());
});

gulp.task('serve', ['coffeescript'], function() {
    browserSync.init({
          server: {
              baseDir: "./"
          }
    });
    gulp.watch('./coffee/**/*.coffee', ['reload']);
    gulp.watch('./css/**/*.css', ['stream']);
});

gulp.task('default', ['serve']);
