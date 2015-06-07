import gulp from "gulp";
import gutil from "gulp-util";
import gulpif from "gulp-if";
import filter from "gulp-filter";
import inject from "gulp-inject";
import livereload from "gulp-livereload";
import uglify from "gulp-uglify";
import minifyCSS from "gulp-minify-css";
import less from "gulp-less";
import rename from "gulp-rename";
import rev from "gulp-rev";
import watch from "gulp-watch";
import plumber from "gulp-plumber";
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import rimraf from "rimraf";
import runSequence from "run-sequence";
import express from "express";
import http from "http";
import config from "./gulpconfig";

let server = http.createServer(express().use(express.static(config.buildDir)));
let env = config.environments.find(e => e.name === (process.env.NODE_ENV || "development"));
if (env) {
  gutil.log(gutil.colors.gray(`Selected environment = ${env.name}.`));
} else {
  throw new Error("Unsupported environment specified.");
}

gulp.task("build-scripts", () => {
  return browserify(`./${config.script}`)
    .transform(babelify)
    .bundle()
    .on("error", function(err) {
      gutil.log(gutil.colors.red(err.message));
      gutil.beep();
      this.emit("end");
    })
    .pipe(source(`${env.name}.js`)) // Convert from Browserify stream to vinyl stream.
    .pipe(buffer()) // Convert from streaming mode to buffered mode.
    .pipe(gulpif(env.minify, uglify({ mangle: false })))
    .pipe(rev())
    .pipe(gulp.dest(`${config.buildDir}/scripts`));
});

gulp.task("build-styles", () => {
  return gulp
    .src(config.style)
    .pipe(plumber(err => {
      gutil.log(gutil.colors.red(err.message));
      gutil.beep();
    }))
    .pipe(less())
    .pipe(rename(`${env.name}.css`))
    .pipe(gulpif(env.minify, minifyCSS()))
    .pipe(rev())
    .pipe(gulp.dest(`${config.buildDir}/styles`));
});

gulp.task("build-misc", () => {
  let imagesFilter = filter("**/*.{ico,gif,jpg,png}");
  let soundsFilter = filter("**/*.mp3");

  return gulp
    .src(config.misc)
    .pipe(imagesFilter)
    .pipe(gulp.dest(`${config.buildDir}/images`))
    .pipe(imagesFilter.restore())
    .pipe(soundsFilter)
    .pipe(gulp.dest(`${config.buildDir}/sounds`))
    .pipe(soundsFilter.restore());
});

gulp.task("build-index", () => {
  return gulp
    .src(config.index)
    .pipe(
      inject(
        gulp.src([`${config.buildDir}/**/*.css`, `${config.buildDir}/**/*.js`], { read: false }),
        { ignorePath: config.buildDir, addRootSlash: false, removeTags: true }
      )
    )
    .pipe(gulp.dest(config.buildDir));
});

gulp.task("clean", done => {
  rimraf(config.buildDir, done);
});

gulp.task("build", ["clean"], done => {
  runSequence("build-scripts", "build-styles", "build-misc", "build-index", done);
});

gulp.task("serve", ["build"], done => {
  server.listen(config.serverPort, () => {
    gutil.log(gutil.colors.green(`Web server started and listening on port ${server.address().port}.`));
    done();
  });
});

gulp.task("reload", () => {
  return gulp.src(config.buildDir).pipe(livereload({ start: true }));
});

gulp.task("watch", ["serve", "reload"], () => {
  return watch(config.sourceDir, () => { runSequence("build", "reload") });
});

gulp.task("default", ["build"]);
