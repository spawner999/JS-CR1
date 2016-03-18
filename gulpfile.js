// npm install gulp -g
// npm install bower -g
// npm init
// bower init

// npm i -D browserify browser-sync vinyl-source-stream jshint gulp gulp-concat gulp-uglify del gulp-sass gulp-postcss autoprefixer gulp-sourcemaps gulp-jshint lost bower-files

// bower install jquery --save

// npm install dotenv --save

var gulp = require('gulp'),
browserify = require('browserify'),
source = require('vinyl-source-stream'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
del = require('del'),
jshint = require('gulp-jshint'),
postcss = require('gulp-postcss'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('autoprefixer'),
lost = require('lost'),
browserSync = require('browser-sync').create(),
lib = require('bower-files')();

gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'] , function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], function(){
  return gulp.src('./build/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});


gulp.task('js', [ 'jshint' ,'minifyScripts'], function(){
  browserSync.reload();
  return del(['tmp']);
});

gulp.task('css', function () {
  var processors = [ autoprefixer, lost
  ];
  browserSync.reload();
  return gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('html', function(){
  browserSync.reload();
});

gulp.task('serve', ['js', 'css', 'html'], function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });

  gulp.watch('js/*.js', ['js']);
  gulp.watch('scss/*.scss', ['css']);
  gulp.watch('index.html', ['html']);
});

gulp.task('default', ['serve']);
