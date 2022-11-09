const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const autoprefixer = require('gulp-autoprefixer');

//Import sass - Build scss to css
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

// postcss
const sortMediaQueries = require("postcss-sort-media-queries");
const postcss = require('gulp-postcss');

//dirname
const devDir = './';

async function style() {
    let processors = [
        sortMediaQueries({
            sort: "desktop-first",
        }),
    ];
    return gulp
        //1. Where is my scss file
        .src(devDir + 'assets/scss/*.scss')

        //2. sourceMap scss
        .pipe(sourcemaps.init())

        //3. pass that file through sass compilier
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))

        //4. auto prefix
        .pipe(autoprefixer({
            cascade: false
        })).pipe(postcss(processors))

        //5. source map css
        .pipe(sourcemaps.write('.'))

        //6. Where do I save the compiled CSS?
        .pipe(gulp.dest(devDir + 'assets/css'))
}

function watch() {    
    browserSync.init({
        watch: true,
        server: {
            baseDir: devDir
        },   
        port: 8080
    });
    // gulp.series(gulp.parallel(style));
    gulp.watch(devDir + 'assets/scss/**/*.scss', gulp.parallel(style));
}


// function post_css() {
//     // console.log(sass);
//     let processors = [
//         sortMediaQueries({
//             sort: "desktop-first",
//         }),
//     ];
//     return gulp.src(devDir + 'assets/scss/*.scss')
//         .pipe(sass({ outputStyle: 'expanded' })
//             .on('error', sass.logError))
//         .pipe(postcss(processors))
//         .pipe(gulp.dest(devDir + 'assets/css'))
// }

exports.watch = watch;
// exports.post_css = post_css;



