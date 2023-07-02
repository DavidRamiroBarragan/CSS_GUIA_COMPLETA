const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

function css(done) {
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
    done();
}

function imagenes(done) {
    src('src/img/**/*')
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(dest('build/img'));

    done();
}

function imageWebp(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
}

function imageAvif(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
    done();
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}


exports.css = css;
exports.dev = dev;
exports.img = imagenes;
exports.imageWebp = imageWebp;
exports.imageAvif = imageAvif;

exports.default = series(imagenes, imageWebp, imageAvif, css, dev);
