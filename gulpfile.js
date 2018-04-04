var babel = require('rollup-plugin-babel');
var del = require('del');

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-better-rollup');

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

gulp.task('scripts:compile', function() {
    return gulp.src('./src/scripts/main.js')
        .pipe(sourcemaps.init())
        .pipe(rollup(getRollupConfig(), ROLLUP_MODULE_FORMAT))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
});

gulp.task('scripts:compile-legacy', function() {
    return gulp.src('./src/scripts/main-legacy.js')
        .pipe(sourcemaps.init())
        .pipe(rollup(getRollupConfig({ isLegacy: true}), ROLLUP_MODULE_FORMAT))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', gulp.series('clean', 'scripts:compile', 'scripts:compile-legacy'))
