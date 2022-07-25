import gulp from 'gulp';
import del from 'del';
import { server } from './gulp/tasks/server.js';
import { html } from './gulp/tasks/html.js';
import { css } from './gulp/tasks/css.js';
import { js } from './gulp/tasks/JavaScript.js';
import { images, svg } from './gulp/tasks/images.js';
import { fontConversions, fontStyles } from './gulp/tasks/fonts.js';

const srcFolder = 'src';
const buildFolder = 'public';

const path = {
   public: {
      html: `${buildFolder}/`,
      css: `${buildFolder}/css/`,
      js: `${buildFolder}/js/`,
      images: `${buildFolder}/images/`,
      fonts: `${buildFolder}/fonts/`
   },
   src: {
      html: [`${srcFolder}/**/*.html`, `!${srcFolder}/**/_*.html`],
      css: `${srcFolder}/styles/main.sass`,
      js: `${srcFolder}/js/main.js`,
      images: `${srcFolder}/images/**/*.+(png|jpg|gif|ico|webp)`,
      svg: `${srcFolder}/images/icons/**/*.svg`,
      fonts: `${srcFolder}/fonts/**/*.ttf`
   },
   watch: {
      html: `${srcFolder}/**/*.html`,
      css: `${srcFolder}/styles/**/*.+(scss|sass)`,
      js: `${srcFolder}/js/**/*.js`,
      images: `${srcFolder}/images/**/*.+(png|jpg|gif|ico|svg|webp)`,
      fonts: `${srcFolder}/fonts/**/*.ttf`
   }
};

global.app = {
   buildFolder,
   srcFolder,
   path
};

const clean = () =>
del([`${buildFolder}/**/*.*`, `!${buildFolder}/fonts/**/*.*`]);

const watcher = () => {
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.css, css);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, gulp.parallel(images, svg));
   gulp.watch(path.watch.fonts, gulp.series(fontConversions, fontStyles));
};

export default gulp.series(
   clean,
   gulp.parallel(html, css, js, images, svg, gulp.series(fontConversions, fontStyles)),
   gulp.parallel(watcher, server)
);
