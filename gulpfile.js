var gulp = require('gulp');

/*Read dependencies from package.json and inject each of them*/
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


/*car rename = require('gulp-concat');
var rename = require('gulp-rename');
var header = require('gulp-header'); */


gulp.task('default', function() {
 return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compile-js', ['compile-templates'], function() {
  return gulp.src('src/*.js')
  .pipe(concat('controller.js'))
  .pipe(gulp.dest('./dist/'));
});



/*gulp.task(‘watch’, function() {
   gulp.watch('js/*.js', ['lint', 'scripts']);
}); */
