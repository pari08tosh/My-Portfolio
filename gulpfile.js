const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');


// --Top level functions--

// Copy html files
gulp.task('copyHtml', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Copy assets folder
gulp.task('copyAssets', () => {
    gulp.src('src/assets/*')
        .pipe(gulp.dest('dist/assets'));
});


// Optimize images
gulp.task('imageMin', () => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Copy images
gulp.task('copyImages', () => {
    gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'));
});

// Copy scripts
gulp.task('copyJs', () => {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
});

// Minify scripts
gulp.task('minifyJs', () => {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/js'));
});

// Compile sass
gulp.task('sass', () => {
    gulp.src('src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
})


// Start live dev server
gulp.task('serve', ['copyHtml', 'copyAssets', 'copyJs', 'copyImages', 'sass'], () => {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/scss/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("src/js/*.js", ['copyJs']).on('change', browserSync.reload);
    gulp.watch("src/*.html", ['copyHtml']).on('change', browserSync.reload);
});

// Build for production
gulp.task('build', ['copyHtml', 'copyAssets', 'imageMin', 'minifyJs', 'sass']);
