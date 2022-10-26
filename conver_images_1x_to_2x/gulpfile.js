const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const autoprefixer = require('gulp-autoprefixer');

//Import sass - Build scss to css
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

// resize
const sharpResponsive = require('gulp-sharp-responsive')
const retinaImg = require('gulp-retina-img');

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
    gulp.watch(devDir + 'assets/scss/**/*.scss', gulp.parallel(style));
}

function img_resize() {
    return gulp.src(devDir + 'assets/images/**/*.{jpg,png}')
        .pipe(sharpResponsive({
            formats: [
                {
                    width: function (metadata) {
                  
                       // return  Math.floor(metadata.width * 2);
                        return metadata.width * 2 >= 1280 ? Math.floor(metadata.width) : Math.floor(metadata.width * 2);
                      },
                      rename: function (e) {
                          return { basename: e.basename+'@2x' } //add @2x for double image
                          //return { basename: e.basename }
                      }
                } // divides the original image width by 2
            ]
        }))
        .pipe(gulp.dest(
            function (file) {
                return file.base;
            }
        ));
}

function img_retina() {
    return gulp.src(devDir + '**/*.html')
        .pipe(retinaImg({
            suffix: {
                1: '',
                2: '@2x',
            },
            reImageSrc: /^((?:(?:http|https):\/\/)?(?:.+))(\.(?:png|jpg|))$/
        })).pipe(retinaImg({
            suffix: null,
            reImageSrc: /^((?:(?:http|https):\/\/)?(?:.+))(\_noresize.(?:png|jpg|))$/
        }))
        .on('error', function (e) {
            console.log(e.message);
        })
        .pipe(gulp.dest(devDir));
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

exports.img_resize = img_resize;
exports.img_retina = img_retina;
exports.watch = watch;
// exports.post_css = post_css;



