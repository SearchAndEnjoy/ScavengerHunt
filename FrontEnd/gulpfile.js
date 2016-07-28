'use strict'

var gulp = require('gulp'); // npm install gulp
var sass = require('gulp-sass'); // npm install gulp-sass
var browserify = require('gulp-browserify'); // npm install gulp-browserify
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');
var surge = require('gulp-surge');


gulp.task('default', ['html', 'css', 'js', 'img', 'modules'])

gulp.task('css', function() {
    gulp.src('./styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('../public/styles'))
});


gulp.task('html', function() {
    gulp.src('./js/Templates/*.html').pipe(gulp.dest('../public/templates'));

    return gulp.src('./index.html')
        .pipe(gulp.dest('../public'));
});

gulp.task('js', function() {
    return gulp.src('./js/main.js')
        .pipe(browserify())
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(browserify())
        .pipe(gulp.dest('../public'))

});
gulp.task('img', function() {
    return gulp.src('./images/*.jpg')
        .pipe(gulp.dest('../public/images'))

});

gulp.task('modules', function() {
    return gulp.src('node_modules/angular-google-maps/dist/angular-google-maps.js')
        .pipe(gulp.dest('../public/modules'))

    // return gulp.src('node_modules/flipclock/compiled/flipclock.min.js')
    //     .pipe(gulp.dest('../public/modules'))
});

gulp.task('modules', function() {
    return gulp.src('node_modules/flipclock/compiled/flipclock.min.js')
        .pipe(gulp.dest('../public/modules'))
});

gulp.task('deploy', [], function() {
    return surge({
        project: '../public', // Path to your static build directory
        domain: 'acceptable-science.surge.sh' // Your domain or Surge subdomain
    })
});


gulp.task('watch', function() {
    gulp.watch('./styles/*.scss', ['css']);
    gulp.watch('./index.html', ['html']);
    gulp.watch('./js/main.js', ['js']);
    gulp.watch('./js/Templates/*.html', ['html']);
    gulp.watch('./js/*/*.js', ['js']);
    gulp.watch('./images/*.jpg', ['img'])
        // gulp.watch('../public/*.*', ['deploy'])
});
