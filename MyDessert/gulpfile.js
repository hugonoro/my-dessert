/// <binding BeforeBuild='default' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var mincss = require("gulp-minify-css");
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var pkg = require("./package.json");

gulp.task("css", function () {
    gulp.src(pkg.cssfiles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat("styles.css"))
        .pipe(mincss())
        .pipe(autoprefixer({ map: true }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./content"));
});

gulp.task("js", function () {
    gulp.src(pkg.jsfiles)
        .pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("Scripts"));
});

gulp.task('default', ["css", "js"]);