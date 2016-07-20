'use strict'

var gulp = require('gulp'); // npm install gulp
var sass = require('gulp-sass'); // npm install gulp-sass
var browserify = require('gulp-browserify') // npm install gulp-browserify
var htmlmin = require('gulp-htmlmin');


gulp.task('default', ['html','css', 'js', 'img'])

gulp.task('css', function (){
  gulp.src('./styles/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('../public/styles'))
});


gulp.task('html', function () {
    gulp.src('./templates/*.html').pipe(gulp.dest('../public/templates'));

    return gulp.src('./index.html')
        .pipe(gulp.dest('../public'));
});

gulp.task('js', function(){
  return gulp.src('./js/main.js')
    .pipe(browserify())
    .pipe(gulp.dest('../public'))

});
gulp.task('img', function(){
  return gulp.src('./images/*.jpg')
    .pipe(gulp.dest('../public/images'))

});


gulp.task('watch', function(){
  gulp.watch('./styles/*.scss', ['css']);
  gulp.watch('./index.html', ['html']);
  gulp.watch('./js/main.js', ['js']);
  gulp.watch('./templates/*.html', ['html']);
  gulp.watch('./js/*/*.js', ['js']);
  gulp.watch('./images/*.jpg',['img'])
});
