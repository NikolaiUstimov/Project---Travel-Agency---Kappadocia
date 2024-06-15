const { src, dest, parallel, series, watch } = require('gulp');
const less = require('gulp-less');
const concatCSS = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const fs = require('fs');

const paths = {
    styles: {
        src: 'src/styles/main.less',
        dest: 'dist/styles/'
    },
    images: {
        src: 'src/images/**/*.{jpg,png,svg,gif,ico,webp,JPG,PNG,SVG,GIF,ICO,WEBP}',
        dest: 'dist/images/'
    }
};

function cleanFolder(done) {
    if (fs.existsSync('dist/styles/style.min.css')) {
        return src('dist/styles/style.min.css', {read: false}).pipe(clean());
    }
    done();
}

function styles() {
    return src(paths.styles.src)
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concatCSS('style.css'))
        .pipe(cleanCSS({
            level: 2,
        }))
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(sourceMaps.write())
        .pipe(dest(paths.styles.dest))
}

function startWatch() {
    watch(['src/styles/**/*.less'], series(styles));
}

exports.cleanFolder = cleanFolder;
exports.styles = styles;
exports.startWatch = startWatch;
exports.build = parallel(cleanFolder, styles, startWatch);

