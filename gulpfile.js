var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('minify-js', function() {
	return gulp.src('src/mapdraw.js')
	.pipe(uglify())
	.pipe(rename(function(path) { path.basename += ".min" }))
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-service-js', function() {
	return gulp.src('src/MapService.js')
	.pipe(uglify())
	.pipe(rename(function(path) { path.basename += ".min" }))
	.pipe(gulp.dest('./dist/js'));
});


gulp.task('minify-css', function() {
	return gulp.src('src/css/*.css')
	.pipe(csso())
	.pipe(rename(function(path) { path.basename += ".min" }))
	.pipe(gulp.dest('./dist/css'));
});


gulp.task('browserify', function() {
    return browserify('./demo/index.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist'));
});


gulp.task('minify', [
	'minify-js',
	'minify-service-js',
	'minify-css',
	'browserify'
]);

gulp.task('validate', function() {
	return gulp.src(['src/*.js", "src/**/*.js'])
	.pipe(jshint({ expr: true }))
	.pipe(jshint.reporter('default'));
});

gulp.task('default', [
	'validate',
	'minify'
]);

gulp.task('watch', function() {
	gulp.watch(['src/*', 'src/**/*'], ['default']);
});