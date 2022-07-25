import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import webpCss from 'gulp-webpcss';
import groupMedia from 'gulp-group-css-media-queries';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);

export const css = () =>
   gulp
      .src(app.path.src.css)
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(app.path.public.css))
      .pipe(browserSync.stream())
      .pipe(
         webpCss({
            webpClass: '.webp', // Option `baseClass` is deprecated. Use webpClass instead.
            replace_from: /\.(png|jpg|jpeg)/,
            replace_to: '.webp'
         })
      )
      .pipe(groupMedia())
      .pipe(cleanCss())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(app.path.public.css));
