var fs = require('fs');
var path = require('path');

var del = require('del');
var argv = require('yargs').argv;
var babel = require('gulp-babel');

var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-better-rollup');
var rollupResolve = require('rollup-plugin-node-resolve');

var isProd = (argv.prod || false);

function getRollupConfig({ isLegacy = false } = {}) {
    return {
        plugins: [rollupResolve()]
    }
}

function getRollupGenerateConfig({ isLegacy = false } = {}) {
    var introDirectory = "./_source/scripts/bundle-intro";
    var introFileName = (isLegacy) ? "intro-main-legacy.js" : "intro-main.js";
    var introFilePath = path.join(introDirectory, introFileName);

    return {
        format: 'iife',
        intro: fs.readFileSync(introFilePath, 'utf8')
    }
}

function getBabelBrowsersConfig(isLegacy = false) {
    var browsersList = []

    if(isLegacy === true) {
        browsersList.push(
            '> 1%',
            'last 2 versions',
            'Firefox ESR'
        );
    } else {
        browsersList.push(
            'Chrome >= 60',
            'Safari >= 10.1',
            'iOS >= 10.3',
            'Firefox >= 54',
            'Edge >= 15'
        );
    }

    return {
        browsers: browsersList
    };
}

function getBabelConfig({ isLegacy = false } = {}) {
    var options = {
        babelrc: false,
        presets:  [
            ["@babel/env", {
                modules: false,
                targets: getBabelBrowsersConfig(isLegacy)
            }]
        ]
    };

    return options;
}

gulp.task('clean', function () {
    return del(['./dist'], {
        force: true
    });
});

gulp.task('scripts:main', function() {
    return gulp.src('./_source/scripts/main.js')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(rollup(getRollupConfig(), getRollupGenerateConfig()))
        .pipe(babel(getBabelConfig()))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('scripts:main-legacy', function() {
    return gulp.src('./_source/scripts/main-legacy.js')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(rollup(getRollupConfig({ isLegacy: true }), getRollupGenerateConfig({ isLegacy: true })))
        .pipe(babel(getBabelConfig({ isLegacy: true })))
        .pipe(gulpif(isProd, uglify()))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('default', gulp.series('clean', 'scripts:main', 'scripts:main-legacy'))
