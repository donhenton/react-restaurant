/**
 * 
 * @type Module gulp|Module gulp
 * 
 * 
 * gulp dev --production
 * gulp release --production
 * will contingently minify js, no flag leaves js assembled.
 * 
 */

var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglifycss = require('gulp-uglifycss');
var del = require('del');
var reactify = require('reactify');
var babelify = require('babelify');
var browserify = require('browserify');
var watch = require('gulp-watch');
var tap = require('gulp-tap');
var gutil = require('gulp-util');
//var server = require('gulp-server-livereload');
//var livereload = require('gulp-livereload');
var gulpsync = require('gulp-sync')(gulp);
var gulpif = require("gulp-if");
var argv = require('yargs').argv;
var rename = require("gulp-rename");


var notify = require("./build_utils/build_utils").notify;
var targetLocation = './public_html/'

var pageURL = 'http://localhost:8080';

var SASS_FILES = './sass/**/*.scss';
var WATCH_JS = ['./src/**/*.js'];
var MAIN_HTML_FILE = ['./src/html/index.html'];

function Bundle() {

    var Bundler = browserify({
        entries: './src/index.js',
        transform: [
            ["babelify", { "presets": ["es2015", "react"] }]
        ],
        extensions: ['.js'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    return Bundler
        .bundle()
        .on('error', notify);
}

gulp.task('copy-html', function() {


    // base allows to copy the folders above the file
    // return gulp.src(MAIN_HTML_FILE,{'cwd': './src/html','base':'./..'} )
    return gulp.src(MAIN_HTML_FILE).pipe(gulp.dest(targetLocation))
        .on('finish', function() {
            gutil.log("processing change in html");
            //livereload.reload(pageURL);
            // cb();
        });


});

gulp.task('clean', function() {

    del(['target']);

});

gulp.task('build', function() {
    Bundle()
        .pipe(source('bundle.js'))
        .pipe(gulpif(argv.production, streamify(uglify())))
        //     .pipe(gulpif(argv.production, rename({suffix: '.min'})))
        .pipe(gulp.dest(targetLocation))
        .on('finish', function() {
            gutil.log("build bundle end");
            // livereload.reload(pageURL);
        });;
});
var sassProcess =
    function() {

        return gulp.src(SASS_FILES)
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('restaurantStyles.css'))
            //  .pipe(uglifycss())
            .pipe(gulp.dest(targetLocation));
    };

gulp.task('sass', function() {
    sassProcess();

});

gulp.task('copy-assets', function() {

    gulp.src(['./src/html/imgs/**/*'])
        .pipe(gulp.dest(targetLocation + '/images'));

    gulp.src(['./src/bootstrap-dist/**/*.min.*'])
        .pipe(gulp.dest(targetLocation + '/bootstrap'));



});


gulp.task('serve', function(cb) {
    browserSync.init({
        server: "./public_html",
        port: 6060,
        ui: {
            port: 6061
        }
    });

    watch(SASS_FILES, function(events, done) {

        sassProcess()
            .on('finish', function() {
                gutil.log("processing change in css");

            });

    });
    // watch src
    watch(WATCH_JS, function(events, done) {

        gulp.start('build');
    });

    watch(['./public_html/*.js', './public_html/*.css', './public_html/*.html'], function(events) {

        browserSync.reload();
        console.log("bundle finished")

    });

    watch(MAIN_HTML_FILE, function(events, done) {
        gutil.log("starting html change");
        gulp.start('copy-html');
    });

});



gulp.task('release', gulpsync.sync(['clean', 'build', 'sass']));
gulp.task('dev', gulpsync.sync(['clean', 'build', 'sass', 'copy-assets', 'copy-html', 'serve']));