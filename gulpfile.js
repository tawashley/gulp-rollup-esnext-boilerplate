var babel = require('rollup-plugin-babel');
var del = require('del');
var argv = require('yargs').argv;

var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-better-rollup');

var isProd = (argv.prod || false);

function getRollupConfig({ isLegacy = false } = {}) {
    var options = {};

    if(isLegacy === true) {
        options.plugins = [
            babel({
                exclude: 'node_modules/**'
            })
        ]
    }

    return options;
}

var ROLLUP_MODULE_FORMAT = {
    format: 'es'
};

gulp.task('clean', function () {
    return del(['./dist'], {
        force: true
    });
});

gulp.task('scripts:main', function() {
    return gulp.src('./src/scripts/main.js')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(rollup(getRollupConfig(), ROLLUP_MODULE_FORMAT))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('scripts:main-legacy', function() {
    return gulp.src('./src/scripts/main-legacy.js')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(rollup(getRollupConfig({ isLegacy: true}), ROLLUP_MODULE_FORMAT))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('default', gulp.series('clean', 'scripts:main', 'scripts:main-legacy'))
