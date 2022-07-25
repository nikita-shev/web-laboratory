import gulp from 'gulp';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import svgSprite from 'gulp-svg-sprite';
import browserSync from 'browser-sync';

const images = () =>
   gulp
      .src(app.path.src.images)
      .pipe(webp({ quality: 70 }))
      .pipe(gulp.dest(app.path.public.images))
      .pipe(gulp.src(app.path.src.images))
      .pipe(
         imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // от 0 до 7
         })
      )
      .pipe(gulp.dest(app.path.public.images))
      .pipe(browserSync.stream());

const svg = () =>
   gulp
      .src(app.path.src.svg)
      .pipe(
         svgSprite({
            mode: {
               stack: {
                  sprite: '../icons/icons.svg',
                  example: false
               }
            }
         })
      )
      .pipe(gulp.dest(app.path.public.images))
      .pipe(browserSync.stream());

export { images, svg };
