import fs from 'fs';
import gulp from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

const fontWeight = {
   Thin: 100,
   ExtraLight: 200,
   Light: 300,
   Regular: 400,
   Medium: 500,
   SemiBold: 600,
   Bold: 700,
   ExtraBold: 800,
   Black: 900
};

const createFolderForFonts = () => {
   const folder = fs.existsSync(`${app.buildFolder}/fonts`);

   if (!folder) {
      fs.mkdirSync(`${app.buildFolder}/fonts`);
   }
};

const fontConversions = () => {
   createFolderForFonts();

   const srcFolderFiles = fs.readdirSync(`${app.srcFolder}/fonts`);
   const buildFolderFiles = fs.readdirSync(`${app.buildFolder}/fonts`);

   if (srcFolderFiles.length !== buildFolderFiles.length / 2) {
      // 2 - woff + woff2
      buildFolderFiles.forEach((fileName) => {
         fs.unlinkSync(`${app.buildFolder}/fonts/${fileName}`);
      });

      gulp.src(app.path.src.fonts).pipe(ttf2woff()).pipe(gulp.dest(app.path.public.fonts));
      return gulp.src(app.path.src.fonts).pipe(ttf2woff2()).pipe(gulp.dest(app.path.public.fonts));
   }

   return gulp.src(app.path.public.fonts).pipe(gulp.dest(app.path.public.fonts));
};

const fontStyles = () => {
   const files = fs.readdirSync('public/fonts');
   const fonts = [...new Set(files.map((item) => item.split('.')[0]))];

   if (fonts.length) {
      fs.writeFileSync(`${app.srcFolder}/styles/mixins/_fonts.sass`, '');

      fonts.forEach((fileName) => {
         const [name, weight, style] = fileName.split('-');

         fs.appendFile(
            `${app.srcFolder}/styles/mixins/_fonts.sass`,
            `@include font("${name}", "${fileName}", "${fontWeight[weight] || '400'}", "${
               style || 'normal'
            }")\r\n`,
            () => {}
         );
      });
   }

   return gulp.src(app.path.public.fonts).pipe(gulp.dest(app.path.public.fonts));
};

export { fontConversions, fontStyles };
