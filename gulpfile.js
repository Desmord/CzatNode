const gulp = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');

const htmlmin = require('gulp-htmlmin');

const plumber = require('gulp-plumber');
const gulpImportCss = require('gulp-import-css');
const gulpAutoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const streamify = require('gulp-streamify');
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

gulp.task('cleanHTML', () => {
    return del('build/client/index.html');
});


gulp.task('updateHTML', () => {

    console.log('Uaktualnianie pliku index.html.');

    return gulp.src('dev/client/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build/client/'));

});


gulp.task('watchHTML', () => {

    console.log('Uruchamianie obserwowania pliku index.html.');

    gulp.watch('dev/client/index.html', ['updateHTML', browserSync.reload]);

});

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

gulp.task('cleanCss', () => {
    return del('build/client/css/main.css');
});


gulp.task('updateCss', () => {

    console.log('Uaktualnianie plików css.');

    return gulp.src('dev/client/css/main.css')
        .pipe(plumber())
        .pipe(gulpImportCss()) //Łączenie importów
        .pipe(gulpAutoprefixer({
            browsers: ['last 5 versions', 'IE 9']
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('build/client/css'))
        .pipe(browserSync.stream());

});


gulp.task('watchCss', () => {

    console.log('Uruchamianie obserwowania plików css.');

    gulp.watch('dev/client/css/*.css', ['updateCss']);

});

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

gulp.task('cleanReactAndJS', () => {
    return del('build/client/js/main.js');
});

gulp.task('updateReactAndJS', () => {
    return browserify(['dev/client/js/react/react.js','dev/client/js/czat/displayCzatMethods.js','dev/client/js/czat/userEvents.js','dev/client/js/init.js','dev/client/js/login/loginEvents.js','dev/client/js/main.js'])  // Pobieranie plików
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('build/client/js'))
        .pipe(rename('main.js'))
        .pipe(streamify(concat('main.js')))
        .pipe(streamify(uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/client/js/'));
});


gulp.task('watchReact', () => {
    
        console.log('Uruchamianie obserwowania plików .reacts.');
    
        gulp.watch('dev/client/js/react/react.js', ['updateReactAndJS', browserSync.reload]);
    
});
    
gulp.task('watchJs', () => {
    
        console.log('Uruchamianie obserwowania plików Js.');
    
        gulp.watch('dev/client/js/czat/*.js', ['updateReactAndJS', browserSync.reload]);
    
    });

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

gulp.task('serwer', () => {

    console.log('Uruchamianie automatycznego odswieżania plików.');

    browserSync.init({
        proxy: "localhost:8000"
        // server: 'build/client/'
    });

});


gulp.task('build', () => {
    runSequence('cleanReactAndJS','cleanHTML','cleanCss','updateReactAndJS','updateCss','updateHTML','watchReact','watchJs','watchCss','watchHTML','serwer');
});
