const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// browserSync

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "./build"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

// pug

gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/template/index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'))
});

// sass

gulp.task('styles:compile', function () {
  return gulp.src('source/styles/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

// spritesmith

gulp.task('sprite', function (cb) {
  var spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));
  spriteData.img.pipe(gulp.dest('build/images/'))
  spriteData.css.pipe(gulp.dest('source/styles/global/'))
  cb();
});

// rimraf

gulp.task('clean', function del(cb) {
	return rimraf('build', cb);
});

// copy fonts

gulp.task('copy:fonts', function() {
	return gulp.src('./source/fonts/**/*.*')
		.pipe(gulp.dest('build/fonts'));
});

// copy images

gulp.task('copy:images', function() {
	return gulp.src('./source/images/**/*.*')
		.pipe(gulp.dest('build/images'));
});

// copy

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

// watchers

gulp.task('watch', function() {
	gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
	gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
});

// autoprefixer

// exports.default = () => (
//     gulp.src('source/styles/style.scss')
//         .pipe(autoprefixer({
//             cascade: false
//         }))
//         .pipe(gulp.dest('build/css'))
// );

// sourcemaps

// gulp.task('scripts:compile', function() {
//   gulp.src('source/template/**/*.js')
//     .pipe(sourcemaps.init())
//       //.pipe(plugin1())
//       //.pipe(plugin2())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/scripts'));
// });

// default

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile', 'sprite', 'copy'),
  gulp.parallel('watch', 'browser-sync')
  )
);