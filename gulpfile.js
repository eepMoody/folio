"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');

var app = {
        root : 'app/*.*',
        html : 'app/**/*.html',
        scss : 'app/scss/*.scss',
        css : 'app/css/',
        js: 'app/js/*.js'
    };
var dist = {
        root : 'dist/',
        css : 'dist/css/',
        html: 'dist/**/*.html',
        js: 'dist/js/'
    };

gulp.task("watch", function () {
  gulp.watch( app.html, ['html']);
  gulp.watch( app.scss, ['sass']);
  gulp.watch( app.js, ['js']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
  });
});

gulp.task('build', ['browserSync', 'watch', 'sass', 'html'], function () {
    return;
});

gulp.task('sass', ['clean-css'], function () {
  return gulp.src(app.scss)
        .pipe(sass({
          includePaths: require('node-bourbon').includePaths
        }))
        .pipe(gulp.dest(dist.css))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('html', ['clean-html'], function () {
  return gulp.src(app.html)
        .pipe(gulp.dest(dist.root))
        .pipe(browserSync.reload({
          stream:true
        }));
});

gulp.task('js', ['clean-js'], function () {
  return gulp.src(app.js)
        .pipe(gulp.dest(dist.js))
        .pipe(browserSync.reload({
          stream:true
        }));
});

gulp.task('clean-html', function(){
  return gulp.src(dist.html)
        .pipe(clean());
});

gulp.task('clean-css', function(){
  return gulp.src(dist.css)
        .pipe(clean());
});

gulp.task('clean-js', function(){
  return gulp.src(dist.js)
        .pipe(clean());
});

gulp.task('clean', function () {
  return gulp.src(dist.root, {read: false})
        .pipe(clean());
});
