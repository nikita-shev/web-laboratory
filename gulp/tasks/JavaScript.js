import gulp from 'gulp';
import webpack from 'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import webpackConfig from '../../webpack.config.js';

export const js = () =>
   gulp
      .src(app.path.src.js)
      .pipe(sourcemaps.init())
      .pipe(webpack(webpackConfig))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(app.path.public.js))
      .pipe(browserSync.stream())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(app.path.public.js));
