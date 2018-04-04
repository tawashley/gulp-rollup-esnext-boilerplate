var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rollup = require('gulp-better-rollup');

gulp.task('scripts:compile', function() {
    return gulp.src('./src/scripts/entry.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({},  {
            format: 'cjs',
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', gulp.series('scripts:compile'))
