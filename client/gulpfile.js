var gulp = require('gulp');
var paths = require('./paths.json');
var concatCss = require('gulp-concat-css'); 
var concat = require('gulp-concat'); 
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

 

//start
gulp.task('start', function() {
    return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css',cleanCSS()))
    .pipe(gulp.dest('prod'));
});    
 //css-uncss
 gulp.task('uncss', function () {
    return gulp.src(paths.css)
        .pipe(uncss({
            html: ['app/index.html']
        }))
        .pipe(gulp.dest('./prod/uncss/'));
});
 //connect
 gulp.task('connect', function() {
  connect.server({
    root: 'prod',
    livereload: true
  });
});
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})
//css
gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(uncss({ html: [paths.html] }))
    .pipe(concatCss("bundle.css"))
    .pipe(autoprefixer({ browsers: ['last 5 versions'],cascade: false}))
    .pipe(cleanCSS({}))
    .pipe(rename("bundle.min.css"))
    .pipe(gulp.dest('prod/'))
    //.pipe(connect.reload())
    .pipe(notify('done!'));
});
//js
gulp.task('script', function() {
    return gulp.src(paths.js)
    .pipe(concat("app.js"))
    .pipe(gulp.dest('prod/'))
});










