var config = require("./gulpconfig");
var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpif = require("gulp-if");
var filter = require("gulp-filter");
var inject = require("gulp-inject");
var livereload = require("gulp-livereload");
var uglify = require("gulp-uglify");
var minifyCSS = require("gulp-minify-css");
var less = require("gulp-less");
var rename = require("gulp-rename");
var rev = require("gulp-rev");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var rimraf = require("rimraf");
var runSequence = require("run-sequence");
var express = require("express");
var http = require("http");
var server = http.createServer(express().use(express.static(config.buildDir)));
var env = null;

if (config.environments.length <= 0) {
  throw new Error("No environments configured.");
}

for (var i = 0; i < config.environments.length; i++) {
  var e = config.environments[i];
  if (e.name == (process.env.NODE_ENV || "development")) {
    env = e;
    break;
  }
}

if (!env) {
  throw new Error("Unsupported environment specified.");
}

gutil.log(gutil.colors.gray("Selected environment = " + env.name + "."));

gulp.task("build-scripts", function() {
  return browserify("./" + config.script)
    .transform(babelify)
    .bundle()
    .on("error", function(err) {
      gutil.log(gutil.colors.red(err.message));
      gutil.beep();
      this.emit("end");
    })
    .pipe(source(env.name + ".js")) // Convert from Browserify stream to vinyl stream.
    .pipe(buffer()) // Convert from streaming mode to buffered mode.
    .pipe(gulpif(env.minify, uglify({ mangle: false })))
    .pipe(rev())
    .pipe(gulp.dest(config.buildDir + "/scripts"));
});

gulp.task("build-styles", function() {
  return gulp
    .src(config.style)
    .pipe(plumber(function(err) {
      gutil.log(gutil.colors.red(err.message));
      gutil.beep();
    }))
    .pipe(less())
    .pipe(rename(env.name + ".css"))
    .pipe(gulpif(env.minify, minifyCSS()))
    .pipe(rev())
    .pipe(gulp.dest(config.buildDir + "/styles"));
});

gulp.task("build-misc", function() {
  var imagesFilter = filter("**/*.{ico,gif,jpg,png}");
  var soundsFilter = filter("**/*.mp3");

  return gulp
    .src(config.misc)
    .pipe(imagesFilter)
    .pipe(gulp.dest(config.buildDir + "/images"))
    .pipe(imagesFilter.restore())
    .pipe(soundsFilter)
    .pipe(gulp.dest(config.buildDir + "/sounds"))
    .pipe(soundsFilter.restore());
});

gulp.task("build-index", function() {
  return gulp
    .src(config.index)
    .pipe(
      inject(
        gulp.src([config.buildDir + "/**/*.css", config.buildDir + "/**/*.js"], { read: false }),
        { ignorePath: config.buildDir, addRootSlash: false, removeTags: true }
      )
    )
    .pipe(gulp.dest(config.buildDir));
});

gulp.task("clean", function(done) {
  rimraf(config.buildDir, done);
});

gulp.task("build", ["clean"], function(done) {
  runSequence("build-scripts", "build-styles", "build-misc", "build-index", done);
});

gulp.task("serve", ["build"], function(done) {
  server.listen(config.serverPort, function() {
    gutil.log(gutil.colors.green("Web server started and listening on port " + server.address().port + "."));
    done();
  });
});

gulp.task("reload", function() {
  return gulp.src(config.buildDir).pipe(livereload({ start: true }));
});

gulp.task("watch", ["serve", "reload"], function() {
  return watch(config.sourceDir, function() { runSequence("build", "reload"); });
});

gulp.task("default", function() {
  // The default task (i.e. "gulp" via the CLI).
  gulp.start("build");
});
