var gulp = require('gulp');
var del = require('del');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {

});

gulp.task('watch', function() {
  browserSync.reload;
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './src'
    },
  });
  gulp.watch("src/**").on("change", browserSync.reload);
});

gulp.task('build', ['clean'], function() {

  // images
  gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
  .pipe(gulp.dest('build/img/'));
  gulp.src('src/favicon.png')
  .pipe(gulp.dest('build'))

  // html, css and js
  gulp.src('src/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCSS()))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function(){
     return del('build/**', {force:true});
});
