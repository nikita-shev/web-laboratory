import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import webpHtml from 'gulp-webp-html';
import browserSync from 'browser-sync';

export const html = () =>
   gulp
      .src(app.path.src.html)
      .pipe(fileInclude())
      .pipe(webpHtml())
      .pipe(gulp.dest(app.path.public.html))
      .pipe(browserSync.stream());
