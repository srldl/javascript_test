var gulp = require('gulp');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('default', function() {
 return gulp.src(['./src/*.js'])
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

//gulp.task('compile-js', ['compile-templates'], function() {
//  return gulp.src('src/*.js')
//  .pipe(concat('controller.js'))
//  .pipe(gulp.dest('./dist/'));
//});



/*gulp.task(‘watch’, function() {
   gulp.watch('js/*.js', ['lint', 'scripts']);
}); */
